const fs = require('fs-extra');
const core = require('@actions/core');
const exec = require('@actions/exec');
const { DefaultArtifactClient } = require('@actions/artifact');
const { analyzeDir, detectTechStack, detectDependencies, extractFunctionsAndClasses } = require('./helpers');

async function main() {
  try {
    // Inputs
    const reportFormat = core.getInput('report_format') || 'html';
    const excludeFilesInput = core.getInput('exclude_files') || 'node_modules,build,.git';
    const excludeFiles = excludeFilesInput.split(',').map((item) => item.trim());
    const uploadArtifact = core.getInput('upload_artifact') === 'true';
    const commitReport = core.getInput('commit_report') === 'true';
    
    // Optional commit username and email inputs
    const commitUserName = core.getInput('commit_username') || 'github-actions';
    const commitEmail = core.getInput('commit_email') || 'github-actions@github.com';

    // Analyze Project
    const dirStructure = analyzeDir('./', excludeFiles);
    const techStack = detectTechStack();
    const dependencies = detectDependencies();
    const setupInstructions = fs.existsSync('README.md') ? fs.readFileSync('README.md', 'utf-8') : 'No README.md found.';

    // Generate Report Content
    const reportContent = `# Project Report

## Directory Structure
${dirStructure
      .map((item) => {
        const baseInfo = `- ${item.isDirectory ? '📂' : '📄'} ${item.name} (Size: ${item.size} bytes, Modified: ${item.modified})`;
        if (item.functionsAndClasses) {
          return `${baseInfo}\n  - Functions: ${item.functionsAndClasses.functions.join(', ') || 'None'}\n  - Classes: ${item.functionsAndClasses.classes.join(', ') || 'None'}`;
        }
        return baseInfo;
      })
      .join('\n')}
      
## Detected Tech Stack
${techStack.length ? techStack.join(', ') : 'No tech stack detected.'}
      
## Dependencies
${dependencies.length
      ? dependencies
          .map(({ type, lib, version }) => `- [${type}] ${lib}: ${version}`)
          .join('\n')
      : 'No dependencies found.'}
      
## Setup Instructions
${setupInstructions}`;

    // Generate Report File
    const reportPath = `./project-report.${reportFormat}`;
    if (reportFormat === 'md') {
      fs.writeFileSync(reportPath, reportContent);
    } else if (reportFormat === 'html') {
      const htmlContent = `
        <html>
          <head><title>Project Report</title></head>
          <body>
            <pre>${reportContent}</pre>
          </body>
        </html>
      `;
      fs.writeFileSync(reportPath, htmlContent);
    } else {
      throw new Error('Invalid report format. Choose either "md" or "html".');
    }

    core.setOutput('report_path', reportPath);

    // Upload Report as Artifact
    if (uploadArtifact) {
      // Initialize the artifact client
      const artifact = new DefaultArtifactClient();

      try {
        // Upload the artifact
        const { id, size } = await artifact.uploadArtifact(
          'project-report', // Artifact name
          [reportPath], // List of file paths (array of report files)
          '.' // Directory path (where to look for the files)
        );

        console.log(`Successfully uploaded artifact with id: ${id}, size: ${size} bytes`);
      } catch (error) {
        console.error('Error uploading artifact:', error);
      }
    }

    // Commit the Report to Repository
    if (commitReport) {
      // Set commit username and email from inputs or default to 'github-actions'
      await exec.exec('git', ['config', '--global', 'user.name', commitUserName]);
      await exec.exec('git', ['config', '--global', 'user.email', commitEmail]);
      await exec.exec('git', ['add', reportPath]);
      await exec.exec('git', ['commit', '-m', 'Add project report']);
      await exec.exec('git', ['push']);
    }

    console.log(`Report generated and saved to: ${reportPath}`);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

main();

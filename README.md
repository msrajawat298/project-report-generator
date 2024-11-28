# Project Analysis Action 🚀

This GitHub Action analyzes a project directory, detects its structure and dependencies, and generates a detailed report in Markdown or HTML format. Optionally, it can commit the report to the repository or upload it as an artifact.

---

## Features:
- 📂 Analyze project directory structure
- 🔍 Detect tech stack and dependencies
- 📝 Generate detailed reports (Markdown or HTML)
- 📤 Upload reports as artifacts or commit them to the repository

---

## Example Usage:

```yaml
name: Analyze Project
on:
  push:
    branches:
      - main
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Project Analysis
        uses: msrajawat298/project-report-generator@v1.0.3
        with:
          report_format: 'html'
          commit_report: 'true'
```

---

## Inputs:

| **Input**         | **Description**                                   | **Required** | **Default** |
|--------------------|---------------------------------------------------|--------------|-------------|
| `report_format`    | The format of the report (`html` or `md`).        | No          | `md`        |
| `exclude_files`    | Comma-separated list of files to exclude.         | No           | `'node_modules,build,.git'`        |
| `upload_artifact`  | Upload the report as an artifact (`true`/`false`).| No           | `false`     |
| `commit_report`    | Commit the report to the repository (`true`/`false`). | No           | `false`     |
| `commit_username`    | Allows you to customize the committer username. | No           | `github-actions`     |
| `commit_email`    | Allows you to customize the committer committer_email. | No           | `github-actions@github.com`     |


---

## Outputs:

| **Output**      | **Description**                            |
|------------------|--------------------------------------------|
| `report_path`    | The path to the generated report file.     |

---

## Example Workflow:

```yaml
name: "Project Analysis Workflow"
on:
  workflow_dispatch:

jobs:
  analyze-project:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Run Project Analysis
        uses: msrajawat298/project-report-generator@v1.0.3
        with:
          report_format: "html"
          exclude_files: "node_modules,.git"
          upload_artifact: "true"
          commit_report: "false"
```

---

## Action Metadata (`action.yml`)

```yaml
name: "Project Report Generator"
description: "Generates a comprehensive report about the project, including directory structure, tech stack, and usage."
author: "Mayank Singh"
inputs:
  report_format:
    description: "The format of the report (html or md)."
    required: true
    default: "md"
  exclude_files:
    description: "Comma-separated list of files or folders to exclude from analysis."
    required: false
    default: ""
  upload_artifact:
    description: "Upload the generated report as an artifact."
    required: false
    default: "false"
  commit_report:
    description: "Commit the generated report to the repository."
    required: false
    default: "false"
outputs:
  report_path:
    description: "The path to the generated report."
runs:
  using: "node16"
  main: "index.js"
```

---

## Author

👨‍💻 **Mayank Singh**  
GitHub: [msrajawat298](https://github.com/msrajawat298)

Feel free to contribute, report issues, or suggest new features! 🚀
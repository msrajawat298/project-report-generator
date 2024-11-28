# Project Report

## Directory Structure
- 📂 .github (Size: 4096 bytes, Modified: 11/28/2024, 12:15:55 PM)
- 📄 .gitignore (Size: 12 bytes, Modified: 11/28/2024, 12:15:55 PM)
- 📄 README.md (Size: 3481 bytes, Modified: 11/28/2024, 12:15:55 PM)
- 📄 action.yml (Size: 1162 bytes, Modified: 11/28/2024, 12:15:55 PM)
- 📂 dist (Size: 4096 bytes, Modified: 11/28/2024, 12:15:55 PM)
- 📄 helpers.js (Size: 2745 bytes, Modified: 11/28/2024, 12:15:55 PM)
  - Functions: None
  - Classes: None
- 📄 index.js (Size: 4012 bytes, Modified: 11/28/2024, 12:15:55 PM)
  - Functions: main
  - Classes: None
- 📄 package-lock.json (Size: 81198 bytes, Modified: 11/28/2024, 12:16:01 PM)
- 📄 package.json (Size: 513 bytes, Modified: 11/28/2024, 12:15:55 PM)
- 📄 project-report.html (Size: 4699 bytes, Modified: 11/28/2024, 12:15:55 PM)
- 📄 project-report.md (Size: 4720 bytes, Modified: 11/28/2024, 12:15:55 PM)
      
## Detected Tech Stack
Node.js
      
## Dependencies
- [Node.js] @actions/artifact: ^2.1.11
- [Node.js] @actions/core: ^1.11.1
- [Node.js] @actions/exec: ^1.1.1
- [Node.js] @actions/github: ^6.0.0
- [Node.js] fs-extra: ^11.2.0
- [Node.js] path: ^0.12.7
- [Node.js] punycode: ^2.3.1
      
## Setup Instructions
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
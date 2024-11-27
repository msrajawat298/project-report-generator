# Project Analysis Action 🚀

This GitHub Action analyzes a project directory and generates a report.

## Features:
- Analyze project directory structure
- Generate detailed report in MD or HTML format
- Supports custom commit-specific reports

![Action Icon](https://raw.githubusercontent.com/<your-username>/<your-repo>/main/assets/icon.png)

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
      - name: Run Analysis
        uses: <your-username>/<your-repo>@v1.0.0
        with:
          report_format: 'md'
          commit_report: 'true'

In this setup:
- The Action name will show the rocket emoji next to it.
- A custom icon will be included in the README.
- Badges will add color to the README for additional visual appeal.

---

### Summary
- **Icon**: Use emojis or upload a custom image in your repository.
- **Color**: Add color to your README using badges, but GitHub Marketplace will not support color changes for the action card itself.
- **Documentation**: Include the icon and badges in your `README.md` for a polished, colorful presentation.

Let me know if you need further clarification or assistance!

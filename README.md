# pSEO Generator for Google Sheets

**Generate scalable programmatic SEO content ideas directly within Google Sheets using Gemini AI.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Why Use This Script](#why-use-this-script)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Background

This Google Apps Script adds a **pSEO Generator** custom menu to your Google Sheets. It reads a list of keywords from a `Keywords` sheet, sends a single request to Google Gemini AI, and outputs a structured list of programmatic SEO content ideas in a new `pSEO Ideas` sheet.

## Features

- 🔥 **Single-Call AI**: Batch up to 150 keywords into one request for faster thematic analysis.
- 🚀 **Structured Output**: Automatically formats results into `Pattern`, `Opportunity`, `Intent`, `Funnel`, and `Variables` columns.
- 🛠 **User Feedback**: Displays progress via toast messages and alerts.
- ⚙️ **Easy Setup**: Minimal configuration—just add your API key and paste the script.
- 🔄 **Idempotent**: Clears and reuses the output sheet on every run.

## Why Use This Script

- **Scale Content Planning**: Instantly generate 100+ SEO idea templates from hundreds of keywords.
- **Maintain Consistency**: Enforces a standard format for programmatic execution and templating.
- **Save Time**: Avoid manual brainstorming; let AI handle high-level strategy.
- **Integrate Seamlessly**: Works within the Sheets UI—no external tools required.

## Prerequisites

- A Google Workspace or Gmail account.
- A Google Sheet where you can install the script.
- A valid Gemini AI API key with sufficient quota.

## Installation

1. Open your target Google Sheet.
2. Go to **Extensions > Apps Script**.
3. In the script editor, replace any existing code with the contents of this script file.
4. Paste your Gemini API key into the `GEMINI_API_KEY` constant.
5. Save and authorize the script when prompted.
6. Reload your spreadsheet to see the **pSEO Generator** menu.

## Demo Video

> GitHub strips `<iframe>` embeds in READMEs. To preserve a preview, use a thumbnail image linked to your video:

```md
[![▶️ Watch the demo](docs/demo-thumb.png)](https://www.canva.com/design/DAGtHyvPVg4/z-ApR2aZ9jGyxBMPxUU_Cg/watch?embed)
```

1. **Generate a thumbnail**: take a screenshot of your video or export a poster image, save it as `docs/demo-thumb.png` in your repo.
2. **Commit** the thumbnail file.
3. **Link** it in Markdown as shown above.

Clicking the image opens the embedded video in a new tab.

## Usage

1. Create a sheet named `Keywords` and list your seed keywords in column A (starting at A2).
2. Click the new **pSEO Generator** menu and select **🚀 Generate Thematic Ideas**.
3. Confirm the keyword count when prompted.
4. Wait for the AI to process (you'll see a toast notification).
5. Review your ideas in the newly created or refreshed `pSEO Ideas` sheet.

## Configuration

- **API Key**: Edit the `GEMINI_API_KEY` constant at the top of the script.
- **Model Selection**: Change the endpoint URL in `API_URL` to use a different Gemini model (e.g., `gemini-1.5-pro`).
- **Keyword Limit**: The script caps at 150 keywords; adjust the threshold in the `if (keywords.length > 150)` check if needed.
- **Retry Logic**: The `callGeminiAPI` helper retries up to 2 times with backoff; update `maxRetries` or `sleep` duration as desired.

## Limitations

- **Quota Management**: Large prompts may exhaust your Gemini API quota. Monitor usage in Google Cloud.
- **Response Parsing**: Requires the AI to return exactly 5 columns separated by ` - ` per line.
- **Sheet Names**: Hard-coded sheet names (`Keywords` and `pSEO Ideas`)—rename manually in the code if different.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and add tests if applicable.
4. Commit: `git commit -m "Add your feature description"`.
5. Push: `git push origin feature/your-feature`.
6. Open a Pull Request and describe your changes.

Please follow the existing code style and conventions.

## License

This project is licensed under the [MIT License](LICENSE)

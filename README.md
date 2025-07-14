# pSEO Generator for Google Sheets Using AI

**Generate scalable programmatic SEO content ideas directly within Google Sheets using Gemini AI.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Why Use This Script](#why-use-this-script)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Demo Video](#demo-video)
- [Usage](#usage)
- [Configuration](#configuration)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Background

This Google Apps Script adds a **pSEO Generator** custom menu to your Google Sheets. It reads a list of keywords from a `Keywords` sheet, sends them in a single prompt to Google Gemini AI, and outputs a structured list of programmatic SEO content ideas in a new `pSEO Ideas` sheet. Each idea follows the format:  
`Pattern – Opportunity – Intent – Funnel – Variables`

This framework is useful for programmatic SEO strategies where content templates are driven by data.

## Features

- ⚡️ **Batch AI Prompting**: Processes up to 150 keywords in a single Gemini API call for fast output generation.
- 📐 **Structured Format**: Outputs content in a programmatic SEO-friendly format: Pattern, Opportunity, Intent, Funnel, Variables.
- 📣 **UI Integrated**: Seamlessly works from the Google Sheets interface using a custom menu.
- 📊 **Clean Output**: Replaces old output with fresh ideas on every run.
- 🧠 **Prompt Customization**: Easily edit prompts to match specific project frameworks.

## Why Use This Script

- **Scale Ideation**: Generate 100+ programmatic content angles from a single keyword set.
- **Framework Driven**: Keeps content ideas structured and templated for scalable landing page creation.
- **Time-Saving**: Automates what would take hours of manual brainstorming.
- **Lightweight Setup**: No external tools or platforms required.

## Prerequisites

- A Google Workspace or Gmail account.
- A Google Sheet where you can run custom scripts.
- A Gemini AI API key (from [Google AI Studio](https://makersuite.google.com/app/apikey)).

## Installation

1. Open your target Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Replace any existing code with the contents of `pSEO.gs`.
4. Paste your Gemini API key into the `**GEMINI_API_KEY**` variable.
5. Save and run `onOpen()` once to authorize the script.
6. Reload your spreadsheet to activate the **pSEO Generator** menu.

## Demo Video

<div>
  <a href="https://www.loom.com/share/485c10411b1d4a619570ebe2e3302047">
    <p>Watch: Programmatic SEO Builder – Google Sheets – 14 July 2025</p>
  </a>
  <a href="https://www.loom.com/share/485c10411b1d4a619570ebe2e3302047">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/485c10411b1d4a619570ebe2e3302047-e43efe207d1b1b30-full-play.gif">
  </a>
</div>

## Usage

1. Create a sheet named `Keywords` and add your seed keywords in column A (starting from A2).
2. Click on the **pSEO Generator** menu and choose **🚀 Generate Thematic Ideas**.
3. Confirm the keyword count if prompted.
4. The AI response will populate in a new sheet named `pSEO Ideas`, with columns:
   - Pattern
   - Opportunity
   - Intent
   - Funnel
   - Variables

> Example Output:  
> Use Case – [AI Tools for HR Managers] – Commercial – MOFU – AI Tool, Use Case, Persona

## Configuration

- **API Key**: Set your Gemini API key in the `GEMINI_API_KEY` variable.
- **Model Endpoint**: Update `API_URL` to change between Gemini model versions.
- **Keyword Batch Limit**: Default is 150; adjust this in the script if needed.
- **Prompt Format**: The default prompt follows the programmatic SEO format. You can update the `promptTemplate` to experiment with new structures or verticals.

```javascript
const promptTemplate = `
Given the keyword: {{keyword}}, generate one programmatic SEO idea using the following format:
Pattern – Opportunity – Intent – Funnel – Variables.
Avoid repetition. Think strategically like an SEO.
`;

## Limitations
	•	Quota Limits: The Gemini API has daily quotas. High-volume usage may trigger limits.
	•	Formatting Precision: The response must include five values separated by –. Malformed responses may break parsing.
	•	Static Sheet Names: Sheet names are hardcoded as Keywords and pSEO Ideas. You can rename these in the script.

## Contributing
	1.	Fork this repository.
	2.	Create a new branch: git checkout -b feature/your-feature.
	3.	Make your changes.
	4.	Commit: git commit -m "Add your feature description".
	5.	Push: git push origin feature/your-feature.
	6.	Open a Pull Request with a clear description of the update.

Please follow the existing code style and keep all changes modular.

## License

This project is licensed under the MIT License

## Acknowledgements

Built using Google Apps Script and the Gemini AI API. Inspired by the need to scale SEO ideation without sacrificing structure or speed.

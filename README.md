# pSEO Generator for Google Sheets Using AI

**Generate scalable programmatic SEO content ideas directly within Google Sheets using the Gemini AI API.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<img width="1270" height="710" alt="image" src="https://github.com/user-attachments/assets/eb29bc28-e788-4847-a37d-2abfca88451f" />

This Google Apps Script enhances Google Sheets with a powerful, AI-driven tool for programmatic SEO specialists, content strategists, and marketers. It automates the ideation process by taking a list of seed keywords and generating a structured set of scalable content ideas.

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Advanced Configuration](#advanced-configuration)
- [Script Reference (API Docs)](#script-reference-api-docs)
- [Contributing](#contributing)

## Features

- ⚡️ **Batch AI Prompting**: Process up to 150 keywords in one Gemini API call for fast results.
- 📐 **Structured Format**: Outputs five columns—Pattern, Opportunity, Intent, Funnel, and Variables.
- 📣 **UI Integrated**: Launch ideas and set your API key from a custom menu directly in Google Sheets.
- 🔐 **Secure API Key Storage**: Your Gemini API key is stored securely in user properties, never exposed in the script itself.
- 🛠 **Detailed User Feedback**: Shows progress via toast messages and provides specific, actionable error alerts from the API.
- 📊 **Clean Output**: Automatically clears old ideas and writes fresh output on each run.
- 🧠 **Advanced Configuration**: Easily customize sheet names, prompts, AI models, and other settings in a central `CONFIG` object.

## How It Works

This script adds a **pSEO Generator** custom menu to your Google Sheet. When you run it, the script:
1.  Reads a list of keywords from a sheet named `Keywords`.
2.  Constructs a detailed prompt for the Gemini AI.
3.  Sends the keywords in a single, efficient API call.
4.  Parses the AI's response.
5.  Outputs a structured list of pSEO content ideas into a sheet named `pSEO Ideas`.

## Prerequisites

- A Google Workspace or Gmail account.
- A Google Sheet for running custom scripts.
- A Gemini AI API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey)).

## Installation and Setup

Setting up the pSEO Generator involves two main steps:

### 1. Install the Script

1.  Open your target Google Sheet.
2.  Go to **Extensions > Apps Script**.
3.  Replace any existing code in the editor with the contents of the `pSEO.js` file.
4.  Click the **Save project** icon.

### 2. Set Your API Key

You must set your Gemini API key before you can generate ideas. This is a one-time setup.

1.  Reload your Google Sheet to ensure the custom menu appears.
2.  Click the **pSEO Generator** menu.
3.  Select **🔑 Set API Key**.
4.  Paste your Gemini API key into the prompt and click **OK**.

Your key is now saved securely. You do not need to do this again unless you want to change your key.

## Usage

1.  Create a sheet named `Keywords` (or your custom name from the `CONFIG` object).
2.  List your seed keywords in column A, starting from the second row.
3.  Click the **pSEO Generator** menu and select **🚀 Generate Thematic Ideas**.
4.  Confirm the keyword count when prompted.
5.  Review the results in the `pSEO Ideas` sheet.

## Advanced Configuration

For advanced users, the script includes a `CONFIG` object at the top of the file that allows for easy customization without altering the core logic.

To edit these settings, go to **Extensions > Apps Script** and modify the values inside the `CONFIG` object.

| Path | Key | Description | Default Value |
| :--- | :--- | :--- | :--- |
| `CONFIG.sheets.keywords` | `name` | The name of the sheet containing your keywords. | `"Keywords"` |
| | `column` | The column where your keywords are listed. | `"A"` |
| | `startRow` | The row where your keyword list begins. | `2` |
| `CONFIG.sheets.output` | `name` | The name of the sheet where results will be written. | `"pSEO Ideas"` |
| | `headers` | An array of strings for the output table headers. | `["Pattern", ...]` |
| `CONFIG.gemini` | `model` | The Gemini model to use for generation. | `"gemini-1.5-flash-latest"` |
| | `prompt` | The master prompt template sent to the AI. | (See script file) |
| | `maxRetries` | The number of times to retry the API call on failure. | `2` |
| `CONFIG.app` | `keywordLimit` | The maximum number of keywords to process at once. | `150` |

## Script Reference (API Docs)

This section provides a technical breakdown of the functions within the `pSEO.js` script.

### UI Functions

#### `onOpen()`
- **Description**: A special function that runs automatically when the spreadsheet is opened. It creates the custom "pSEO Generator" menu in the Google Sheets UI.
- **Parameters**: None.
- **Returns**: `void`.

#### `setApiKey()`
- **Description**: Triggered from the "Set API Key" menu item. Prompts the user for their Gemini API key and saves it securely to `PropertiesService`.
- **Parameters**: None.
- **Returns**: `void`.

### Core Logic

#### `generateThematicIdeas()`
- **Description**: The main function that orchestrates the entire pSEO idea generation process. It handles user interaction, reads keywords, calls the API, and writes the results to the output sheet.
- **Parameters**: None.
- **Returns**: `void`.

### Helper Functions

#### `createThematicPrompt(keywords)`
- **Description**: Constructs the final prompt string to be sent to the Gemini API by inserting the provided keywords into the master prompt template from the `CONFIG` object.
- **Parameters**:
    - `keywords` (Array<string>): A list of keywords from the input sheet.
- **Returns**: `string` - The fully-formed prompt.

#### `callGeminiAPI(prompt, apiKey)`
- **Description**: Handles the HTTP request to the Gemini API. It includes a retry mechanism for transient errors.
- **Parameters**:
    - `prompt` (string): The prompt to send to the AI.
    - `apiKey` (string): The user's Gemini API key.
- **Returns**: `Object` - A result object with the following structure:
    - On success: `{ success: true, text: "..." }`
    - On failure: `{ success: false, error: "..." }`

#### `parseResponseTo2DArray(text)`
- **Description**: Parses the raw text response from the Gemini API into a 2D array suitable for writing to a Google Sheet. It splits the text by newlines and then by the " - " separator. Malformed lines are logged and skipped.
- **Parameters**:
    - `text` (string): The raw text content from the API response.
- **Returns**: `Array<Array<string>>` - A 2D array of the parsed ideas.

## Contributing

1.  Fork the repo.
2.  Create a branch: `git checkout -b feature/your-feature`.
3.  Make changes and add tests if needed.
4.  Commit: `git commit -m "Describe your feature"`.
5.  Push: `git push origin feature/your-feature`.
6.  Open a Pull Request describing your updates.

---
Built using Google Apps Script and the Gemini AI API.

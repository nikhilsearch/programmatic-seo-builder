# pSEO Generator for Google Sheets Using AI

**Generate scalable programmatic SEO content ideas directly within Google Sheets using Gemini AI.**

<img width="1080" height="607" alt="image" src="https://github.com/user-attachments/assets/bcd62cdf-621a-4da9-81ef-3c467e2776db" />


## Table of Contents

- [What It Does](#what-it-does)  
- [Features](#features)  
- [Why Use This Script](#why-use-this-script)  
- [Who It’s For](#who-its-for)  
- [Prerequisites](#prerequisites)  
- [Demo Video](#demo-video)  
- [Usage](#usage)  
- [Configuration](#configuration)  
- [Contributing](#contributing)

## What It Does

This Google Apps Script adds a **pSEO Generator** custom menu to your Google Sheets. It reads a list of keywords from a `Keywords` sheet, sends them in one prompt to Google Gemini AI, and outputs a structured list of programmatic SEO content ideas in a new `pSEO Ideas` sheet. Each idea follows the format:  
`Pattern – Opportunity – Intent – Funnel – Variables` 

This framework supports data-driven programmatic SEO strategies and scalable content template creation.

## Features

- ⚡️ **Batch AI Prompting**: Process up to 150 keywords in one Gemini API call for fast results.  
- 📐 **Structured Format**: Outputs five columns—Pattern, Opportunity, Intent, Funnel, Variables.  
- 📣 **UI Integrated**: Launch ideas from a custom menu in Google Sheets.  
- 🛠 **User Feedback**: Shows progress via toast messages and alerts.  
- 📊 **Clean Output**: Clears old ideas and writes fresh output on each run.  
- 🧠 **Prompt Customization**: Edit prompts in the script to match your framework.  
- ⚙️ **Easy Setup**: Minimal config—just add your API key and paste the script.

## Why Use This Script

- **Scale Ideation**: Generate 100+ content angles from one keyword list.  
- **Framework Driven**: Enforce a consistent structure for programmatic pages.  
- **Time-Saving**: Automate what would take hours of manual brainstorming.  
- **Lightweight Setup**: No external platforms—just your Sheet and AI key.

## Who It’s For

- Technical SEOs  
- Programmatic SEO specialists  
- Content strategists at scale  
- Indie SaaS founders  
- Product-led marketing teams  
- Agencies building landing page frameworks

## Prerequisites

- A Google Workspace or Gmail account  
- A Google Sheet for running custom scripts  
- A Gemini AI API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

## Demo Video

<div>
  <a href="https://www.loom.com/share/485c10411b1d4a619570ebe2e3302047">
    Watch: Programmatic SEO Builder – Google Sheets – 14 July 2025
  </a>
  <br>
  <a href="https://www.loom.com/share/485c10411b1d4a619570ebe2e3302047">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/485c10411b1d4a619570ebe2e3302047-e43efe207d1b1b30-full-play.gif" alt="Demo video thumbnail">
  </a>
</div>

## Usage

1. Create a sheet named `Keywords` and list your seed keywords in column A (from A2 onward).  
2. Click the **pSEO Generator** menu and select **🚀 Generate Thematic Ideas**.  
3. Confirm the keyword count when prompted.  
4. Review results in the new `pSEO Ideas` sheet, with columns:  
   - Pattern  
   - Opportunity  
   - Intent  
   - Funnel  
   - Variables  

> **Example Output**

| Pattern  | Opportunity                   | Intent     | Funnel | Variables                     |
|----------|-------------------------------|------------|--------|-------------------------------|
| Use Case | [AI Tools for HR Managers]    | Commercial | MOFU   | AI Tool, Use Case, Persona    |

## Configuration

1. Open your target Google Sheet.  
2. Go to **Extensions > Apps Script**.  
3. Replace any existing code with the contents of this script file.  
4. Paste your Gemini API key into the `GEMINI_API_KEY` constant.  
5. Save and run `onOpen()` to authorize.  
6. Reload to activate the **pSEO Generator** menu.

## Contributing

1. Fork the repo.  
2. Create a branch: `git checkout -b feature/your-feature`.  
3. Make changes and add tests if needed.  
4. Commit: `git commit -m "Describe your feature"`.  
5. Push: `git push origin feature/your-feature`.  
6. Open a Pull Request describing your updates.

Built using Google Apps Script and the Gemini AI API. Inspired by the need to scale SEO ideation without losing structure or speed.  

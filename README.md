Here is the complete and final version of your README.md file for the Programmatic SEO Builder, properly formatted for GitHub:

⸻


# Programmatic SEO Builder

Programmatic SEO Builder helps you generate scalable programmatic SEO content ideas directly within Google Sheets using Gemini AI. It is built for SEOs, content strategists, and developers who want to map keyword opportunities at scale using AI-assisted clustering and ideation frameworks.

---

## 🔧 What This Tool Does

This tool allows you to:

- Input a list of keywords into Google Sheets  
- Generate scalable content pattern ideas based on programmatic SEO logic  
- Apply frameworks such as Pattern, Opportunity, Intent, Funnel, Variables  
- Automate ideation for thousands of long-tail or mid-funnel queries  
- Customize the output structure based on your own templates  

---

## ✅ Features

- Gemini 1.5 Pro API Integration  
- Google Sheets + Apps Script-based interface  
- Structured content generation framework: Pattern, Opportunity, Intent, Funnel, Variables  
- Prompt customization for advanced use cases  
- On-demand AI generation (manual trigger only)  
- Designed for scalability with large keyword sets  

---

## 📊 Who It’s For

- Technical SEOs  
- Programmatic SEO specialists  
- Content strategists working at scale  
- Indie SaaS founders  
- Product-led marketers  
- Agencies creating landing page frameworks for clients  

---

## 📁 Folder Structure

/Programmatic-SEO-Builder
│
├── Google Sheet Template
│   └── Gemini API Integrated
│
├── Apps Script
│   └── pSEO.gs
│
└── Prompt Configuration (embedded in script)

---

## 🚀 Getting Started

### 1. Copy the Google Sheet Template

- Open the public template  
- Make a copy in your own Google Drive  

> ![screenshot-template-overview](screenshots/screenshot-sheet-keyword-input.png)

---

### 2. Get Your Gemini API Key

- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)  
- Generate an API key for Gemini 1.5 Pro  
- Copy the key  

---

### 3. Open the Apps Script Editor

- Go to Extensions > Apps Script in the copied sheet  
- Replace the placeholder with your Gemini API key in this line:  
```javascript
const GEMINI_API_KEY = 'PASTE_YOUR_KEY_HERE';


⸻

4. Save and Authorize the Script
	•	Save the script
	•	Run the onOpen() function manually
	•	Accept the permissions popup

⸻

5. Use the “pSEO Generator” Menu
	•	Reload the sheet
	•	Click on the pSEO Generator menu
	•	Choose Generate Content Ideas


⸻

🧠 How It Works

For each keyword, the script sends a structured prompt to Gemini AI and receives a formatted response using this structure:

Pattern – Opportunity – Intent – Funnel – Variables


⸻

⚙️ Prompt Customization

You can edit the prompt inside the script to better suit your use case:

const promptTemplate = `
Given the keyword: {{keyword}}, generate one programmatic SEO idea using the following format:
Pattern – Opportunity – Intent – Funnel – Variables.
Avoid repetition. Think strategically like an SEO.
`;


⸻

📌 Example Input and Output

Input keyword: AI Tools for HR
Output:
	•	Pattern: Use Case
	•	Opportunity: [Top AI Tools Every HR Manager Should Know]
	•	Intent: Commercial
	•	Funnel: MOFU
	•	Variables: AI Tool, Persona, Use Case

⸻

📉 Troubleshooting

Issue	Likely Cause	Fix
No menu visible	onOpen function not triggered	Reload sheet and run onOpen() manually
API error	Invalid or expired API key	Regenerate from Google AI Studio
Empty rows	Missing keyword input	Ensure keyword column is filled


⸻

📈 Scaling and Limits
	•	Avoid triggering the script for more than 100 rows at once
	•	Gemini API has rate limits; stagger requests if needed
	•	You can modify the code to support batching and delays

⸻

📊 Analytics and Reporting

Connect the sheet to Looker Studio to monitor:
	•	Keyword categories
	•	Intent coverage
	•	Opportunity types


⸻

📄 License

This project is currently unlicensed. Use for personal or educational projects. For commercial use or contributions, please reach out.

⸻

👨‍💻 Author

Nikhil Sharma
Programmatic SEO Specialist
GitHub: @nikhilsearch

Let me know when you’re ready to upload screenshots or if you want the file exported directly in `.md` format for GitHub.

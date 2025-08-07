/**
 * @OnlyCurrentDoc
 */

// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------
const CONFIG = {
  sheets: {
    keywords: {
      name: "Keywords",
      column: "A",
      startRow: 2,
    },
    output: {
      name: "pSEO Ideas",
      headers: ["Pattern", "Opportunity", "Intent", "Funnel", "Variables"],
    },
  },
  gemini: {
    model: "gemini-1.5-flash-latest",
    apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/",
    maxRetries: 2,
    retryDelay: 2000, // milliseconds
    prompt: `You are a top-tier programmatic SEO strategist with deep expertise in content scalability, SERP domination, and user-intent alignment. Your task is to generate a highly scalable and diverse list of programmatic SEO content ideas rooted in a given cluster of related keywords.

Start by analyzing the keyword list below to identify the core topic, search intent, and entity relationships:
--- KEYWORDS ---
%keywords%
--- END KEYWORDS ---

Using that understanding, produce a comprehensive list of content opportunities optimized for organic growth and aligned with best-in-class SEO and content marketing strategies.

Each idea MUST follow this structure and be formatted in one line, with each of the 5 parts separated by " - ":

Pattern - Opportunity - Intent - Funnel - Variables

Where:
	•	Pattern = A scalable content format (e.g., Comparison, Alternatives, Persona, Use Case, Industry, Individuals, Teams, Tools, Templates, Landing Page, Guides, Checklist, Benefit-Focused, Feature Explainer, Generator, Feature Update).
	•	Opportunity = A scalable content title template using [bracketed] variables (e.g., [Tool] vs [Tool], Best [Product] for [Persona], How to [Goal] in [Industry]).
	•	Intent = Choose from: Informational, Navigational, Transactional, or Commercial.
	•	Funnel = Map to the appropriate stage: TOFU (Top), MOFU (Middle), or BOFU (Bottom).
	•	Variables = List the [bracketed] dynamic elements used in the title.

🚫 Do not include any explanations, headings, intros, or conclusions.
✅ Just return the raw list of formatted content ideas — one per line. Each line must contain exactly 5 parts separated by " - ".`,
  },
  app: {
    keywordLimit: 150,
  },
};


// -----------------------------------------------------------------------------
// CUSTOM MENU & SETUP
// -----------------------------------------------------------------------------

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('pSEO Generator')
    .addItem('🚀 Generate Thematic Ideas', 'generateThematicIdeas')
    .addSeparator()
    .addItem('🔑 Set API Key', 'setApiKey')
    .addToUi();
}

function setApiKey() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'Set Gemini API Key',
    'Please enter your Google Gemini API key:',
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() == ui.Button.OK) {
    const apiKey = response.getResponseText().trim();
    if (apiKey) {
      PropertiesService.getUserProperties().setProperty('GEMINI_API_KEY', apiKey);
      ui.alert('Success', 'Your API key has been saved.', ui.ButtonSet.OK);
    } else {
      ui.alert('Error', 'API key cannot be empty.', ui.ButtonSet.OK);
    }
  }
}


// -----------------------------------------------------------------------------
// MAIN FUNCTION
// -----------------------------------------------------------------------------

function generateThematicIdeas() {
  const ui = SpreadsheetApp.getUi();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get API Key from Properties Service
  const apiKey = PropertiesService.getUserProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) {
    ui.alert('API Key Not Set', `Please set your Gemini API key using the "pSEO Generator > 🔑 Set API Key" menu.`, ui.ButtonSet.OK);
    return;
  }

  const keywordSheet = spreadsheet.getSheetByName(CONFIG.sheets.keywords.name);

  if (!keywordSheet) {
    ui.alert(`Error: Sheet named '${CONFIG.sheets.keywords.name}' not found. Please create one with keywords in Column A.`);
    return;
  }

  const lastRow = keywordSheet.getLastRow();
  if (lastRow < CONFIG.sheets.keywords.startRow) {
    ui.alert(`No keywords found in column ${CONFIG.sheets.keywords.column} of the '${CONFIG.sheets.keywords.name}' sheet.`);
    return;
  }

  const range = `${CONFIG.sheets.keywords.column}${CONFIG.sheets.keywords.startRow}:${CONFIG.sheets.keywords.column}${lastRow}`;
  const keywords = keywordSheet.getRange(range).getValues().flat().filter(String);
  if (keywords.length === 0) {
    ui.alert("No valid keywords found.");
    return;
  }

  if (keywords.length > CONFIG.app.keywordLimit) {
    ui.alert(`⚠️ Too many keywords (${keywords.length}). Please limit input to ${CONFIG.app.keywordLimit} keywords for best results.`);
    return;
  }

  const confirmation = ui.alert(
    `Found ${keywords.length} keywords.`,
    "Proceed to generate thematic pSEO ideas using a single AI call?",
    ui.ButtonSet.YES_NO
  );
  if (confirmation !== ui.Button.YES) return;

  spreadsheet.toast("🎯 Generating ideas... please wait.", "Processing", 5);

  const prompt = createThematicPrompt(keywords);
  const apiResult = callGeminiAPI(prompt, apiKey);

  if (!apiResult.success) {
    ui.alert("❌ AI Generation Failed", `The API returned an error:\n\n"${apiResult.error}"\n\nPlease check your API key, quota, and billing status.`, ui.ButtonSet.OK);
    spreadsheet.toast("❌ Failed");
    return;
  }

  const ideas = parseResponseTo2DArray(apiResult.text);
  if (ideas.length === 0) {
    ui.alert("⚠️ AI returned an empty or incorrectly formatted response. Check logs for details.");
    return;
  }

  // Write to a new or existing sheet
  let outputSheet = spreadsheet.getSheetByName(CONFIG.sheets.output.name);
  if (outputSheet) {
    outputSheet.clear();
  } else {
    outputSheet = spreadsheet.insertSheet(CONFIG.sheets.output.name);
  }

  const headers = CONFIG.sheets.output.headers;
  outputSheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  outputSheet.getRange(2, 1, ideas.length, headers.length).setValues(ideas);
  outputSheet.autoResizeColumns(1, headers.length);
  outputSheet.activate();

  spreadsheet.toast(`✅ ${ideas.length} ideas generated.`, "Success", 5);
  ui.alert("Success", `${ideas.length} thematic pSEO ideas generated in "${CONFIG.sheets.output.name}".`, ui.ButtonSet.OK);
}

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

function createThematicPrompt(keywords) {
  const keywordList = keywords.map(k => `- ${k}`).join('\n');
  return CONFIG.gemini.prompt.replace('%keywords%', keywordList);
}

function parseResponseTo2DArray(text) {
  const lines = text.trim().split('\n');
  const expectedLength = CONFIG.sheets.output.headers.length;
  const parsedData = [];

  lines.forEach(line => {
    const parts = line.split(' - ').map(part => part.trim());
    if (parts.length === expectedLength) {
      parsedData.push(parts);
    } else {
      Logger.log(`Skipping malformed line: "${line}" (found ${parts.length} parts, expected ${expectedLength})`);
    }
  });

  return parsedData;
}


function callGeminiAPI(prompt, apiKey) {
  const API_URL = `${CONFIG.gemini.apiUrl}${CONFIG.gemini.model}:generateContent?key=${apiKey}`;
  const maxRetries = CONFIG.gemini.maxRetries;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ]
      };

      const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      };

      const response = UrlFetchApp.fetch(API_URL, options);
      const responseCode = response.getResponseCode();
      const responseBody = response.getContentText();

      if (responseCode === 200) {
        const jsonResponse = JSON.parse(responseBody);
        const text = jsonResponse?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { success: true, text: text };
        } else {
            const error = "API response was successful but contained no text.";
            Logger.log(error);
            return { success: false, error: error };
        }
      } else {
        Logger.log(`Gemini API Error (${responseCode}): ${responseBody}`);
        try {
            const errorResponse = JSON.parse(responseBody);
            const message = errorResponse?.error?.message || "Unknown API error.";
            return { success: false, error: message };
        } catch(e) {
            return { success: false, error: "Could not parse API error response." };
        }
      }
    } catch (e) {
      Logger.log(`Gemini API Exception: ${e.toString()}`);
    }

    if (attempt < maxRetries) {
      Utilities.sleep(CONFIG.gemini.retryDelay); // Backoff before retrying
    }
  }

  return { success: false, error: `Request failed after ${maxRetries} attempts.` };
}

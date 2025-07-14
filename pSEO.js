/**
 * @OnlyCurrentDoc
 */

// Paste your Gemini API key here
const GEMINI_API_KEY = "YOUR GEMINI API KEY";

// Use Flash model for better quota handling
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + GEMINI_API_KEY;

// -----------------------------------------------------------------------------
// CUSTOM MENU
// -----------------------------------------------------------------------------

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('pSEO Generator')
    .addItem('🚀 Generate Thematic Ideas', 'generateThematicIdeas')
    .addToUi();
}

// -----------------------------------------------------------------------------
// MAIN FUNCTION
// -----------------------------------------------------------------------------

function generateThematicIdeas() {
  const ui = SpreadsheetApp.getUi();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const keywordSheet = spreadsheet.getSheetByName("Keywords");

  if (!keywordSheet) {
    ui.alert("Error: Sheet named 'Keywords' not found. Please create one with keywords in Column A.");
    return;
  }

  const lastRow = keywordSheet.getLastRow();
  if (lastRow < 2) {
    ui.alert("No keywords found in column A of the 'Keywords' sheet.");
    return;
  }

  const keywords = keywordSheet.getRange("A2:A" + lastRow).getValues().flat().filter(String);
  if (keywords.length === 0) {
    ui.alert("No valid keywords found.");
    return;
  }

  if (keywords.length > 150) {
    ui.alert(`⚠️ Too many keywords (${keywords.length}). Please limit input to 150 keywords for best results.`);
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
  const responseText = callGeminiAPI(prompt);

  if (!responseText) {
    ui.alert("❌ AI response failed or quota exceeded. Check your API key, quota, or try again later.");
    spreadsheet.toast("❌ Failed");
    return;
  }

  const ideas = parseResponseTo2DArray(responseText);
  if (ideas.length === 0) {
    ui.alert("⚠️ AI returned an empty or incorrectly formatted response.");
    return;
  }

  // Write to a new or existing sheet
  let outputSheet = spreadsheet.getSheetByName("pSEO Ideas");
  if (outputSheet) {
    outputSheet.clear();
  } else {
    outputSheet = spreadsheet.insertSheet("pSEO Ideas");
  }

  const headers = ["Pattern", "Opportunity", "Intent", "Funnel", "Variables"];
  outputSheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  outputSheet.getRange(2, 1, ideas.length, headers.length).setValues(ideas);
  outputSheet.autoResizeColumns(1, headers.length);
  outputSheet.activate();

  spreadsheet.toast(`✅ ${ideas.length} ideas generated.`, "Success", 5);
  ui.alert("Success", `${ideas.length} thematic pSEO ideas generated in "pSEO Ideas".`, ui.ButtonSet.OK);
}

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

function createThematicPrompt(keywords) {
  const keywordList = keywords.map(k => `- ${k}`).join('\n');
  return `You are a top-tier programmatic SEO strategist with deep expertise in content scalability, SERP domination, and user-intent alignment. Your task is to generate a highly scalable and diverse list of programmatic SEO content ideas rooted in a given cluster of related keywords.

Start by analyzing the keyword list below to identify the core topic, search intent, and entity relationships:
${keywordList}

Using that understanding, produce a comprehensive list of content opportunities optimized for organic growth and aligned with best-in-class SEO and content marketing strategies.

Each idea must follow this structure and be formatted in one line, separated by “ - “:

Pattern - Opportunity - Intent - Funnel - Variables

Where:
	•	Pattern = A scalable content format (e.g., Comparison, Alternatives, Persona, Use Case, Industry, Individuals, Teams, Tools, Templates, Landing Page, Guides, Checklist, Benefit-Focused, Feature Explainer, Generator, Feature Update).
	•	Opportunity = A scalable content title template using [bracketed] variables (e.g., [Tool] vs [Tool], Best [Product] for [Persona], How to [Goal] in [Industry]).
	•	Intent = Choose from: Informational, Navigational, Transactional, or Commercial.
	•	Funnel = Map to the appropriate stage: TOFU (Top), MOFU (Middle), or BOFU (Bottom).
	•	Variables = List the [bracketed] dynamic elements used in the title.

🚫 Do not include any explanations, headings, intros, or conclusions.
✅ Just return the raw list of formatted content ideas — one per line — optimized for programmatic execution at scale. need atleast 100 ideas of raw list of formatted content ideas — one per line`;
}

function parseResponseTo2DArray(text) {
  return text.trim().split('\n')
    .map(line => line.split(' - ').map(part => part.trim()))
    .filter(parts => parts.length === 5);
}

function callGeminiAPI(prompt, maxRetries = 2) {
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
        if (text) return text;
      } else {
        Logger.log(`Gemini API Error (${responseCode}): ${responseBody}`);
      }
    } catch (e) {
      Logger.log(`Gemini API Exception: ${e.toString()}`);
    }

    if (attempt < maxRetries) {
      Utilities.sleep(2000); // Backoff before retrying
    }
  }

  return null;
}

# Cohesity_Trainer

Open `index.html` in a browser to use the Cohesity Certified Architect Expert practice exam page. The app is fully self-contained in this single file (including the built-in question bank).

## Features
- Generate a 50-question built-in multiple-choice practice exam from the local question bank.
- Optional timer in minutes with automatic submission on expiration.
- Supports both single-answer and multi-select questions with strict set-match scoring for multi-select.
- Multi-select questions use "Select all that apply" style instructions with constrained patterns (see below).
- Reveal or hide answers during practice and review your selected answer(s), correct answer(s), explanations, and citations after submission.
- Domain filters for architecture, discovery and design, security, integrations, and troubleshooting.
- Built-in question bank contains **200** Cohesity Architect Expert-focused questions with plausible Cohesity-adjacent distractors (not joke/obvious wrong answers).
- About 10% of the built-in bank focuses on implementation-detail topics such as SpanFS/filesystem behavior, services/components, CLI/UI/Siren health checks, and troubleshooting/capacity/performance signals.
- Provide an OpenAI API key to request 70 AI questions client-side; the app validates them and displays a 50-question AI/fallback exam that **replaces** the current exam.
- AI generation is tuned for Cohesity product-specific Architect Expert scope, with technical scenario questions and plausible Cohesity-adjacent distractors instead of absurd wrong answers.
- Answer choices are randomized whenever exams are generated or saved sets are loaded, and correct-answer index metadata is remapped automatically.
- AI-generated question sets are saved to browser local storage and appear in the history dropdown labelled **AI generated**.
- Optional **Steer AI question generation** text box lets you guide emphasis (for example: more installation questions, design-focused questions, or ~40% Nutanix backup coverage) while preserving exam scope, schema, quality, and safety rules.
- Optional **Guide-grounded generation** mode uses `cohesity-user-guide-knowledge.json` as source material for more accurate, harder questions grounded in the official Cohesity documentation.
- Each question card includes an **Explain correct answer with LLM** button for inline study assistance (available after revealing or submitting).
- Right-side ad hoc LLM lookup box for quick study questions using the same API key/model settings.
- All generated exam sets are saved to browser local storage and appear in the history dropdown.
- OpenAI API key and selected model are remembered in local storage for convenience.
- Export your configuration (model, domains, timer, history metadata, and full saved question sets including AI-generated ones) to a JSON file for backup or sharing.
- Import a previously exported configuration file to restore AI-generated question sets into browser history so they appear in the saved-set dropdown immediately.
- Question bank & memory stats panel shows built-in bank count, current exam info, and saved history totals.

### AI exam generation
- Click **Generate AI exam (70→50)** to request 70 fresh questions from OpenAI.
- Use **Steer AI question generation** (optional) to add extra guidance such as:
  - `More questions on installation`
  - `Make the questions more design focused`
  - `Make 40% of the questions about Nutanix backup`
- The app validates each returned question individually, skips invalid entries, and reports returned/valid/skipped/displayed counts in status text.
- After validation, each AI question's choices are shuffled post-receipt to avoid fixed correct-answer positions from model output ordering.
- The AI prompt explicitly targets Cohesity product-level technical detail, architectural decision-making, supported workflow differences, troubleshooting/gap-analysis reasoning, and scenario-based design questions.
- Steering guidance is applied only when it stays compatible with Cohesity Architect Expert scope.
- Steering cannot override JSON/schema/output-count requirements, distractor and multi-select rules, the ~10% implementation-detail requirement, official-doc citation preference, or prompt-injection/safety constraints.
- The AI prompt also requires plausible Cohesity-adjacent distractors that are wrong for a clear reason (scope, workflow stage, deployment model, feature purpose, or design implication), rather than silly or unrelated answers.
- Approximately 10% of the 70 requested questions (roughly 7) are technical implementation-detail questions. These cover topics such as SpanFS/filesystem behaviour, UI/Siren health-check workflows, Cohesity services/components (for example iris, magneto, bridge), their purpose, important states/values, and troubleshooting or capacity/performance signals. Official Cohesity documentation is used as the source where available, and questions remain architect-relevant rather than raw command trivia.
- Generated questions with obviously silly distractor terms (for example `cafeteria`, `rack screw`, `coffee`, or `printer toner`) are rejected during validation while maintaining partial-generation fallback behavior.
- When at least 50 valid AI questions are available, the app loads the first 50 valid AI questions as the current exam.
- When fewer than 50 valid AI questions are available:
  - If a current exam exists, the app replaces the first `N` current questions with the `N` valid AI questions and keeps the rest.
  - If no current exam exists, the app uses the `N` valid AI questions and tops up from the built-in bank where possible.
- The generated set **replaces** the current exam — it does not append to it. The previous exam is lost unless it was already saved as a history set.
- Answers, reveals, submission state, and timer are all reset when the new exam loads.
- The generated set is immediately saved to browser local storage with source label **AI generated**.
- Saved sets retain the shuffled choices and remapped correct-answer index metadata for that generated set.
- It appears at the top of the saved-set dropdown so you can reload it at any time.
- If local storage fails, the exam still loads into the current pane and a warning is shown.
- **The built-in question bank is not modified by AI generation.** AI questions live only in the current session and browser local storage.
- AI-generated content is still study assistance: review exam-critical facts against official Cohesity documentation before relying on them.

### Guide-grounded AI generation

When `cohesity-user-guide-knowledge.json` is present in the same directory as `index.html`, you can enable **guide-grounded generation** to produce more accurate, harder questions grounded in the official Cohesity User Guide 7.4.

#### Enabling guide-grounded mode

1. Enter your OpenAI API key in the right panel.
2. Tick **Use Cohesity User Guide knowledge** in the **Guide-grounded generation** section (below the steering box).
3. Status text will update:
   - `Loading guide knowledge…` — the app is fetching the JSON file.
   - `Loaded Cohesity User Guide knowledge: 1850 chunks, 4970 pages.` — ready to use.
4. Optionally enter steering guidance in the **Steering guidance** box.
5. Click **Generate AI exam (70→50)**.

The status bar will confirm guide grounding during and after generation, for example:  
`Requesting 70 guide-grounded AI questions from OpenAI using 12 Cohesity User Guide chunks...`  
`Generated using Cohesity User Guide grounding from 12 chunks.`

Guide-grounding metadata is saved in the AI history entry so you can tell which sets were generated with guide grounding.

#### How chunk retrieval works

When guide mode is enabled and generation is triggered, the app:

1. Scores all 1850 chunks using a deterministic lexical algorithm based on:
   - Selected exam domains mapped to guide topic tags (e.g. DataProtect → `dataprotect`, `vmware`, `nutanix`).
   - Steering text keywords matched against chunk `topics`, `keywords`, `headingPath`, and a preview of `text`.
   - `questionTargets` (design, architecture, implementation-detail, troubleshooting, etc.) boosted when they overlap with common exam targets.
   - Signals (`hasProcedure`, `hasCommand`, `hasLimitsOrValues`, `hasWarningsOrNotes`) boosted for detail-rich chunks.
2. Selects the top-scoring chunks, capped at **12 chunks** and **~30,000 characters** of guide text to keep the OpenAI request manageable.
3. Formats the selected chunks as a clearly delimited `<guide_context>` block within the prompt.

The guide JSON (~12.5 MB) is loaded **once on demand** and cached in memory for the session. It is not re-parsed on every generation or keystroke.

#### Fetch failure and manual file-picker fallback

If the app is opened from a `file://` URL directly, browsers typically block `fetch()` requests to local files. When this happens, status text will explain the issue and a **Load JSON file manually** button will appear. Click it, select `cohesity-user-guide-knowledge.json` from your local drive, and the app will parse and cache the file in the browser.

To avoid the fetch issue, serve the app from a static server or GitHub Pages instead.

#### Combining steering text with guide grounding

Steering text and guide grounding work together:

- Steering terms are used **both** to retrieve relevant chunks and to guide the LLM's emphasis.
- For example, `Make 40% of the questions about Nutanix backup` will retrieve guide chunks tagged with `nutanix` and `dataprotect` and also tell the LLM to emphasize that topic.
- Guide and exam rules always take priority over steering guidance if there is a conflict.

#### What the app sends to OpenAI

Only the **selected relevant guide excerpts** (capped ~30,000 characters) are sent to OpenAI, not the full 12.5 MB file. The app does not upload any local files to any server; all chunk selection happens in the browser.

### Architect Expert product/topic scope emphasis
- AI generation and the built-in bank are tuned toward the following Cohesity Architect Expert scope areas:
  - Aligning Cohesity technical solutions with business problems and identifying protection-strategy gaps
  - Cohesity Data Cloud, the Cohesity platform, SpanFS, and Cohesity branded/OEM hardware plus VE, CE, and NGCE options
  - Cluster networking, cloud integration, hybrid/multi-cloud architecture, and the Cohesity Web Sizing Tool
  - Cohesity DataProtect, Cloud Services, SmartFiles, backup-target use cases, Replication, CloudArchive, and CloudTier
  - Organizations, Helios SaaS and Self-Managed patterns, and the Cohesity API for automation
  - Security hardening with MFA, SSO, RBAC, and DataLock
  - Cyber resiliency, FortKnox cyber vaulting, anomaly detection, threat hunting/scanning/detection, data classification, and third-party security integrations
  - Gap analysis, capacity/performance trend review, and using the UI or Siren for health checks and troubleshooting

### Per-question LLM explanation
- Each question card has an **Explain correct answer with LLM** button inside the answer panel.
- The button is available after the answer is revealed (per-question reveal or Show all answers) or after the exam is submitted.
- If clicked before revealing, the button shows: `Reveal the answer first to request LLM details.`
- When clicked after reveal/submit, the button uses the current API key and model to send the question, choices, correct answer(s), explanation, and citation to the LLM.
- The LLM is instructed to provide a brief overview with references where possible, and to state uncertainty clearly rather than inventing Cohesity facts.
- The response renders inline under the question.
- Missing API key, request errors, and empty responses are handled with clear messages.

### OpenAI model selector
- A dropdown lists curated model options including `gpt-4.1-mini` (default), `gpt-4.1`, `gpt-4o-mini`, `gpt-4o`, and frontier models (`gpt-5.4-nano`, `gpt-5.4-mini`, `gpt-5.4`, `gpt-5.5`).
- Click **Refresh available models from API key** after entering your API key to replace the curated list with the models actually available on your key (filtered to chat-capable GPT models). If the refresh fails, the curated defaults are kept and an error message is shown.
- The selected model is used when clicking **Generate AI exam (70→50)**.
- The same selected model is also used by the ad hoc **Ask LLM** lookup panel and per-question LLM explanations.
- AI-generated batches can include a mix of single-answer and multi-select scenario questions.

### Ad hoc LLM lookup (study assist)
- The right pane includes an **Ad hoc LLM lookup** text area and **Ask LLM** button for quick conceptual lookups while studying.
- On larger screens, the right-side OpenAI/ad hoc pane stays sticky while you scroll so lookup remains available near the bottom of long exams.
- It uses the same browser-side OpenAI API key + selected model as question generation.
- Missing key, invalid key, empty prompt, request failures, and empty model responses show clear inline errors.
- Lookup responses are for study assistance and should be verified against official Cohesity documentation for exam-critical facts.

### Exam history (local storage)
- Every successful generated/replacement set is saved to browser local storage automatically.
- AI-generated sets are saved immediately after successful generation with source label **AI generated**.
- A dropdown above the question list shows saved sets labelled by date/time, source (Built-in or AI generated), and model (if AI generated).
- Select any saved set and click **Load selected set** to reload those questions. Loading a saved set resets all current answer selections.
- Loading a saved set intentionally creates a fresh shuffle each time and remaps correct-answer indexes so answer positions remain randomized on every load (this helps prevent memorizing fixed option positions).
- Up to the **25 most recent** sets are kept. Older sets are automatically pruned.
- Click **Clear all history** to remove all saved sets from local storage.
- If local storage is unavailable (e.g. private browsing mode or quota exceeded), a warning is shown and history falls back to in-session only.
- Saved AI history metadata includes model, selected domains, final count, AI-generated count, built-in fallback count, retained current-exam count (when applicable), skipped invalid generated count, returned generated count, and the steering guidance used for that generation when provided.

### Question bank & memory stats
- The stats panel shows:
  - Built-in question bank count
  - Current exam question count and source
  - Total saved history sets and questions
  - Number of saved AI-generated sets
  - Latest AI-generated set date and model
- This panel helps clarify the difference between the fixed built-in bank, the current exam, and browser-saved AI sets.

### API key and model memory
- Your OpenAI API key and selected model are saved in browser local storage so they persist across page reloads.
- The optional AI generation steering text is also saved in browser local storage for reuse after refresh.
- ⚠️ **Security warning:** Storing your API key in local storage is convenient but less secure on shared or public machines. Anyone with access to DevTools on the same machine/browser profile can read it. Use the **Forget saved API key** button to remove it when done, especially on shared devices.
- The **Forget saved API key** button clears the key from local storage and from the input field immediately.
- API keys are **sanitized before use and before saving**: leading/trailing whitespace, wrapping quotes, hidden zero-width characters, and internal newlines are stripped automatically. The sanitized value is saved back to local storage.
- If a saved key contains characters outside the HTTP header-safe ASCII range (e.g. hidden Unicode), it is rejected on page load with a warning and cleared from local storage automatically.
- No real API key is ever hard-coded in the source.

### Export configuration
- Click **Export configuration** to download a `.json` file containing:
  - Selected model
  - Current AI generation steering text (`generationSteeringPrompt`)
  - Selected domains
  - Timer setting
  - Metadata for all saved history entries (id, date, source, model, question count, plus AI/fallback generation details and steering metadata when available)
  - Full question data for all saved sets including AI-generated ones (`savedQuestionSets` field)
  - Schema version and export timestamp
- **The API key is intentionally excluded** from the export file for security. Re-enter it manually after loading the config on another machine.
- The exported file includes all AI-generated question sets with full question data so it can be shared with other users who can then import it.

### Import configuration
- Click **Import configuration** and select a `.json` file previously exported by this app.
- The import reads the file entirely in the browser — no data is sent to any server.
- **API keys are never imported**, even if an exported file somehow contained one.
- Import restores saved question sets/history data; it does not overwrite your current in-page steering text.
- Valid saved question sets from the file are merged into your existing browser history. Existing sets are not erased.
- Duplicate sets (matched by their unique `id`) are skipped automatically to prevent double-importing.
- Malformed question sets are skipped with a warning; the rest of the import continues.
- After import, the saved-set dropdown and stats panel refresh immediately.
- Imported AI-generated sets appear in the dropdown labelled **AI generated** and can be loaded, scored, and reviewed exactly like locally generated sets.
- A clear success or error message is shown in the exam status bar after the import completes.
- If local storage fails during import, the sets are still available for the current session and a warning is shown.

### Multi-select "Select all that apply" questions
- Questions with multiple correct answers are labelled **"Select all that apply (N of M)."** in the UI, for example:
  - `Select all that apply (2 of 4).` — 2 correct answers out of 4 choices
  - `Select all that apply (3 of 5).` — 3 correct answers out of 5 choices
- **Only two patterns are supported:** 2-of-4 and 3-of-5. This constraint applies to both built-in questions and AI-generated questions.
- **Multi-select questions are capped at 10 per 50-question exam.** Each generated set contains at most 10 multi-select questions; the remaining at least 40 are single-answer questions. This mirrors the balance found in typical Cohesity certification practice exams.
- Scoring is **strict**: a multi-select question is correct only when the selected set exactly matches the correct answer set.
- Checkboxes are used for multi-select questions; radio buttons for single-answer questions.
- The app enforces the maximum selection count: once you have selected the required number of answers you cannot add more.
- AI generation prompts are restricted to these patterns and request no more than 14 multi-select questions out of 70 so the displayed 50-question exam can stay near the 10-question cap.
- While selecting displayed questions, the app skips excess AI multi-select questions after 10 when enough single-answer AI questions are available; if pool constraints force more multi-select questions, a warning is shown.
- If domain filtering limits the available single-answer pool, the app maintains the ≤10 multi-select cap whenever possible. A status message is shown if the filtered pool makes this impossible (e.g. a domain with only multi-select questions).

## Notes
- Built-in questions prefer unique selection. If active filters leave fewer than 50 matching questions, the page repeats questions as needed to reach 50.
- Official Cohesity documentation, developer, or product citations are included where practical. Otherwise the citation is labeled `Cohesity certification overview / study topic`.
- Browser-side API use exposes the key to the page context, so avoid shared/public machines or use **Forget saved API key** when done.
- Frontier model IDs (`gpt-5.x`) reflect current OpenAI naming at time of writing. Use the **Refresh available models** button to load the exact IDs available on your key.
- Per-question LLM explanations and ad hoc lookups are study assistance tools. Always verify exam-critical facts against official Cohesity documentation.

## Cohesity User Guide parser

The repository includes `74_UserGuide_extracted.md`, a full extraction of the
Cohesity User Guide 7.4 (PDF pages 1–4970, ~8 MB of markdown). The parser
reads this file and produces a structured JSON knowledge base (page/heading-aware
chunks with topic tags, keywords, question targets, and difficulty signals) suitable
for later guide-grounded LLM question generation in `index.html`.

### ✅ Recommended: browser parser (no Node.js required)

`tools/parse-user-guide.html` is a fully self-contained browser tool. No Node.js,
npm, terminal, or local server is required.

**Steps:**

1. Open `tools/parse-user-guide.html` directly in any modern browser
   (double-click the file or use `File → Open` in Chrome/Edge/Firefox).
2. Click **Choose file** (or drag and drop) and select `74_UserGuide_extracted.md`.
3. Adjust options if desired:
   - **Output filename** — default `cohesity-user-guide-knowledge.json`
   - **Max chunk chars** — default `6000`
   - **Overlap chars** — default `600`
   - **Pretty-print JSON** — checked by default (uncheck for a smaller file)
   - **Include inverted keyword index** — optional, increases file size
4. Click **Parse & Generate JSON**.
5. Watch the status log for progress. Summary statistics appear when complete.
6. Click **Download JSON** to save `cohesity-user-guide-knowledge.json` locally.
7. Upload or commit the generated JSON file to the repository when ready.

The file is read and processed entirely in your browser — nothing is uploaded to
any server. The output is typically **14–20 MB** (pretty) or **~14 MB** (minified).
If the output exceeds ~50 MB the page will show a size warning.

### Alternative: Node.js parser (advanced / automation)

If you have Node.js 18 or later available, `scripts/parse-user-guide.js` provides
additional options (JSONL output, custom paths) and can be used in automated pipelines.
No external npm dependencies are required — only Node built-ins.

Run from the **repository root**:

```bash
# Default settings (6000-char chunks, 600-char overlap, pretty JSON output)
node scripts/parse-user-guide.js

# Compact output (smaller file, useful for production embedding)
node scripts/parse-user-guide.js --minify

# Custom chunk size and overlap
node scripts/parse-user-guide.js \
  --input 74_UserGuide_extracted.md \
  --output data/cohesity-user-guide-knowledge.json \
  --max-chunk-chars 6000 \
  --overlap-chars 600

# Include a full inverted index in the output (increases file size)
node scripts/parse-user-guide.js --index

# Write one JSON object per line (JSONL format)
node scripts/parse-user-guide.js --jsonl --output data/cohesity-user-guide-knowledge.jsonl
```

| Option | Default | Description |
|---|---|---|
| `--input <path>` | `74_UserGuide_extracted.md` | Input markdown file |
| `--output <path>` | `data/cohesity-user-guide-knowledge.json` | Output file |
| `--max-chunk-chars N` | `6000` | Maximum characters per chunk |
| `--overlap-chars N` | `600` | Overlap between consecutive chunks |
| `--minify` | off | Write compact JSON (no indentation) |
| `--index` | off | Include full `invertedIndex` in output |
| `--jsonl` | off | Write JSONL (one JSON object per line) |

### Output structure

Both parsers produce the same JSON shape:

```json
{
  "schemaVersion": 1,
  "source": { "file": "74_UserGuide_extracted.md", "title": "Cohesity User Guide", "version": "7.4", "pdfPages": 4970 },
  "generatedAt": "...",
  "chunking": { "strategy": "browser-page-and-heading-aware", "maxChunkChars": 6000, "overlapChars": 600 },
  "stats": { "chunks": 1850, "characters": 9307961, "pagesDetected": 4970, "keywords": 432, "topics": {} },
  "toc": [ { "title": "Chapter 4: Cluster Administration", "page": 227, "level": 1 } ],
  "chunks": [
    {
      "id": "ug-000001",
      "title": "Chapter 4: Cluster Administration / Cohesity Cluster Services",
      "chapter": "Chapter 4: Cluster Administration",
      "headingPath": ["Chapter 4: Cluster Administration", "Cohesity Cluster Services"],
      "pageStart": 254,
      "pageEnd": 256,
      "lineStart": 12345,
      "lineEnd": 12480,
      "text": "...full chunk text...",
      "keywords": ["cluster", "services", "health check"],
      "topics": ["cluster-administration", "services", "implementation-detail"],
      "questionTargets": ["implementation-detail", "troubleshooting"],
      "difficultySignals": ["has-procedure", "has-command"],
      "signals": {
        "hasProcedure": true,
        "hasTable": false,
        "hasCommand": true,
        "hasLimitsOrValues": false,
        "hasWarningsOrNotes": false
      }
    }
  ]
}
```

### Note on file size and `.gitignore`

The generated output file is **intentionally excluded from the repository** by
`.gitignore` (see the `data/` entries). This keeps the repository small since the
file can be regenerated at any time.

To commit the generated output when you are ready to upload it:

```bash
# Option A: force-add a single file
git add -f data/cohesity-user-guide-knowledge.json

# Option B: remove the ignore rule from .gitignore first
```

### How the output is used by `index.html` and LLM generation

`cohesity-user-guide-knowledge.json` is already integrated into `index.html` via the **Guide-grounded generation** feature. See [Guide-grounded AI generation](#guide-grounded-ai-generation) above for full details.

In brief, the app:

1. **Loads the file** on demand via `fetch('cohesity-user-guide-knowledge.json')` (or the manual file picker fallback) and caches it in memory.
2. **Selects relevant chunks** using a deterministic lexical scoring algorithm based on the user's steering guidance and selected exam domains, matching on `topics`, `keywords`, `headingPath`, and `questionTargets`.
3. **Sends only the selected chunk texts** (~30,000 characters) to OpenAI alongside the existing exam prompt, grounding every generated question in the official user guide.
4. **Uses `questionTargets`** (`architecture`, `design`, `implementation-detail`, `troubleshooting`, `security`, `operations`, `workload-protection`) to steer the mix of question types.
5. **Uses `signals`** to prefer chunks that are rich in testable detail (procedures, commands, limits, warnings).

This enables steering prompts like:
- `More questions on installation` → retrieve chunks with `topics: ["implementation-detail"]`
- `Make the questions more design focused` → retrieve chunks with `questionTargets: ["design", "architecture"]`
- `Make 40% of the questions about Nutanix backup` → retrieve chunks with `topics: ["nutanix", "dataprotect"]`

## Troubleshooting

### Built-in generation does nothing
- Open **DevTools → Console** (F12) and reload the page. Look for any error messages or the startup health status.
- If the status bar at the bottom of the controls panel shows a `⚠️ App health issue(s)` message, follow the instructions there.
- The status bar should show the number of loaded built-in questions (e.g. `Ready with 200 built-in questions`). If it shows 0, the question bank failed to load — check the console for validation errors.

### OpenAI generation reports a fetch header ISO-8859-1 error
- This error means the API key stored or pasted contains a hidden character (newline, zero-width space, curly quote, or similar) that HTTP headers do not allow.
- **Fix:** Click **Forget saved API key**, then paste only the raw key from the OpenAI dashboard — no surrounding quotes, no leading/trailing spaces or newlines.
- The app now sanitizes API keys automatically: whitespace, quotes, and invisible Unicode characters are stripped before the key is used in any fetch request. If the sanitized key still contains unsupported characters, you will see a clear error message instead of the browser-level ISO-8859-1 exception.
- If the problem persists, clear site data for the page in DevTools (Application → Storage → Clear site data) and re-enter the key.

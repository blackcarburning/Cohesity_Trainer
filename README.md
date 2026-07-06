# Cohesity_Trainer

Open `index.html` in a browser to use the Cohesity Certified Architect Expert practice exam page. The app is fully self-contained in this single file (including the built-in question bank).

## Features
- Generate a 50-question built-in multiple-choice practice exam from the local question bank.
- Optional timer in minutes with automatic submission on expiration.
- Supports both single-answer and multi-select questions with strict set-match scoring for multi-select.
- Multi-select questions use "Select all that apply" style instructions with constrained patterns (see below).
- Reveal or hide answers during practice and review your selected answer(s), correct answer(s), explanations, and citations after submission.
- Domain filters for architecture, discovery and design, security, integrations, and troubleshooting.
- Built-in question bank uses plausible distractors (true Cohesity facts out of context) and distributes the correct answer evenly across all four positions.
- Provide an OpenAI API key to request 70 AI questions client-side; the app validates them and displays a 50-question AI/fallback exam that **replaces** the current exam.
- AI generation is tuned for Cohesity product-specific Architect Expert scope, with technical scenario questions and plausible Cohesity-adjacent distractors instead of absurd wrong answers.
- AI-generated question sets are saved to browser local storage and appear in the history dropdown labelled **AI generated**.
- Each question card includes an **Explain correct answer with LLM** button for inline study assistance (available after revealing or submitting).
- Right-side ad hoc LLM lookup box for quick study questions using the same API key/model settings.
- All generated exam sets are saved to browser local storage and appear in the history dropdown.
- OpenAI API key and selected model are remembered in local storage for convenience.
- Export your configuration (model, domains, timer, history metadata, and full saved question sets including AI-generated ones) to a JSON file.
- Question bank & memory stats panel shows built-in bank count, current exam info, and saved history totals.

### AI exam generation
- Click **Generate AI exam (70→50)** to request 70 fresh questions from OpenAI.
- The app validates each returned question individually, skips invalid entries, and reports returned/valid/skipped/displayed counts in status text.
- The AI prompt explicitly targets Cohesity product-level technical detail, architectural decision-making, supported workflow differences, troubleshooting/gap-analysis reasoning, and scenario-based design questions.
- The AI prompt also requires plausible Cohesity-adjacent distractors that are wrong for a clear reason (scope, workflow stage, deployment model, feature purpose, or design implication), rather than silly or unrelated answers.
- Generated questions with obviously silly distractor terms (for example `cafeteria`, `rack screw`, `coffee`, or `printer toner`) are rejected during validation while maintaining partial-generation fallback behavior.
- When at least 50 valid AI questions are available, the app loads the first 50 valid AI questions as the current exam.
- When fewer than 50 valid AI questions are available:
  - If a current exam exists, the app replaces the first `N` current questions with the `N` valid AI questions and keeps the rest.
  - If no current exam exists, the app uses the `N` valid AI questions and tops up from the built-in bank where possible.
- The generated set **replaces** the current exam — it does not append to it. The previous exam is lost unless it was already saved as a history set.
- Answers, reveals, submission state, and timer are all reset when the new exam loads.
- The generated set is immediately saved to browser local storage with source label **AI generated**.
- It appears at the top of the saved-set dropdown so you can reload it at any time.
- If local storage fails, the exam still loads into the current pane and a warning is shown.
- **The built-in question bank is not modified by AI generation.** AI questions live only in the current session and browser local storage.
- AI-generated content is still study assistance: review exam-critical facts against official Cohesity documentation before relying on them.

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
- It uses the same browser-side OpenAI API key + selected model as question generation.
- Missing key, invalid key, empty prompt, request failures, and empty model responses show clear inline errors.
- Lookup responses are for study assistance and should be verified against official Cohesity documentation for exam-critical facts.

### Exam history (local storage)
- Every successful generated/replacement set is saved to browser local storage automatically.
- AI-generated sets are saved immediately after successful generation with source label **AI generated**.
- A dropdown above the question list shows saved sets labelled by date/time, source (Built-in or AI generated), and model (if AI generated).
- Select any saved set and click **Load selected set** to reload those questions. Loading a saved set resets all current answer selections.
- Up to the **25 most recent** sets are kept. Older sets are automatically pruned.
- Click **Clear all history** to remove all saved sets from local storage.
- If local storage is unavailable (e.g. private browsing mode or quota exceeded), a warning is shown and history falls back to in-session only.
- Saved AI history metadata includes model, selected domains, final count, AI-generated count, built-in fallback count, retained current-exam count (when applicable), skipped invalid generated count, and returned generated count.

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
- ⚠️ **Security warning:** Storing your API key in local storage is convenient but less secure on shared or public machines. Anyone with access to DevTools on the same machine/browser profile can read it. Use the **Forget saved API key** button to remove it when done, especially on shared devices.
- The **Forget saved API key** button clears the key from local storage and from the input field immediately.
- API keys are **sanitized before use and before saving**: leading/trailing whitespace, wrapping quotes, hidden zero-width characters, and internal newlines are stripped automatically. The sanitized value is saved back to local storage.
- If a saved key contains characters outside the HTTP header-safe ASCII range (e.g. hidden Unicode), it is rejected on page load with a warning and cleared from local storage automatically.
- No real API key is ever hard-coded in the source.

### Export configuration
- Click **Export configuration** to download a `.json` file containing:
  - Selected model
  - Selected domains
  - Timer setting
  - Metadata for all saved history entries (id, date, source, model, question count, plus AI/fallback generation details when available)
  - Full question data for all saved sets including AI-generated ones (`savedQuestionSets` field)
  - Schema version and export timestamp
- **The API key is intentionally excluded** from the export file for security. Re-enter it manually after loading the config on another machine.
- The exported file can be used as a reference to manually restore preferences on another machine. There is no import feature.

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

## Troubleshooting

### Built-in generation does nothing
- Open **DevTools → Console** (F12) and reload the page. Look for any error messages or the startup health status.
- If the status bar at the bottom of the controls panel shows a `⚠️ App health issue(s)` message, follow the instructions there.
- The status bar should show the number of loaded built-in questions (e.g. `Ready with 73 built-in questions`). If it shows 0, the question bank failed to load — check the console for validation errors.

### OpenAI generation reports a fetch header ISO-8859-1 error
- This error means the API key stored or pasted contains a hidden character (newline, zero-width space, curly quote, or similar) that HTTP headers do not allow.
- **Fix:** Click **Forget saved API key**, then paste only the raw key from the OpenAI dashboard — no surrounding quotes, no leading/trailing spaces or newlines.
- The app now sanitizes API keys automatically: whitespace, quotes, and invisible Unicode characters are stripped before the key is used in any fetch request. If the sanitized key still contains unsupported characters, you will see a clear error message instead of the browser-level ISO-8859-1 exception.
- If the problem persists, clear site data for the page in DevTools (Application → Storage → Clear site data) and re-enter the key.

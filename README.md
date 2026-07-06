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
- Provide an OpenAI API key to append 50 additional AI-generated questions client-side.
- All generated exam sets are saved to browser local storage and appear in the history dropdown.
- OpenAI API key and selected model are remembered in local storage for convenience.
- Export your configuration (model, domains, timer, history metadata) to a JSON file.

### OpenAI model selector
- A dropdown lists curated model options including `gpt-4.1-mini` (default), `gpt-4.1`, `gpt-4o-mini`, `gpt-4o`, and frontier models (`gpt-5.4-nano`, `gpt-5.4-mini`, `gpt-5.4`, `gpt-5.5`).
- Click **Refresh available models from API key** after entering your API key to replace the curated list with the models actually available on your key (filtered to chat-capable GPT models). If the refresh fails, the curated defaults are kept and an error message is shown.
- The selected model is used when clicking **Generate 50 more with OpenAI**.
- OpenAI-generated batches can include a mix of single-answer and multi-select scenario questions.

### Exam history (local storage)
- Every generated 50-question set is saved to browser local storage automatically.
- A dropdown above the question list shows saved sets labelled by date/time, source (Built-in or OpenAI), and model (if OpenAI).
- Select any saved set and click **Load selected set** to reload those questions. Loading a saved set resets all current answer selections.
- Up to the **25 most recent** sets are kept. Older sets are automatically pruned.
- Click **Clear all history** to remove all saved sets from local storage.
- If local storage is unavailable (e.g. private browsing mode or quota exceeded), a warning is shown and history falls back to in-session only.

### API key and model memory
- Your OpenAI API key and selected model are saved in browser local storage so they persist across page reloads.
- ⚠️ **Security warning:** Storing your API key in local storage is convenient but less secure on shared or public machines. Anyone with access to DevTools on the same machine/browser profile can read it. Use the **Forget saved API key** button to remove it when done, especially on shared devices.
- The **Forget saved API key** button clears the key from local storage and from the input field immediately.
- No real API key is ever hard-coded in the source.

### Export configuration
- Click **Export configuration** to download a `.json` file containing:
  - Selected model
  - Selected domains
  - Timer setting
  - Metadata for all saved history entries (id, date, source, model, question count)
  - Schema version and export timestamp
- **The API key is intentionally excluded** from the export file for security. Re-enter it manually after loading the config on another machine.
- The exported file can be used as a reference to manually restore preferences on another machine. There is no import feature.

### Multi-select "Select all that apply" questions
- Questions with multiple correct answers are labelled **"Select all that apply (N of M)."** in the UI, for example:
  - `Select all that apply (2 of 4).` — 2 correct answers out of 4 choices
  - `Select all that apply (3 of 5).` — 3 correct answers out of 5 choices
- **Only two patterns are supported:** 2-of-4 and 3-of-5. This constraint applies to both built-in questions and OpenAI-generated questions.
- **Multi-select questions are capped at 10 per 50-question exam.** Each generated set contains at most 10 multi-select questions; the remaining 40+ are single-answer questions. This mirrors the balance found in typical Cohesity certification practice exams.
- Scoring is **strict**: a multi-select question is correct only when the selected set exactly matches the correct answer set.
- Checkboxes are used for multi-select questions; radio buttons for single-answer questions.
- The app enforces the maximum selection count: once you have selected the required number of answers you cannot add more.
- OpenAI generation prompts are restricted to these patterns and the 10-question cap. Generated batches with more than 10 multi-select questions are rejected with an error so you can regenerate.
- If domain filtering limits the available single-answer pool, the app maintains the ≤10 multi-select cap whenever possible. A status message is shown if the filtered pool makes this impossible (e.g. a domain with only multi-select questions).

## Notes
- Built-in questions prefer unique selection. If active filters leave fewer than 50 matching questions, the page repeats questions as needed to reach 50.
- Official Cohesity documentation, developer, or product citations are included where practical. Otherwise the citation is labeled `Cohesity certification overview / study topic`.
- Browser-side API use exposes the key to the page context, so avoid shared/public machines or use **Forget saved API key** when done.
- Frontier model IDs (`gpt-5.x`) reflect current OpenAI naming at time of writing. Use the **Refresh available models** button to load the exact IDs available on your key.

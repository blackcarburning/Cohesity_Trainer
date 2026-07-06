# Cohesity_Trainer

Open `index.html` in a browser to use the Cohesity Certified Architect Expert practice exam page. The app is fully self-contained in this single file (including the built-in question bank).

## Features
- Generate a 50-question built-in multiple-choice practice exam from the local question bank.
- Optional timer in minutes with automatic submission on expiration.
- Reveal or hide answers during practice and review explanations/citations after submission.
- Domain filters for architecture, discovery and design, security, integrations, and troubleshooting.
- Built-in question bank uses plausible distractors (true Cohesity facts out of context) and distributes the correct answer evenly across all four positions.
- Provide an OpenAI API key in the browser to append 50 additional AI-generated questions client-side. The key is never stored by the page.

### OpenAI model selector
- A dropdown lists curated model options including `gpt-4.1-mini` (default), `gpt-4.1`, `gpt-4o-mini`, `gpt-4o`, and frontier models (`gpt-5.4-nano`, `gpt-5.4-mini`, `gpt-5.4`, `gpt-5.5`).
- Click **Refresh available models from API key** after entering your API key to replace the curated list with the models actually available on your key (filtered to chat-capable GPT models). If the refresh fails, the curated defaults are kept and an error message is shown.
- The selected model is used when clicking **Generate 50 more with OpenAI**.

## Notes
- Built-in questions prefer unique selection. If active filters leave fewer than 50 matching questions, the page repeats questions as needed to reach 50.
- Official Cohesity documentation, developer, or product citations are included where practical. Otherwise the citation is labeled `Cohesity certification overview / study topic`.
- Browser-side API use exposes the key to the page context, so avoid shared/public machines.
- Frontier model IDs (`gpt-5.x`) reflect current OpenAI naming at time of writing. Use the **Refresh available models** button to load the exact IDs available on your key.

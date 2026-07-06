# Cohesity_Trainer

Open `/home/runner/work/Cohesity_Trainer/Cohesity_Trainer/index.html` in a browser to use the Cohesity Certified Architect Expert practice exam page.

## Features
- Generate a 50-question built-in multiple-choice practice exam from the local question bank.
- Optional timer in minutes with automatic submission on expiration.
- Reveal or hide answers during practice and review explanations/citations after submission.
- Provide an OpenAI API key in the browser to append 50 additional questions client-side. The page does not store the key.
- Domain filters for architecture, discovery and design, security, integrations, and troubleshooting.

## Notes
- Built-in questions prefer unique selection. If active filters leave fewer than 50 matching questions, the page repeats questions as needed to reach 50.
- Official Cohesity documentation, developer, or product citations are included where practical. Otherwise the citation is labeled `Cohesity certification overview / study topic`.
- Browser-side API use exposes the key to the page context, so avoid shared/public machines.

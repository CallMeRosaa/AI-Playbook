# NEXT — follow-ons after the concept-redesign pass

This pass re-scoped the app into the IL2 front door per `MASTER-BUILD-BRIEF.md`:
front door home, AFSC-tiled play shelf, trimmed tools page, a static "How to use"
guide, and a local time-back tally. No model calls, no `app/api`, no Anthropic SDK.

## Important: content was authored, not imported
`AFSC-PLAYS-CONTENT.md` was **not present in the repo** when this was built. The plays
in `lib/plays.ts` were authored from the existing prompt library to match the card
structure in section 4 of the brief. Treat all play content as placeholder examples.

## SME-validation items
- AFSC codes and nicknames in `lib/plays.ts` (`AFSC_TILES`): 2W0X1 AMMO, 2A3X1 Crew
  Chief, 3P0X1 Defender, 3F0X1 Personnel, 6C0X1 Contracting.
- Every play's task framing, starter prompt, form/system references, approved-tool
  line, never-paste line, verify step, and time-back estimate.
- When the real `AFSC-PLAYS-CONTENT.md` arrives, replace the `PLAYS` array with its
  content (keep the `Play` shape and `renderStarter` helper).

## Real surface URLs (the four surfaces)
`lib/links.ts` holds the routing config. Three surfaces render as disabled "coming
soon" until they exist:
- `agent` — the GenAI.mil Agent (execution surface)
- `notebook` — the Playbook NotebookLM notebook (grounded Q and A)
- `pdf` — the signed Playbook PDF (doctrine)
When each is ready, set its `url` and flip `status` to `"live"`.

## Out of scope this pass (per brief section 10)
- The interview wizard (belongs to the GenAI.mil agent).
- Any live model call.
- Platform One packaging and IL hardening.
- A real AFSC database.
- Additional plays beyond the current set.

## Nice-to-haves
- Per-play time-back attribution (currently a single device-local total).
- A short legend on the play card explaining the safety bar and verify step.
- Replace remaining mock tool entries with a vetted, current tool list.

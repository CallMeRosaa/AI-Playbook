// ─── The four surfaces of the Airman's Playbook ───────────────────────────────
// One product, four surfaces: a signed PDF (doctrine), a GenAI.mil agent
// (execution), a NotebookLM notebook (grounded Q and A), and this app (the IL2
// front door). The app orients and routes — it does not run a model.
//
// The agent, notebook, and PDF do not exist yet. They are marked "pending" and
// render as disabled "coming soon" rather than dead links. Honesty over dead links.
// When a real URL exists, fill in `url` and flip `status` to "live".

export type SurfaceStatus = "live" | "pending";

export interface Surface {
  label: string;
  url: string;
  status: SurfaceStatus;
}

export const SURFACES: Record<"agent" | "notebook" | "pdf" | "genaimil", Surface> = {
  agent:    { label: "Run in the GenAI.mil Agent", url: "", status: "pending" },
  notebook: { label: "Ask the Playbook Notebook",  url: "", status: "pending" },
  pdf:      { label: "Open the Playbook PDF",       url: "", status: "pending" },
  genaimil: { label: "Open GenAI.mil",              url: "https://genai.mil", status: "live" },
};

// ─── SME contribution door ────────────────────────────────────────────────────
// Google Form where Airmen propose new plays. Created separately from this build.
// Fill in the live URL before deploy; while empty, the CTA renders as a disabled
// "coming soon" rather than a dead link.
export const SUGGEST_PLAY_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScr7E4hN_d1Sl31BnK1zFW5F3kwiT-rSfvODVpnbGEf5DZoKw/viewform";

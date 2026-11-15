// ---------- Types ----------

// Biomarker names match the backend exactly, so API data needs no translation.
type Biomarker = "non_hdl" | "hdl" | "hba1c" | "egfr" | "sbp";

// date is an ISO day string, e.g. "2026-11-07"
type SeriesPoint = { date: string; value: number };

// One biomarker's estimate. Mirrors the API's PredictionOut, plus the user's past labs.
type Forecast = {
  id: string; // the biomarker name works fine
  biomarker: Biomarker;
  unit: string; // from the API: "mg/dL", "%", "mL/min/1.73m2"
  asOf: string; // PredictionOut.as_of
  basis: "population" | "lab" | "population_wearable" | "lab_wearable";
  basisLabel: string; // PredictionOut.basis_label, e.g. "Based on your Nov 1 lab"
  p10: number; // bottom of the likely range for the next lab
  p50: number; // middle estimate
  p90: number; // top of the likely range
  labMeasuredAt: string | null; // PredictionOut.lab_measured_at (null = no lab yet)

  // PredictionOut.change: latest lab vs the previous one (only when the user has 2+ labs)
  change?: { percentChange: number; significant: boolean; previousMeasuredAt: string };
  history: SeriesPoint[]; // the user's past lab values, oldest first (empty = no labs yet)
  normalRange: { low: number; high: number }; // reference range (TODO: where does this come from?)

};



// Mirrors the backend's lab_prompt: when to ask the user for their next lab.
type LabPrompt = { dueOn: string; due: boolean };


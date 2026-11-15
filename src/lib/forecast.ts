// Helper functions for working with forecasts and risk results. 
// These are used in multiple places, so they live in a shared library rather than in a component.

// ---------- Dates ----------
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Biomarker names match the backend exactly, so API data needs no translation.
export type Biomarker = "non_hdl" | "hdl" | "hba1c" | "egfr" | "sbp";

// date is an ISO day string, e.g. "2026-11-07"
export type SeriesPoint = { date: string; value: number };

// One biomarker's estimate. Mirrors the API's PredictionOut, plus the user's past values.
export type Forecast = {
  id: string; // the biomarker name works fine
  biomarker: Biomarker;
  unit: string; // from the API: "mg/dL", "%", "mmHg", "mL/min/1.73m2"
  asOf: string; // PredictionOut.as_of
  basis: "population" | "lab" | "population_wearable" | "lab_wearable";
  basisLabel: string; // PredictionOut.basis_label, e.g. "Based on your Nov 1 lab"
  p10: number; // bottom of the likely range for the next result
  p50: number; // middle estimate
  p90: number; // top of the likely range
  labMeasuredAt: string | null; // PredictionOut.lab_measured_at (null = no lab yet)
  // PredictionOut.change: latest vs the previous one (only when the user has 2+ results)
  change?: { percentChange: number; significant: boolean; previousMeasuredAt: string };
  history: SeriesPoint[]; // the user's past values, oldest first (empty = none yet)
  normalRange: { low: number; high: number }; // reference range (TODO: where does this come from?)
};

// Mirrors the backend's lab_prompt: when to ask the user for their next lab.
export type LabPrompt = { dueOn: string; due: boolean };

// The risk types mirror the backend's RiskOut. The snake_case names are on purpose,
// so the API's JSON can be used as-is.
export type RiskOutcome = "total_cvd" | "ascvd" | "heart_failure";
export type RiskCategory = "low" | "borderline" | "intermediate" | "high";

export type RiskResult = {
  outcome: RiskOutcome;
  horizon_years: number; // 10 or 30
  risk_pct: number;
  risk_low: number;
  risk_high: number;
  category: RiskCategory | null;
};

export type InputUsed = { value: number; source: "measured" | "reported" | "predicted" };

export type RiskOut = {
  status: "generated" | "not_generated";
  risk_basis: "measured" | "mixed" | "estimated" | null;
  inputs_used: Record<string, InputUsed>;
  results: RiskResult[];
  missing_inputs: string[];
  reason: string | null;
  out_of_range: string[];
};

// ---------- Dates ----------
export const DAY = 86400000;

// "2026-11-07" -> milliseconds (local midnight)
export const toTime = (iso: string) => new Date(`${iso}T00:00:00`).getTime();

// "2026-11-07" -> "Nov 7"
export function formatShortDate(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

// "2026-11-07" -> "Nov 7, 2026"
export function formatLongDate(iso: string): string {
  const [y] = iso.split("-").map(Number);
  return `${formatShortDate(iso)}, ${y}`;
}

// ---------- Biomarker labels ----------
export const BIOMARKER_NAMES: Record<Biomarker, { full: string; short: string }> = {
  hba1c: { full: "Glycated Hemoglobin", short: "HbA1c" },
  non_hdl: { full: "Non-High Density Lipoprotein", short: "Non-HDL" },
  hdl: { full: "High Density Lipoprotein", short: "HDL" },
  egfr: { full: "Estimated Glomerular Filtration Rate", short: "eGFR" },
  sbp: { full: "Systolic Blood Pressure", short: "Systolic BP" },
};

// ---------- Range status ----------
// Where does the likely range for the next result sit against the reference range?
export type RangeStatus = "in" | "maybe" | "out";

export function rangeStatus(f: Forecast): RangeStatus {
  const { low, high } = f.normalRange;
  if (f.p10 >= low && f.p90 <= high) return "in";
  return f.p50 >= low && f.p50 <= high ? "maybe" : "out";
}

export const STATUS_LABEL: Record<RangeStatus, string> = {
  in: "In range",
  maybe: "Watch",
  out: "Outside",
};

// Big headline numbers are larger than anything in your fontsize scale.
export const HERO_SIZE = 36;
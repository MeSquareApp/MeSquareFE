import type { Forecast, LabPrompt, RiskOut } from "@/lib/forecast";

// MOCK DATA: replace with real API data later.
export const mockForecasts: Forecast[] = [
  {
    id: "hba1c", biomarker: "hba1c", unit: "%", asOf: "2026-11-15",
    basis: "lab", basisLabel: "Based on your Nov 1 lab", labMeasuredAt: "2026-11-01",
    p10: 5.2, p50: 5.4, p90: 5.7,
    normalRange: { low: 4.0, high: 5.6 },
    change: { percentChange: 3.8, significant: false, previousMeasuredAt: "2026-08-02" },
    history: [
      { date: "2026-02-03", value: 5.5 }, { date: "2026-05-09", value: 5.3 },
      { date: "2026-08-02", value: 5.2 }, { date: "2026-11-01", value: 5.4 },
    ],
  },
  {
    id: "non_hdl", biomarker: "non_hdl", unit: "mg/dL", asOf: "2026-11-15",
    basis: "lab", basisLabel: "Based on your Nov 1 lab", labMeasuredAt: "2026-11-01",
    p10: 104, p50: 118, p90: 134,
    normalRange: { low: 70, high: 130 },
    change: { percentChange: 3.5, significant: false, previousMeasuredAt: "2026-08-02" },
    history: [
      { date: "2026-02-03", value: 126 }, { date: "2026-05-09", value: 121 },
      { date: "2026-08-02", value: 114 }, { date: "2026-11-01", value: 118 },
    ],
  },
  {
    id: "hdl", biomarker: "hdl", unit: "mg/dL", asOf: "2026-11-15",
    basis: "lab", basisLabel: "Based on your Nov 1 lab", labMeasuredAt: "2026-11-01",
    p10: 46, p50: 52, p90: 59,
    normalRange: { low: 40, high: 100 },
    history: [
      { date: "2026-02-03", value: 50 }, { date: "2026-05-09", value: 54 },
      { date: "2026-08-02", value: 51 }, { date: "2026-11-01", value: 52 },
    ],
  },
  {
    id: "sbp", biomarker: "sbp", unit: "mmHg", asOf: "2026-11-15",
    basis: "lab", basisLabel: "Based on your Nov 1 reading", labMeasuredAt: "2026-11-01",
    p10: 112, p50: 124, p90: 138,
    normalRange: { low: 90, high: 120 },
    change: { percentChange: -2.4, significant: false, previousMeasuredAt: "2026-08-02" },
    history: [
      { date: "2026-02-03", value: 126 }, { date: "2026-05-09", value: 122 },
      { date: "2026-08-02", value: 127 }, { date: "2026-11-01", value: 124 },
    ],
  },
  {
    // no lab yet: a population estimate, so there is no history
    id: "egfr", biomarker: "egfr", unit: "mL/min/1.73m²", asOf: "2026-11-15",
    basis: "population", basisLabel: "Typical for your profile", labMeasuredAt: null,
    p10: 82, p50: 95, p90: 106,
    normalRange: { low: 90, high: 120 },
    history: [],
  },
];

// MOCK: 90 days after the latest lab, like the backend.
export const mockLabPrompt: LabPrompt = { dueOn: "2027-01-30", due: false };

// MOCK: every number below is made up. Shape = the backend's RiskOut.
export const mockRisk: RiskOut = {
  status: "generated",
  risk_basis: "mixed",
  inputs_used: {
    non_hdl: { value: 118, source: "measured" },
    hdl: { value: 52, source: "measured" },
    sbp: { value: 124, source: "predicted" },
    egfr: { value: 95, source: "predicted" },
  },
  results: [
    { outcome: "total_cvd", horizon_years: 10, risk_pct: 7.2, risk_low: 5.9, risk_high: 8.8, category: "borderline" },
    { outcome: "ascvd", horizon_years: 10, risk_pct: 4.1, risk_low: 3.2, risk_high: 5.2, category: "low" },
    { outcome: "heart_failure", horizon_years: 10, risk_pct: 2.3, risk_low: 1.6, risk_high: 3.1, category: "low" },
    { outcome: "total_cvd", horizon_years: 30, risk_pct: 18.5, risk_low: 15.2, risk_high: 22.0, category: "intermediate" },
    { outcome: "ascvd", horizon_years: 30, risk_pct: 11.0, risk_low: 8.7, risk_high: 13.9, category: "intermediate" },
    { outcome: "heart_failure", horizon_years: 30, risk_pct: 9.8, risk_low: 7.4, risk_high: 12.5, category: null },
  ],
  missing_inputs: [],
  reason: null,
  out_of_range: [],
};
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { fonts, fontsize } from "@/theme/typography";
import { colors } from "@/theme/color";
import { RiskCategory, RiskOut, RiskOutcome, RiskResult, HERO_SIZE } from "@/lib/forecast";

// Colored scale. The band for each result comes from the backend's `category`;
// if the backend sends null, we fall back to these 10-year cut-offs.
const BANDS: { key: RiskCategory; label: string; range: string; color: string }[] = [
  { key: "low",          label: "Low",          range: "<5%",     color: colors.success },
  { key: "borderline",   label: "Borderline",   range: "5–7.5%",  color: colors.warning },
  { key: "intermediate", label: "Intermediate", range: "7.5–20%", color: colors.intermediate },
  { key: "high",         label: "High",         range: "20%+",    color: colors.error },
];
const EDGES = [0, 5, 7.5, 20, 30]; // 30 = visual cap for the last segment

const OUTCOME_LABELS: Record<RiskOutcome, string> = {
  total_cvd:     "Total cardiovascular disease",
  ascvd:         "Atherosclerotic CVD (ASCVD)",
  heart_failure: "Heart failure",
};

// The profile inputs the AHA PREVENT equations use.
// keys match the backend's FEATURES inputs used.
const PREVENT_INPUTS: { key: string; label: string }[] = [
  { key: "sex",            label: "Sex" },
  { key: "age",            label: "Age" },
  { key: "weight_kg",      label: "Weight" },
  { key: "waist_cm",       label: "Waist circumference" },
  { key: "smoking",        label: "Current smoking" },
  { key: "told_high_bp",   label: "History of high blood pressure" },
  { key: "bp_meds",        label: "Blood pressure medication" },
  { key: "told_high_chol", label: "History of high cholesterol" },
  { key: "chol_meds",      label: "Cholesterol medication" },
  { key: "diabetes_dx",    label: "Have diabetes" },
  { key: "prediabetes_dx", label: "Have prediabetes" },
  { key: "insulin",        label: "Insulin use" },
  { key: "diabetes_pills", label: "Diabetes medication" },
];

/***
 * Determines the band index based on a percentage value.
 * @param p - The percentage value.
 * @returns The index of the band.
 */
function bandIndexFromPct(p: number) {
  if (p < 5) return 0;
  if (p < 7.5) return 1;
  if (p < 20) return 2;
  return 3;
}

/***
 * Calculates Which band a result sits in, and where the pin goes (0..1 along the bar).
 * @param r - The risk result.
 * @returns An object containing the band index and fraction.
 */
function placeRisk(r: RiskResult) {
  const idx = r.category ? BANDS.findIndex((b) => b.key === r.category) : bandIndexFromPct(r.risk_pct);
  const within = (r.risk_pct - EDGES[idx]) / (EDGES[idx + 1] - EDGES[idx]);
  return { idx, fraction: (idx + Math.min(Math.max(within, 0), 1)) / 4 };
}

/***
 * Renders a block for displaying risk outcomes.
 * @param result - The risk result to display.
 * @returns The JSX for the outcome block.
 */
function OutcomeBlock({ result }: { result: RiskResult }) {
  const { idx, fraction } = placeRisk(result);
  const band = BANDS[idx];

  return (
    <View style={styles.outcome}>
      <View style={styles.outcomeHead}>
        <Text style={styles.outcomeName}>{OUTCOME_LABELS[result.outcome]}</Text>
        <View style={[styles.pill, { backgroundColor: band.color }]}>
          <Text style={styles.pillText}>{band.label}</Text>
        </View>
      </View>
      <Text style={styles.big}>{result.risk_pct.toFixed(1)}%</Text>
      <Text style={styles.range}>
        Likely range {result.risk_low.toFixed(1)}–{result.risk_high.toFixed(1)}%
      </Text>
      <View style={styles.bar}>
        {BANDS.map((b) => (
          <View key={b.key} style={[styles.seg4, { backgroundColor: b.color }]} />
        ))}
        <View style={[styles.pin, { left: `${fraction * 100}%` }]} />
      </View>
    </View>
  );
}

type Props = { risk: RiskOut; onUpdateInputs?: () => void };

/***
 * Renders the AHA CVD risk card, showing risk outcomes and profile inputs.
 * @param risk - The risk data to display.
 * @param onUpdateInputs - Optional callback for updating profile inputs.
 * @returns The JSX for the AHA risk card.
 */
export default function AhaRiskCard({ risk, onUpdateInputs }: Props) {
  const [years, setYears] = useState<10 | 30>(10);
  const generated = risk.status === "generated";
  const results = risk.results.filter((r) => r.horizon_years === years);

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Ionicons name="heart-outline" size={22} color={colors.text} />
        <Text style={styles.title}>Heart disease risk</Text>
      </View>
      <Text style={styles.sub}>AHA PREVENT equations</Text>

      {generated ? (
        <>
          {/* 10 / 30 year toggle */}
          <View style={styles.seg}>
            {([10, 30] as const).map((y) => (
              <Pressable
                key={y}
                onPress={() => setYears(y)}
                style={[styles.segBtn, years === y && styles.segBtnOn]}
                accessibilityRole="button"
                accessibilityState={{ selected: years === y }}
              >
                <Text style={[styles.segText, years === y && styles.segTextOn]}>{y} years</Text>
              </Pressable>
            ))}
          </View>

          {results.length === 0 && <Text style={styles.range}>No results for this time frame.</Text>}
          {results.map((r) => (
            <OutcomeBlock key={r.outcome} result={r} />
          ))}

          {/* one legend for all the bars */}
          <View style={styles.legend}>
            {BANDS.map((b) => (
              <View key={b.key} style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: b.color }]} />
                <Text style={styles.legendText}>
                  {b.label} {b.range}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.note}>
          <Text style={styles.notTitle}>Risk not calculated yet</Text>
          {risk.reason && <Text style={styles.factor}>{risk.reason}</Text>}
          {risk.missing_inputs.length > 0 && <Text style={styles.factor}>Missing: {risk.missing_inputs.join(", ")}</Text>}
        </View>
      )}

      <Text style={styles.note}>These scores are based on your health profile, not on your forecast.</Text>

      <View style={styles.factors}>
        <Text style={styles.factorsTitle}>What goes into these scores</Text>
        <Text style={styles.factorsSub}>The profile inputs used by the AHA PREVENT equations.</Text>
        {PREVENT_INPUTS.map((i) => (
          <Text key={i.key} style={styles.factor}>
            {i.label}
          </Text>
        ))}
        <Pressable onPress={onUpdateInputs} accessibilityRole="link">
          <Text style={styles.link}>Update your inputs</Text>
        </Pressable>
      </View>
    </View>
  );
}

// The "Previous heart disease risk scores" accordion (placeholder until there is history to show).
export function PreviousRiskScores() {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.history}>
      <Pressable style={styles.historyHeader} onPress={() => setOpen((o) => !o)} accessibilityRole="button" accessibilityState={{ expanded: open }}>
        <Text style={styles.historyTitle}>Previous heart disease risk scores</Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={20} color={colors.textMuted} />
      </Pressable>
      {open && <Text style={styles.historyBody}>A small trend of past scores, with the date each was calculated.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 24 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  title: { fontFamily: fonts.bold, fontSize: fontsize.lg, color: colors.text },
  sub: { marginTop: 2, fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  seg: { flexDirection: "row", marginTop: 16, borderWidth: 1, borderColor: colors.primary, borderRadius: 10, overflow: "hidden" },
  segBtn: { flex: 1, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface },
  segBtnOn: { backgroundColor: colors.primary },
  segText: { fontFamily: fonts.regular, fontSize: fontsize.md, color: colors.primary },
  segTextOn: { fontFamily: fonts.bold, color: colors.surface },
  outcome: { marginTop: 22 },
  outcomeHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  outcomeName: { flex: 1, fontFamily: fonts.bold, fontSize: fontsize.md, color: colors.text },
  big: { fontFamily: fonts.bold, fontSize: HERO_SIZE - 4, color: colors.text, marginTop: 4 },
  range: { fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  bar: { flexDirection: "row", gap: 4, marginTop: 14, position: "relative" },
  seg4: { flex: 1, height: 10, borderRadius: 5 },
  pin: { position: "absolute", top: -6, width: 3, marginLeft: -1.5, height: 22, borderRadius: 2, backgroundColor: colors.text },
  pill: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 999 },
  pillText: { fontFamily: fonts.bold, fontSize: fontsize.xs, color: colors.text },
  legend: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 20 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontFamily: fonts.regular, fontSize: fontsize.xs, color: colors.textMuted },
  note: { marginTop: 16, padding: 12, borderRadius: 10, backgroundColor: colors.surface, fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.text },
  notTitle: { fontFamily: fonts.bold, fontSize: fontsize.sm, color: colors.text, marginBottom: 4 },
  factors: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: colors.border, gap: 8 },
  factorsTitle: { fontFamily: fonts.bold, fontSize: fontsize.sm, color: colors.text },
  factorsSub: { fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  factor: { fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.text },
  link: { marginTop: 6, fontFamily: fonts.bold, fontSize: fontsize.sm, color: colors.primary },
  history: { marginTop: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16 },
  historyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, paddingVertical: 18 },
  historyTitle: { fontFamily: fonts.regular, fontSize: fontsize.md, color: colors.text },
  historyBody: { paddingHorizontal: 24, paddingBottom: 18, fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
});
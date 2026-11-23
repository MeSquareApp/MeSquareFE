import AhaRiskCard from "@/components/AhaRiskCard";
import BiomarkerTiles from "@/components/BiomarkerTiles";
import Footer from "@/components/Footer";
import ForecastTrendCard from "@/components/ForecastTrendCard";
import ForecastUploadCard from "@/components/ForecastUploadCard";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import type { Forecast, LabPrompt, RiskOut } from "@/lib/forecast";
import { API_AUDIENCE, generateTwin, type TwinState } from "@/services/api";
import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useAuth0 } from "react-native-auth0";

const NORMAL_RANGES: Record<string, { low: number; high: number }> = {
  hba1c: { low: 4.0, high: 5.6 },
  non_hdl: { low: 70, high: 130 },
  hdl: { low: 40, high: 100 },
  sbp: { low: 90, high: 120 },
  egfr: { low: 90, high: 120 },
};

const r3 = (n: number) => Math.round(n * 1000) / 1000;

function mapForecasts(state: TwinState): Forecast[] {
  return state.predictions.map((p) => ({
    id: p.biomarker,
    biomarker: p.biomarker,
    unit: p.unit,
    asOf: p.as_of,
    basis: p.basis,
    basisLabel: p.basis_label,
    labMeasuredAt: p.lab_measured_at,
    p10: r3(p.p10),
    p50: r3(p.p50),
    p90: r3(p.p90),
    normalRange: NORMAL_RANGES[p.biomarker] ?? { low: 0, high: 0 },
    change: p.change
      ? {
          percentChange: r3(p.change.percent_change),
          significant: p.change.significant,
          previousMeasuredAt: p.change.previous_measured_at,
        }
      : undefined,
    history: [],
  }));
}

function roundRisk(risk: RiskOut): RiskOut {
  return {
    ...risk,
    results: risk.results.map((x) => ({
      ...x,
      risk_pct: r3(x.risk_pct),
      risk_low: r3(x.risk_low),
      risk_high: r3(x.risk_high),
    })),
    inputs_used: Object.fromEntries(
      Object.entries(risk.inputs_used).map(([k, v]) => [
        k,
        { ...v, value: r3(v.value) },
      ]),
    ) as RiskOut["inputs_used"],
  };
}

export default function Forecasting() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const { getApiCredentials } = useAuth0();

  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [risk, setRisk] = useState<RiskOut | null>(null);
  const [labPrompt, setLabPrompt] = useState<LabPrompt | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const credentials = await getApiCredentials(API_AUDIENCE);
      const { state } = await generateTwin(credentials.accessToken);
      const fc = mapForecasts(state);
      setForecasts(fc);
      setRisk(roundRisk(state.risk));
      setLabPrompt({
        dueOn: state.lab_prompt.due_on,
        due: state.lab_prompt.due,
      });
      setSelectedId(fc[0]?.id ?? null);
      setHasGenerated(true);
    } catch (e) {
      setError(String(e));
    } finally {
      setGenerating(false);
    }
  };

  const hasLab = forecasts.some((f) => f.labMeasuredAt !== null);
  const handleUploadLab = () => console.log("Upload lab results");
  const ready = hasGenerated && risk && forecasts.length > 0 && selectedId;

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.nonNavContent}>
        <Header />
        <ScrollView
          contentContainerStyle={[
            styles.mainContent,
            !isWide && styles.mainContentNarrow,
          ]}
        >
          <TouchableOpacity
            style={[
              styles.generateButton,
              generating && styles.generateButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={generating}
            onPress={handleGenerate}
          >
            {generating ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.generateButtonText}>
                {hasGenerated ? "Regenerate Forecast" : "Generate Forecast"}
              </Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text style={styles.disclaimer}>
              Couldn’t generate forecast: {error}
            </Text>
          )}

          {!ready ? (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderDashes}>— — —</Text>
              <Text style={styles.disclaimer}>
                {generating
                  ? "Generating your forecast…"
                  : "Tap Generate Forecast to create your digital twin."}
              </Text>
            </View>
          ) : (
            <View style={[styles.columns, isWide && styles.columnsWide]}>
              <View style={styles.left}>
                <BiomarkerTiles
                  forecasts={forecasts}
                  selectedId={selectedId!}
                  onSelect={setSelectedId}
                />
                <ForecastTrendCard
                  forecasts={forecasts}
                  selectedId={selectedId!}
                  onSelect={setSelectedId}
                  onUploadLab={handleUploadLab}
                />
                <ForecastUploadCard
                  labPrompt={labPrompt!}
                  hasLab={hasLab}
                  onUpload={handleUploadLab}
                />
              </View>
              <View style={isWide ? styles.rightWide : undefined}>
                <AhaRiskCard risk={risk!} />
                <Text style={styles.disclaimer}>
                  For informational purposes only. Not medical advice.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
  },
  nonNavContent: { flex: 1 },
  mainContent: { padding: 32 },
  mainContentNarrow: { padding: 16 },
  columns: { gap: 24 },
  columnsWide: { flexDirection: "row", alignItems: "flex-start" },
  left: { flex: 1, minWidth: 0 },
  rightWide: { width: 360 },
  generateButton: {
    alignSelf: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 24,
    minWidth: 220,
    alignItems: "center",
  },
  generateButtonDisabled: { opacity: 0.6 },
  generateButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "bold",
  },
  placeholder: { alignItems: "center", paddingVertical: 48 },
  placeholderDashes: {
    fontFamily: fonts.regular,
    fontSize: 32,
    color: colors.textMuted,
    letterSpacing: 4,
    marginBottom: 12,
  },
  disclaimer: {
    marginTop: 16,
    paddingHorizontal: 4,
    fontFamily: fonts.regular,
    fontSize: fontsize.xs,
    color: colors.textMuted,
    textAlign: "center",
  },
});

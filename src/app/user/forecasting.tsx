import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BiomarkerTiles from "@/components/BiomarkerTiles";
import AhaRiskCard from "@/components/AhaRiskCard";
import ForecastUploadCard from "@/components/ForecastUploadCard";
import ForecastTrendCard from "@/components/ForecastTrendCard";
import { API_AUDIENCE, getTwin, type TwinState } from "@/services/api";
import type { Forecast, LabPrompt, RiskOut } from "@/lib/forecast";

// Display-only reference ranges (the ML engine does not return these).
const NORMAL_RANGES: Record<string, { low: number; high: number }> = {
  hba1c:   { low: 4.0, high: 5.6 },
  non_hdl: { low: 70,  high: 130 },
  hdl:     { low: 40,  high: 100 },
  sbp:     { low: 90,  high: 120 },
  egfr:    { low: 90,  high: 120 },
};

function mapForecasts(state: TwinState): Forecast[] {
  return state.predictions.map((p) => ({
    id: p.biomarker,
    biomarker: p.biomarker,
    unit: p.unit,
    asOf: p.as_of,
    basis: p.basis,
    basisLabel: p.basis_label,
    labMeasuredAt: p.lab_measured_at,
    p10: p.p10, p50: p.p50, p90: p.p90,
    normalRange: NORMAL_RANGES[p.biomarker] ?? { low: 0, high: 0 },
    change: p.change
      ? { percentChange: p.change.percent_change, significant: p.change.significant, previousMeasuredAt: p.change.previous_measured_at }
      : undefined,
    history: [], // TODO: build from getBiomarkers() later
  }));
}

export default function Forecasting() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const { getApiCredentials } = useAuth0();

  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [risk, setRisk] = useState<RiskOut | null>(null);
  const [labPrompt, setLabPrompt] = useState<LabPrompt | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    async function load() {
      try {
        const credentials = await getApiCredentials(API_AUDIENCE);
        const { state } = await getTwin(credentials.accessToken);
        if (!isCurrent) return;
        const fc = mapForecasts(state);
        setForecasts(fc);
        setRisk(state.risk);
        setLabPrompt({ dueOn: state.lab_prompt.due_on, due: state.lab_prompt.due });
        setSelectedId(fc[0]?.id ?? null);
      } catch (e) {
        if (isCurrent) setError(String(e));
      } finally {
        if (isCurrent) setLoading(false);
      }
    }
    void load();
    return () => { isCurrent = false; };
  }, [getApiCredentials]);

  const hasLab = forecasts.some((f) => f.labMeasuredAt !== null);
  const handleUploadLab = () => console.log("Upload lab results");

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.nonNavContent}>
        <Header />
        <ScrollView contentContainerStyle={[styles.mainContent, !isWide && styles.mainContentNarrow]}>
          {loading ? (
            <ActivityIndicator style={{ marginTop: 48 }} />
          ) : error ? (
            <Text style={styles.disclaimer}>Couldn’t load your forecast: {error}</Text>
          ) : !risk || forecasts.length === 0 || !selectedId ? (
            <Text style={styles.disclaimer}>No forecast available yet.</Text>
          ) : (
            <View style={[styles.columns, isWide && styles.columnsWide]}>
              <View style={styles.left}>
                <BiomarkerTiles forecasts={forecasts} selectedId={selectedId} onSelect={setSelectedId} />
                <ForecastTrendCard forecasts={forecasts} selectedId={selectedId} onSelect={setSelectedId} onUploadLab={handleUploadLab} />
                <ForecastUploadCard labPrompt={labPrompt!} hasLab={hasLab} onUpload={handleUploadLab} />
              </View>
              <View style={isWide ? styles.rightWide : undefined}>
                <AhaRiskCard risk={risk} />
                <Text style={styles.disclaimer}>For informational purposes only. Not medical advice.</Text>
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
  container: { flex: 1, flexDirection: "row", backgroundColor: colors.background },
  nonNavContent: { flex: 1 },
  mainContent: { padding: 32 },
  mainContentNarrow: { padding: 16 },
  columns: { gap: 24 },
  columnsWide: { flexDirection: "row", alignItems: "flex-start" },
  left: { flex: 1, minWidth: 0 },
  rightWide: { width: 360 },
  placeholder: { fontFamily: fonts.regular, fontSize: fontsize.sm, color: colors.textMuted },
  disclaimer: { marginTop: 16, paddingHorizontal: 4, fontFamily: fonts.regular, fontSize: fontsize.xs, color: colors.textMuted },
});
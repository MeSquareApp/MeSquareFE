import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import BiomarkerTiles from "@/components/BiomarkerTiles";
import AhaRiskCard from "@/components/AhaRiskCard";
// import ForecastUploadCard from "@/components/ForecastUploadCard";
import { mockForecasts, mockLabPrompt, mockRisk } from "@/data/mockForecast";
import ForecastTrendCard from "@/components/ForecastTrendCard";

export default function Forecasting() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  // TODO: replace with real data from the backend
  const forecasts = mockForecasts;
  const risk = mockRisk;
  const labPrompt = mockLabPrompt;
  const hasLab = forecasts.some((f) => f.labMeasuredAt !== null);

  const [selectedId, setSelectedId] = useState(forecasts[0].id); // gets selected biomarker from the tiles, defaults to the first biomarker in the list

  const handleUploadLab = () => {
    // TODO: open a file picker (expo-document-picker), send the report to the backend,
    // then reload the forecasts and the risk.
    console.log("Upload lab results");
  };

  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.nonNavContent}>
        <Header />

        <ScrollView contentContainerStyle={[styles.mainContent, !isWide && styles.mainContentNarrow]}>
          <View style={[styles.columns, isWide && styles.columnsWide]}>
            {/* LEFT: all biomarkers at a glance, the selected chart, then the upload prompt */}
            <View style={styles.left}>
              {/* <BiomarkerTiles forecasts={forecasts} selectedId={selectedId} onSelect={setSelectedId} /> */}
              <ForecastTrendCard
                forecasts={forecasts}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onUploadLab={handleUploadLab}
              />
              {/* <ForecastUploadCard labPrompt={labPrompt} hasLab={hasLab} onUpload={handleUploadLab} /> */}
            </View>

            {/* RIGHT: AHA CVD risk */}
            <View style={isWide ? styles.rightWide : undefined}>
              <AhaRiskCard risk={risk} />
              <Text style={styles.disclaimer}>For informational purposes only. Not medical advice.</Text>
            </View>
          </View>
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
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Slider from "@react-native-community/slider";
import * as DocumentPicker from "expo-document-picker";
import { HeartPulse } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../../theme/color";

export default function FileUpload() {
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [weight, setWeight] = useState("");

  // State for sliders
  const [sleepHours, setSleepHours] = useState(7.5);
  const [exerciseHours, setExerciseHours] = useState(1.0);
  const [steps, setSteps] = useState(6850);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: true });
    if (!result.canceled) setFiles([...files, ...result.assets]);
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#F8F9FA" }}>
      <Navbar />

      <View style={{ flex: 1 }}>
        <Header />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={true}
        >
          {/* Top Title Area */}
          <View style={styles.topHeader}>
            <View style={styles.titleArea}>
              <View style={styles.heartIconContainer}>
                <HeartPulse size={32} color={colors.primary || "#14B8A6"} />
              </View>
              <View>
                <Text style={styles.pageTitle}>Data Logging</Text>
                <Text style={styles.pageSubtitle}>
                  Track your daily activity and health metrics
                </Text>
              </View>
            </View>
          </View>

          {/* Centered Date Picker */}
          <View style={styles.datePickerContainer}>
            <View style={styles.datePicker}>
              <Text style={styles.dateArrow}>{"<"}</Text>
              <Text style={styles.dateText}>Tue, Nov 4, 2025</Text>
              <Text style={styles.dateArrow}>{">"}</Text>
            </View>
          </View>

          {/* 1. Daily Activity */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>1</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Daily Activity</Text>
                <Text style={styles.cardSubtitle}>
                  Log your sleep, exercise, and step count for today.
                </Text>
              </View>
            </View>

            <View style={styles.activityRow}>
              {/* Sleep Slider */}
              <View style={styles.sliderCard}>
                <Text style={styles.sliderTitle}>
                  Sleep: <Text style={styles.sliderValue}>{sleepHours} h</Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={12}
                  step={0.5}
                  value={sleepHours}
                  onValueChange={setSleepHours}
                  minimumTrackTintColor="#1E88E5"
                  maximumTrackTintColor="#D1D5DB"
                  thumbTintColor="#1E88E5"
                />
                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeLabel}>0 h</Text>
                  <Text style={styles.rangeLabel}>12 h</Text>
                </View>
              </View>

              {/* Exercise Slider */}
              <View style={styles.sliderCard}>
                <Text style={styles.sliderTitle}>
                  Exercise:{" "}
                  <Text style={styles.sliderValue}>{exerciseHours} h</Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={6}
                  step={0.1}
                  value={exerciseHours}
                  onValueChange={setExerciseHours}
                  minimumTrackTintColor="#14B8A6"
                  maximumTrackTintColor="#D1D5DB"
                  thumbTintColor="#14B8A6"
                />
                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeLabel}>0 h</Text>
                  <Text style={styles.rangeLabel}>4 h</Text>
                </View>
              </View>

              {/* Steps Slider */}
              <View style={styles.sliderCard}>
                <Text style={styles.sliderTitle}>
                  Steps:{" "}
                  <Text style={styles.sliderValue}>
                    {steps.toLocaleString()}
                  </Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={20000}
                  step={50}
                  value={steps}
                  onValueChange={setSteps}
                  minimumTrackTintColor="#8E24AA"
                  maximumTrackTintColor="#D1D5DB"
                  thumbTintColor="#8E24AA"
                />
                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeLabel}>0</Text>
                  <Text style={styles.rangeLabel}>20k</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 2. Wearable Data */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>2</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Wearable Data (Optional)</Text>
                <Text style={styles.cardSubtitle}>
                  Automatically sync RHR, HRV and VO₂ Max from your wearable
                  device.
                </Text>
              </View>
            </View>

            <View style={styles.wearableRow}>
              <View style={styles.wearableStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>RHR</Text>
                  <Text style={styles.statValue}>— bpm</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>HRV</Text>
                  <Text style={styles.statValue}>— ms</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>VO₂ Max</Text>
                  <Text style={styles.statValue}>— ml/kg/min</Text>
                </View>
              </View>

              <View style={styles.verticalDivider} />

              <View style={styles.connectAction}>
                <Pressable style={styles.primaryButton}>
                  <Text style={styles.buttonText}>Connect Wearable</Text>
                </Pressable>
                <Text style={styles.orText}>
                  or{" "}
                  <Text style={styles.uploadLink} onPress={pickFile}>
                    upload a medical document
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* 3. Upload Medical Data */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>3</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Upload Medical Data</Text>
                <Text style={styles.cardSubtitle}>
                  Upload blood work or other medical documents to track
                  additional health metrics (e.g., VO₂ Max, RHR, HRV, blood
                  pressure).
                </Text>
              </View>
            </View>

            <View style={styles.uploadArea}>
              <View style={styles.uploadActionContainer}>
                <Pressable onPress={pickFile} style={styles.primaryButton}>
                  <Text style={styles.buttonText}>Browse Files</Text>
                </Pressable>
                <Text style={styles.supportedText}>
                  Supported formats: PDF, JPG, PNG
                </Text>
              </View>
            </View>

            {files.length > 0 && (
              <View style={styles.filesList}>
                {files.map((f) => (
                  <View key={f.uri} style={styles.fileItem}>
                    <Text style={styles.fileName}>{f.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* 4. Weekly Weigh-In */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>4</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Weekly Weigh-In</Text>
                <Text style={styles.cardSubtitle}>
                  Weight once a week, or during a doctor visit.
                </Text>
              </View>
            </View>

            <View style={styles.weighInRow}>
              <TextInput
                style={styles.input}
                placeholder="Enter weight (lbs)"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
              <Pressable style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>Save Weight</Text>
              </Pressable>
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <Text style={styles.infoText}>
              You can always update your data later.
            </Text>
          </View>
        </ScrollView>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: {
    padding: 24,
    paddingBottom: 60,
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },

  // Top Header
  topHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  titleArea: { flexDirection: "row", alignItems: "center" },
  heartIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Atkinson Hyperlegible",
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
    fontFamily: "Atkinson Hyperlegible",
  },

  // Centered Date Picker
  datePickerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dateArrow: { fontSize: 16, color: "#111827", fontWeight: "bold" },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginHorizontal: 16,
    fontFamily: "Atkinson Hyperlegible",
  },

  // Card Base
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary || "#14B8A6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  numberText: { color: "white", fontWeight: "bold", fontSize: 16 },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Atkinson Hyperlegible",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    fontFamily: "Atkinson Hyperlegible",
  },

  // Activity (Card 1) - Reused styles from SignUp
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  sliderCard: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: "center",
  },
  sliderTitle: {
    fontSize: 16,
    color: "#374151",
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
  },
  sliderValue: {
    fontWeight: "600",
    color: "#111827",
  },
  slider: {
    width: "100%",
    height: 34,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    width: "100%",
    marginTop: -5,
  },
  rangeLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: "Atkinson Hyperlegible",
  },

  // Wearable (Card 2)
  wearableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  wearableStats: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  statItem: { alignItems: "center" },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginTop: 8,
    fontFamily: "Atkinson Hyperlegible",
  },
  statValue: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
    fontFamily: "Atkinson Hyperlegible",
  },
  connectAction: { alignItems: "center", flex: 1 },
  orText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 12,
    fontFamily: "Atkinson Hyperlegible",
  },
  uploadLink: {
    color: colors.primary || "#14B8A6",
    textDecorationLine: "underline",
  },
  verticalDivider: { width: 1, height: "80%", backgroundColor: "#E5E7EB" },

  // Upload (Card 3)
  uploadArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  uploadActionContainer: { alignItems: "center" },
  supportedText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
    fontFamily: "Atkinson Hyperlegible",
  },
  filesList: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 16,
  },
  fileItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  fileName: {
    fontSize: 14,
    color: "#111827",
    fontFamily: "Atkinson Hyperlegible",
  },

  // Weigh-In (Card 4)
  weighInRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 20,
    fontSize: 14,
    color: "#111827",
    fontFamily: "Atkinson Hyperlegible",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  // Buttons
  primaryButton: {
    backgroundColor: colors.primary || "#14B8A6",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Atkinson Hyperlegible",
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: colors.primary || "#14B8A6",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    color: colors.primary || "#14B8A6",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "Atkinson Hyperlegible",
  },

  // Info Banner
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    justifyContent: "center",
  },
  infoText: {
    color: "#1E88E5",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Atkinson Hyperlegible",
  },
});

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
  useWindowDimensions,
} from "react-native";
import { colors } from "../../theme/color";

export default function FileUpload() {
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [weight, setWeight] = useState("");

  // State for sliders
  const [sleepHours, setSleepHours] = useState(7.5);
  const [exerciseHours, setExerciseHours] = useState(0);
  const [steps, setSteps] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);

  // State for Date
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 4));

  // Responsive Hook
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: true });
    if (!result.canceled) setFiles([...files, ...result.assets]);
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#F8F9FA" }}>
      {/* Note: You may want to hide the Navbar on mobile, or make it a drawer/bottom tab bar in your Navbar component */}
      <Navbar />

      <View style={{ flex: 1 }}>
        <Header />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.container,
            isMobile && styles.containerMobile,
          ]}
          showsVerticalScrollIndicator={true}
        >
          {/* Top Title Area */}
          <View style={styles.topHeader}>
            <View style={styles.titleArea}>
              <View style={styles.heartIconContainer}>
                <HeartPulse
                  size={32}
                  color={colors.primary || colors.secondary}
                />
              </View>
              <View style={{ flexShrink: 1 }}>
                <Text style={styles.pageTitle}>Data Logging</Text>
                <Text style={styles.pageSubtitle}>
                  Track your daily activity and health metrics
                </Text>
              </View>
            </View>
          </View>

          {/* Interactive Date Picker */}
          <View style={styles.datePickerContainer}>
            <View style={styles.datePicker}>
              <Pressable
                onPress={() => changeDate(-1)}
                style={styles.arrowHitbox}
              >
                <Text style={styles.dateArrow}>{"<"}</Text>
              </Pressable>

              <Text style={styles.dateText}>{formattedDate}</Text>

              <Pressable
                onPress={() => changeDate(1)}
                style={styles.arrowHitbox}
              >
                <Text style={styles.dateArrow}>{">"}</Text>
              </Pressable>
            </View>
          </View>

          {/* 1. Daily Activity */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>
                  Daily Activity Manual Logging
                </Text>
                <Text style={styles.cardSubtitle}>
                  Log your sleep, exercise, step count and water intake for
                  today. If you don't have any wearable tech, no worries, you
                  can manually enter your data.
                </Text>
              </View>
            </View>

            {/* Responsive Row -> Column on mobile */}
            <View style={[styles.activityRow, isMobile && styles.columnLayout]}>
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

              <View style={styles.sliderCard}>
                <Text style={styles.sliderTitle}>
                  Exercise:{" "}
                  <Text style={styles.sliderValue}>{exerciseHours} h</Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={6}
                  step={0.25}
                  value={exerciseHours}
                  onValueChange={setExerciseHours}
                  minimumTrackTintColor={colors.secondary}
                  maximumTrackTintColor="#D1D5DB"
                  thumbTintColor={colors.secondary}
                />
                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeLabel}>0 h</Text>
                  <Text style={styles.rangeLabel}>6 h</Text>
                </View>
              </View>

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
                  minimumTrackTintColor="#d60808"
                  maximumTrackTintColor="#D1D5DB"
                  thumbTintColor="#d60808"
                />
                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeLabel}>0</Text>
                  <Text style={styles.rangeLabel}>20k</Text>
                </View>
              </View>

              <View style={styles.sliderCard}>
                <Text style={styles.sliderTitle}>
                  Water: <Text style={styles.sliderValue}>{waterIntake} L</Text>
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={4}
                  step={0.25}
                  value={waterIntake}
                  onValueChange={setWaterIntake}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor="#D1D5DB"
                  thumbTintColor={colors.primary}
                />
                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeLabel}>0</Text>
                  <Text style={styles.rangeLabel}>4 L</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 2. Wearable Data */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>
                  Daily Wearable Data Logging
                </Text>
                <Text style={styles.cardSubtitle}>
                  Automatically sync RHR, HRV and VO₂ Max from your wearable
                  device. Your step count, sleep, and other activity data will
                  also be synced.
                </Text>
              </View>
            </View>

            <View style={[styles.wearableRow, isMobile && styles.columnLayout]}>
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

              {/* Hide vertical divider on mobile */}
              {!isMobile && <View style={styles.verticalDivider} />}

              <View
                style={[
                  styles.connectAction,
                  isMobile && { marginTop: 24, width: "100%" },
                ]}
              >
                <Pressable
                  style={[styles.primaryButton, isMobile && { width: "100%" }]}
                >
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
                <Pressable
                  onPress={pickFile}
                  style={[styles.primaryButton, isMobile && { width: "100%" }]}
                >
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
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Weekly Weigh-In</Text>
                <Text style={styles.cardSubtitle}>
                  Weight once a week, or during a doctor visit.
                </Text>
              </View>
            </View>

            <View style={[styles.weighInRow, isMobile && styles.columnLayout]}>
              <TextInput
                style={[
                  styles.input,
                  isMobile && { marginRight: 0, marginBottom: 12 },
                ]}
                placeholder="Enter weight (lbs)"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                value={weight}
                onChangeText={setWeight}
              />
              <Pressable
                style={[styles.outlineButton, isMobile && { width: "100%" }]}
              >
                <Text style={styles.outlineButtonText}>Save Weight</Text>
              </Pressable>
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <Text style={[styles.infoText, { textAlign: "center" }]}>
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
  containerMobile: {
    padding: 16, // Reduce padding on mobile to give more room for content
  },
  columnLayout: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 16,
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
    fontSize: 28, // Slightly smaller base font
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Atkinson Hyperlegible",
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    fontFamily: "Atkinson Hyperlegible",
  },

  // Date Picker
  datePickerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: "100%",
    maxWidth: 300,
    justifyContent: "space-between",
  },
  arrowHitbox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dateArrow: { fontSize: 20, color: colors.secondary, fontWeight: "bold" },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
  },

  // Card Base
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
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

  // Activity Sliders
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
    fontSize: 14,
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

  // Wearable
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
  verticalDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },

  // Upload
  uploadArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  uploadActionContainer: { alignItems: "center", width: "100%" },
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

  // Weigh-In
  weighInRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 16,
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

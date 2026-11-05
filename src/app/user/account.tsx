import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { API_AUDIENCE, getPatientProfile } from "@/services/api";
import { colors } from "@/theme/color";
import { ChevronDown, MessageCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function AccountInfo() {
  const [isSyncEnabled, setIsSyncEnabled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { getApiCredentials } = useAuth0();

  // get patient data from database
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();
  const [allergies, setAllergies] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadPatientData() {
      try {
        const credentials = await getApiCredentials(API_AUDIENCE);
        const data = await getPatientProfile(credentials.accessToken);
        if (isCurrent) {
          setFirstName(data.user.first_name);
          setLastName(data.user.last_name);
          setSex(data.biological_sex);
          setAge(
            new Date().getFullYear() -
              new Date(data.date_of_birth).getFullYear(),
          );
          setHeight(data.baseline_height_cm);
          setWeight(data.baseline_weight_kg);
          setAllergies(data.allergies);
          setMedicalCondition(data.medical_conditions);
          setEmail(data.user.email);
        }
      } catch (error) {
        console.error(
          "Failed to load authenticated patient biomarkers:",
          error,
        );
      }
    }

    void loadPatientData();
    return () => {
      isCurrent = false;
    };
  }, [getApiCredentials]);

  const keyUserData = [
    { label: "First Name", value: firstName },
    { label: "Last Name", value: lastName },
    { label: "Sex", value: sex },
    { label: "Age", value: age },
  ];

  const detailedData = [
    { label: "Type of Tracking", value: "Cardiovascular", isLink: true },
    {
      label: "Height",
      value:
        (height?.toString() ?? "") +
        " cm / " +
        (height ? Math.floor(Math.round((height / 2.54) * 10) / 120) : "") +
        " ft" +
        (height
          ? " " + ((((height / 2.54) * 10) / 10) % 12).toFixed(1) + " in"
          : ""),
    },
    {
      label: "Weight",
      value:
        (weight?.toString() ?? "") +
        " kg / " +
        (weight ? (weight * 2.2046226218).toFixed(2) : "") +
        " lbs",
    },
    { label: "Allergies", value: allergies },
    { label: "Medical Condition", value: medicalCondition },
    { label: "Email", value: email },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.layout}>
        <Navbar />

        <View style={styles.contentColumn}>
          <Header />

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.mainContent}>
              {/* Top Horizontal Stats */}
              <View style={styles.topStatsContainer}>
                {keyUserData.map((stat, index) => (
                  <View key={index} style={styles.statBlock}>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                  </View>
                ))}
              </View>

              {/* Detailed Vertical Info */}
              <View style={styles.detailsContainer}>
                {detailedData.map((info, index) => (
                  <View key={index} style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{info.label}</Text>
                    <View style={styles.detailValueRow}>
                      <Text
                        style={[
                          styles.detailValue,
                          info.isLink && styles.tealText,
                        ]}
                      >
                        {info.value}
                      </Text>
                      {info.isLink && (
                        <ChevronDown
                          size={16}
                          color={colors.secondary}
                          style={styles.chevron}
                        />
                      )}
                    </View>
                  </View>
                ))}
              </View>

              {/* Edit Button */}
              <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                <Text style={styles.editButtonText}>Edit Details</Text>
              </TouchableOpacity>

              {/* Settings Section */}
              <View style={styles.settingsSection}>
                <Text style={styles.settingsTitle}>Settings</Text>

                <View style={styles.settingRow}>
                  <Text style={styles.settingLabel}>
                    Allow data sync from{"\n"}Health Apps
                  </Text>
                  <Switch
                    trackColor={{ false: colors.gray5, true: colors.secondary }}
                    thumbColor={colors.background}
                    ios_backgroundColor={colors.gray5}
                    onValueChange={setIsSyncEnabled}
                    value={isSyncEnabled}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <Footer />

          {/* Floating Action Button (Chat) */}
          {!isChatOpen && (
            <TouchableOpacity
              style={styles.fab}
              activeOpacity={0.8}
              onPress={() => setIsChatOpen(true)}
            >
              <MessageCircle size={28} color={colors.background} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        visible={isChatOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsChatOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <Chatbot onClose={() => setIsChatOpen(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  layout: {
    flex: 1,
    flexDirection: "row",
  },
  contentColumn: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  mainContent: {
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  topStatsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
    marginBottom: 48,
    width: "100%",
  },
  statBlock: {
    alignItems: "flex-start",
    minWidth: 70,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray3,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black1,
  },
  detailsContainer: {
    width: "100%",
    maxWidth: 320,
    gap: 24,
  },
  detailRow: {
    flexDirection: "column",
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray3,
    marginBottom: 4,
  },
  detailValueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black1,
  },
  tealText: {
    color: colors.secondary,
  },
  chevron: {
    marginLeft: 4,
    marginTop: 2,
  },
  editButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 40,
  },
  editButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "bold",
  },
  settingsSection: {
    width: "100%",
    maxWidth: 320,
    marginTop: 64,
    marginBottom: 40,
  },
  settingsTitle: {
    fontSize: 24,
    color: colors.black1,
    textAlign: "center",
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingLabel: {
    fontSize: 16,
    color: colors.black1,
    flex: 1,
    paddingRight: 16,
    lineHeight: 22,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray5,
    paddingVertical: 24,
    paddingHorizontal: 24,
    marginTop: "auto",
    alignItems: "center",
  },
  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 10,
    color: colors.gray3,
    fontWeight: "500",
  },
  copyrightText: {
    fontSize: 10,
    color: colors.gray3,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    backgroundColor: colors.secondary,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 24,
    paddingRight: 24,
  },
});

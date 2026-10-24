import { ChevronDown, MessageCircle } from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// --- Brand Colors ---
const COLORS = {
  teal: "#0d9488",
  textDark: "#111827",
  textGray: "#4b5563",
  border: "#f3f4f6",
  white: "#ffffff",
};

const LOGO_SOURCE = require("../../../assets/images/me2-logo.png");

export default function AccountInfo() {
  const [isSyncEnabled, setIsSyncEnabled] = useState(false);

  const keyUserData = [
    { label: "First Name", value: "Lydia" },
    { label: "Last Name", value: "Temesgen" },
    { label: "Age", value: "23" },
    { label: "Height", value: "5 ft 1" },
    { label: "Weight", value: "115 lbs" },
  ];

  const detailedData = [
    { label: "Type of Tracking", value: "Cardiovascular", isLink: true },
    { label: "Allergies", value: "Pollen, Dust" },
    { label: "Medical Condition", value: "Iron Deficiency" },
    { label: "Email", value: "lydiahenok@gmail.com" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            {/* Your Logo Asset goes here */}
            <Image
              source={LOGO_SOURCE}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.logoText}>Digital</Text>
              <Text style={styles.logoText}>Twin</Text>
            </View>
          </View>

          {/* Navigation (Hidden on very small screens, adjust as needed) */}
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Dashboard</Text>
            <Text style={styles.navText}>Log your data</Text>
            <Text style={styles.navText}>Calendar</Text>
          </View>

          <Text style={styles.userName}>Lydia Temesgen</Text>
        </View>

        <View style={styles.mainContent}>
          {/* Account Details Title */}
          <Text style={styles.pageTitle}>Account Details</Text>

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
                    style={[styles.detailValue, info.isLink && styles.tealText]}
                  >
                    {info.value}
                  </Text>
                  {info.isLink && (
                    <ChevronDown
                      size={16}
                      color={COLORS.teal}
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
                trackColor={{ false: "#e5e7eb", true: COLORS.teal }}
                thumbColor={COLORS.white}
                ios_backgroundColor="#e5e7eb"
                onValueChange={setIsSyncEnabled}
                value={isSyncEnabled}
              />
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>ABOUT US</Text>
            <Text style={styles.footerLink}>CONTACT US</Text>
            <Text style={styles.footerLink}>HELP</Text>
            <Text style={styles.footerLink}>PRIVACY POLICY</Text>
            <Text style={styles.footerLink}>DISCLAIMER</Text>
          </View>
          <Text style={styles.copyrightText}>
            Copyright © 2026 • VT Digital Twin
          </Text>
        </View>
      </ScrollView>

      {/* Floating Action Button (Chat) */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <MessageCircle size={28} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoImage: {
    width: 40, // Width matches logo's aspect ratio
    height: 40, // Height matches logo's aspect ratio
    marginRight: 4,
  },
  logoText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.textDark,
    lineHeight: 14,
  },
  navContainer: {
    flexDirection: "row",
    gap: 32,
  },
  navText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  mainContent: {
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  pageTitle: {
    fontSize: 28,
    color: COLORS.textDark,
    marginBottom: 40,
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
    color: COLORS.textGray,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
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
    color: COLORS.textGray,
    marginBottom: 4,
  },
  detailValueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  tealText: {
    color: COLORS.teal,
  },
  chevron: {
    marginLeft: 4,
    marginTop: 2,
  },
  editButton: {
    backgroundColor: COLORS.teal,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 40,
  },
  editButtonText: {
    color: COLORS.white,
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
    color: COLORS.textDark,
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
    color: COLORS.textDark,
    flex: 1,
    paddingRight: 16,
    lineHeight: 22,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
    color: COLORS.textGray,
    fontWeight: "500",
  },
  copyrightText: {
    fontSize: 10,
    color: COLORS.textGray,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    backgroundColor: COLORS.teal,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});

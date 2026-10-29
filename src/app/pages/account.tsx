import { colors } from "@/theme/color";
import { ChevronDown, MessageCircle } from "lucide-react-native";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

export default function AccountInfo() {
  const [isSyncEnabled, setIsSyncEnabled] = useState(false);

  const keyUserData = [
    { label: "First Name", value: "Jane" },
    { label: "Last Name", value: "Doe" },
    { label: "Sex", value: "Female" },
    { label: "Age", value: "47" },
    { label: "Height", value: "5 ft 10" },
    { label: "Weight", value: "192 lbs" },
  ];

  const detailedData = [
    { label: "Type of Tracking", value: "Cardiovascular", isLink: true },
    { label: "Allergies", value: "Penicillin" },
    { label: "Medical Condition", value: "N/A" },
    { label: "Email", value: "test.patient@example.com" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.layout}>
        <Navbar />

        <View style={styles.contentColumn}>
          <Header title="Account Details" />

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
            <MessageCircle size={28} color={colors.background} />
          </TouchableOpacity>
        </View>
      </View>
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
});

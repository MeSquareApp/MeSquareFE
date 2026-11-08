import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  API_AUDIENCE,
  getBiomarkers,
  type Biomarker,
} from "@/services/api";
import { colors } from "@/theme/color";
import { fonts }  from "@/theme/typography";
import { useAuth0 } from 'react-native-auth0';
import TrendCard   from "@/components/TrendCard";
import TwinStatBox from "@/components/TwinStatBox";
import MetricCard  from "@/components/MetricCard";
import Navbar      from "@/components/Navbar";
import Header      from "@/components/Header";
import Footer      from "@/components/Footer";

export default function Dashboard() {
  const twinStats = [
    { label: "Heart Health", value: "92%", color: "#369B63" },
    { label: "Age", value: 29, color: colors.primary },
    { label: "Height", value: "5ft 11in", color: colors.info },
    { label: "Weight", value: 180, color: colors.secondary },
  ];

  const { getApiCredentials } = useAuth0();

  // get patient data from database
  const [rhr, setRhr] = useState<Biomarker | null>(null);

    useEffect(() => {
        let isCurrent = true;

        async function loadBiomarkers() {
            try {
                const credentials = await getApiCredentials(API_AUDIENCE);
                const data = await getBiomarkers(credentials.accessToken);
                if (isCurrent) {
                    const restingHeartRate = data.find(
                      (item) => item.biomarker_abbr === "RHR"
                    );
                    setRhr(restingHeartRate ?? null);
                }
            } catch (error) {
                console.error("Failed to load authenticated patient biomarkers:", error);
            }
        }

        void loadBiomarkers();
        return () => {
          isCurrent = false;
        };
        }, [getApiCredentials]);
  return (
    <View style={styles.container}>
      {/* ----- NAVBAR ----- */}
      <Navbar />

      <View style={styles.nonNavContent}>
        {/* ---- HEADER ---- */}
        <Header />

        {/* ---- MAIN CONTENT ---- */}
        <View style={styles.mainContent}>
          {/* digital twin model */}
          <View style={styles.twinColumn}>
            <View style={styles.twinHeading}>
              <Text style={styles.sectionTitle}>Digital Twin Model</Text>
            </View>

            <Image
              source={require("@/../assets/images/female_medium.png")}
              style={styles.twinImage}
              resizeMode="contain"
            />

            {/* twin summary info */}
            <View style={styles.twinStats}>
              <View style={styles.twinStatsRow}>
                <TwinStatBox {...twinStats[0]} />
                <TwinStatBox {...twinStats[1]} />
              </View>
              <View style={styles.twinStatsRow}>
                <TwinStatBox {...twinStats[2]} />
                <TwinStatBox {...twinStats[3]} />
              </View>
            </View>
          </View>

          {/* widgets */}
          <ScrollView
            style={styles.dashboardScroll}
            contentContainerStyle={styles.dashboardScrollContent}
            showsVerticalScrollIndicator={true}
          >
            {/* today's metrics */}
            <View style={styles.dashboardSection}>
              <Text style={styles.sectionTitle}>Today&apos;s Metrics</Text>

              {/* grid */}
              <View style={styles.metricsGrid}>
                <MetricCard
                  label="Resting Heart Rate"
                  value={rhr ? rhr.value : "..."} // set rhr to value if it exists, otherwise ...
                  unit="bpm"
                  status="optimal"
                  change="+1.2%"
                />

                <MetricCard
                  label="Heart Rate Variability"
                  value={94}
                  unit="ms"
                  status="optimal"
                  change="-3.1%"
                />

                <MetricCard
                  label="Blood Pressure"
                  value="128/82"
                  unit="mmHg"
                  status="warning"
                  change="+4.7%"
                />

                <MetricCard
                  label="Blood Oxygen"
                  value={97}
                  unit="%"
                  status="normal"
                  change="+0.5%"
                />

                <MetricCard
                  label="Respiratory Rate"
                  value={16}
                  unit="breaths/min"
                  status="optimal"
                  change=""
                />

                <MetricCard
                  label="Sleep Duration"
                  value={7.5}
                  unit="hours"
                  status="optimal"
                  change="+3.2%"
                />
              </View>
            </View>

            {/* TRENDS */}
            <View style={styles.dashboardSection}>
              <TrendCard
                title="Resting Heart Rate"
                value={62}
                unit="bpm"
                trend="down"
                period="Last 30 days"
              />
            </View>

            {/* your twin's metrics */}
            <View style={styles.dashboardSection}>
              <Text style={styles.sectionTitle}>Your Twin&apos;s Metrics</Text>

              {/* grid */}
              <View style={styles.metricsGrid}>
                {/* Apolipoprotein B */}
                <MetricCard
                  label="APOLIPOPROTEIN B"
                  value={85}
                  unit="mg/dL"
                  status="optimal"
                  change="-1.0%"
                />
                {/* Lipoprotein(a) */}
                <MetricCard
                  label="LIPOPROTEIN(a)"
                  value={16}
                  unit="nmol/L"
                  status="optimal"
                  change="-1.0%"
                />
                {/* HDL Cholesterol */}
                <MetricCard
                  label="HDL CHOLESTEROL"
                  value={16}
                  unit="mg/dL"
                  status="optimal"
                  change="-1.0%"
                />
                {/* Non-HDL Cholesterol */}
                <MetricCard
                  label="NON-HDL CHOLESTEROL"
                  value={16}
                  unit="mg/dL"
                  status="optimal"
                  change="-1.0%"
                />
                {/* Triglycerides */}
                <MetricCard
                  label="TRIGLYCERIDES"
                  value={16}
                  unit="mg/dL"
                  status="optimal"
                  change="-1.0%"
                />
                {/* hs-CRP */}
                <MetricCard
                  label="HS-CRP"
                  value={16}
                  unit="mg/L"
                  status="optimal"
                  change="-1.0%"
                />
                {/* Hemoglobin A1c */}
                <MetricCard
                  label="HEMOGLOBIN A1C"
                  value={16}
                  unit="%"
                  status="optimal"
                  change="-1.0%"
                />
                {/* eGFR */}
                <MetricCard
                  label="eGFR"
                  value={16}
                  unit="mL/min/1.73 m²"
                  status="optimal"
                  change="-1.0%"
                />
                {/* Homocysteine */}
                <MetricCard
                  label="HOMOCYSTEINE"
                  value={16}
                  unit="µmol/L"
                  status="optimal"
                  change=""
                />
                {/* Fibrinogen */}
                <MetricCard
                  label="FIBRINOGEN"
                  value={16}
                  unit="mg/dL"
                  status="optimal"
                  change="-1.0%"
                />
                {/* Uric acid */}
                <MetricCard
                  label="URIC ACID"
                  value={16}
                  unit="mg/dL"
                  status="optimal"
                  change="-1.0%"
                />
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ---- FOOTER ---- */}
        <Footer/>
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
  nonNavContent: {
    flex: 1,
  },

  // ---- MAIN CONTENT ----
  mainContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
    minHeight: 0,
  },
  // digital twin model column
  twinColumn: {
    width: "26%",
    minWidth: 220,
    maxWidth: 340,
    minHeight: 0,
    borderRightWidth: 1,
    borderRightColor: "#F5F5F5",
    padding: 16,
    alignItems: "stretch",
  },
  twinHeading: {
    marginBottom: 16,
  },
  twinImage: {
    flex: 1,
    width: "100%",
    minHeight: 150,
  },
  twinStats: {
    alignSelf: "stretch",
    gap: 8,
    marginTop: 16,
  },
  twinStatsRow: {
    flexDirection: "row",
    gap: 8,
  },
  // ---- WIDGETS ----
  dashboardScroll: {
    flex: 1,
    minWidth: 0,
  },
  dashboardScrollContent: {
    padding: Dimensions.get("window").width * 0.05,
    paddingTop: 24,
    paddingLeft: 32,
    paddingBottom: 32,
    gap: 24,
  },
  dashboardSection: {
    width: "100%",
    gap: 12,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    fontWeight: "700",
    color: colors.black1,
  },

  // ---- METRIC CARD ----
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  metricCard: {
    width: "31%",
    minHeight: 125,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: "space-between",
  },
  metricCardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metricStatus: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: "#369B63",
    backgroundColor: "#EFFAF3",
    overflow: "hidden",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  metricLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.gray3,
    marginBottom: 5,
  },
  metricValue: {
    fontFamily: fonts.bold,
    fontSize: 25,
    fontWeight: "700",
    color: colors.black1,
  },
  metricUnit: {
    fontFamily: fonts.regular,
    fontSize: 13,
    fontWeight: "400",
  },
  metricChange: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: "#369B63",
    marginTop: 8,
  },

  // ---- TRENDS WIDGET PLACEHOLDER ----
  trendTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    fontWeight: "700",
    color: colors.black1,
  },
  trendSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.black1,
    marginTop: 4,
  },
  trendLegend: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: "#369B63",
    marginTop: 16,
  },
  trendPlaceholder: {
    width: "100%",
    minHeight: 210,
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 16,
    backgroundColor: colors.background,
    padding: 16,
  },
});

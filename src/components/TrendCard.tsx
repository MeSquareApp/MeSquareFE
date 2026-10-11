
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/color";
import { fonts } from "@/theme/typography";

type TrendCardProps = {
  title: string;                    // name of the biomarker (eg. resting heart rate)
  value: string | number;           // value of the biomarker data (eg. 68)
  unit?: string;                    // units for the biomarker data (eg. bpm)
  trend: "up" | "down" | "stable";  // change in biomarker trend
  period?: string;                  // period of time that is shown on the trend card (eg. last 30 days)
};

export default function TrendCard({
  title,
  value,
  unit,
  trend,
  period = "Last 30 days",
}: TrendCardProps) {
  let trendColor = colors.info;
  let trendSymbol = "–";

  if (trend === "up") {
    trendColor = colors.success;
    trendSymbol = "↑";
  } else if (trend === "down") {
    trendColor = colors.warning;
    trendSymbol = "↓";
  }

  return (
    <View style={styles.card}>
      {/* Card heading */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.period}>{period}</Text>
      </View>

      {/* Current value */}
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {unit ? <Text style={styles.unit}> {unit}</Text> : null}
      </View>

      {/* Trend information */}
      <View style={styles.changeRow}>
        <Text style={[styles.change, { color: trendColor }]}>
          {trendSymbol}
        </Text>
        <Text style={styles.comparison}>compared with previous period</Text>
      </View>

      {/* Placeholder for a future chart */}
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartText}>
          Trend chart will go here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 250,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.black1,
  },
  period: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: "#858B99",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 16,
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.black1,
  },
  unit: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: "#858B99",
  },
  changeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  change: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
  comparison: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: "#858B99",
  },
  chartPlaceholder: {
    height: 90,
    marginTop: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray5,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  chartText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: "#858B99",
  },
});

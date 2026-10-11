import { colors } from "@/theme/color";
import { fonts } from "@/theme/typography";
import { View, Text, StyleSheet } from "react-native";

type MetricCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  status: "optimal" | "normal" | "warning";
};

export default function MetricCard({
    label,
    value,
    unit,
    status,
    change,
    }:
    MetricCardProps) {
    const statusColor = {
        optimal: colors.success,
        normal:  colors.info,
        warning: colors.warning,
    }[status];

    const statusBackgroundColor = {
        optimal: colors.success + "33", // 20% opacity
        normal:  colors.info    + "33", // 20% opacity
        warning: colors.warning + "33", // 20% opacity
    }[status];

    return (
        <View style={styles.card}>
            {/* Status Row */}
            <View style={styles.statusRow}>
                <Text style={[styles.statusIcon, { color: statusColor }]}>
                    {status === "optimal" && "✓"}
                    {status === "normal" && "[]"}
                    {status === "warning" && "!"}
                </Text>

                <Text
                    style={[styles.statusBadge, {color: statusColor, backgroundColor: statusBackgroundColor}]}>
                    {status}
                </Text>
            </View>

            {/* Biomarker Label*/}
            <Text style={styles.label}>{label.toUpperCase()}</Text>

            {/* value and unit */}
            <Text style={styles.value}>
                {value}
                {unit ? (
                    <Text style={styles.unit}> {unit}</Text>
                ) : null}
            </Text>

            {/* Change Row */}
            {/* Only shows change row if change is provided */}
            {change ? (
                <View style={styles.changeRow}>
                    <Text style={[styles.change, { color: statusColor }]}>
                        {change}
                    </Text>

                    <Text style={styles.comparison}>
                        vs last month
                    </Text>
                </View>
            ) : null}
        </View>
    );

}

const styles = StyleSheet.create({
    card: {
        flexGrow: 1,
        flexBasis: "30%",
        minWidth: 150,
        minHeight: 125,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 16,
        backgroundColor: colors.background,
        justifyContent: "space-between",
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    statusIcon: {
        fontSize: 16,
    },

    statusBadge: {
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: "hidden",
    },

    label: {
        fontFamily: fonts.regular,
        fontSize: 11,
        letterSpacing: 1,
        color: "#858B99",
        marginTop: 10,
    },

    value: {
        fontFamily: fonts.bold,
        fontSize: 25,
        color: colors.black1,
    },

    unit: {
        fontFamily: fonts.regular,
        fontSize: 13,
    },

    changeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 4,
        marginTop: 8,
    },

    change: {
        fontFamily: fonts.regular,
        fontSize: 12,
    },

    comparison: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: "#858B99",
    },
});
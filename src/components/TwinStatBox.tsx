import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/color";
import { fonts } from "../theme/typography";

type Props = {
    value: string | number; // value of the stat (eg. 5'11")
    label: string;          // name of the stat (eg. height)
    color: string;          // color of the big number
};

export default function TwinStatBox({ value, label, color }: Props) {
    return (
        <View style={styles.box}>
            <Text style={[styles.value, { color }]} numberOfLines={1}>{value}</Text>
            <Text style={styles.label} numberOfLines={1}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        minWidth: 0,
        height: 58,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 12,
        backgroundColor: "#F4F5F7",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    value: {
        fontFamily: fonts.bold,
        fontSize: 20,
        fontWeight: "700",
    },
    label: {
        fontFamily: fonts.regular,
        fontSize: 9,
        letterSpacing: 0.5,
        color: colors.gray3,
        textTransform: "uppercase",
        marginTop: 2,
    },
});
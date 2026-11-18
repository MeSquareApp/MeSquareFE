import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { formatLongDate, LabPrompt } from "@/lib/forecast";
import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";

type Props = { labPrompt: LabPrompt; hasLab: boolean; onUpload: () => void };

// Estimates update when new results arrive, so instead of "generate a forecast" we ask for a lab.
export default function ForecastUploadCard({ labPrompt, hasLab, onUpload }: Props) {
  const urgent = labPrompt.due || !hasLab; // full-strength button when a lab is actually needed
  const title = !hasLab ? "Personalize your estimates" : labPrompt.due ? "Time for a new lab" : "Got new results?";
  const body = !hasLab
    ? "Right now these are typical values for someone with your profile. Upload a lab report to base them on you."
    : labPrompt.due
      ? "It's been about 90 days since your last lab. Upload your latest results to keep these estimates current."
      : `Upload a lab report any time to update your estimates. Your next lab is suggested by ${formatLongDate(labPrompt.dueOn)}.`;

  return (
    <View style={[styles.card, urgent && styles.cardUrgent]}>
      <View style={styles.iconWrap}>
        <Ionicons name="cloud-upload-outline" size={26} color={colors.primary} />
      </View>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        <Text style={styles.hint}>
          For the best results, include your lipid panel, HbA1c and kidney function (creatinine or eGFR), plus a recent blood pressure reading.
        </Text>
        <Pressable
          style={[styles.button, !urgent && styles.buttonQcolorset]}
          onPress={onUpload}
          accessibilityRole="button"
          accessibilityLabel="Upload lab results"
        >
          <Ionicons name="document-text-outline" size={20} color={urgent ? colors.surface : colors.primary} />
          <Text style={[styles.buttonText, !urgent && { color: colors.primary }]}>Upload lab results</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", gap: 16, marginTop: 24, padding: 20, backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.primaryBorder, borderRadius: 16 },
  cardUrgent: { borderColor: colors.primary },
  iconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  textCol: { flex: 1, gap: 6 },
  title: { fontFamily: fonts.bold, fontSize: fontsize.lg, color: colors.text },
  body: { fontFamily: fonts.regular, fontSize: fontsize.md, lineHeight: 24, color: colors.text },
  hint: { fontFamily: fonts.regular, fontSize: fontsize.sm, lineHeight: 20, color: colors.textMuted },
  button: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10, minHeight: 48, paddingHorizontal: 22, borderRadius: 12, backgroundColor: colors.primary, borderWidth: 1, borderColor: colors.primary },
  buttonQcolorset: { backgroundColor: colors.surface },
  buttonText: { fontFamily: fonts.bold, fontSize: fontsize.md, color: colors.surface },
});
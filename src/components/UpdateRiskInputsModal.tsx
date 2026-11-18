/* generated with OpenAI's GPT-6 */
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@react-native-vector-icons/ionicons";
import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";

// profile inputs used by the AHA CVD risk card.
export type RiskProfileInputs = {
  weight_kg: string;
  waist_cm: string;
  smoking: string;
  told_high_bp: string;
  bp_meds: string;
  told_high_chol: string;
  chol_meds: string;
  diabetes_dx: string;
  prediabetes_dx: string;
  insulin: string;
  diabetes_pills: string;
};

export const EMPTY_RISK_INPUTS: RiskProfileInputs = {
  weight_kg: "",
  waist_cm: "",
  smoking: "",
  told_high_bp: "",
  bp_meds: "",
  told_high_chol: "",
  chol_meds: "",
  diabetes_dx: "",
  prediabetes_dx: "",
  insulin: "",
  diabetes_pills: "",
};

type Props = {
  visible: boolean;
  initialValues: RiskProfileInputs;
  onClose: () => void;
  onSave: (values: RiskProfileInputs) => void;
};

const OPTIONS: Record<string, string[]> = {
  smoking: ["Yes", "No"],
  told_high_bp: ["Yes", "No", "Not sure"],
  bp_meds: ["Yes", "No"],
  told_high_chol: ["Yes", "No", "Not sure"],
  chol_meds: ["Yes", "No"],
  diabetes_dx: ["Yes", "No"],
  prediabetes_dx: ["Yes", "No"],
  insulin: ["Yes", "No"],
  diabetes_pills: ["Yes", "No"],
};

/***
 * Renders a modal for updating the user's risk profile inputs.
 */
export default function UpdateRiskInputsModal({
  visible,
  initialValues,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<RiskProfileInputs>(initialValues);

  const update = (key: keyof RiskProfileInputs, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const renderChoice = (
    key: keyof RiskProfileInputs,
    label: string
  ) => (
    <View style={styles.field} key={key}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.options}>
        {OPTIONS[key]?.map((option) => {
          const selected = form[key] === option;

          return (
            <Pressable
              key={option}
              onPress={() => update(key, option)}
              style={[
                styles.option,
                selected && styles.optionSelected,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  // Renders a numeric input field with a label and suffix. Either weight or waist circumference.
  const renderNumber = (
    key: "weight_kg" | "waist_cm",
    label: string,
    placeholder: string,
    suffix: string
  ) => (
    <View style={styles.numberField} key={key}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={form[key]}
          onChangeText={(value) => update(key, value)}
          placeholder={placeholder}
          placeholderTextColor={colors.gray4}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.suffix}>{suffix}</Text>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Update your inputs</Text>
              <Text style={styles.subtitle}>
                Review your information used for your heart health risk profile.
              </Text>
            </View>

            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons
                name="close"
                size={24}
                color={colors.gray3}
              />
            </Pressable>
          </View>

          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Personal information */}
            <Text style={styles.sectionTitle}>Personal information</Text>

            <View style={styles.numberRow}>
              {renderNumber(
                "weight_kg",
                "Weight",
                "Enter weight",
                "kg"
              )}
              {renderNumber(
                "waist_cm",
                "Waist circumference",
                "Enter measurement",
                "cm"
              )}
            </View>

            {/* Lifestyle */}
            <Text style={styles.sectionTitle}>Lifestyle</Text>

            {renderChoice("smoking", "Do you currently smoke?")}

            {/* Health history */}
            <Text style={styles.sectionTitle}>Health history</Text>

            {renderChoice(
              "told_high_bp",
              "Have you been told you have high blood pressure?"
            )}

            {renderChoice(
              "told_high_chol",
              "Have you been told you have high cholesterol?"
            )}

            {renderChoice("diabetes_dx", "Do you have diabetes?")}

            {renderChoice(
              "prediabetes_dx",
              "Do you have prediabetes?"
            )}

            {/* Medication */}
            <Text style={styles.sectionTitle}>Medications</Text>

            {renderChoice(
              "bp_meds",
              "Do you take blood pressure medication?"
            )}

            {renderChoice(
              "chol_meds",
              "Do you take cholesterol medication?"
            )}

            {renderChoice("insulin", "Do you use insulin?")}

            {renderChoice(
              "diabetes_pills",
              "Do you take diabetes medication?"
            )}

            <View style={styles.info}>
              <Ionicons
                name="information-circle-outline"
                size={19}
                color={colors.primary}
              />
              <Text style={styles.infoText}>
                These details help personalize your cardiovascular
                risk profile. Make sure your information is accurate.
              </Text>
            </View>
          </ScrollView>

          {/* Footer buttons */}
          <View style={styles.footer}>
            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={styles.saveButton}
              onPress={() => onSave(form)}
            >
              <Text style={styles.saveText}>Save changes</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modal: {
    width: "100%",
    maxWidth: 600,
    maxHeight: "90%",
    backgroundColor: colors.background,
    borderRadius: 18,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: fontsize.lg,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: fontsize.sm,
    color: colors.gray3,
    marginTop: 5,
    lineHeight: 20,
  },
  scroll: {
    paddingHorizontal: 22,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: fontsize.md,
    color: colors.primary,
    marginTop: 22,
    marginBottom: 12,
  },
  field: {
    marginBottom: 18,
  },
  numberRow: {
    flexDirection: "row",
    gap: 12,
  },
  numberField: {
    flex: 1,
    marginBottom: 18,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: fontsize.sm,
    color: colors.text,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 9,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 44,
    fontFamily: fonts.regular,
    fontSize: fontsize.sm,
    color: colors.text,
  },
  suffix: {
    fontFamily: fonts.regular,
    fontSize: fontsize.xs,
    color: colors.gray3,
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.gray5,
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.background,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontFamily: fonts.regular,
    fontSize: fontsize.sm,
    color: colors.gray3,
  },
  optionTextSelected: {
    color: colors.background,
    fontFamily: fonts.bold,
  },
  info: {
    flexDirection: "row",
    gap: 10,
    padding: 13,
    marginTop: 10,
    marginBottom: 22,
    borderRadius: 10,
    backgroundColor: colors.gray5,
  },
  infoText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontsize.xs,
    lineHeight: 19,
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: colors.gray5,
  },
  cancelButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.gray5,
  },
  cancelText: {
    fontFamily: fonts.bold,
    fontSize: fontsize.sm,
    color: colors.text,
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 9,
    backgroundColor: colors.primary,
  },
  saveText: {
    fontFamily: fonts.bold,
    fontSize: fontsize.sm,
    color: colors.background,
  },
});

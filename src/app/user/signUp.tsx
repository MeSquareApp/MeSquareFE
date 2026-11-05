import {
  API_AUDIENCE,
  createUserAccount,
  type MeSquaredRole,
} from "@/services/api";
import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth0 } from "react-native-auth0";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const { getApiCredentials } = useAuth0();
  const router = useRouter();

  // Patient-only fields
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // YYYY-MM-DD
  const [showDatePicker, setShowDatePicker] = useState(false);

  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 18);
  const maxDobString = `${maxDob.getFullYear()}-${String(maxDob.getMonth() + 1).padStart(2, "0")}-${String(maxDob.getDate()).padStart(2, "0")}`;

  const isPatient = role === "Patient";

  //helper function to show alerts for web and iOS/Android platforms
  function showAlert(title: string, message?: string) {
    if (Platform.OS === "web") {
      // Browser's native dialog — blocking, but it works
      window.alert(message ? `${title}\n\n${message}` : title);
    } else {
      Alert.alert(title, message);
    }
  }

  async function handleSignUp(): Promise<void> {
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();
    const roleValues: Record<string, MeSquaredRole> = {
      Patient: "patient",
      "Medical Professional": "physician",
      Admin: "admin",
    };
    const roleValue = roleValues[role];

    if (!normalizedFirstName || !normalizedLastName || !roleValue) {
      setNotification({
        type: "error",
        message: "Enter your first and last name and select an account type.",
      });
      return;
    }

    setIsSubmitting(true);
    setNotification(null);
    try {
      const credentials = await getApiCredentials(API_AUDIENCE);
      await createUserAccount(credentials.accessToken, {
        first_name: normalizedFirstName,
        last_name: normalizedLastName,
        role: roleValue,
      });
      setNotification({
        type: "success",
        message: "Account created. Taking you to your dashboard...",
      });
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.replace("/user/dashboard");
    } catch (error) {
      console.error("MeSquared account creation failed:", error);
      setNotification({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Account creation failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        {/* Fixed header with logo */}
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/me2-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title block */}
          <Text style={styles.title}>Account Creation Form</Text>
          <Text style={styles.subtitle}>Fill in the following fields.</Text>

          {/* Form Content - Constrained Width */}
          <View style={styles.formContainer}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#9CA3AF"
              onChangeText={setFirstName}
              value={firstName}
              style={styles.input}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#9CA3AF"
              onChangeText={setLastName}
              value={lastName}
              style={styles.input}
              autoCapitalize="none"
            />

            {/* User type dropdown list, using picker library */}
            <Picker
              selectedValue={role}
              onValueChange={(value) => setRole(value)}
              style={styles.input}
            >
              <Picker.Item label="Select role" value="" />
              <Picker.Item label="Patient" value="Patient" />
              <Picker.Item
                label="Medical Professional"
                value="Medical Professional"
              />
              <Picker.Item label="Admin" value="Admin" />
            </Picker>

            {/* Patient-only fields: sex + DOB (used for basic forecasting) */}
            {isPatient && (
              <>
                <Text style={styles.profileNote}>
                  These patient details are for a later profile-setup step.
                  {"\n"}
                  {"\n"}
                  This signup currently creates your user record, with the
                  minimum information required for forecasting if you opt out of
                  providing full personal details later.
                </Text>
                <Picker
                  selectedValue={sex}
                  onValueChange={(value) => setSex(value)}
                  style={styles.input}
                >
                  <Picker.Item label="Select sex" value="" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Male" value="Male" />
                </Picker>

                {Platform.OS === "web" ? (
                  <input
                    type="date"
                    value={dateOfBirth}
                    max={maxDobString}
                    min="1900-01-01"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    style={{
                      width: "44%",
                      alignSelf: "center",
                      backgroundColor: "#E5E7EB",
                      padding: 15,
                      borderRadius: 8,
                      borderWidth: 0,
                      marginBottom: 30,
                      marginTop: 2,
                      fontFamily: "Atkinson Hyperlegible",
                      fontSize: 16,
                      color: dateOfBirth ? "#111827" : "#9CA3AF",
                    }}
                  />
                ) : (
                  <>
                    <Pressable
                      style={styles.input}
                      onPress={() => setShowDatePicker((prev) => !prev)}
                    >
                      <Text
                        style={{
                          color: dateOfBirth ? "#111827" : "#9CA3AF",
                        }}
                      >
                        {dateOfBirth
                          ? new Date(
                              dateOfBirth + "T00:00:00",
                            ).toLocaleDateString()
                          : "Date of Birth"}
                      </Text>
                    </Pressable>

                    {showDatePicker && (
                      <View style={{ marginBottom: 15 }}>
                        <DateTimePicker
                          mode="single"
                          date={dateOfBirth}
                          onChange={({ date }) => {
                            // normalize to "YYYY-MM-DD" so state is always a string
                            setDateOfBirth(
                              new Date(date as any).toISOString().split("T")[0],
                            );
                            setShowDatePicker(false);
                          }}
                          maxDate={maxDob}
                          minDate={new Date(1900, 0, 1)}
                          styles={{
                            selected: { backgroundColor: "#14B8A6" },
                            selected_label: { color: "white" },
                            today: {
                              borderColor: "#14B8A6",
                              borderWidth: 1,
                            },
                          }}
                        />
                      </View>
                    )}
                  </>
                )}
              </>
            )}

            {notification ? (
              <View
                accessibilityRole="alert"
                style={[
                  styles.notification,
                  notification.type === "success"
                    ? styles.successNotification
                    : styles.errorNotification,
                ]}
              >
                <Text
                  style={[
                    styles.notificationText,
                    notification.type === "success"
                      ? styles.successText
                      : styles.errorText,
                  ]}
                >
                  {notification.message}
                </Text>
              </View>
            ) : null}

            <Pressable
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F8F9FA",
  },
  logo: {
    width: 44,
    height: 44,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F9FA", // Clean light background
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 30,
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 70,
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 500, // Keeps it clean on web/tablets
  },
  input: {
    width: "50%",
    backgroundColor: "#E5E7EB", // Light grey like wireframe
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontFamily: "Atkinson Hyperlegible",
    color: "#111827",
    alignSelf: "center",
    borderColor: "#111827",
    borderWidth: 0,
  },
  button: {
    backgroundColor: "#14B8A6", // Teal button
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Atkinson Hyperlegible",
  },
  profileNote: {
    color: "#6B7280",
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 25,
  },
  notification: {
    width: "80%",
    alignSelf: "center",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
  },
  successNotification: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    borderWidth: 1,
  },
  errorNotification: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
    borderWidth: 1,
  },
  notificationText: {
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
    lineHeight: 20,
  },
  successText: {
    color: "#047857",
  },
  errorText: {
    color: "#B91C1C",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

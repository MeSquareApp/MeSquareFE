import { Picker } from "@react-native-picker/picker";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

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

  async function handleSignUp() {
    // TODO: replace with backend API call once the sign-up endpoint is ready.
    // Expected payload shape:
    //   { first_name, last_name, email, role, date_of_birth?, biological_sex? }
    // Date of birth and sex are only sent when role === "Patient".
    // Age for forecasting can be derived server-side from date_of_birth.
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email.trim().toLowerCase(),
      role,
      ...(isPatient && {
        biological_sex: sex,
        date_of_birth: dateOfBirth,
      }),
    };

    console.log("sign-up payload:", payload);
    showAlert("Sign-up submitted", "Backend endpoint not yet connected.");
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

            <TextInput
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
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
                      width: "45%",
                      alignSelf: "center",
                      backgroundColor: "#E5E7EB",
                      padding: 15,
                      borderRadius: 8,
                      borderWidth: 0,
                      marginBottom: 50,
                      marginTop: 25,
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

            <Pressable style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Create Account</Text>
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
});

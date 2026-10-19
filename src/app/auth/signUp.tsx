import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { supabase } from "../../../lib/supabase";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>();
  const [dateOfBirth, setDateOfBirth] = useState(""); //YYYY-MM-DD format for Supabase
  const [showDatePicker, setShowDatePicker] = useState(false);
  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 18);
  const maxDobString = `${maxDob.getFullYear()}-${String(maxDob.getMonth() + 1).padStart(2, "0")}-${String(maxDob.getDate()).padStart(2, "0")}`;
  const [sex, setSex] = useState("");
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(5);
  const [weight, setWeight] = useState(140);
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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
    const normalizedEmail = email.trim().toLowerCase();

    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (checkError) {
      console.error(checkError.message);
      Alert.alert("Error checking existing user", checkError.message);
      showAlert("Error checking existing user", checkError.message);
      return;
    }

    if (existingUser) {
      Alert.alert("Email already exists", "Please use a different email.");
      showAlert("Email already exists", "Please use a different email.");
      return;
    }

    const { error: usersError, data: newUser } = await supabase
      .from("users")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: normalizedEmail,
          role: role,
          //username must come from auth, we'll satisfy that for now with full name
          username: `${firstName}_${lastName}123`,
        },
      ])
      .select()
      .single();

    if (usersError) {
      console.error(usersError.message);
      Alert.alert("Could not create account", usersError.message);
      showAlert("Could not create account", usersError.message);
      return;
    }

    // If the user is a patient, insert data into the patients table
    // May adapt UI to clear extra unnecessary fields if the user is not a patient, but for now, we just don't insert them into the patients table.
    if (isPatient) {
      const { error: patientError } = await supabase.from("patients").insert([
        {
          user_id: newUser.id, // ← link back to the users' id column (FK)
          date_of_birth: dateOfBirth,
          baseline_age: age,
          baseline_height_ft: feet,
          baseline_height_in: inches,
          baseline_weight_lbs: weight,
          allergies: allergies,
          medical_conditions: medicalConditions,
          biological_sex: sex,
        },
      ]);

      if (patientError) {
        console.error(patientError.message);
        Alert.alert("Could not save patient details", patientError.message);

        return;
      }
    }
    Alert.alert("Account created", "Welcome!");
    showAlert("Account created", "Welcome!");
    router.replace("../pages/dashboard");
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header matching the wireframe */}
      <Text style={styles.title}>Account Creation Form</Text>
      <Text style={styles.subtitle}>
        Fill in the following fields to the best of your ability.{"\n"}
        For Allergies & Medical conditions, either enter N/A or a
        comma-separated list.
      </Text>

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

        {/* Sex dropdown list, using picker library */}
        <Picker
          selectedValue={sex}
          onValueChange={(value) => setSex(value)}
          style={styles.input}
        >
          <Picker.Item label="Select sex" value="" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Male" value="Male" />
        </Picker>

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

        {/* Age Slider */}
        <View style={styles.measurementContainer}>
          <View style={styles.sliderCard}>
            <Text style={styles.sliderTitle}>
              Age: <Text style={styles.sliderValue}>{age} yrs</Text>
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={100}
              step={1}
              value={age}
              onValueChange={setAge}
              minimumTrackTintColor="#14B8A6"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#14B8A6"
              accessibilityLabel="Age"
              accessibilityHint="Drag to adjust your age"
            />
            <View style={styles.rangeLabels}>
              <Text style={styles.rangeLabel}>18</Text>
              <Text style={styles.rangeLabel}>100</Text>
            </View>
          </View>
        </View>

        {/* Date of Birth Picker (would've been ideal but only for iOS/Android (mobile)*/}
        {/* <Pressable
          style={styles.input}
          onPress={() => setShowDatePicker((prev) => !prev)}
        >
          <Text style={{ color: dateOfBirth ? "#111827" : "#9CA3AF" }}>
            {dateOfBirth
              ? new Date(dateOfBirth).toLocaleDateString()
              : "Date of Birth"}
          </Text>
        </Pressable>

        {showDatePicker && (
          <View style={{ marginBottom: 15 }}>
            <DateTimePicker
              mode="single"
              date={dateOfBirth}
              onChange={({ date }) => {
                setDateOfBirth(date);
                setShowDatePicker(false); // close after selection
              }}
              maxDate={new Date(2008, 0, 1)} // can't be born in the future
              minDate={new Date(1900, 0, 1)} // reasonable lower bound
              styles={{
                // Optional: match your form's teal/grey theme
                selected: { backgroundColor: "#14B8A6" },
                selected_label: { color: "white" },
                today: { borderColor: "#14B8A6", borderWidth: 1 },
              }}
            />
          </View>
        )} */}

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
              marginTop: -30,
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
              <Text style={{ color: dateOfBirth ? "#111827" : "#9CA3AF" }}>
                {dateOfBirth
                  ? new Date(dateOfBirth + "T00:00:00").toLocaleDateString()
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
                    today: { borderColor: "#14B8A6", borderWidth: 1 },
                  }}
                />
              </View>
            )}
          </>
        )}

        {/* Height Stepper */}
        <View style={styles.measurementContainer}>
          <View style={styles.sliderCard}>
            <Text style={styles.sliderTitle}>
              Height:{" "}
              <Text style={styles.sliderValue}>{`${feet}' ${inches}"`}</Text>
            </Text>

            <View style={styles.heightRow}>
              <View style={styles.heightColumn}>
                <Pressable
                  onPress={() => setFeet((prev) => Math.min(7, prev + 1))}
                  disabled={feet === 7}
                  style={styles.arrowButton}
                >
                  <Text
                    style={[styles.arrow, feet === 7 && styles.arrowDisabled]}
                  >
                    ▲
                  </Text>
                </Pressable>
                <Text style={styles.heightValue}>{feet} ft</Text>
                <Pressable
                  onPress={() => setFeet((prev) => Math.max(4, prev - 1))}
                  disabled={feet === 4}
                  style={styles.arrowButton}
                >
                  <Text
                    style={[styles.arrow, feet === 4 && styles.arrowDisabled]}
                  >
                    ▼
                  </Text>
                </Pressable>
              </View>

              <View style={styles.heightDivider} />

              <View style={styles.heightColumn}>
                <Pressable
                  onPress={() => setInches((prev) => (prev + 1) % 12)}
                  style={styles.arrowButton}
                >
                  <Text style={styles.arrow}>▲</Text>
                </Pressable>
                <Text style={styles.heightValue}>{inches} in</Text>
                <Pressable
                  onPress={() => setInches((prev) => (prev + 11) % 12)}
                  style={styles.arrowButton}
                >
                  <Text style={styles.arrow}>▼</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Weight Slider */}
        <View style={styles.measurementContainer}>
          <View style={styles.sliderCard}>
            <Text style={styles.sliderTitle}>
              Weight:{" "}
              <Text style={styles.sliderValue}>{weight.toFixed(1)} lbs</Text>
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={90}
              maximumValue={280}
              step={1}
              value={weight}
              onValueChange={setWeight}
              minimumTrackTintColor="#14B8A6"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#14B8A6"
              accessibilityLabel="Weight"
              accessibilityHint="Drag to adjust your weight"
            />
            <View style={styles.rangeLabels}>
              <Text style={styles.rangeLabel}>90</Text>
              <Text style={styles.rangeLabel}>280</Text>
            </View>
          </View>
        </View>

        <TextInput
          placeholder="Allergies (or N/A)"
          placeholderTextColor="#9CA3AF"
          onChangeText={setAllergies}
          value={allergies}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Medical Conditions (or N/A)"
          placeholderTextColor="#9CA3AF"
          onChangeText={setMedicalConditions}
          value={medicalConditions}
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

        {/* <TextInput
          placeholder="Username"
          placeholderTextColor="#9CA3AF"
          onChangeText={setUsername}
          value={username}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
        /> */}

        {/* <Link href="/pages/dashboard" asChild> */}
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
        {/* </Link> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  measurementContainer: {
    width: "100%",
    marginBottom: 50,
    marginTop: 20,
    alignItems: "center",
  },
  measurementHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%", // matches your input width
    marginBottom: 10,
  },
  measurementLabel: {
    fontSize: 20, //increased from 16 to 20 for better visibility
    fontWeight: "500",
    color: "#374151",
    marginBottom: 25,
    fontFamily: "Atkinson Hyperlegible",
  },
  sliderTitle: {
    fontSize: 18,
    color: "#374151",
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
  },
  sliderCard: {
    width: "50%", // same width as TextInputs
    backgroundColor: "#E5E7EB", // same fill as your inputs
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB", // slight outline = "this is a field"
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: "center",
  },
  measurementValue: {
    fontSize: 17,
    // fontWeight: "600",
    color: "#111827",
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
    marginTop: 5,
  },
  sliderValue: {
    fontWeight: "600",
    color: "#111827", // bold "32 yrs", the reading pops
  },
  slider: {
    width: "100%", // Reduced from 100 to reduce width
    height: 34, // Reduced from 80, 60 to remove empty space (vertical slack for 2nd change)
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    width: "100%",
    marginTop: -5, // pulls 18/100 & 90/280 up under the track
  },
  rangeLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: "Atkinson Hyperlegible",
  },
  heightContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  heightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 4,
  },
  heightColumn: {
    flex: 1,
    alignItems: "center",
  },
  heightDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "#D1D5DB",
    marginVertical: 6,
  },
  heightBox: {
    width: 100,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E7EB", // Grey background
    borderRadius: 8,
  },
  heightValue: {
    fontSize: 18,
    color: "#111827",
    fontFamily: "Atkinson Hyperlegible",
    marginVertical: 5,
  },
  arrowButton: {
    paddingHorizontal: 16,
    paddingVertical: 4, // keeps the touch target ~24pt tall
  },
  arrow: {
    fontSize: 16,
    color: "#14B8A6",
  },
  arrowDisabled: {
    color: "#D1D5DB",
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

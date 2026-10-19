import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../../lib/supabase";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState("");
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(5);
  const [weight, setWeight] = useState(140);
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

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
      return;
    }

    if (existingUser) {
      Alert.alert("Email already exists", "Please use a different email.");
      return;
    }

    const { usersError } = await supabase.from("users").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: role,
      },
    ]);

    if (usersError) {
      console.error(usersError.message);
      return;
    }

    const { patientError } = await supabase.from("patients").insert([
      {
        date_of_birth: dateOfBirth,
        baseline_age: age,
        baseline_height_ft: `${feet}' ${inches}"`,
        baseline_weight_lbs: weight,
        allergies: allergies,
        medical_conditions: medicalConditions,
        biological_sex: sex,
      },
    ]);

    if (patientError) {
      console.error(patientError.message);
      return;
    }
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

        {/* Sex dropdown list */}
        {/* <Pressable
          style={styles.input}
          onPress={() =>
            setSex((prevSex) => {
              const currentIndex = sexOptions.indexOf(prevSex);
              const nextIndex =
                currentIndex === -1
                  ? 0
                  : (currentIndex + 1) % sexOptions.length;
              return sexOptions[nextIndex];
            })
          }
        >
          <Text>{sex || "Select sex"}</Text>
          <Text style={styles.arrow}>▼</Text>
        </Pressable> */}

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
        </Picker>

        {/* Age Slider */}
        <View style={styles.measurementContainer}>
          <Text style={styles.measurementLabel}>Age </Text>
          <Text style={styles.measurementValue}> {age} years</Text>
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
          />
        </View>

        {/* Height Stepper */}
        <View style={styles.heightContainer}>
          <Text style={styles.measurementLabel}>Height</Text>
          <View style={styles.heightRow}>
            <View style={styles.heightBox}>
              <Pressable
                onPress={() => setFeet((prev) => Math.min(7, prev + 1))}
                disabled={feet === 7}
              >
                <Text style={styles.arrow}>▲</Text>
              </Pressable>
              <Text style={styles.heightValue}>{feet} ft</Text>
              <Pressable
                onPress={() => setFeet((prev) => Math.max(4, prev - 1))}
                disabled={feet === 4}
              >
                <Text style={styles.arrow}>▼</Text>
              </Pressable>
            </View>
            <View style={styles.heightBox}>
              <Pressable onPress={() => setInches((prev) => (prev + 1) % 12)}>
                <Text style={styles.arrow}>▲</Text>
              </Pressable>
              <Text style={styles.heightValue}>{inches} in</Text>
              <Pressable onPress={() => setInches((prev) => (prev + 11) % 12)}>
                <Text style={styles.arrow}>▼</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Weight Slider */}
        <View style={styles.measurementContainer}>
          <Text style={styles.measurementLabel}>Weight</Text>
          <Text style={styles.measurementValue}> {weight.toFixed(1)} lbs</Text>
          <Slider
            style={styles.slider}
            minimumValue={90}
            maximumValue={280}
            //adjusted step to 1 for more precise/easier weight selection
            step={1}
            value={weight}
            onValueChange={setWeight}
            minimumTrackTintColor="#14B8A6"
            maximumTrackTintColor="#D1D5DB"
            thumbTintColor="#14B8A6"
          />
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
        <Pressable style={styles.button}>
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
  measurementLabel: {
    fontSize: 20, //increased from 16 to 20 for better visibility
    fontWeight: "500",
    color: "#374151",
    marginBottom: 25,
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "left",
  },
  measurementValue: {
    fontSize: 15,
    color: "#111827",
    fontFamily: "Atkinson Hyperlegible",
  },
  slider: {
    width: "50%", // Reduced from 100 to reduce width
    height: 60, // Reduced from 80 to remove empty space
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
    gap: 20,
    marginTop: 10,
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
  arrow: {
    fontSize: 18,
    color: "#14B8A6", // Teal accent
    paddingHorizontal: 20,
    paddingVertical: 5,
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

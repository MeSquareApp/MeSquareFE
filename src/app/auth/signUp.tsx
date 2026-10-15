import Slider from "@react-native-community/slider";
import { Link } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>();
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(5);
  const [weight, setWeight] = useState(140);
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

        {/* Age Slider */}
        <View style={styles.measurementContainer}>
          <Text style={styles.measurementLabel}>Age: {age} years</Text>
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
          <Text style={styles.measurementLabel}>
            Weight: {weight.toFixed(1)} lbs
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={90}
            maximumValue={280}
            step={0.1}
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

        <TextInput
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
        />

        <Link href="/auth/login" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
        </Link>
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
    marginBottom: 10,
    fontFamily: "Atkinson Hyperlegible",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 30,
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
  },
  measurementContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  measurementLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 5,
    fontFamily: "Atkinson Hyperlegible",
  },
  slider: {
    width: "100%",
    height: 40, // Reduced from 80 to remove empty space
  },
  heightContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: "bold",
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
    marginTop: 10,
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

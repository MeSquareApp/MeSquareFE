import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>esketit index.tsx</Text>
      <Link href="/pages/dashboard">Go to Dashboard</Link>

      <Text>Hello Team, Let's cook this together!</Text>
      <Link
        style={{
          marginBottom: 50,
          marginTop: 50,
          fontWeight: "bold",
          fontSize: 25,
        }}
        href="/auth/login"
      >
        Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

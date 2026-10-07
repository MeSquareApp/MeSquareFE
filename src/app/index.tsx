import { StyleSheet, Text, View } from "react-native";
import { Link } from "../../.expo/types/router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>esketit index.tsx</Text>
      <Link href="/dashboard">Go to Dashboard</Link>
      
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

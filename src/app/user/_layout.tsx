import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import { colors } from "../../theme/color";

export default function UserLayout() {
  const { user, isLoading } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // If the user is NOT authenticated while inside the user group,
    // gracefully route them back to the public landing page (index)
    // INSTEAD of calling authorize() automatically.
    if (!user) {
      router.replace('/');
    }
  }, [user, isLoading]);

  // Show a loading indicator while Auth0 verifies session
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // If there is no user, render nothing while router.replace('/') completes
  if (!user) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
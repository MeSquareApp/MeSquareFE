import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';

export default function AppLayout() {
  const { user, isLoading, authorize } = useAuth0();
  const router = useRouter();
  const isAuthed = !!user;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthed) {
      handleLogin();
    }
  }, [isAuthed, isLoading]);

  const handleLogin = async () => {
    try {
      await authorize();
    } catch (error) {
      console.log('Login cancelled:', error);
      router.replace('/'); // Send back to public landing page if they cancel
    }
  };

  if (isLoading || !isAuthed) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: true }} />;
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
});
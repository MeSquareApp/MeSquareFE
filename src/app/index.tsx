import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image 
} from "react-native";
import { colors } from "../theme/color";
import { useAuth0 } from 'react-native-auth0';
import { useRouter } from 'expo-router';

export default function Index() {
  const { authorize, user, isLoading } = useAuth0();
  const router = useRouter();

  // If the user is loading, show a loading indicator
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Auth0 Trigger Handlers
  const handleLogin = async () => {
    try {
      await authorize({ scope: 'openid profile email offline_access' });
      router.replace("/user/dashboard");
    } catch (e) {
      console.error('Login Error:', e);
    }
  };

  const handleSignUp = async () => {
    try {
      await authorize({
        screen_hint: 'signup',
        scope: 'openid profile email offline_access'
      } as Parameters<typeof authorize>[0] & { screen_hint: string });
      router.replace("/user/dashboard");
    } catch (e) {
      console.error('Sign Up Error:', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. APP LOGO (Centered) */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/MeSquaredLogoFull-cropped.svg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appTitle}>Welcome</Text>
      </View>

      {/* 2. ACTION BUTTONS */}
      <View style={styles.buttonContainer}>
        {user ? (
          // If a session is active, let them choose to go back to their dashboard
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => router.replace("/user/dashboard")}
          >
            <Text style={styles.loginButtonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        ) : (
          <>
            {/* Log In Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 400,
    height: 200,
    borderRadius: 24,
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320,
    gap: 12,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#E8F6FA',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  signUpButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
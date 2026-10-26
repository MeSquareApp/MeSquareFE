import { Link } from "expo-router";
import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image 
} from "react-native";
import { useAuth0 } from 'react-native-auth0';
import { useRouter } from 'expo-router';

export default function Index() {
  const { authorize, user, clearSession, isLoading } = useAuth0();
  const router = useRouter();

  /*
    Checks if user is authenticated and redirects to dashboard
    if they from the home page (root)
  */
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/pages/dashboard");
    }
  }, [isLoading, user]);

  // If the user is loading, show a loading indicator
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="0066CC" />
      </View>
    );
  }

  // Auth0 Trigger Handlers
  const handleLogin = async () => {
    try {
      await authorize({ scope: 'openid profile email offline_access' });
    } catch (e) {
      console.error('Login Error:', e);
    }
  };

  const handleSignUp = async () => {
    try {
      // screen_hint: 'signup' opens Auth0 directly to the registration tab
      await authorize({
        screen_hint: 'signup',
        scope: 'openid profile email offline_access'
      } as Parameters<typeof authorize>[0] & { screen_hint: string });
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
        {/* Log In Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Dark modern background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 14,
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
    backgroundColor: '#1565C0',
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
    borderColor: '#1565C0',
  },
  signUpButtonText: {
    color: '#1565C0',
    fontSize: 16,
    fontWeight: '600',
  },
});

import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import { colors } from "../theme/color";
import { useAuth0 } from 'react-native-auth0';
import { useRouter } from 'expo-router';
import {
  LogoutConfirmation,
  useLogoutConfirmation,
} from "../components/LogoutConfirmation";
import { API_AUDIENCE } from "@/services/api";

type AuthDestination = '/user/dashboard' | '/user/signUp';

const AUTH_DESTINATION_KEY = 'mesquared.authDestination';

export default function Index() {
  const {
    authorize,
    clearSession,
    user,
    isLoading,
    error,
  } = useAuth0();
  const {
    isVisible: isLogoutConfirmationVisible,
    startLogout,
    confirmLogout,
    cancelLogout,
  } = useLogoutConfirmation();
  const router = useRouter();
  const [authDestination, setAuthDestination] =
    useState<AuthDestination | null>(null);
  const [activeAction, setActiveAction] = useState<
    'login' | 'signup' | 'logout' | null
  >(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isLoading) {
      return;
    }

    let destination = authDestination;
    if (Platform.OS === 'web') {
      const storedDestination = window.sessionStorage.getItem(
        AUTH_DESTINATION_KEY,
      );
      if (
        storedDestination === '/user/dashboard' ||
        storedDestination === '/user/signUp'
      ) {
        destination = storedDestination;
      }
    }

    if (user && destination) {
      if (Platform.OS === 'web') {
        window.sessionStorage.removeItem(AUTH_DESTINATION_KEY);
      }
      router.replace(destination);
      return;
    }

  }, [
    authDestination,
    isLoading,
    router,
    user,
  ]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Auth0 Trigger Handlers
  const handleLogin = async () => {
    setActiveAction('login');
    setMessage('');
    cancelLogout();
    setAuthDestination('/user/dashboard');
    if (Platform.OS === 'web') {
      window.sessionStorage.setItem(
        AUTH_DESTINATION_KEY,
        '/user/dashboard',
      );
    }
    try {
      await authorize({
        audience: API_AUDIENCE,
        scope: 'openid profile email',
      });
    } catch (e) {
      if (Platform.OS === 'web') {
        window.sessionStorage.removeItem(AUTH_DESTINATION_KEY);
      }
      setAuthDestination(null);
      console.error('Login Error:', e);
      setMessage('Login failed. Please try again.');
    } finally {
      setActiveAction(null);
    }
  };

  const handleSignUp = async () => {
    setActiveAction('signup');
    setMessage('');
    cancelLogout();
    setAuthDestination('/user/signUp');
    if (Platform.OS === 'web') {
      window.sessionStorage.setItem(AUTH_DESTINATION_KEY, '/user/signUp');
    }
    try {
      const signupParameters = {
        audience: API_AUDIENCE,
        scope: 'openid profile email',
        ...(Platform.OS === 'web'
          ? { screen_hint: 'signup' }
          : { additionalParameters: { screen_hint: 'signup' } }),
      };
      await authorize(signupParameters);
    } catch (e) {
      if (Platform.OS === 'web') {
        window.sessionStorage.removeItem(AUTH_DESTINATION_KEY);
      }
      setAuthDestination(null);
      console.error('Sign Up Error:', e);
      setMessage('Account sign-up failed. Please try again.');
    } finally {
      setActiveAction(null);
    }
  };

  const handleLogout = async () => {
    setActiveAction('logout');
    setMessage('');
    startLogout();
    try {
      await clearSession();
      confirmLogout();
    } catch (e) {
      cancelLogout();
      console.error('Logout Error:', e);
      setMessage('Logout failed. Please try again.');
    } finally {
      setActiveAction(null);
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
        {!isLogoutConfirmationVisible && (
          <Text style={styles.appTitle}>Welcome</Text>
        )}
      </View>

      {/* 2. ACTION BUTTONS */}
      <View style={styles.buttonContainer}>
        {activeAction === 'logout' ? (
          <View style={styles.logoutStatus}>
            <ActivityIndicator color={colors.error} />
            <Text style={styles.message}>Logging out...</Text>
          </View>
        ) : isLogoutConfirmationVisible ? (
          <LogoutConfirmation />
        ) : (
          <>
            {message ? (
              <Text style={styles.message}>{message}</Text>
            ) : error &&
              !activeAction &&
              !user &&
              hasPendingAuthDestination() ? (
              <Text style={styles.message}>
                Authentication failed. Please try again.
              </Text>
            ) : null}
            {user ? (
              <>
                <Pressable
                  style={({ hovered, pressed }) => [
                    styles.loginButton,
                    hovered && styles.loginButtonHover,
                    pressed && styles.loginButtonPressed,
                  ]}
                  onPress={() => router.replace("/user/dashboard")}
                  disabled={activeAction !== null}
                >
                  <Text style={styles.loginButtonText}>Go to Dashboard</Text>
                </Pressable>
                <Pressable
                  style={({ hovered, pressed }) => [
                    styles.logoutButton,
                    hovered && styles.logoutButtonHover,
                    pressed && styles.logoutButtonPressed,
                  ]}
                  onPress={handleLogout}
                  disabled={activeAction !== null}
                >
                  <Text style={styles.logoutButtonText}>Log Out</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  style={({ hovered, pressed }) => [
                    styles.loginButton,
                    hovered && styles.loginButtonHover,
                    pressed && styles.loginButtonPressed,
                  ]}    
                  onPress={handleLogin}
                  disabled={activeAction !== null}
                >
                  {activeAction === 'login' ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.loginButtonText}>Log In</Text>
                  )}
                </Pressable>
                <Pressable
                  style={({ hovered, pressed }) => [
                    styles.signUpButton,
                    hovered && styles.signUpButtonHover,
                    pressed && styles.signUpButtonPressed,
                  ]}
                  onPress={handleSignUp}
                  disabled={activeAction !== null}
                >
                  {activeAction === 'signup' ? (
                    <ActivityIndicator color={colors.primary} />
                  ) : (
                    <Text style={styles.signUpButtonText}>Create Account</Text>
                  )}
                </Pressable>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
}

function hasPendingAuthDestination(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return false;
  }

  const destination = window.sessionStorage.getItem(AUTH_DESTINATION_KEY);
  return destination === '/user/dashboard' || destination === '/user/signUp';
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
  message: {
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  logoutStatus: {
    alignItems: 'center',
    gap: 12,
  },

  /* Login Button */
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonHover: {
    backgroundColor: colors.secondary,
  },
  loginButtonPressed: {
    opacity: 0.8,
  },
    loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  /* Logout Button */
  logoutButton: {
    backgroundColor: '#E8F6FA',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.error,
  },
  logoutButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButtonHover: {
    backgroundColor: '#D1E7F0',
  },
  logoutButtonPressed: {
    opacity: 0.5,
  },

  /* Sign Up Button */
  signUpButton: {
    backgroundColor: '#E8F6FA',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  signUpButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    opacity: 1
  },
  signUpButtonHover: {
    backgroundColor: '#D1E7F0',
  },
  signUpButtonPressed: {
    opacity: 0.5,
  },
});
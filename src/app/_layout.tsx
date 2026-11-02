import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_700Bold,
} from "@expo-google-fonts/atkinson-hyperlegible";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Auth0Provider } from 'react-native-auth0';
import { Platform } from "react-native";
import { LogoutConfirmationProvider } from "../components/LogoutConfirmation";

const auth0Domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;
const auth0Audience = process.env.EXPO_PUBLIC_AUTH0_AUDIENCE;

if (!auth0Domain || !auth0ClientId) {
  throw new Error(
    "Set EXPO_PUBLIC_AUTH0_DOMAIN and EXPO_PUBLIC_AUTH0_CLIENT_ID in MeSquareFE/.env.local.",
  );
}

if (Platform.OS === "web" && !auth0Audience) {
  throw new Error(
    "Set EXPO_PUBLIC_AUTH0_AUDIENCE in MeSquareFE/.env.local.",
  );
}

const auth0Options = {
  domain: auth0Domain,
  clientId: auth0ClientId,
  useDPoP: false,
  ...(Platform.OS === "web"
    ? {
        cacheLocation: "localstorage" as const,
        audience: auth0Audience,
        scope: "openid profile email",
      }
    : {}),
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
  });

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Auth0Provider {...auth0Options}>
      <LogoutConfirmationProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </LogoutConfirmationProvider>
    </Auth0Provider>
  );
}

import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_700Bold,
} from "@expo-google-fonts/atkinson-hyperlegible";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Auth0Provider } from 'react-native-auth0';
import { Slot } from 'expo-router';

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
    <Auth0Provider 
      domain="dev-tk23yhyc2e62i1a5.us.auth0.com" 
      clientId="Y74WzKfMPGoPgePKQvPgVYZmpAeKfVyP"
    >
      <Stack screenOptions={{ headerShown: false }} />
    </Auth0Provider>
  );
}

module.exports = ({ config }) => {
  const auth0Domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;

  if (!auth0Domain) {
    throw new Error(
      "Set EXPO_PUBLIC_AUTH0_DOMAIN in MeSquareFE/.env.local to configure the Auth0 native plugin.",
    );
  }

  return {
    ...config,
    plugins: (config.plugins ?? []).map((plugin) =>
      Array.isArray(plugin) && plugin[0] === "react-native-auth0"
        ? [
            "react-native-auth0",
            { ...plugin[1], domain: auth0Domain },
          ]
        : plugin,
    ),
  };
};

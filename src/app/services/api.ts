import Auth0 from "react-native-auth0";

const requiredEnv = (name: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing ${name}. Add it to the frontend .env.local file.`);
  }
  return value;
};

// Auth0 Variables
const domain = requiredEnv(
  "EXPO_PUBLIC_AUTH0_DOMAIN",
  process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
);
const clientId = requiredEnv(
  "EXPO_PUBLIC_AUTH0_CLIENT_ID",
  process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
);
const audience = requiredEnv(
  "EXPO_PUBLIC_AUTH0_AUDIENCE",
  process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
);

// Initialize your Auth0 client with tenant config
export const auth0 = new Auth0({ domain, clientId});

// FastAPI URL
const API_BASE_URL = requiredEnv("EXPO_PUBLIC_API_BASE_URL", process.env.EXPO_PUBLIC_API_BASE_URL);

// Defines a type for the logout callback
type LogoutCallback = () => void;

let globalLogoutHandler: LogoutCallback | null = null;

/**
 * Helper function to retrieve a valid Access Token from Auth0's secure storage.
 * The Credentials Manager automatically handles token refreshing behind the scenes.
 */
async function getAccessToken(): Promise<string> {
  try {
    const credentials = await auth0.credentialsManager.getApiCredentials(
        audience,
        "read:messages"
    );

    if (!credentials || !credentials.accessToken) {
      throw new Error("No active access token found.");
    }

    return credentials.accessToken;
  } catch (error) {
    console.error("Auth0 Token Retrieval Error:", error);
    throw new Error("Session expired or user not logged in.");
  }
}

/**
 * A secure fetch wrapper that automatically attaches the Auth0 token
 * and handles global 401 unauthorized errors across ALL pages.
 */
export async function secureFetch(endpoint: string, options: RequestInit = {}) {
  let token: string;
  try {
    token = await getAccessToken();
  } catch (err) {
    // Trigger global logout/redirect if token retrieval fails
    console.warn("Unauthorized request. Forcing user to re-authenticate.");
    handleLogoutRedirect();
    throw err;
  }

const headers = new Headers(options.headers);
headers.set("Authorization", `Bearer ${token}`);
headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Global security fallback: Token was rejected by FastAPI backend
    console.warn("Unauthorized request. Forcing user to re-authenticate.");
    handleLogoutRedirect();
    throw new Error("Unauthorized request. Redirecting to login.");
  }

  return response;
}

/**
 * Allows your main App component to register a navigation/state reset function.
 */
export function registerLogoutHandler(handler: LogoutCallback) {
  globalLogoutHandler = handler;
}

async function handleLogoutRedirect() {
  try {
    // Clear local token cache
    await auth0.credentialsManager.clearCredentials();
  } catch (err) {
    console.error("Failed to clear credentials", err);
  }

  // If a React component registered a handler, trigger it!
  if (globalLogoutHandler) {
    globalLogoutHandler();
  } else {
    // Fallback if no handler was registered yet
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
}

// --- Specific Page API Calls ---
export async function fetchDashboardData() {
  const res = await secureFetch("/api/dashboard/");
  return await res.json();
}

export async function fetchAppointments() {
  const res = await secureFetch("/api/appointments/");
  return await res.json();
}

export async function fetchMedicalRecords() {
  const res = await secureFetch("/api/medical-records/");
  return await res.json();
}

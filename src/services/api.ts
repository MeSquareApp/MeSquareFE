/*
  File partially generated with Copilot gpt-6-luna. All generated code has been reviewed and modified
  by the development team to ensure correctness, security, and maintainability.
*/

const requiredEnv = (name: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing ${name}. Add it to the frontend .env.local file.`);
  }
  return value;
};

const API_BASE_URL = requiredEnv(
  "EXPO_PUBLIC_API_BASE_URL",
  process.env.EXPO_PUBLIC_API_BASE_URL,
);

export const API_AUDIENCE = requiredEnv(
  "EXPO_PUBLIC_AUTH0_AUDIENCE",
  process.env.EXPO_PUBLIC_AUTH0_AUDIENCE,
);

export type CreatePatientProfile = {
  dob?: string;
  sex?: string;
};
type CreateUserAccountRequest = {
  first_name: string;
  last_name: string;
} & (
  | ({ role: "patient" } & CreatePatientProfile)
  | { role: Exclude<MeSquaredRole, "patient"> }
);

export type UpdatePatientProfile = Partial<{
  date_of_birth: string;
  biological_sex: string;
  race: string[] | null;
  region: string | null;
  diagnosed_conditions: string[] | null;
  other_condition: string | null;
  current_medications: string | null;
  blood_pressure_medication: string | null;
  blood_pressure_details: string | null;
  cholesterol_medication: string | null;
  cholesterol_details: string | null;
  alcohol: string | null;
  smoking: string | null;
  recreational_drugs: string | null;
  exercise_hours: string | null;
  sleep_hours: string | null;
  high_blood_pressure_history: string | null;
  high_cholesterol_history: string | null;
  baseline_height_cm: number | null;
  baseline_weight_kg: number | null;
  waist_cm: number | null;
  allergies: string | null;
  medical_history: string | null;
}>;

export type PatientProfile = {
  date_of_birth: string;
  biological_sex: string;
  race: string[] | null;
  region: string | null;
  diagnosed_conditions: string[] | null;
  other_condition: string | null;
  current_medications: string | null;
  blood_pressure_medication: string | null;
  blood_pressure_details: string | null;
  cholesterol_medication: string | null;
  cholesterol_details: string | null;
  alcohol: string | null;
  smoking: string | null;
  recreational_drugs: string | null;
  exercise_hours: string | null;
  sleep_hours: string | null;
  high_blood_pressure_history: string | null;
  high_cholesterol_history: string | null;
  baseline_height_cm: number | null;
  baseline_weight_kg: number | null;
  waist_cm: number | null;
  allergies: string | null;
  medical_history: string | null;
};

export type Biomarker = {
  id: string;
  biomarker_abbr: string;
  value: number;
  unit: string;
  measurement_method: string;
  measured_at: string;
};

export type MeSquaredRole = "patient" | "physician" | "admin";

export type OnboardedUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: MeSquaredRole;
  created_at: string;
};

export type UserProfile = Pick<
  OnboardedUser,
  "id" | "email" | "first_name" | "last_name"
>;

// More types will be needed to support other functions.

export async function getCurrentUser(
  accessToken: string,
): Promise<UserProfile> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let detail = `Failed to fetch user profile (${response.status}).`;
    try {
      const body: { detail?: unknown } = await response.json();
      if (typeof body.detail === "string") {
        detail = body.detail;
      }
    } catch {
      // Keep the status-based message if the response isn't JSON.
    }
    throw new Error(detail);
  }

  return response.json();
}

export async function createUserAccount(
  accessToken: string,
  profile: CreateUserAccountRequest,
): Promise<OnboardedUser> {
  const response = await fetch(`${API_BASE_URL}/users/me/create-m2-account`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    let detail = `Account creation failed (${response.status}).`;
    try {
      const body: { detail?: unknown } = await response.json();
      if (typeof body.detail === "string") {
        detail = body.detail;
      }
    } catch {
      // Keep the status-based message if the response isn't JSON.
    }
    throw new Error(detail);
  }

  return response.json();
}

export async function updatePatientProfile(
  accessToken: string,
  profile: UpdatePatientProfile,
): Promise<PatientProfile> {
  const response = await fetch(`${API_BASE_URL}/patients/me/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    let detail = `Patient profile update failed (${response.status}).`;
    try {
      const body: { detail?: unknown } = await response.json();
      if (typeof body.detail === "string") {
        detail = body.detail;
      }
    } catch {
      // Keep the status-based message if the response isn't JSON.
    }
    throw new Error(detail);
  }

  return response.json();
}

export async function getBiomarkers(accessToken: string): Promise<Biomarker[]> {
  const response = await fetch(`${API_BASE_URL}/patients/me/biomarkers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch biomarker data: ${response.status}`);
  }

  return response.json();
}

// More functions should be added as needed for interacting with the API endpoints.

export async function getPatientProfile(
  accessToken: string,
): Promise<PatientProfile> {
  const response = await fetch(`${API_BASE_URL}/patients/me/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patient profile data: ${response.status}`);
  }

  return response.json();
}

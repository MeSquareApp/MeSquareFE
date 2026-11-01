const requiredEnv = (name: string, value: string | undefined): string => {
    if (!value) {
        throw new Error(`Missing ${name}. Add it to the frontend .env.local file.`);
    }
    return value;
};

const API_BASE_URL = requiredEnv(
    "EXPO_PUBLIC_API_BASE_URL",
    process.env.EXPO_PUBLIC_API_BASE_URL
);

export const API_AUDIENCE = requiredEnv(
    "EXPO_PUBLIC_AUTH0_AUDIENCE",
    process.env.EXPO_PUBLIC_AUTH0_AUDIENCE
);

export type Biomarker = {
    id: string;
    biomarker_abbr: string;
    value: number;
    unit: string;
    measurement_method: string;
    measured_at: string;
};

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
const API_BASE_URL = "http://localhost:8000";

// test user jane doe for initial data integration
export const TEST_USER_ID = "550e8400-e29b-41d4-a716-446655440000";

export type PatientProfile = {
    date_of_birth: string;
    biological_sex: string;
    baseline_height_cm: number | null;
    baseline_weight_kg: number | null;
    allergies: string;
    medical_conditions: string;
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        username?: string;
    };
};

export type Biomarker = {
    id: string;
    biomarker_abbr: string;
    value: number;
    unit: string;
    measurement_method: string;
    measured_at: string;
};

export async function getBiomarkers(
    userId: string = TEST_USER_ID
): Promise<Biomarker[]> {
    const response = await fetch(
        `${API_BASE_URL}/patients/${userId}/biomarkers`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch biomarker data: ${response.status}`);
    }

    return response.json();
}

export async function getPatientProfile(
    userId: string = TEST_USER_ID
): Promise<PatientProfile> {
    const response = await fetch(
        `${API_BASE_URL}/patients/${userId}/profile`
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Failed to fetch patient profile: ${response.status} ${errorText}`
        );
    }

    return response.json();
}

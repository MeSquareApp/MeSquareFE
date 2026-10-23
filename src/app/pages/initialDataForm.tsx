import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
    Image,
} from "react-native";
import { ScreenContainer } from "react-native-screens";

type FormData = {
    heightFeet:               string;
    heightInches:             string;
    weight:                   string;
    sex:                      string;
    race:                     string[];
    region:                   string;
    allergies:                string;
    medicalHistory:           string;
    diagnosedConditions:      string[];
    otherCondition:           string;
    currentMedications:       string;
    bloodPressureMedication:  string;
    bloodPressureDetails:     string;
    cholesterolMedication:    string;
    cholesterolDetails:       string;
    smoking:                  string;
    alcohol:                  string;
    recreationalDrugs:        string;
    exerciseHours:            string;
    sleepHours:               string;
    highBloodPressureHistory: string;
    highCholesterolHistory:   string;
};

type StringField = Exclude<keyof FormData, "diagnosedConditions" | "race">;

const initialForm: FormData = {
    heightFeet: "",
    heightInches: "",
    weight: "",
    sex: "",
    race: [],
    region: "",
    allergies: "",
    medicalHistory: "",
    diagnosedConditions: [],
    otherCondition: "",
    currentMedications: "",
    bloodPressureMedication: "",
    bloodPressureDetails: "",
    cholesterolMedication: "",
    cholesterolDetails: "",
    smoking: "",
    alcohol: "",
    recreationalDrugs: "",
    exerciseHours: "",
    sleepHours: "",
    highBloodPressureHistory: "",
    highCholesterolHistory: "",
};

const sections = [
    { short: "Personal", title: "Personal information", description: "Let’s start with a few details about you." },
    {
        short:       "History",
        title:       "Medical history",
        description: "Share any health details that may help us understand your care needs.",
    },
    {
        short:       "Medications",
        title:       "Medications",
        description: "List what you currently take so we can provide safe, coordinated care.",
    },
    {
        short:       "Lifestyle",
        title:       "Lifestyle factors",
        description: "These everyday habits provide useful context for your overall health.",
    },
    {
        short:       "Heart health",
        title:       "Cardiovascular health",
        description: "One last section about your heart health history.",
    },
];

const raceOptions = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Native Hawaiian or Pacific Islander",
    "White",
    "Other",
    "Prefer not to say",
];

const regionOptions = ["North America", "Australia and the Pacific", "East and Southeast Asia", "Europe", "Middle and South America", "North Africa and Southwest Asia", "Russia", "South Asia", "Sub-Saharan Africa"];
const conditions    = ["Diabetes", "Hypertension", "Heart disease", "Asthma", "Cancer", "Stroke"];

function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
    return (
        <View style={styles.labelRow}>
            <Text style={styles.label}>{children}</Text>
            {optional ? <Text style={styles.optional}>OPTIONAL</Text> : null}
        </View>
    );
}

function Input({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    suffix,
    multiline,
    optional,
}: {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
    keyboardType?: "default" | "numeric";
    suffix?: string;
    multiline?: boolean;
    optional?: boolean;
}) {
    return (
        <View style={styles.field}>
            <FieldLabel optional={optional}>{label}</FieldLabel>
            <View style={[styles.inputWrap, multiline && styles.inputWrapMultiline]}>
                <TextInput
                    keyboardType={keyboardType}
                    multiline={multiline}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#A4B3AF"
                    style={[styles.input, multiline && styles.multilineInput, suffix ? styles.inputWithSuffix : null]}
                    textAlignVertical={multiline ? "top" : "center"}
                    value={value}
                />
                {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
            </View>
        </View>
    );
}

function ChoiceGroup({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <View style={styles.field}>
            <FieldLabel>{label}</FieldLabel>
            <View style={styles.choiceRow}>
                {options.map((option) => {
                    const selected = value === option;
                    return (
                        <Pressable
                            accessibilityRole="radio"
                            accessibilityState={{ checked: selected }}
                            key={option}
                            onPress={() => onChange(option)}
                            style={({ pressed }) => [
                                styles.choice,
                                selected && styles.choiceSelected,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{option}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

function PickerField({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.field}>
            <FieldLabel>{label}</FieldLabel>
            <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                onPress={() => setExpanded((current) => !current)}
                style={({ pressed }) => [styles.selectButton, pressed && styles.pressed]}
            >
                <Text numberOfLines={1} style={value ? styles.selectValue : styles.selectPlaceholder}>
                    {value || `Select ${label.toLowerCase()}`}
                </Text>
                <Text style={styles.chevron}>{expanded ? "⌃" : "⌄"}</Text>
            </Pressable>
            {expanded ? (
                <View style={styles.optionList}>
                    {options.map((option) => (
                        <Pressable
                            key={option}
                            onPress={() => {
                                onChange(option);
                                setExpanded(false);
                            }}
                            style={({ pressed }) => [
                                styles.option,
                                option === value && styles.optionSelected,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={[styles.optionText, option === value && styles.optionTextSelected]}>{option}</Text>
                            {option === value ? <Text style={styles.check}>✓</Text> : null}
                        </Pressable>
                    ))}
                </View>
            ) : null}
        </View>
    );
}

function MultiSelectField({
    label,
    options,
    values,
    onToggle,
}: {
    label: string;
    options: string[];
    values: string[];
    onToggle: (value: string) => void;
}) {
    return (
        <View style={styles.field}>
            <FieldLabel>{label}</FieldLabel>
            <Text style={styles.helperText}>Select all that apply</Text>
            <View style={styles.multiSelectGrid}>
                {options.map((option) => {
                    const selected = values.includes(option);
                    return (
                        <Pressable
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: selected }}
                            key={option}
                            onPress={() => onToggle(option)}
                            style={({ pressed }) => [
                                styles.multiSelectOption,
                                selected && styles.multiSelectOptionSelected,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                                {selected ? <Text style={styles.checkboxCheck}>✓</Text> : null}
                            </View>
                            <Text style={[styles.multiSelectText, selected && styles.multiSelectTextSelected]}>
                                {option}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

function SectionNavigation({
    activeSection,
    compact,
    onSelect,
}: {
    activeSection: number;
    compact?: boolean;
    onSelect: (section: number) => void;
}) {
    const steps = sections.map((section, index) => {
        const active = activeSection === index;
        return (
            <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                key={section.short}
                onPress={() => onSelect(index)}
                style={({ pressed }) => [
                    compact ? styles.mobileNavItem : styles.sidebarNavItem,
                    active && (compact ? styles.mobileNavItemActive : styles.sidebarNavItemActive),
                    pressed && styles.pressed,
                ]}
            >
                <View
                    style={[
                        compact ? styles.mobileStepCircle : styles.sidebarStepCircle,
                        active && styles.stepCircleActive,
                    ]}
                >
                    <Text style={[styles.stepNumber, active && styles.stepNumberActive]}>{index + 1}</Text>
                </View>
                <View style={compact ? undefined : styles.sidebarStepCopy}>
                    {!compact ? <Text style={[styles.sidebarStepLabel, active && styles.sidebarStepLabelActive]}>0{index + 1}</Text> : null}
                    <Text
                        numberOfLines={compact ? 1 : 2}
                        style={[
                            compact ? styles.mobileNavText : styles.sidebarStepTitle,
                            active && (compact ? styles.mobileNavTextActive : styles.sidebarStepTitleActive),
                        ]}
                    >
                        {compact ? section.short : section.title}
                    </Text>
                </View>
            </Pressable>
        );
    });

    if (compact) {
        return (
            <ScrollView
                contentContainerStyle={styles.mobileNavContent}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.mobileNav}
            >
                {steps}
            </ScrollView>
        );
    }

    return <View style={styles.sidebarNav}>{steps}</View>;
}

export default function App() {
    const [activeSection, setActiveSection] = useState(0);
    const [form, setForm] = useState<FormData>(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [measurementSystem, setMeasurementSystem] = useState<"customary" | "metric">("customary");
    const scrollRef = useRef<ScrollView>(null);
    const { width, height, scale, fontScale } = useWindowDimensions();

    const update = (field: StringField, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const toggleCondition = (condition: string) => {
        setForm((current) => ({
            ...current,
            diagnosedConditions: current.diagnosedConditions.includes(condition)
                ? current.diagnosedConditions.filter((item) => item !== condition)
                : [...current.diagnosedConditions, condition],
        }));
    };

    const toggleRace = (race: string) => {
        setForm((current) => ({
            ...current,
            race: current.race.includes(race)
                ? current.race.filter((item) => item !== race)
                : [...current.race, race],
        }));
    };

    const changeMeasurementSystem = (system: "customary" | "metric") => {
        if (system === measurementSystem) return;

        setForm((current) => {
            const firstHeightValue = Number(current.heightFeet);
            const secondHeightValue = Number(current.heightInches);
            const weight = Number(current.weight);

            if (system === "metric") {
                const totalCentimeters = Math.round(
                    ((firstHeightValue || 0) * 12 + (secondHeightValue || 0)) * 2.54,
                );
                return {
                    ...current,
                    heightFeet: totalCentimeters ? String(Math.floor(totalCentimeters / 100)) : "",
                    heightInches: totalCentimeters ? String(totalCentimeters % 100) : "",
                    weight: weight ? String(Math.round(weight * 0.453592 * 10) / 10) : "",
                };
            }

            const totalInches = Math.round(
                ((firstHeightValue || 0) * 100 + (secondHeightValue || 0)) / 2.54,
            );
            return {
                ...current,
                heightFeet: totalInches ? String(Math.floor(totalInches / 12)) : "",
                heightInches: totalInches ? String(totalInches % 12) : "",
                weight: weight ? String(Math.round(weight * 2.20462 * 10) / 10) : "",
            };
        });
        setMeasurementSystem(system);
    };

    const goTo = (section: number) => {
        setActiveSection(section);
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    };

    const validateCurrentSection = () => {
        const required: StringField[][] = [
            ["heightFeet", "heightInches", "weight", "sex", "region"],
            [],
            ["bloodPressureMedication", "cholesterolMedication"],
            ["smoking", "alcohol", "recreationalDrugs", "exerciseHours", "sleepHours"],
            ["highBloodPressureHistory", "highCholesterolHistory"],
        ];

        const missingRace = activeSection === 0 && form.race.length === 0;
        if (missingRace || required[activeSection].some((field) => !form[field].trim())) {
            Alert.alert("A few details are missing", "Please complete all required questions before continuing.");
            return false;
        }
        return true;
    };

    const continueForm = () => {
        if (!validateCurrentSection()) return;
        if (activeSection < sections.length - 1) {
            goTo(activeSection + 1);
        } else {
            setSubmitted(true);
            scrollRef.current?.scrollTo({ y: 0, animated: true });
        }
    };

    if (submitted) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="dark" />
                <View style={styles.successScreen}>
                    <View style={styles.successCard}>
                        <View style={styles.successIcon}>
                            <Text style={styles.successCheck}>✓</Text>
                        </View>
                        <Text style={styles.eyebrow}>INTAKE COMPLETE</Text>
                        <Text style={styles.successTitle}>Thank you for sharing your information.</Text>
                        <Text style={styles.successCopy}>
                            Your intake form is complete and ready for your care team to review.
                        </Text>
                        <Pressable onPress={() => setSubmitted(false)} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                            <Text style={styles.primaryButtonText}>Review responses</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    const section = sections[activeSection];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <View style={styles.brand}>
                    <Image
                        source={require("../../../assets/images/me2-logo.png")}
                        style={{ width: 30, height: 30 }}
                    />
                    <Text style={styles.brandName}>Me<Text style={styles.brandAccent}>²</Text></Text>
                </View>
                {/* TODO: replace with name & profile image */}
                <Text style={styles.privateText}>PRIVATE INTAKE</Text>
            </View>

            <View style={styles.contentShell}>
                <View style={styles.sidebar}>
                    <Text style={styles.sidebarEyebrow}>NEW PATIENT INTAKE</Text>
                    <Text style={styles.sidebarTitle}>Help us get to know you.</Text>
                    <Text style={styles.sidebarDescription}>
                        Your answers help your care team prepare for a more focused first visit.
                    </Text>
                    <SectionNavigation activeSection={activeSection} onSelect={goTo} />
                    <View style={styles.helpCard}>
                        <View style={styles.helpMark}><Text style={styles.helpMarkText}>?</Text></View>
                        <View>
                            <Text style={styles.helpTitle}>Need help?</Text>
                            <Text style={styles.helpText}>Patient support</Text>
                            <Text style={styles.helpPhone}>1 800 555 0148</Text>
                        </View>
                    </View>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
                    style={styles.flex}
                >
                    <ScrollView
                        contentContainerStyle={[styles.scrollContent, styles.desktopScrollContent]}
                        keyboardShouldPersistTaps="handled"
                        ref={scrollRef}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.progressMeta}>
                            <Text style={styles.progressStep}>STEP {activeSection + 1} OF {sections.length}</Text>
                            <Text style={styles.progressLabel}>{section.short}</Text>
                        </View>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${((activeSection + 1) / sections.length) * 100}%` }]} />
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.eyebrow}>STEP 0{activeSection + 1}</Text>
                            <Text style={styles.title}>{section.title}</Text>
                            <Text style={styles.description}>{section.description}</Text>
                            <View style={styles.divider} />

                            {/*<><><> PERSONAL INFORMATION <><><>*/}
                            {activeSection === 0 ? (
                                <>
                                    <View style={styles.measurementHeader}>
                                        <Text style={styles.measurementTitle}>Measurements</Text>

                                        {/* toggle between customary/metric units */}
                                        <View style={styles.unitToggle}>
                                            {(["customary", "metric"] as const).map((system) => {
                                                const selected = measurementSystem === system;
                                                return (
                                                    <Pressable
                                                        accessibilityRole="button"
                                                        accessibilityState={{ selected }}
                                                        key={system}
                                                        onPress={() => changeMeasurementSystem(system)}
                                                        style={[styles.unitToggleButton, selected && styles.unitToggleButtonActive]}
                                                    >
                                                        <Text style={[styles.unitToggleText, selected && styles.unitToggleTextActive]}>
                                                            {system === "customary" ? "Customary" : "Metric"}
                                                        </Text>
                                                    </Pressable>
                                                );
                                            })}
                                        </View>
                                    </View>

                                    <View style={styles.measurementRow}>

                                        {/* -- height -- */}
                                        <View style={styles.heightField}>
                                            <FieldLabel>Height</FieldLabel>
                                            <View style={styles.heightInputs}>
                                                {/* feet/meters */}
                                                <View style={styles.measurementInputWrap}>
                                                    <TextInput
                                                        accessibilityLabel={measurementSystem === "customary" ? "Height in feet" : "Height in meters"}
                                                        keyboardType="numeric"
                                                        onChangeText={(value) => update("heightFeet", value)}
                                                        placeholder={measurementSystem === "customary" ? "5" : "1"}
                                                        placeholderTextColor="#A4B3AF"
                                                        style={styles.measurementInput}
                                                        value={form.heightFeet}
                                                    />
                                                    <Text style={styles.suffix}>{measurementSystem === "customary" ? "ft" : "m"}</Text>
                                                </View>
                                                {/* inches/cm */}
                                                <View style={styles.measurementInputWrap}>
                                                    <TextInput
                                                        accessibilityLabel={measurementSystem === "customary" ? "Additional height in inches" : "Additional height in centimeters"}
                                                        keyboardType="numeric"
                                                        onChangeText={(value) => update("heightInches", value)}
                                                        placeholder={measurementSystem === "customary" ? "8" : "73"}
                                                        placeholderTextColor="#A4B3AF"
                                                        style={styles.measurementInput}
                                                        value={form.heightInches}
                                                    />
                                                    <Text style={styles.suffix}>{measurementSystem === "customary" ? "in" : "cm"}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* -- weight -- */}
                                        <View style={{ flex: 2, paddingStart: 20 }}>
                                            <Input
                                                keyboardType="numeric"
                                                label="Weight"
                                                onChangeText={(value) => update("weight", value)}
                                                placeholder={measurementSystem === "customary" ? "165" : "75"}
                                                suffix={measurementSystem === "customary" ? "lbs" : "kg"}
                                                value={form.weight}
                                            />
                                        </View>

                                        {/* -- sex -- */}
                                        <View style={{ flex: 2, paddingStart: 20 }}>
                                            <PickerField
                                                label="Sex"
                                                options={["Female", "Male", "Other", "Prefer not to say"]}
                                                value={form.sex}
                                                onChange={(value) => update("sex", value)}
                                            />
                                        </View>
                                    </View>

                                    {/* -- race  & geographic region -- */}
                                    <MultiSelectField label="Race" options={raceOptions} values={form.race} onToggle={toggleRace} />
                                    <PickerField label="Geographical region" options={regionOptions} value={form.region} onChange={(value) => update("region", value)} />
                                </>
                            ) : null}

                            {/* <><><> MEDICAL HISTORY <><><> */}
                            {activeSection === 1 ? (
                                <>
                                    <Input label="Allergies" value={form.allergies} onChangeText={(value) => update("allergies", value)} placeholder="List allergies and reactions, or enter “None”" multiline />
                                    <Input label="Past medical history" value={form.medicalHistory} onChangeText={(value) => update("medicalHistory", value)} placeholder="Previous illnesses, surgeries, or hospital stays" multiline />
                                    <View style={styles.field}>
                                        <FieldLabel>Diagnosed conditions</FieldLabel>
                                        <Text style={styles.helperText}>Select all that apply</Text>
                                        <View style={styles.conditionGrid}>
                                            {conditions.map((condition) => {
                                                const selected = form.diagnosedConditions.includes(condition);
                                                return (
                                                    <Pressable
                                                        key={condition}
                                                        onPress={() => toggleCondition(condition)}
                                                        style={({ pressed }) => [
                                                            styles.condition,
                                                            selected && styles.conditionSelected,
                                                            pressed && styles.pressed,
                                                        ]}
                                                    >
                                                        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                                                            {selected ? <Text style={styles.checkboxCheck}>✓</Text> : null}
                                                        </View>
                                                        <Text style={[styles.conditionText, selected && styles.conditionTextSelected]}>{condition}</Text>
                                                    </Pressable>
                                                );
                                            })}
                                        </View>
                                    </View>
                                    <Input label="Other diagnosed conditions" value={form.otherCondition} onChangeText={(value) => update("otherCondition", value)} placeholder="Add another condition" optional />
                                </>
                            ) : null}

                            {activeSection === 2 ? (
                                <>
                                    <Input label="Current medications" value={form.currentMedications} onChangeText={(value) => update("currentMedications", value)} placeholder="Example: Metformin, 500 mg, twice daily" multiline />
                                    <ChoiceGroup label="Do you take blood pressure medication?" options={["Yes", "No", "Not sure"]} value={form.bloodPressureMedication} onChange={(value) => update("bloodPressureMedication", value)} />
                                    <Input label="Blood pressure medication details" value={form.bloodPressureDetails} onChangeText={(value) => update("bloodPressureDetails", value)} placeholder="Medication name and dosage" optional />
                                    <ChoiceGroup label="Do you take cholesterol-lowering medication?" options={["Yes", "No", "Not sure"]} value={form.cholesterolMedication} onChange={(value) => update("cholesterolMedication", value)} />
                                    <Input label="Cholesterol medication details" value={form.cholesterolDetails} onChangeText={(value) => update("cholesterolDetails", value)} placeholder="Medication name and dosage" optional />
                                </>
                            ) : null}

                            {activeSection === 3 ? (
                                <>
                                    <ChoiceGroup label="Do you smoke?" options={["No", "Yes", "Previously"]} value={form.smoking} onChange={(value) => update("smoking", value)} />
                                    <ChoiceGroup label="Do you consume alcohol?" options={["No", "Yes", "Occasionally"]} value={form.alcohol} onChange={(value) => update("alcohol", value)} />
                                    <ChoiceGroup label="Do you use recreational drugs?" options={["No", "Yes"]} value={form.recreationalDrugs} onChange={(value) => update("recreationalDrugs", value)} />
                                    <Input label="Exercise per week" value={form.exerciseHours} onChangeText={(value) => update("exerciseHours", value)} placeholder="0" keyboardType="numeric" suffix="hours" />
                                    <Input label="Sleep per night" value={form.sleepHours} onChangeText={(value) => update("sleepHours", value)} placeholder="0" keyboardType="numeric" suffix="hours" />
                                </>
                            ) : null}

                            {activeSection === 4 ? (
                                <>
                                    <View style={styles.callout}>
                                        <View style={styles.calloutMark}><Text style={styles.calloutMarkText}>+</Text></View>
                                        <View style={styles.calloutCopy}>
                                            <Text style={styles.calloutTitle}>Why we ask</Text>
                                            <Text style={styles.calloutText}>Cardiovascular history helps your care team identify risk factors and tailor preventive care.</Text>
                                        </View>
                                    </View>
                                    <ChoiceGroup label="History of high blood pressure?" options={["No", "Yes", "Not sure"]} value={form.highBloodPressureHistory} onChange={(value) => update("highBloodPressureHistory", value)} />
                                    <ChoiceGroup label="History of high cholesterol?" options={["No", "Yes", "Not sure"]} value={form.highCholesterolHistory} onChange={(value) => update("highCholesterolHistory", value)} />
                                    <View style={styles.reviewNote}>
                                        <Text style={styles.reviewTitle}>You’re ready to submit.</Text>
                                        <Text style={styles.reviewText}>Review your answers with the back button before completing your intake.</Text>
                                    </View>
                                </>
                            ) : null}

                            <View style={styles.actions}>
                                {activeSection > 0 ? (
                                    <Pressable onPress={() => goTo(activeSection - 1)} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
                                        <Text style={styles.backText}>←  Back</Text>
                                    </Pressable>
                                ) : <View />}
                                <Pressable onPress={continueForm} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
                                    <Text style={styles.primaryButtonText}>{activeSection === sections.length - 1 ? "Submit intake" : "Save & continue"}  →</Text>
                                </Pressable>
                            </View>
                        </View>
                        <Text style={styles.footer}>Your information is handled with care and used to support your visit.</Text>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    safeArea: { backgroundColor: "#F4F8F7", flex: 1 },
    header: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderBottomColor: "#DFE9E6",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    brand: { alignItems: "center", flexDirection: "row", gap: 9 },
    brandMark: { alignItems: "center", backgroundColor: "#237568", borderRadius: 17, height: 34, justifyContent: "center", width: 34 },
    brandPlus: { color: "#FFFFFF", fontSize: 23, fontWeight: "300", lineHeight: 26, transform: [{ rotate: "45deg" }] },
    brandName: { color: "#173B40", fontSize: 17, fontWeight: "600", letterSpacing: -0.5 },
    brandAccent: { color: "#3B887A", fontWeight: "700" },
    privateText: { color: "#84938F", fontSize: 9, fontWeight: "600", letterSpacing: 0.8 },
    contentShell: { flex: 1, flexDirection: "row" },
    sidebar: {
        backgroundColor: "#F1F7F5",
        borderRightColor: "#DCE8E4",
        borderRightWidth: 1,
        paddingHorizontal: 38,
        paddingTop: 46,
        width: 320,
    },
    sidebarEyebrow: { color: "#318172", fontSize: 10, fontWeight: "700", letterSpacing: 1.2, marginBottom: 10 },
    sidebarTitle: { color: "#173B40", fontSize: 30, fontWeight: "700", letterSpacing: -1, lineHeight: 36, maxWidth: 240 },
    sidebarDescription: { color: "#6D817D", fontSize: 12, lineHeight: 19, marginBottom: 28, marginTop: 12, maxWidth: 245 },
    sidebarNav: { gap: 3 },
    sidebarNavItem: {
        alignItems: "center",
        borderRadius: 11,
        flexDirection: "row",
        minHeight: 57,
        paddingHorizontal: 8,
    },
    sidebarNavItemActive: { backgroundColor: "#E2F0EC" },
    sidebarStepCircle: {
        alignItems: "center",
        backgroundColor: "#E6EFEC",
        borderColor: "#D6E3DF",
        borderRadius: 20,
        borderWidth: 1,
        height: 40,
        justifyContent: "center",
        width: 40,
    },
    stepCircleActive: { backgroundColor: "#2F8072", borderColor: "#2F8072" },
    stepNumber: { color: "#7D918C", fontSize: 11, fontWeight: "700" },
    stepNumberActive: { color: "#FFFFFF" },
    sidebarStepCopy: { flex: 1, marginLeft: 13 },
    sidebarStepLabel: { color: "#96A6A2", fontSize: 8, fontWeight: "700", letterSpacing: 1, marginBottom: 2 },
    sidebarStepLabelActive: { color: "#4C8A80" },
    sidebarStepTitle: { color: "#748783", fontSize: 12, fontWeight: "600", lineHeight: 16 },
    sidebarStepTitleActive: { color: "#1E6259" },
    helpCard: {
        alignItems: "flex-start",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderColor: "#DFE9E6",
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: "row",
        gap: 10,
        marginTop: 24,
        padding: 13,
    },
    helpMark: { alignItems: "center", borderColor: "#A7BDB8", borderRadius: 12, borderWidth: 1, height: 24, justifyContent: "center", width: 24 },
    helpMarkText: { color: "#3D786E", fontSize: 11, fontWeight: "700" },
    helpTitle: { color: "#34534F", fontSize: 11, fontWeight: "700", marginBottom: 2 },
    helpText: { color: "#879994", fontSize: 10 },
    helpPhone: { color: "#397B71", fontSize: 10, fontWeight: "700", marginTop: 2 },
    mobileNav: { marginBottom: 18, marginHorizontal: -16 },
    mobileNavContent: { gap: 8, paddingHorizontal: 16 },
    mobileNavItem: {
        alignItems: "center",
        backgroundColor: "#E9F1EF",
        borderColor: "#DCE7E4",
        borderRadius: 22,
        borderWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    mobileNavItemActive: { backgroundColor: "#E0F0EC", borderColor: "#76A89F" },
    mobileStepCircle: { alignItems: "center", borderRadius: 13, height: 26, justifyContent: "center", width: 26 },
    mobileNavText: { color: "#71847F", fontSize: 11, fontWeight: "600", marginLeft: 2, marginRight: 4 },
    mobileNavTextActive: { color: "#246B60" },
    scrollContent: { paddingBottom: 36, paddingHorizontal: 16, paddingTop: 20 },
    desktopScrollContent: { alignSelf: "center", maxWidth: 760, paddingHorizontal: 34, paddingTop: 46, width: "100%" },
    progressMeta: { flexDirection: "row", justifyContent: "space-between", marginBottom: 9 },
    progressStep: { color: "#81938F", fontSize: 10, fontWeight: "600", letterSpacing: 0.8 },
    progressLabel: { color: "#36796F", fontSize: 11, fontWeight: "600" },
    progressTrack: { backgroundColor: "#E1EAE7", borderRadius: 3, height: 4, marginBottom: 20, overflow: "hidden" },
    progressFill: { backgroundColor: "#38877A", borderRadius: 3, height: 4 },
    card: {
        backgroundColor: "#FFFFFF",
        borderColor: "#E2EBE8",
        borderRadius: 18,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 28,
        shadowColor: "#234944",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.07,
        shadowRadius: 24,
        elevation: 3,
    },
    eyebrow: { color: "#318172", fontSize: 10, fontWeight: "700", letterSpacing: 1.3, marginBottom: 8 },
    title: { color: "#17393E", fontSize: 28, fontWeight: "700", letterSpacing: -1, lineHeight: 34 },
    description: { color: "#78908B", fontSize: 13, lineHeight: 19, marginTop: 7 },
    divider: { backgroundColor: "#E8EFED", height: 1, marginBottom: 25, marginTop: 22 },
    field: { marginBottom: 22 },
    labelRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    label: { color: "#34534F", flex: 1, fontSize: 12, fontWeight: "600", lineHeight: 17 },
    optional: { color: "#9AA9A5", fontSize: 9, fontWeight: "600", letterSpacing: 0.5 },
    measurementHeader: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    measurementTitle: { color: "#34534F", fontSize: 12, fontWeight: "700" },
    unitToggle: {
        backgroundColor: "#EDF3F1",
        borderRadius: 8,
        flexDirection: "row",
        padding: 3,
    },
    unitToggleButton: {
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 7,
    },
    unitToggleButtonActive: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#244A45",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    unitToggleText: { color: "#7C8E89", fontSize: 10, fontWeight: "600" },
    unitToggleTextActive: { color: "#246F64" },
    measurementRow: { flexDirection: "row", gap: 16, marginBottom: 2 },
    heightField: { flex: 2 },
    heightInputs: { flexDirection: "row", gap: 9 },
    measurementInputWrap: { flex: 1, position: "relative" },
    measurementInput: {
        backgroundColor: "#FBFCFC",
        borderColor: "#D8E3E0",
        borderRadius: 9,
        borderWidth: 1,
        color: "#284843",
        fontSize: 14,
        height: 48,
        paddingLeft: 13,
        paddingRight: 39,
    },
    weightField: { flex: 2, paddingStart: 40 },
    inputWrap: { position: "relative" },
    inputWrapMultiline: { minHeight: 104 },
    input: {
        backgroundColor: "#FBFCFC",
        borderColor: "#D8E3E0",
        borderRadius: 9,
        borderWidth: 1,
        color: "#284843",
        fontSize: 14,
        height: 48,
        paddingHorizontal: 13,
    },
    multilineInput: { height: 104, lineHeight: 20, paddingTop: 13 },
    inputWithSuffix: { paddingRight: 55 },
    suffix: { color: "#93A49F", fontSize: 11, position: "absolute", right: 13, top: 17 },
    twoColumn: { flexDirection: "row", gap: 12 },
    half: { flex: 1 },
    choiceRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    choice: {
        alignItems: "center",
        backgroundColor: "#FBFCFC",
        borderColor: "#D8E3E0",
        borderRadius: 9,
        borderWidth: 1,
        flexGrow: 1,
        minWidth: 85,
        paddingHorizontal: 13,
        paddingVertical: 12,
    },
    choiceSelected: { backgroundColor: "#E9F4F1", borderColor: "#3E887C" },
    choiceText: { color: "#617772", fontSize: 12, fontWeight: "500" },
    choiceTextSelected: { color: "#25695F", fontWeight: "700" },
    pressed: { opacity: 0.72 },
    selectButton: {
        alignItems: "center",
        backgroundColor: "#FBFCFC",
        borderColor: "#D8E3E0",
        borderRadius: 9,
        borderWidth: 1,
        flexDirection: "row",
        height: 48,
        justifyContent: "space-between",
        paddingHorizontal: 13,
    },
    selectPlaceholder: { color: "#A4B3AF", flex: 1, fontSize: 14 },
    selectValue: { color: "#284843", flex: 1, fontSize: 14 },
    chevron: { color: "#6D817D", fontSize: 16 },
    optionList: { borderColor: "#D8E3E0", borderRadius: 9, borderWidth: 1, marginTop: 7, overflow: "hidden" },
    option: { alignItems: "center", backgroundColor: "#FFFFFF", borderBottomColor: "#E8EFED", borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: "row", justifyContent: "space-between", padding: 13 },
    optionSelected: { backgroundColor: "#EDF6F4" },
    optionText: { color: "#536B66", flex: 1, fontSize: 13 },
    optionTextSelected: { color: "#27695F", fontWeight: "600" },
    check: { color: "#2D7D70", fontSize: 15, fontWeight: "700" },
    helperText: { color: "#94A49F", fontSize: 10, marginBottom: 10, marginTop: -4 },
    multiSelectGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
    multiSelectOption: {
        alignItems: "center",
        backgroundColor: "#FBFCFC",
        borderColor: "#DCE5E3",
        borderRadius: 9,
        borderWidth: 1,
        flexDirection: "row",
        minHeight: 43,
        padding: 11,
        width: "48%",
    },
    multiSelectOptionSelected: { backgroundColor: "#EDF6F4", borderColor: "#6AA398" },
    multiSelectText: { color: "#627772", flex: 1, fontSize: 11, lineHeight: 15 },
    multiSelectTextSelected: { color: "#27695F", fontWeight: "600" },
    conditionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
    condition: { alignItems: "center", backgroundColor: "#FBFCFC", borderColor: "#DCE5E3", borderRadius: 9, borderWidth: 1, flexDirection: "row", padding: 11, width: "48%" },
    conditionSelected: { backgroundColor: "#EDF6F4", borderColor: "#6AA398" },
    checkbox: { alignItems: "center", borderColor: "#B5C7C2", borderRadius: 4, borderWidth: 1, height: 17, justifyContent: "center", marginRight: 8, width: 17 },
    checkboxSelected: { backgroundColor: "#378578", borderColor: "#378578" },
    checkboxCheck: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
    conditionText: { color: "#627772", flex: 1, fontSize: 11 },
    conditionTextSelected: { color: "#27695F", fontWeight: "600" },
    callout: { backgroundColor: "#EEF7F4", borderColor: "#D5EBE5", borderRadius: 11, borderWidth: 1, flexDirection: "row", marginBottom: 25, padding: 15 },
    calloutMark: { alignItems: "center", borderColor: "#5C998F", borderRadius: 14, borderWidth: 1, height: 28, justifyContent: "center", marginRight: 11, width: 28 },
    calloutMarkText: { color: "#337F73", fontSize: 18 },
    calloutCopy: { flex: 1 },
    calloutTitle: { color: "#2D625A", fontSize: 12, fontWeight: "700", marginBottom: 3 },
    calloutText: { color: "#718B85", fontSize: 11, lineHeight: 16 },
    reviewNote: { backgroundColor: "#F5F9F8", borderRadius: 10, marginTop: 3, padding: 15 },
    reviewTitle: { color: "#2D625A", fontSize: 12, fontWeight: "700", marginBottom: 3 },
    reviewText: { color: "#718B85", fontSize: 11, lineHeight: 16 },
    actions: { alignItems: "center", borderTopColor: "#E8EFED", borderTopWidth: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingTop: 22 },
    backButton: { paddingHorizontal: 3, paddingVertical: 13 },
    backText: { color: "#5E7772", fontSize: 12, fontWeight: "600" },
    primaryButton: { alignItems: "center", backgroundColor: "#246F64", borderRadius: 9, justifyContent: "center", minHeight: 46, paddingHorizontal: 19 },
    primaryButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
    buttonPressed: { backgroundColor: "#1D6258", opacity: 0.9 },
    footer: { color: "#91A29E", fontSize: 10, lineHeight: 15, paddingHorizontal: 25, paddingTop: 18, textAlign: "center" },
    successScreen: { alignItems: "center", flex: 1, justifyContent: "center", padding: 20 },
    successCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#DFEBE7", borderRadius: 20, borderWidth: 1, maxWidth: 520, paddingHorizontal: 30, paddingVertical: 48, shadowColor: "#234944", shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.09, shadowRadius: 28, width: "100%", elevation: 4 },
    successIcon: { alignItems: "center", backgroundColor: "#E4F3EF", borderRadius: 32, height: 64, justifyContent: "center", marginBottom: 21, width: 64 },
    successCheck: { color: "#2E8173", fontSize: 30, fontWeight: "600" },
    successTitle: { color: "#17393E", fontSize: 27, fontWeight: "700", letterSpacing: -0.8, lineHeight: 34, textAlign: "center" },
    successCopy: { color: "#718581", fontSize: 14, lineHeight: 21, marginBottom: 27, marginTop: 12, textAlign: "center" },
});

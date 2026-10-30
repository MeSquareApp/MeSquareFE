import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";
import { getPatientProfile, type PatientProfile } from "@/services/api"
import { useRouter, usePathname } from "expo-router";

export default function Header(){

    const router = useRouter();
    const pathname = usePathname();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]   = useState("");

    useEffect(() => {
        async function loadPatientName() {
            try {
                const data = await getPatientProfile();

                setFirstName(data.user.first_name ?? "");
                setLastName(data.user.last_name ?? "");

            } catch (err) {
                console.error("Failed to load patient name:", err);
            }
        }

        loadPatientName();
    }, []);

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{pathname.substring(pathname.lastIndexOf('/')+1).toUpperCase()}</Text>
        
            {/* user profile */}
            <Pressable onPress={() => router.push("../pages/account")} accessibilityLabel="Account">
                <View style={styles.profileContainer}>
                    <Text style={styles.profileName}>{firstName || "Patient"} {lastName}</Text>
                    <Ionicons name="person-circle-outline" size={30} color="#666666" />
                </View>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create ({
    header: {
        height: Dimensions.get("window").height * 0.1,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
      },
      headerTitle: {
        fontFamily: fonts.bold,
        fontSize: fontsize.lg,
        fontWeight: "700",
        color: colors.black1,
      },
      profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Dimensions.get("window").width * 0.01,
      },
      profileName: {
        fontFamily: fonts.regular,
        fontSize: fontsize.md,
        color: colors.black1,
      },
});
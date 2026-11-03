import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useEffect, useState } from "react";
import { API_AUDIENCE, getCurrentUser } from "@/services/api";
import { useAuth0 } from "react-native-auth0";
import { useRouter, usePathname } from "expo-router";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { getApiCredentials } = useAuth0();
    const cleanPathname = pathname
        .substring(pathname.lastIndexOf("/") + 1)
        .toUpperCase()
        .replace("-", " ");
    const [profileName, setProfileName] = useState("Loading profile...");

    useEffect(() => {
        let isCurrent = true;

        async function loadCurrentUser() {
            try {
                const credentials = await getApiCredentials(API_AUDIENCE);
                const user = await getCurrentUser(credentials.accessToken);
                if (isCurrent) {
                    setProfileName(
                        [user.first_name, user.last_name].filter(Boolean).join(" ") ||
                            "User",
                    );
                }
            } catch (error) {
                console.error("Failed to load authenticated MeSquared user:", error);
                if (isCurrent) {
                    setProfileName("Profile unavailable");
                }
            }
        }

        void loadCurrentUser();
        return () => {
            isCurrent = false;
        };
    }, [getApiCredentials]);

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{cleanPathname}</Text>

            {/* user profile */}
            <Pressable
                onPress={() => router.push("/user/account")}
                accessibilityLabel="Account"
            >
                <View style={styles.profileContainer}>
                    <Text style={styles.profileName}>{profileName}</Text>
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
        paddingRight: Dimensions.get("window").width * 0.05,
        paddingHorizontal: Dimensions.get("window").width * 0.01,
      },
      headerTitle: {
        fontFamily: fonts.regular,
        fontSize: fontsize.lg,
        fontWeight: "700",
        color: colors.black2,
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
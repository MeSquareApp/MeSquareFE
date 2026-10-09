import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";


export default function Dashboard() {
    return (
        <View style={styles.container}>

            {/* ----- NAVBAR ----- */}
            <View style={styles.navbar}>

                {/* logo */}
                <View style={styles.logoContainer}>
                    <Image source={require("../../assets/images/me2-logo.png")} style={styles.logo} />
                </View>

                {/* nav items */}
                <View style={styles.navItems}>
                    {/* dashboard */}
                    <Pressable style={[styles.navItem, styles.activeNavItem]}>
                        <Ionicons name="grid" size={22} color="#FFFFFF" />
                    </Pressable>

                    {/* data log */}
                    <Pressable style={styles.navItem}>
                        <Ionicons name="analytics-outline" size={20} color="#666666" />
                    </Pressable>

                    {/* forecasting */}
                    <Pressable style={styles.navItem}>
                        <Ionicons name="bar-chart-outline" size={20} color="#666666" />
                    </Pressable>

                    {/* account settings */}
                    <Pressable style={styles.navItem}>
                        <Ionicons name="settings-outline" size={20} color="#666666" />
                    </Pressable>            
                </View>

            </View>

            <View style={styles.nonNavContent}>

                {/* ---- HEADER ---- */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Dashboard</Text>

                    {/* user profile */}
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileName}>
                            John Doe
                        </Text>
                        <Ionicons name="person-circle-outline" size={30} color="#666666" />
                    </View>
                </View>

                {/* ---- MAIN CONTENT ---- */}
                <View style={styles.mainContent}>

                    {/* Dashboard content goes here */}

                </View>

                {/* ---- FOOTER ---- */}
                <View style={styles.footer}>

                    <View style={styles.footerLinks}>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                ABOUT US
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                CONTACT US
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                HELP
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                PRIVACY POLICY
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                DISCLAIMER
                            </Text>
                        </Pressable>

                    </View>

                    <Text style={styles.copyright}>
                        Copyright © 2024 Me². All rights reserved.
                    </Text>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
    },

    navbar: {
        width: Dimensions.get("window").width * 0.08,
        backgroundColor: "#FFFFFF",
        borderRightWidth: 1,
        borderRightColor: "#E5E5E5",
        alignItems: "center",
        paddingTop: 20,
    },
    logoContainer: {
        width: Dimensions.get("window").width * 0.07,
        height: Dimensions.get("window").width * 0.07,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: Dimensions.get("window").width * 0.05,
        height: Dimensions.get("window").width * 0.05,
    },
    navItems: {
        marginTop: 80,
        alignItems: "center",
        gap: 25,
    },
    navItem: {
        width: Dimensions.get("window").width * 0.05,
        height: Dimensions.get("window").width * 0.05,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    activeNavItem: {
        backgroundColor: "#303030",
    },

    nonNavContent: {
        flex: 1,
    },

    // ---- HEADER ----
    header:{
        height: Dimensions.get("window").height * 0.1,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#171717",

    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Dimensions.get("window").width * 0.01,
    },
    profileName: {
        fontSize: 15,
        color: "#171717",
    },

    // ---- MAIN CONTENT ----
    mainContent: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: Dimensions.get("window").width * 0.05,
    },

    // ---- FOOTER ----
    footer: {
        height: Dimensions.get("window").height * 0.05,
        borderTopWidth: 1,
        borderTopColor: "#E5E5E5",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    footerLinks: {
        flexDirection: "row",
        alignItems: "center",
        gap: Dimensions.get("window").width * 0.02,
    },
    footerLink: {
        fontSize: 12,
        color: "#202840",
    },
    copyright: {
        fontSize: 12,
        color: "#9699A5",
    },

})
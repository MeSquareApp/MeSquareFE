import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, View } from "react-native";


export default function Dashboard() {
    return (
        <View style={styles.container}>

            {/* ----- NAVBAR ----- */}
            <View style={styles.navbar}>

                {/* logo */}
                <View style={styles.logoContainer}>
                    logo
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
        width: 90,
        backgroundColor: "#FFFFFF",
        borderRightWidth: 1,
        borderRightColor: "#E5E5E5",
        alignItems: "center",
        paddingTop: 20,
    },
    logoContainer: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    navItems: {
        marginTop: 80,
        alignItems: "center",
        gap: 25,
    },
    navItem: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    activeNavItem: {
        backgroundColor: "#303030",
    },
})
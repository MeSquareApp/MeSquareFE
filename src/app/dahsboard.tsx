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
                    <Pressable style={[styles.navItems, styles.activeNavItem]}>
                        <Ionicons name="dashboard" size={27} color="FFFFFF" />
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

    },
    logoContainer: {

    },
    navItems: {

    },
    activeNavItem: {
    },
})
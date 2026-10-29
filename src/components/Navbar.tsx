import { colors } from "@/theme/color";
import { View, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useRouter, usePathname } from "expo-router";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
              <View style={styles.navbar}>
                {/* logo */}
                <View style={styles.logoContainer}>
                  <Image
                    source={require("../../assets/images/me2-logo.png")}
                    style={styles.logo}
                  />
                </View>
        
                {/* nav items */}
                <View style={styles.navItems}>
                  {/* dashboard */}
                  <Pressable style={[styles.navItem, pathname === "/pages/dashboard" && styles.activeNavItem]}
                             onPress={() => router.push("../pages/dashboard")}
                             accessibilityLabel="Dashboard">
                    <Ionicons name="grid" size={22} color={pathname === "/pages/dashboard" ? "#FFFFFF" : colors.gray3} />
                  </Pressable>
        
                  {/* data upload */}
                  <Pressable style={[styles.navItem, pathname === "/pages/dataUpload" && styles.activeNavItem]}
                             onPress={() => router.push("../pages/dataUpload")}
                             accessibilityLabel="Data Upload">
                    <Ionicons name="analytics-outline" size={22} color={pathname === "/pages/dataUpload" ? "#FFFFFF" : colors.gray3} />
                  </Pressable>
        
                  {/* forecasting */}
                  <Pressable style={styles.navItem}
                             onPress={() => router.push("../pages/forecasting")}
                             accessibilityLabel="Forecasting">
                    <Ionicons name="bar-chart-outline" size={22} color={pathname === "/pages/forecasting" ? "#FFFFFF" : colors.gray3} />
                  </Pressable>
        
                  {/* account settings */}
                  <Pressable style={styles.navItem}
                             onPress={() => router.push("../pages/account")}
                             accessibilityLabel="Account Settings">
                    <Ionicons name="settings-outline" size={22} color={pathname === "/pages/account" ? "#FFFFFF" : colors.gray3} />
                  </Pressable>
                </View>
              </View>
    );

}

const styles = StyleSheet.create({
  navbar: {
      width: Dimensions.get("window").width * 0.07,
      backgroundColor: colors.background,
      borderRightWidth: 1,
      borderRightColor: colors.gray5,
      alignItems: "center",
      paddingTop: 20,
    },
    logoContainer: {
      width: Dimensions.get("window").width * 0.04,
      height: Dimensions.get("window").width * 0.04,
      borderWidth: 1,
      borderColor: colors.gray5,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: Dimensions.get("window").width * 0.03,
      height: Dimensions.get("window").width * 0.03,
    },
    navItems: {
      marginTop: 80,
      alignItems: "center",
      gap: 25,
    },
    navItem: {
      width: Dimensions.get("window").width * 0.03,
      height: Dimensions.get("window").width * 0.03,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    activeNavItem: {
      backgroundColor: colors.primary,
    },
  
    nonNavContent: {
      flex: 1,
    }
});
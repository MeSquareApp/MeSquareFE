import { colors } from "@/theme/color";
import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Pressable
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useRouter, usePathname } from "expo-router";

interface NavItemProps {
    label: string;
    iconName: React.ComponentProps<typeof Ionicons>["name"];
    active: boolean;
    onPress: () => void;
}
function NavItem({ label, iconName, active, onPress } : NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={[
        styles.navItem,
        active && styles.activeNavItem
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      accessibilityLabel={label}
    >
      <Ionicons
        name={iconName}
        size={22}
        color={active ? "#FFFFFF" : colors.gray3}
      />

      {/* hover label */}
      {isHovered && (
      <View style={styles.tooltip}>
          {/* Triangle pointer */}
          <View style={styles.hoverNavItem}/>
          <View style={styles.tooltipArrow} />
          <Text style={styles.tooltipText}>
              {label}
          </Text>
      </View>
  )}
    </Pressable>
  );
}

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

          <NavItem
            label=    "Dashboard"
            iconName= "grid"
            active=   {pathname === "/pages/dashboard"}
            onPress=  {() => router.push("../pages/dashboard")}
          />

          <NavItem
            label=    "Data Upload"
            iconName= "analytics-outline"
            active=   {pathname === "/pages/dataUpload"}
            onPress=  {() => router.push("../pages/dataUpload")}
          />

          <NavItem
            label=    "Forecasting"
            iconName= "bar-chart-outline"
            active=   {pathname === "/pages/forecasting"}
            onPress=  {() => router.push("../pages/forecasting")}
          />

          <NavItem
            label=    "Account Settings"
            iconName= "settings-outline"
            active=   {pathname === "/pages/account"}
            onPress=  {() => router.push("../pages/account")}
          />

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
    gap: 30,
  },
  navItem: {
    width: Dimensions.get("window").width * 0.03,
    height: Dimensions.get("window").width * 0.03,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  hoverNavItem: {
    borderColor: colors.primary,
  },
  activeNavItem: {
    backgroundColor: colors.primary,
  },
  tooltip: {
    position: "absolute",
    top: "100%",
    marginTop: 5,
    left: "50%",
    width: 90,
    transform: [{ translateX: -45 }],
    backgroundColor: "#171717",
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    elevation: 8,
  },
  tooltipArrow: {
    position: "absolute",
    top: -4,
    left: "50%",
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#171717",
  },
  tooltipText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },
});
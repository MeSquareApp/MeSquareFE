import { colors } from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function footer(){
    return(
        <View style={styles.footer}>
                  <View style={styles.footerLinks}>
                    <Pressable>
                      <Text style={styles.footerLink}>ABOUT US</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.footerLink}>CONTACT US</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.footerLink}>HELP</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.footerLink}>PRIVACY POLICY</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.footerLink}>DISCLAIMER</Text>
                    </Pressable>
                  </View>
        
                  <Text style={styles.copyright}>
                    Copyright © 2024 Me². All rights reserved.
                  </Text>
                </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        height: Dimensions.get("window").height * 0.05,
        borderTopWidth: 1,
        borderTopColor: colors.gray5,
        flexDirection: "row",
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
        fontFamily: fonts.regular,
        fontSize: 12,
        color: "#202840",
      },
      copyright: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: "#9699A5",
      },
})
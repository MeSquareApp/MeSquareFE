import { ReactNode } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { colors }          from "@/theme/color";
import { fonts, fontsize } from "@/theme/typography";

// bold formatting for text
function Strong({ children }: {children: ReactNode}) {
  return <Text style={styles.bold}>{children}</Text>
}

// section title
function SubHeader({ children }: {children: ReactNode}) {
  return <Text style={styles.disclaimerSubHeader}>{children}</Text>
}

// body text
function Body({ children }: {children: ReactNode}) {
  return <Text style={styles.disclaimerBody}>{children}</Text>
}

// bulleted list. passes in the items as an array of strings.
function Bullets({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>{"\u2022"}</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export default function medicalAdviceDisclaimer(){
  return(
    <View style={styles.container}>
      {/* ----- NAVBAR ----- */}
      <Navbar />

      <View style={styles.nonNavContent}>
        {/* ---- HEADER ---- */}
        <Header />
        <ScrollView style={styles.mainContent}>
          <Text style={styles.disclaimerHeader}>ME² EMERGENCY SERVICES DISCLAIMER</Text>
          <Text style={styles.date}>Effective Date: 11/01/2026</Text>
          <Text style={styles.date}>Last Updated: 11/01/2026</Text>

          

        </ScrollView>
        {/* ---- FOOTER ---- */}
        <Footer/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
  },
  nonNavContent: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingLeft: Dimensions.get("window").width * 0.1,
    paddingRight: Dimensions.get("window").width * 0.25,
    paddingVertical: Dimensions.get("window").height * 0.04,
  },
  disclaimerHeader:{
    fontFamily: fonts.bold,
    fontSize: fontsize.xxl,
    paddingBottom: 10,
    letterSpacing: 1,
  },
  date: {
    color: colors.gray3,
  },
  disclaimerSubHeader:{
    fontFamily: fonts.bold,
    fontSize: fontsize.lg,
    paddingTop: 30,
    paddingBottom: 5,
  },
  disclaimerBody:{
    fontFamily: fonts.regular,
    fontSize: fontsize.md,
    paddingBottom: 10,
    color: colors.gray2,
  },
  bold: {
    fontFamily: fonts.bold,
  },
  bulletList: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  bulletRow: {
    flexDirection: "row",
    paddingBottom: 4,
  },
  bulletDot: {
    fontFamily: fonts.regular,
    fontSize: fontsize.md,
    color: colors.gray2,
    width: 16,
  },
  bulletText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontsize.md,
    color: colors.gray2,
  },
})
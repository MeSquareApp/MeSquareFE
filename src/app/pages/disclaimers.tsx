import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { colors }          from "../../theme/color";
import { fonts, fontsize } from "../../theme/typography";

const DISCLAIMER_LINKS = [
  { title: "Medical Advice Disclaimer",              href: "../pages/disclaimers/medical-advice-disclaimer" },
  { title: "Emergency Services Disclaimer",          href: "../pages/disclaimers/emergency-services-disclaimer" },
  { title: "User-Service Relationship Disclaimer",   href: "../pages/disclaimers/user-service-disclaimer" },
] as const;

export default function Disclaimers(){
  return(
    <View style={styles.container}>
      {/* ----- NAVBAR ----- */}
      <Navbar />

      <View style={styles.nonNavContent}>
        {/* ---- HEADER ---- */}
        <Header />
        <ScrollView style={styles.mainContent}>
          <Text style={styles.disclaimerHeader}>DISCLAIMERS</Text>

          {DISCLAIMER_LINKS.map((item) => (
            <Link key={item.href} href={item.href} style={styles.link}>
              {item.title}
            </Link>
          ))}
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
    paddingBottom: 30,
    letterSpacing: 1,
  },
  link: {
    fontFamily: fonts.regular,
    fontSize: fontsize.lg,
    textDecorationLine: "underline",
    paddingBottom: 16,
  },
})
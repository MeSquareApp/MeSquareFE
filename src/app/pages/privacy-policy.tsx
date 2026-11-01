import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { colors } from "../../theme/color";
import { fonts, fontsize } from "../../theme/typography";

export default function privacys(){
  return(
    <View style={styles.container}>
      {/* ----- NAVBAR ----- */}
      <Navbar />

      <View style={styles.nonNavContent}>
        {/* ---- HEADER ---- */}
        <Header />
        <ScrollView style={styles.mainContent}>
          <Text style={styles.privacyHeader}>PRIVACY POLICY</Text>
          <Text style={styles.dateUpdated}>Last Updated 11/01/2026</Text>

          {/* ---- WEBSITE ---- */}
          {/* created using Termly */}
          <Text style={styles.privacySubHeader}>PRIVACY POLICY</Text>
          <Text style={styles.privacyBody}>
            
          </Text>
        </ScrollView>
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
  privacyHeader:{
    fontFamily: fonts.bold,
    fontSize: fontsize.xxl,
    paddingBottom: 10,
    letterSpacing: 1,
  },
  dateUpdated: {
    color: colors.gray3,
    paddingBottom: 30,
  },
  privacySubHeader:{
    fontFamily: fonts.bold,
    fontSize: fontsize.lg,
    paddingBottom: 5,
  },
  privacyBody:{
    fontFamily: fonts.regular,
    fontSize: fontsize.md,
    paddingBottom: 10,
    color: colors.gray2,
  },
})
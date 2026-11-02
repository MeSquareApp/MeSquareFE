import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { colors }          from "../../theme/color";
import { fonts, fontsize } from "../../theme/typography";

export default function disclaimers(){
  return(
    <View style={styles.container}>
      {/* ----- NAVBAR ----- */}
      <Navbar />

      <View style={styles.nonNavContent}>
        {/* ---- HEADER ---- */}
        <Header />
        <ScrollView style={styles.mainContent}>
          <Text style={styles.disclaimerHeader}>DISCLAIMER</Text>
          <Text style={styles.dateUpdated}>Last Updated 10/31/2026</Text>

          {/* ---- WEBSITE ---- */}
          {/* created using Termly */}
          <Text style={styles.disclaimerSubHeader}>WEBSITE DISCLAIMER</Text>
          <Text style={styles.disclaimerBody}>
            The information provided by [REPLACE WITH COMPANY NAME] ("we," "us," or "our") on http://mesquared.com 
            (the "Site") is for general informational purposes only. All information on the Site is provided in 
            good faith, however we make no representation or warranty of any kind, express or implied, regarding 
            the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site. 
            UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A 
            RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND 
            YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.
          </Text>


          {/* ---- USER SERVICE ---- */}
          <Text style={styles.disclaimerSubHeader}>USER-SERVICE DISCLAIMER</Text>
          <Text style={styles.disclaimerBody}>
           user-service disclaimer goes here
          </Text>

          {/* ---- MEDICAL ADVICE ---- */}
          <Text style={styles.disclaimerSubHeader}>MEDICAL ADVICE DISCLAIMER</Text>
          <Text style={styles.disclaimerBody}>
            medical advice disclaimer goes here
          </Text>

          {/* ---- EMERGENCY SERVICES ---- */}
          <Text style={styles.disclaimerSubHeader}>EMERGENCY SERVICES DISCLAIMER</Text>
          <Text style={styles.disclaimerBody}>
            emergency services disclaimer goes here
          </Text>
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
  dateUpdated: {
    color: colors.gray3,
    paddingBottom: 30,
  },
  disclaimerSubHeader:{
    fontFamily: fonts.bold,
    fontSize: fontsize.lg,
    paddingBottom: 5,
  },
  disclaimerBody:{
    fontFamily: fonts.regular,
    fontSize: fontsize.md,
    paddingBottom: 10,
    color: colors.gray2,
  },
})
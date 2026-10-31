import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { colors } from "../../theme/color";
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
          <Text style={styles.disclaimerSubHeader}>USER SERVICE DISCLAIMER</Text>
          <Text style={styles.disclaimerBody}>
            Me² is a health information and digital twin platform designed
            to help users better understand and monitor their health through personalized
            data analysis, health trends, and predictive insights. By using this service, you
            acknowledge that Me² does not establish a physician-patient relationship between you
            and the platform or its developers.
            {"\n"}
            The information, forecasts, and recommendations provided by Me² are intended for informational
            and educational purposes only and should not be considered medical advice, diagnosis, or treatment.
            The platform is not a substitute for consultation with a qualified healthcare professional.
            Users should consult their healthcare provider before making medical decisions or changes
            to their health routines, medications, or treatment plans.
            {"\n"}
            By continuing to use Me², you acknowledge that health predictions and projections are estimates
            based on available data and may not accurately reflect future health outcomes.
            You remain responsible for decisions regarding your health and medical care.
          </Text>

          {/* ---- PROFESSIONAL ---- */}
          <Text style={styles.disclaimerSubHeader}>PROFESSIONAL DISCLAIMER</Text>
          <Text style={styles.disclaimerBody}>
            The Site cannot and does not contain medical/health advice. The medical/health 
            information is provided for general informational and educational purposes only 
            and is not a substitute for professional advice. Accordingly, before taking any 
            actions based upon such information, we encourage you to consult with the appropriate 
            professionals. We do not provide any kind of medical/health advice. THE USE OR 
            RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.
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
  disclaimerHeader:{
    fontFamily: fonts.bold,
    fontSize: fontsize.xl,
    paddingBottom: 10,
  },
  dateUpdated: {
    color: colors.gray3,
    paddingBottom: 30,
  },
  disclaimerSubHeader:{
    fontFamily: fonts.bold,
    fontSize: fontsize.xl,
    paddingBottom: 5,
  },
  disclaimerBody:{
    fontFamily: fonts.regular,
    fontSize: fontsize.lg,
    paddingBottom: 10,
    color: colors.gray2,
  },
})
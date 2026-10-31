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
import { Bold } from "lucide-react-native";

export default function disclaimers(){
  return(
    <View style={styles.container}>
      {/* ----- NAVBAR ----- */}
      <Navbar />

      <View style={styles.nonNavContent}>
        {/* ---- HEADER ---- */}
        <Header />
        <View style={styles.mainContent}>
          <Text style={styles.disclaimerHeader}>User Service Disclaimer</Text>
          <Text>Me² is a health information and digital twin platform designed
            to help users better understand and monitor their health through personalized
            data analysis, health trends, and predictive insights. By using this service, you
            acknowledge that Me² does not establish a physician-patient relationship between you
            and the platform or its developers.
          </Text>
          <Text>
            The information, forecasts, and recommendations provided by Me² are intended for informational
            and educational purposes only and should not be considered medical advice, diagnosis, or treatment.
            The platform is not a substitute for consultation with a qualified healthcare professional.
            Users should consult their healthcare provider before making medical decisions or changes
            to their health routines, medications, or treatment plans.
          </Text>
          <Text>
            By continuing to use Me², you acknowledge that health predictions and projections are estimates
            based on available data and may not accurately reflect future health outcomes.
            You remain responsible for decisions regarding your health and medical care.
          </Text>
        </View>
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
    fontSize: fontsize.lg,
    paddingBottom: 5,
  },
})
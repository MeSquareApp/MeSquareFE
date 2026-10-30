import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../theme/color";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function forecasting(){
    return(
        <View style={styles.container}>
          {/* ----- NAVBAR ----- */}
          <Navbar />

          <View style={styles.nonNavContent}>
            {/* ---- HEADER ---- */}
            <Header />
          </View>
          {/* ---- FOOTER ---- */}
          <Footer/>
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
})
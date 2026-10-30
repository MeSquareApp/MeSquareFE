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
})
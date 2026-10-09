import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from '../theme/color';
import { fonts, fontsize } from '../theme/typography';


export default function Dashboard() {
    return (
        <View style={styles.container}>

            {/* ----- NAVBAR ----- */}
            <View style={styles.navbar}>

                {/* logo */}
                <View style={styles.logoContainer}>
                    <Image source={require("../../assets/images/me2-logo.png")} style={styles.logo} />
                </View>

                {/* nav items */}
                <View style={styles.navItems}>
                    {/* dashboard */}
                    <Pressable style={[styles.navItem, styles.activeNavItem]}>
                        <Ionicons name="grid" size={25} color="#FFFFFF" />
                    </Pressable>

                    {/* data log */}
                    <Pressable style={styles.navItem}>
                        <Ionicons name="analytics-outline" size={22} color={colors.gray3} />
                    </Pressable>

                    {/* forecasting */}
                    <Pressable style={styles.navItem}>
                        <Ionicons name="bar-chart-outline" size={22} color={colors.gray3} />
                    </Pressable>

                    {/* account settings */}
                    <Pressable style={styles.navItem}>
                        <Ionicons name="settings-outline" size={22} color={colors.gray3} />
                    </Pressable>            
                </View>

            </View>

            <View style={styles.nonNavContent}>

                {/* ---- HEADER ---- */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Dashboard</Text>

                    {/* user profile */}
                    <View style={styles.profileContainer}>
                        <Text style={styles.profileName}>
                            John Doe
                        </Text>
                        <Ionicons name="person-circle-outline" size={30} color="#666666" />
                    </View>
                </View>

                {/* ---- MAIN CONTENT ---- */}
                <View style={styles.mainContent}>

                    {/* digital twin model */}
                    <View style={styles.twinColumn}>
                        <View style={styles.twinHeading}>
                            <Text style={styles.sectionTitle}>Digital Twin Model</Text>
                        </View>

                        <Image source={require("../../assets/images/female_medium.png")}
                               style={styles.twinImage}
                               resizeMode="contain"
                        />

                        {/* placeholder for twin summary info */}
                        <View style={styles.twinStatsPlaceholder}>
                            <View style={styles.twinStatBox}></View>
                            <View style={styles.twinStatBox}></View>
                            <View style={styles.twinStatBox}></View>
                            <View style={styles.twinStatBox}></View>
                        </View>
                    </View>

                    {/* widgets */}
                    <ScrollView style={styles.dashboardScroll}
                                contentContainerStyle={styles.dashboardScrollContent}
                                showsVerticalScrollIndicator={true}>
                    
                        {/* today's metrics */}
                        <View style={styles.dashboardSection}>
                            <Text style={styles.sectionTitle}>
                                Today's Metrics
                            </Text>

                            {/* grid */}
                            <View style={styles.metricsGrid}>
                                {/* Resting Heart Rate */}
                                <View style={styles.metricPlaceholder} />

                                {/* Heart Rate Variability */}
                                <View style={styles.metricPlaceholder} />

                                {/* Blood Pressure */}
                                <View style={styles.metricPlaceholder} />

                                {/* Blood Oxygen */}
                                <View style={styles.metricPlaceholder} />

                                {/* Respiratory Rate */}
                                <View style={styles.metricPlaceholder} />

                                {/* VO2 Max */}
                                <View style={styles.metricPlaceholder} />
                            </View>
                        </View>

                        {/* TRENDS */}
                        <View style={styles.dashboardSection}>
                            <Text style={styles.sectionTitle}>
                                Trends
                            </Text>

                            <View style={styles.trendPlaceholder} />
                        </View>

                        {/* your twin's metrics */}
                        <View style={styles.dashboardSection}>
                            <Text style={styles.sectionTitle}>
                                Your Twin's Metrics
                            </Text>

                            {/* grid */}
                            <View style={styles.metricsGrid}>
                                {/* Apolipoprotein B */}
                                <View style={styles.metricPlaceholder} />
                                {/* Lipoprotein(a) */}
                                <View style={styles.metricPlaceholder} />
                                {/* HDL Cholesterol */}
                                <View style={styles.metricPlaceholder} /> 
                                {/* Non-HDL Cholesterol */}
                                <View style={styles.metricPlaceholder} />
                                {/* Triglycerides */}
                                <View style={styles.metricPlaceholder} />
                                {/* hs-CRP */}
                                <View style={styles.metricPlaceholder} />
                                {/* Hemoglobin A1c */}
                                <View style={styles.metricPlaceholder} />
                                {/* eGFR */}
                                <View style={styles.metricPlaceholder} />
                                {/* Homocysteine */}
                                <View style={styles.metricPlaceholder} />
                                {/* Fibrinogen */}
                                <View style={styles.metricPlaceholder} />
                                {/* Uric acid */}
                                <View style={styles.metricPlaceholder} />
                            </View>
                        </View>

                    </ScrollView>


                </View>

                {/* ---- FOOTER ---- */}
                <View style={styles.footer}>

                    <View style={styles.footerLinks}>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                ABOUT US
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                CONTACT US
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                HELP
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                PRIVACY POLICY
                            </Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>
                                DISCLAIMER
                            </Text>
                        </Pressable>

                    </View>

                    <Text style={styles.copyright}>
                        Copyright © 2024 Me². All rights reserved.
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

    // ---- NAVBAR ----
    navbar: {
        width: Dimensions.get("window").width * 0.07,
        backgroundColor: colors.background,
        borderRightWidth: 1,
        borderRightColor: colors.gray5,
        alignItems: "center",
        paddingTop: 20,
    },
    logoContainer: {
        width: Dimensions.get("window").width * 0.05,
        height: Dimensions.get("window").width * 0.05,
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
        gap: 25,
    },
    navItem: {
        width: Dimensions.get("window").width * 0.03,
        height: Dimensions.get("window").width * 0.03,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    activeNavItem: {
        backgroundColor: colors.primary,
    },

    nonNavContent: {
        flex: 1,
    },

    // ---- HEADER ----
    header:{
        height: Dimensions.get("window").height * 0.1,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    headerTitle: {
        fontFamily: fonts.bold,
        fontSize: fontsize.lg,
        fontWeight: "700",
        color: colors.black1,

    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: Dimensions.get("window").width * 0.01,
    },
    profileName: {
        fontFamily: fonts.regular,
        fontSize: fontsize.md,
        color: colors.black1,
    },

     // ---- MAIN CONTENT ----
    mainContent: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.background,
        minHeight: 0,
    },
    // digital twin model column
    twinColumn: {
        width: "26%",
        minWidth: 220,
        maxWidth: 340,
        borderRightWidth: 1,
        borderRightColor: '#F5F5F5',
        padding: 16,
        alignItems: "stretch",
    },
    twinHeading: {
        marginBottom: 16,
    },
    twinImage: {
        width: "100%",
        height: Dimensions.get("window").height * 0.55,
    },
    twinStatsPlaceholder: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 16,
    },
    twinStatBox: {
        width: "47%",
        height: 58,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 12,
        backgroundColor: colors.background,
    },
    // ---- WIDGETS ----
    dashboardScroll: {
        flex: 1,
        minWidth: 0,
    },
    dashboardScrollContent: {
        padding: Dimensions.get("window").width * 0.05,
        paddingTop: 24,
        paddingLeft: 32,
        paddingBottom: 32,
        gap: 24,
    },
    dashboardSection: {
        width: "100%",
        gap: 12,
    },
    sectionTitle: {
        fontFamily: fonts.regular,
        fontSize: 16,
        fontWeight: "700",
        color: colors.black1,
    },
    // ---- METRIC WIDGET PLACEHOLDERS ----
    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },
    metricPlaceholder: {
        width: "31%",
        height: 125,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 16,
        backgroundColor: colors.background,
    },
    // ---- TRENDS WIDGET PLACEHOLDER ----
    trendPlaceholder: {
        width: "100%",
        height: 210,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 16,
        backgroundColor: colors.background,
    },
    // ---- PLACEHOLDER LABEL ----
    placeholderText: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.gray3,
    },

    // ---- FOOTER ----
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
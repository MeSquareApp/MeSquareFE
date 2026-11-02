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

        {/* ---- Emergency Services and Urgent Care ---- */}
          <SubHeader>Emergency Services and Urgent Care Disclaimer</SubHeader>
          <Body>
            Me² is not an emergency service, emergency dispatch service, crisis response service, hospital, ambulance
            provider, physician practice, or urgent care center. Me² does not provide 911 services, does not contact
            emergency responders on a user’s behalf unless Me² expressly states that a specific feature is available
            and active, and should not be relied upon for any emergency, urgent, life-threatening, or time-sensitive
            medical need.
          </Body>
          <Body>
            If you believe that you or another person may be experiencing a medical emergency, a mental health crisis
            involving imminent danger, a drug overdose, difficulty breathing, chest pain, stroke symptoms, severe
            bleeding, seizure, loss of consciousness, suicidal thoughts with immediate risk, or any other urgent or
            potentially life-threatening condition, do not wait for a response from Me² and do not rely on the Me²
            platform, chat system, digital twin, predictive tools, notifications, or other outputs. Call 911
            immediately, contact local emergency services, or go to the nearest emergency room or urgent medical
            facility right away.
          </Body>
 
          {/* ---- No Emergency Monitoring ---- */}
          <SubHeader>No Emergency Monitoring or Real-Time Intervention</SubHeader>
          <Body>
            Me² is not designed, intended, or guaranteed to continuously monitor users for medical emergencies or
            rapidly worsening conditions. Even if a user submits symptoms, health records, wearable data, medication
            information, laboratory results, messages, or other personal health information into Me², Me² may not
            detect a serious problem, may not recognize that the situation is urgent, may not interpret the
            information correctly, and may not provide a timely or appropriate response.
          </Body>
          <Body>Users must not assume that:</Body>
          <Bullets
            items={[
              "Me² is actively watching their health data in real time;",
              "Me² will identify every urgent symptom, dangerous trend, or medical event;",
              "Me² will generate an alert when emergency treatment is needed;",
              "Me² will notify a physician, caregiver, clinic, hospital, family member, or emergency responder;",
              "Me² will respond immediately to messages or uploaded information; or",
              "Silence, delay, or the absence of a warning from Me² means that no emergency exists.",
            ]}
          />
          <Body>
            The platform may experience delays, outages, transmission failures, incomplete data ingestion, processing
            limitations, model error, inaccurate predictions, communication interruptions, or other technical or
            operational issues. These issues may prevent Me² from receiving, processing, or responding to information
            in time for urgent needs.
          </Body>
 
          {/* ---- AI and Predictive Limitations ---- */}
          <SubHeader>AI and Predictive Limitations in Emergencies</SubHeader>
          <Body>
            Me² may use artificial intelligence, machine learning, predictive analytics, and digital twin modeling to
            help users understand health information, trends, risks, or possible outcomes. These tools are inherently
            limited and may be inaccurate, incomplete, outdated, poorly matched to the user’s actual condition, or
            wrong in ways that are difficult to detect.
          </Body>
          <Body>
            In emergency or rapidly changing situations, these limitations become especially significant. Health
            emergencies may develop suddenly, may depend on facts not available to Me², and may require immediate
            physical examination, diagnostic testing, emergency transport, medication administration, monitoring, or
            direct intervention by trained professionals. Me² cannot perform those functions.
          </Body>
          <Body>
            Users must not use Me² to decide whether emergency care is unnecessary when common sense, symptoms, or
            medical advice suggest otherwise. If there is any reasonable possibility that a condition is urgent or
            dangerous, users should seek immediate in-person care.
          </Body>
 
          {/* ---- When to Call Emergency Services ---- */}
          <SubHeader>When to Call Emergency Services</SubHeader>
          <Body>
            Without limiting the generality of this disclaimer, users should immediately call 911, contact local
            emergency services, or seek immediate emergency care if they or another person experience symptoms or
            events such as:
          </Body>
          <Bullets
            items={[
              "Chest pain, chest pressure, or signs of a possible heart attack;",
              "Sudden weakness, facial drooping, confusion, severe headache, or other possible stroke symptoms;",
              "Shortness of breath, choking, blue lips, or trouble breathing;",
              "Severe allergic reaction, swelling of the face or throat, or anaphylaxis;",
              "Heavy bleeding or bleeding that will not stop;",
              "Loss of consciousness, fainting with concern, unresponsiveness, or inability to wake someone;",
              "Seizure, especially a first seizure, prolonged seizure, or repeated seizures;",
              "Suspected overdose, poisoning, or exposure to dangerous substances;",
              "Suicidal thoughts with immediate intent, self-harm risk, violent behavior, or danger to self or others;",
              "Severe burns, major trauma, broken bones with deformity, head injury, or spinal injury;",
              "Sudden severe abdominal pain, persistent vomiting, or signs of internal bleeding;",
              "Pregnancy-related emergencies, including heavy bleeding, severe pain, or signs of labor complications; or",
              "Any symptom or condition that a reasonable person would consider severe, alarming, rapidly worsening, or potentially life-threatening.",
            ]}
          />
          <Body>
            These examples are illustrative only and are not a complete list of emergencies. A user does not need Me²
            to confirm that an emergency exists before seeking emergency care.
          </Body>
 
          {/* ---- Mental Health ---- */}
          <SubHeader>Mental Health and Behavioral Crisis Situations</SubHeader>
          <Body>
            Me² is not a crisis hotline and is not a substitute for emergency psychiatric care, suicide prevention
            services, or licensed mental health professionals in crisis situations. If a user is in immediate
            emotional distress, believes they may harm themselves or others, or is experiencing a psychiatric
            emergency, they should call 911, call or text 988 in the United States if appropriate, contact local
            crisis services, or go to the nearest emergency room immediately.
          </Body>
          <Body>
            Users should not rely on chatbot responses, digital twin outputs, or delayed platform messaging during a
            mental health emergency or crisis situation.
          </Body>
 
          {/* ---- No Duty to Dispatch ---- */}
          <SubHeader>No Duty to Dispatch or Contact Others</SubHeader>
          <Body>
            Unless Me² expressly and separately offers a specific emergency escalation feature under written terms
            that clearly state otherwise, Me² does not undertake any duty to contact emergency responders, physicians,
            caregivers, family members, law enforcement, or other third parties when a user enters troubling symptoms,
            asks urgent questions, uploads alarming health records, or appears to be in danger.
          </Body>
          <Body>
            A user is responsible for seeking help directly. If a user wants another person, caregiver, or provider to
            be informed during an emergency, the user must make those arrangements independently and should not assume
            Me² will do so.
          </Body>
 
          {/* ---- No Guarantee of Immediate Response ---- */}
          <SubHeader>No Guarantee of Immediate Response</SubHeader>
          <Body>
            Any messages, chats, notifications, alerts, or support channels associated with Me² may be delayed,
            queued, interrupted, unavailable, or never seen in time to help with an emergency. User communications may
            be affected by internet access, software issues, account problems, device failures, third-party service
            interruptions, or processing delays. For that reason, no feature of Me² should be used as a substitute for
            immediately contacting emergency services.
          </Body>
 
          {/* ---- Not for Emergency Decision-Making ---- */}
          <SubHeader>Not for Emergency Decision-Making</SubHeader>
          <Body>Users must not rely on Me² to make decisions such as:</Body>
          <Bullets
            items={[
              "Whether to call 911;",
              "Whether to go to the emergency room;",
              "Whether to wait and see if symptoms improve;",
              "Whether to stop, delay, or avoid urgent treatment;",
              "Whether another person is safe to be left alone; or",
              "Whether a crisis is serious enough to require immediate intervention.",
            ]}
          />
          <Body>
            If there is doubt, the safer course is to contact emergency services or an appropriate urgent care
            provider immediately.
          </Body>
 
          {/* ---- Uploaded Data ---- */}
          <SubHeader>Special Risk for Uploaded Data and Retrospective Analysis</SubHeader>
          <Body>
            Information entered into Me² may be reviewed, processed, or analyzed after the moment of greatest urgency
            has passed. Historical data, uploaded documents, wearable feeds, lab results, and user-entered forms may
            not be reviewed in real time and may not trigger immediate action. A user must not submit urgent or
            life-threatening concerns through routine upload, chat, or form channels expecting prompt intervention.
          </Body>
 
          {/* ---- Geographic Limits ---- */}
          <SubHeader>Geographic and Service Availability Limits</SubHeader>
          <Body>
            Emergency numbers and emergency service systems vary by jurisdiction. Users are responsible for contacting
            the appropriate local emergency number and obtaining immediate assistance in their location. Me² does not
            guarantee that emergency information, guidance, or references provided through the platform will be
            correct for every country, state, or locality.
          </Body>
 
          {/* ---- Dependents ---- */}
          <SubHeader>Dependents, and Assisted Users</SubHeader>
          <Body>
            Guardians, caregivers, and other responsible adults must not rely on Me² as a substitute for direct
            supervision or emergency judgment regarding a dependent adult, elderly person, or other individual
            receiving assistance. If such a person may be experiencing an emergency, the responsible adult should
            contact emergency services or seek immediate medical attention without waiting for Me² to respond.
          </Body>
 
          {/* ---- User Responsibility ---- */}
          <SubHeader>User Responsibility to Act Promptly</SubHeader>
          <Body>
            By using Me², users acknowledge and agree that they remain solely responsible for recognizing potential
            emergencies and promptly seeking appropriate in-person emergency care. Me² is intended, if at all, only as
            a supplemental informational and analytical tool and not as a mechanism for obtaining emergency response,
            emergency triage, or guaranteed urgent medical intervention.
          </Body>
          <Body>
            Users further acknowledge that waiting for an AI response, prediction, trend update, or chat interaction
            can worsen outcomes in a true emergency. Immediate contact with emergency responders or in-person medical
            professionals is the proper course whenever urgent circumstances may exist.
          </Body>
 
          {/* ---- No Waiver ---- */}
          <SubHeader>No Waiver of Need for Professional Emergency Care</SubHeader>
          <Body>
            Nothing in Me², including any message, health insight, score, prediction, summary, recommendation,
            reassurance, lack of warning, or other platform output, should be interpreted as meaning that emergency
            treatment is unnecessary. Even if Me² suggests that a condition appears low risk, stable, non-urgent, or
            suitable for monitoring, that output may be incorrect. Users should disregard the platform and seek
            emergency care whenever symptoms, circumstances, or professional medical advice indicate that emergency
            evaluation may be needed.
          </Body>
 
          {/* ---- Recommended Emergency Instruction ---- */}
          <SubHeader>Recommended Emergency Instruction</SubHeader>
          <Body>
            Me² recommends that users keep access to local emergency numbers, know the location of the nearest
            emergency room or urgent care center, and contact licensed medical professionals promptly when serious
            symptoms arise. In the event of a possible emergency, the user should stop using Me² for that issue and
            immediately contact emergency services or proceed to the nearest appropriate medical facility.
          </Body>
 
          {/* ---- Acknowledgment ---- */}
          <SubHeader>Acknowledgment</SubHeader>
          <Body>By using Me², the user acknowledges that:</Body>
          <Bullets
            items={[
              "Me² is not an emergency service and is not monitored as an emergency channel;",
              "Me² may fail to identify urgent or life-threatening conditions;",
              "Responses, alerts, or analyses may be delayed, unavailable, incomplete, or incorrect;",
              "The user must independently determine when emergency assistance is needed; and",
              "In any suspected emergency, the user should immediately call 911, contact local emergency services, call or text 988 for mental health crisis support where appropriate, or go to the nearest emergency facility.",
            ]}
          />
          <Body>
            This disclaimer should be read broadly to promote user safety and to prevent reliance on Me² in any
            circumstance where emergency or urgent medical intervention may be required.
          </Body>
          

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
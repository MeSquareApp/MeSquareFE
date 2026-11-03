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
          <Text style={styles.disclaimerHeader}>ME² MEDICAL ADVICE DISCLAIMER</Text>
          <Text style={styles.date}>Effective Date: 11/01/2026</Text>
          <Text style={styles.date}>Last Updated: 11/01/2026</Text>

          <SubHeader>Important Notice</SubHeader>
          <Body>
            Me² is a health-related software application designed to help users organize, interpret, and interact with
            personal health information through digital twin technology, data-driven analytics, predictive tools,
            and conversational artificial intelligence. Although Me² may provide summaries, observations, predictions,
            trend analyses, educational information, or responses to user questions about health-related topics,{" "}
            <Strong>Me² does not provide medical advice, medical diagnosis, or medical treatment.</Strong>
          </Body>
          <Body>
            All information, outputs, predictions, recommendations, summaries, alerts, analyses, risk indicators,
            chat responses, and other content generated, displayed, or communicated by Me² are provided for{" "}
            <Strong>informational and educational purposes only.</Strong> They are intended to support user awareness and
            discussion, not to replace clinical judgment, professional evaluation, or individualized care from a
            licensed healthcare provider.
          </Body>
 
          {/* ---- Not a Substitute ---- */}
          <SubHeader>Not a Substitute for Professional Medical Care</SubHeader>
          <Body>
            Me² is <Strong>not</Strong> a doctor, nurse, hospital, clinic, emergency service, pharmacy, therapist, psychiatrist, or
            other licensed medical professional. Use of Me² does not create a physician-patient relationship,
            therapist-patient relationship, provider-patient relationship, fiduciary relationship, or any other formal
            clinical relationship between you and Me², its developers, operators, affiliates, staff, researchers, or
            technology providers.
          </Body>
          <Body>
            No feature of Me²—including its digital twin functions, prediction models, health analysis tools, data
            visualizations, trend projections, or large language model chat interface—should be relied upon as a
            substitute for:
          </Body>
          <Bullets
            items={[
              "Professional medical advice;",
              "Medical diagnosis;",
              "Treatment planning;",
              "Medication management;",
              "Interpretation of laboratory or imaging results by a licensed clinician;",
              "Surgical or procedural decision-making;",
              "Mental health evaluation or intervention;",
              "Emergency assessment or crisis response; or",
              "Any other decision that should be made with qualified medical oversight.",
            ]}
          />
          <Body>
            You should always seek the advice of a licensed physician or other qualified healthcare professional with
            any questions you may have regarding a medical condition, symptoms, diagnosis, treatment options,
            medication use, test results, or changes to your health.
          </Body>
 
          {/* ---- Possibility of Error ---- */}
          <SubHeader>Possibility of Error, Inaccuracy, or Incomplete Information</SubHeader>
          <Body>
            Me² uses user-provided information, uploaded medical records or summaries, information supplied with user
            authorization, external reference data, machine learning systems, predictive models, and conversational AI
            tools to generate its outputs. Because of the nature of these systems, Me² may at times produce content
            that is incomplete, outdated, incorrect, misleading, oversimplified, poorly contextualized, or not
            applicable to your specific medical circumstances.
          </Body>
          <Body>For example, Me² may:</Body>
          <Bullets
            items={[
              "Misunderstand or incorrectly summarize information entered or uploaded by a user;",
              "Rely on incomplete, inaccurate, delayed, or inconsistently formatted health data;",
              "Fail to account for important medical history, coexisting conditions, allergies, contraindications, or recent clinical developments;",
              "Generate predictions that do not reflect real-world outcomes;",
              "Provide generalized responses that are not appropriate for your age, condition, risk profile, or treatment history;",
              "Misinterpret health trends or assign significance to changes that are clinically unimportant;",
              "Fail to recognize urgent, severe, or unusual symptoms;",
              "Produce responses that sound confident even when they are uncertain or wrong; or",
              "Provide suggestions or educational information that should not be followed without professional review.",
            ]}
          />
          <Body>
            Artificial intelligence and predictive systems are inherently limited. A personalized digital twin, no
            matter how sophisticated, is only a model based on available inputs, assumptions, and statistical methods.
            It cannot fully capture the complexity of a living human being, the full context of clinical
            decision-making, or the professional judgment of a trained healthcare provider.
          </Body>
 
          {/* ---- No Guarantee ---- */}
          <SubHeader>No Guarantee of Accuracy or Clinical Validity</SubHeader>
          <Body>
            Me² makes no representation, warranty, or guarantee that any content generated by the platform is accurate,
            complete, reliable, clinically validated for your use case, or suitable for making health decisions without
            independent professional review.
          </Body>
          <Body>
            Any projections, forecasts, estimated outcomes, medication or procedure response predictions, risk scores,
            current health analyses, wellness observations, or similar outputs are only probabilistic or inferential in
            nature. They are not guarantees of present condition or future outcomes. Even when a result appears
            personalized, it may still be subject to significant uncertainty, data limitations, modeling limitations,
            or interpretation error.
          </Body>
          <Body>
            You acknowledge that health-related information generated by Me² may be wrong, and that acting on incorrect
            information could result in harm, including delayed care, inappropriate self-treatment, worsening symptoms,
            medication errors, unnecessary anxiety, or failure to obtain timely medical attention.
          </Body>
 
          {/* ---- Supplementary Tool ---- */}
          <SubHeader>Use Me² Only as a Supplementary Tool</SubHeader>
          <Body>
            Me² should be used, if at all, only as a supplementary tool to help users organize information, notice
            possible patterns, prepare questions for a healthcare appointment, or better understand topics they may
            wish to discuss with qualified professionals. It is not intended to independently determine what care you
            need, whether you should start or stop a medication, whether you should undergo a procedure, whether a
            symptom is serious, or whether you are medically stable.
          </Body>
          <Body>
            Before making any decision about your health, including whether to seek care, change treatment, begin or
            stop medication, adjust dosage, ignore symptoms, pursue or avoid testing, or rely on a prediction or
            analysis generated by Me², you should consult an appropriately licensed healthcare professional.
          </Body>
 
          {/* ---- No Medication Instructions ---- */}
          <SubHeader>No Medication, Procedure, or Treatment Instructions</SubHeader>
          <Body>
            Although Me² may discuss medications, procedures, therapies, possible side effects, outcomes, comparative
            options, or general health concepts, nothing generated by Me² should be treated as a prescription,
            treatment order, dosing instruction, clinical recommendation, clearance, or approval.
          </Body>
          <Body>You should never:</Body>
          <Bullets
            items={[
              "Start, stop, substitute, or adjust any medication based solely on Me² output;",
              "Change dosage or timing of medication based solely on Me² output;",
              "Delay filling or taking prescribed medication because of Me² output;",
              "Agree to, decline, postpone, or cancel a surgery, procedure, test, or treatment based solely on Me² output; or",
              "Use Me² as the sole basis for making decisions involving high-risk care, chronic disease management, pregnancy-related care, behavioral health treatment, pediatric care, or care for older adults or vulnerable individuals.",
            ]}
          />
          <Body>
            Medication decisions and procedural decisions should be made only in consultation with qualified
            clinicians who can evaluate your full medical history, current status, and applicable risks.
          </Body>
 
          {/* ---- User Responsibility ---- */}
          <SubHeader>User Responsibility and Independent Judgment</SubHeader>
          <Body>
            By using Me², you agree that you are responsible for evaluating how, whether, and to what extent you use
            any information generated by the platform. You are responsible for verifying important information with
            qualified healthcare professionals before taking action.
          </Body>
          <Body>
            You should use your own judgment and seek professional guidance, especially where the information
            concerns:
          </Body>
          <Bullets
            items={[
              "Diagnosis or possible diagnosis;",
              "Worsening or unexplained symptoms;",
              "Abnormal test or laboratory findings;",
              "Drug interactions, contraindications, or allergies;",
              "Pregnancy, fertility, reproductive health, or postpartum care;",
              "Mental health symptoms or crisis situations;",
              "Pediatric or geriatric care;",
              "Chronic disease management;",
              "Surgical or procedural decisions; or",
              "Any situation where delay could increase medical risk.",
            ]}
          />
          <Body>
            If any output from Me² conflicts with the advice of a licensed healthcare professional, the healthcare
            professional’s advice should be prioritized.
          </Body>
 
          {/* ---- Limits of Personalization ---- */}
          <SubHeader>Limits of Data-Driven Personalization</SubHeader>
          <Body>
            Me² may use your consented data to develop and maintain a personalized digital twin intended to help
            generate more individualized outputs. However, personalized does not mean clinically correct, medically
            appropriate, or safe to follow without review.
          </Body>
          <Body>
            The quality of any output depends heavily on the quality, quantity, recency, completeness, and context of
            the data available to the system. If your data is missing, outdated, inaccurate, incomplete, not
            representative of your present health, or lacking important clinical context, Me²’s outputs may be
            materially flawed.
          </Body>
          <Body>
            Even where substantial data is available, health outcomes are influenced by many factors that may not be
            captured or measurable, including genetics, environment, adherence, clinician observations, evolving
            symptoms, social factors, undocumented history, diagnostic nuance, and unforeseen complications. For this
            reason, no digital twin or predictive engine can be relied upon as a definitive or authoritative source of
            medical judgment.
          </Body>
 
          {/* ---- Conversational AI ---- */}
          <SubHeader>Conversational AI Limitations</SubHeader>
          <Body>
            Me² may include a chatbot or large language model interface that allows users to ask health-related
            questions and receive conversational responses. Such responses are generated algorithmically and may
            appear natural, personalized, or authoritative, but they are not professional medical opinions.
          </Body>
          <Body>
            Conversational AI systems can generate false statements, omit important warnings, misunderstand context,
            overstate certainty, or present generalized educational material as though it were directly applicable to
            an individual. Users should not assume that a detailed or confident answer is accurate simply because it is
            well-written or responsive.
          </Body>
          <Body>
            Any health-related response generated through Me²’s conversational tools should be independently reviewed
            and, where appropriate, confirmed with a licensed healthcare professional.
          </Body>
 
          {/* ---- No Monitoring ---- */}
          <SubHeader>No Monitoring Obligation</SubHeader>
          <Body>
            Me² does not undertake any duty to continuously monitor your health, detect emergencies, review every user
            input in real time, contact emergency responders, alert your physician, or intervene if a response,
            symptom pattern, or uploaded record suggests medical risk.
          </Body>
          <Body>
            Unless Me² explicitly and separately states otherwise in writing for a specific service, users should
            assume that the platform is not actively monitored by clinicians for urgent issues and may not detect or
            respond to dangerous developments in time for effective intervention.
          </Body>
 
          {/* ---- Limitation of Reliance ---- */}
          <SubHeader>Limitation of Reliance</SubHeader>
          <Body>
            To the fullest extent permitted by applicable law, you agree that any reliance on Me² or its outputs is at
            your own risk. Me² disclaims responsibility for losses, injuries, damages, or adverse outcomes arising from
            or related to reliance on any health-related content, trend analysis, prediction, alert, recommendation,
            summary, or chat response generated by the platform.
          </Body>
          <Body>
            This includes, without limitation, harm arising from delayed diagnosis, delayed treatment, self-treatment,
            changes to medication use, failure to seek care, reliance on inaccurate predictions, misunderstanding of
            health information, or decisions made without appropriate professional consultation.
          </Body>
          <Body>
            Nothing in this disclaimer is intended to limit any rights that cannot lawfully be waived under applicable
            law. However, users should not interpret any feature of Me² as a promise of safe, accurate, or
            clinician-equivalent medical guidance.
          </Body>
 
          {/* ---- When to Speak With a Professional ---- */}
          <SubHeader>When to Speak With a Healthcare Professional</SubHeader>
          <Body>You should promptly consult a licensed healthcare professional if you:</Body>
          <Bullets
            items={[
              "Have new, concerning, worsening, or persistent symptoms;",
              "Receive abnormal test, imaging, or laboratory results;",
              "Are considering a medication, dosage, or treatment change;",
              "Are deciding whether to undergo a procedure or surgery;",
              "Are pregnant, may be pregnant, or are managing reproductive or postpartum health issues;",
              "Are experiencing mental health distress;",
              "Believe Me² has produced an inaccurate, incomplete, or concerning result; or",
              "Need advice tailored to your specific medical history and current condition.",
            ]}
          />
 
          {/* ---- Acceptance ---- */}
          <SubHeader>Acceptance of This Disclaimer</SubHeader>
          <Body>
            By accessing or using Me², you acknowledge that you understand and agree that Me² is a supplemental
            informational tool only, that its health-related outputs may be inaccurate or inappropriate, and that it is
            not a replacement for licensed medical professionals or emergency services.
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
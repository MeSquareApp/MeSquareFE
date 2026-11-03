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

export default function userServiceDisclaimer(){
  return(
    <View style={styles.container}>
      {/* ----- NAVBAR ----- */}
      <Navbar />

      <View style={styles.nonNavContent}>
        {/* ---- HEADER ---- */}
        <Header />
        <ScrollView style={styles.mainContent}>
          <Text style={styles.disclaimerHeader}>ME² USER-SERVICE DISCLAIMER</Text>
          <Text style={styles.date}>Effective Date: 11/01/2026</Text>
          <Text style={styles.date}>Last Updated: 11/01/2026</Text>

          {/* ---- Purpose ---- */}
          <SubHeader>Purpose of This Disclaimer</SubHeader>
          <Body>
            This User-Service Relationship Disclaimer explains the nature of the relationship between the user and Me²
            when accessed, services used, registered for, uploaded information to, or otherwise interact with the Me²
            platform, including any websites, mobile applications, dashboards, digital twin features, machine learning
            outputs, predictive tools, chat interfaces, and related services made available.
          </Body>
          <Body>
            By using Me², you acknowledge that your relationship with Me² is limited to the use of a technology
            platform that collects, organizes, analyzes, and presents information and model-generated outputs based on
            data that you provide, data you authorize us to collect, and other data sources we may lawfully use. Your
            use of Me² does not create any special legal, medical, fiduciary, employment, partnership, agency, or
            advisory relationship beyond the limited platform-user relationship expressly described in this disclaimer
            and any applicable terms.
          </Body>
 
          {/* ---- Technology Service ---- */}
          <SubHeader>Me² Is a Technology Service, Not a Health Care Provider</SubHeader>
          <Body>
            Me² is a technology-based service designed to help users aggregate health-related information, generate a
            personalized digital twin, and receive data-informed outputs, trends, analyses, and conversational
            responses through software tools. Me² is not a hospital, physician practice, clinic, pharmacy, laboratory,
            insurer, emergency service, or licensed health care provider. Me² does not hold itself out as providing
            medical treatment, nursing services, physician services, clinical supervision, emergency intervention, or
            direct patient care through the platform itself.
          </Body>
          <Body>
            Your use of the service does not establish a doctor-patient relationship, therapist-patient relationship,
            nurse-patient relationship, provider-patient relationship, or any other licensed professional-client
            relationship between you and Me², between you and the platform’s operators, or between you and any
            automated systems made available through the service, unless a separate written agreement expressly states
            otherwise.
          </Body>
 
          {/* ---- No Provider-Patient ---- */}
          <SubHeader>No Provider-Patient or Clinical Care Relationship</SubHeader>
          <Body>
            Although Me² may process health-related information and generate predictions, summaries, estimates,
            pattern identification, or other outputs that concern your health status, possible future trends,
            medications, procedures, or wellness-related topics, those functions do not create a clinical care
            relationship. The platform does not assume responsibility for diagnosing medical conditions, prescribing
            treatments, selecting medications, determining clinical appropriateness, or managing your care.
          </Body>
          <Body>
            No feature within Me², including any chatbot, digital twin, forecasting engine, analysis dashboard,
            uploaded record review feature, or personalized output, should be interpreted as creating an ongoing duty
            of care, a professional standard-of-care obligation, or a continuing responsibility to monitor your health,
            identify emergencies, prevent harm, or ensure that any recommendation, warning, or omission is clinically
            appropriate for your specific circumstances.
          </Body>
 
          {/* ---- No Human Monitoring ---- */}
          <SubHeader>No Human Professional Is Automatically Monitoring You</SubHeader>
          <Body>
            Unless Me² expressly notifies you that a specific licensed professional is assigned to review particular
            information, you should assume that your use of the platform is not being actively monitored in real time
            by a doctor, nurse, therapist, pharmacist, or other licensed clinician. Uploading information, entering
            symptoms, asking questions, or receiving model-generated responses does not mean that a qualified medical
            professional has reviewed your information, approved the content, or assumed responsibility for follow-up.
          </Body>
          <Body>
            Me² has no obligation to identify urgent conditions, contact emergency services, escalate concerning
            information, remind you to obtain care, or intervene on your behalf. You remain responsible for deciding
            when to seek medical attention and for contacting qualified professionals or emergency services when
            needed.
          </Body>
 
          {/* ---- User Responsibility for Information ---- */}
          <SubHeader>User Responsibility for Information Provided to the Service</SubHeader>
          <Body>
            Your relationship with Me² also depends on the information made available to the platform. Me² may rely on
            data you provide directly, data you upload, data shared by a physician or clinic with your authorization,
            and data collected with your consent. If that information is incomplete, inaccurate, inconsistent,
            outdated, poorly formatted, mislabeled, or missing important context, the platform’s outputs may be
            flawed.
          </Body>
          <Body>
            You remain responsible for reviewing the information you submit, obtaining any necessary permissions before
            sharing third-party information, and updating inaccurate or outdated information where the platform allows.
            Me² does not independently verify every statement, record, file, or metric associated with your account,
            and the platform may produce misleading outputs if the underlying data is wrong.
          </Body>
 
          {/* ---- Availability ---- */}
          <SubHeader>No Guarantee of Continuous Availability or Monitoring</SubHeader>
          <Body>
            The relationship between you and Me² is that of a user accessing a software service that may change,
            pause, degrade, or become unavailable. Me² does not guarantee continuous availability, uninterrupted
            access, immediate responsiveness, or error-free operation. Features may be modified, suspended, improved,
            removed, or limited at any time.
          </Body>
          <Body>
            Because the platform is not a live clinical monitoring system unless expressly stated otherwise in
            writing, you should not soley rely on Me² for time-sensitive surveillance, emergency alerts, or immediate
            intervention. Delays, outages, software bugs, integration failures, upload errors, model drift, or data
            synchronization problems may affect what the platform displays or fails to display.
          </Body>
 
          {/* ---- Insurance ---- */}
          <SubHeader>No Insurance, Coverage, or Payment Relationship</SubHeader>
          <Body>
            Using Me² does not create a relationship under which Me² is acting as your health insurer, benefits
            administrator, reimbursement provider, or claims processor. Me² does not promise that any service,
            recommendation, medication, or procedure discussed through the platform will be covered by insurance,
            reimbursable, cost-effective, or approved by any payer.
          </Body>
          <Body>
            Any payment relationship you may have with Me² for subscription, access, premium functionality, or related
            services is a commercial relationship for access to the platform and does not transform Me² into a medical
            provider or guarantor of outcomes.
          </Body>
 
          {/* ---- Communications ---- */}
          <SubHeader>Communications Through the Service</SubHeader>
          <Body>
            When you communicate with Me² through forms, uploads, chat interfaces, email-linked account features, or
            other digital channels, you are communicating with a software platform and, in some cases, authorized
            personnel who support the operation of the service. Those communications do not, by themselves, establish
            confidentiality protections beyond those described in applicable policies and law, and they do not create a
            professional engagement requiring individualized diagnosis, treatment planning, or emergency response.
          </Body>
          <Body>
            Responses generated through automated systems may be produced without human review. Even when support staff
            respond, they may be addressing technical, administrative, or general informational issues rather than
            delivering licensed professional care or advice.
          </Body>
 
          {/* ---- Third Parties ---- */}
          <SubHeader>Relationship to Third-Party Providers and Data Sources</SubHeader>
          <Body>
            Me² may receive data from users, health care professionals, clinics, laboratories, wearable devices,
            software integrations, or other authorized sources. However, those third parties are generally independent
            from Me² unless explicitly identified otherwise. Me² is not automatically responsible for the acts,
            omissions, professional judgments, recordkeeping practices, or data quality of third-party providers or
            institutions.
          </Body>
          <Body>
            Similarly, a physician, clinic, hospital, or other health professional who shares information with Me²
            does not, solely by doing so, become an employee, partner, or agent of Me². The existence of data sharing or
            integration does not mean that Me² directs clinical judgment, supervises medical professionals, or assumes
            liability for independent care decisions made outside the platform.
          </Body>
 
          {/* ---- No Endorsement ---- */}
          <SubHeader>No Endorsement of User Interpretation</SubHeader>
          <Body>
            Me² may provide summaries, trend lines, forecasts, classifications, comparisons, or conversational outputs
            that users may find useful. However, the platform does not endorse any particular interpretation you make
            from those outputs. A user’s interpretation of platform content may be mistaken, incomplete, or taken out
            of context.
          </Body>
          <Body>
            You should not treat silence, the absence of warnings, the absence of concerning indicators, or the
            presence of reassuring language as confirmation that no medical issue exists. Likewise, you should not
            treat a flagged risk, predictive score, or concerning output as a confirmed diagnosis or final clinical
            conclusion.
          </Body>
 
          {/* ---- Adult Use / Representatives ---- */}
          <SubHeader>Adult Use, Authorized Representatives, and Dependents</SubHeader>
          <Body>
            If Me² allows a parent, guardian, caregiver, or other authorized representative to manage data or interact
            with the platform on behalf of another person, that arrangement does not change the core nature of the
            Me²-user relationship. Me² still operates as a technology service, not as a substitute for professional
            medical or legal authority. Users and authorized representatives remain responsible for ensuring that they
            have appropriate authority to act, submit information, access records, and make decisions about how
            platform outputs are used.
          </Body>
 
          {/* ---- Updates ---- */}
          <SubHeader>Me² May Update the Service Relationship Terms</SubHeader>
          <Body>
            As the platform evolves, Me² may update how features work, how users interact with the service, what data
            sources are supported, and how automated systems generate outputs. Me² may revise this disclaimer and
            related policies to reflect those changes. Continued use of the platform after updates may constitute
            acknowledgment of the revised relationship terms to the extent permitted by applicable law.
          </Body>
 
          {/* ---- Acknowledgment ---- */}
          <SubHeader>User Acknowledgment of Service Boundaries</SubHeader>
          <Body>
            By creating an account, accessing the service, submitting information, or using any Me² feature, you
            acknowledge and agree that:
          </Body>
          <Bullets
            items={[
              "Me² is providing access to a software-based health information and analytics platform;",
              "Me² is not your doctor, nurse, therapist, pharmacist, hospital, clinic, or emergency responder;",
              "The service may generate inaccurate, incomplete, or inappropriate outputs;",
              "No provider-patient or other licensed professional relationship is formed through ordinary use of the platform;",
              "Me² does not undertake a duty to monitor you continuously or intervene in emergencies;",
              "You are responsible for seeking qualified professional advice and care when needed; and",
              "Your use of the service is subject to the boundaries and limitations described in this disclaimer and any related terms or policies.",
            ]}
          />

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
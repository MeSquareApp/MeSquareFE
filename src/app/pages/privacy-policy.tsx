import { ReactNode } from "react";
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { colors } from "../../theme/color";
import { fonts, fontsize } from "../../theme/typography";

// bold formatting for text
function Strong({ children }: {children: ReactNode}) {
  return <Text style={styles.bold}>{children}</Text>
}

// section title
function SubHeader({ children }: {children: ReactNode}) {
  return <Text style={styles.disclaimerSubHeader}>{children}</Text>
}

// smaller sub-header
function SubSubHeader({ children }: { children: ReactNode }) {
       return <Text style={styles.disclaimerSubSubHeader}>{children}</Text>;
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

export default function privacys(){
  return(
    <View style={styles.container}>
      {/* ----- NAVBAR ----- */}
      <Navbar />

      <View style={styles.nonNavContent}>
        {/* ---- HEADER ---- */}
        <Header />
        <ScrollView style={styles.mainContent}>
          <Text style={styles.disclaimerHeader}>PRIVACY POLICY</Text>
          <Text style={styles.date}>Effective Date: 11/01/2026</Text>
          <Text style={styles.date}>Last Updated: 11/01/2026</Text>

          {/* ---- Intro ---- */}
          <Body>
            {'\n\n'}
            Me² (“Me²,” “we,” “us,” or “our”) is committed to protecting the privacy, confidentiality, and security of
            the personal information and health-related information that users choose to share with us. This Privacy
            Statement explains what information we collect, how we collect it, how we use it, when we may share it, the
            choices and rights available to users, and the steps we take to protect that information.
          </Body>
          <Body>
            Me² is designed to help users build and interact with a personalized digital twin using health-related
            data they provide or authorize us to collect. Me² is not a substitute for licensed medical care, emergency
            treatment, diagnosis, or direct physician oversight. Users should always seek qualified medical advice for
            medical concerns and should not delay or disregard professional medical care based on information provided
            through Me². Please see the additional disclaimers for more on this topic.
          </Body>
          <Body>
            By using Me², submitting information to us, or authorizing others to share your information with us, you
            acknowledge that you have read and understood this Privacy Statement.
          </Body>
 
          {/* ---- 1. Scope ---- */}
          <SubHeader>1. Scope of This Privacy Statement</SubHeader>
          <Body>This Privacy Statement applies to information collected through:</Body>
          <Bullets
            items={[
              "The Me² website, mobile application, and related services;",
              "User-submitted intake forms, questionnaires, and profile entries;",
              "Files and records uploaded by users, including health summaries, medical reports, and laboratory results;",
              "Information provided to us by healthcare professionals, clinics, physicians, or other authorized third parties when the user has granted appropriate consent or authorization and;",
              "Conversations between a user and Me²’s chatbot, digital twin, or other AI-powered features.",
            ]}
          />
          <Body>
            This Privacy Statement does not apply to third-party websites, devices, health platforms, or services that
            may connect to Me² but operate under their own privacy policies.
          </Body>
 
          {/* ---- 2. Information We Collect ---- */}
          <SubHeader>2. Information We Collect</SubHeader>
          <Body>
            We may collect the following categories of information, depending on how a user interacts with Me² and
            what the user consents to share.
          </Body>
 
          <SubSubHeader>A. Account and Contact Information</SubSubHeader>
          <Bullets
            items={[
              "Name",
              "Email address",
              "Date of birth",
              "Contact information",
              "Profile and account preferences",
              "Authentication and account security information, such authentication tokens or similar credentials managed by us or our authentication provider",
              "Login activity and related security information, such as IP address, login timestamps, and security event logs",
            ]}
          />
 
          <SubSubHeader>B. Health and Health-Related Information</SubSubHeader>
          <Bullets
            items={[
              "Medical history",
              "Diagnoses and conditions",
              "Symptoms and self-reported health status",
              "Medications, treatments, allergies, and procedures",
              "Lab results, imaging summaries, and clinical notes",
              "Family health history",
              "Vital signs and biometric information",
              "Lifestyle information, such as sleep, exercise, nutrition, and habits",
              "Mental wellness or behavioral health information voluntarily provided by the user",
              "Predictive health outputs, wellness insights, or model-generated assessments derived from submitted data",
            ]}
          />
 
          <SubSubHeader>C. Uploaded Documents and Records</SubSubHeader>
          <Bullets
            items={[
              "Medical summaries",
              "Laboratory reports",
              "Physician notes",
              "Insurance- or provider-related forms, if submitted",
              "Other files and supporting documentation the user chooses to upload",
            ]}
          />
 
          <SubSubHeader>D. AI and Chat Interaction Data</SubSubHeader>
          <Bullets
            items={[
              "Questions submitted to the Me² chatbot or digital twin interface",
              "Messages, prompts, and responses",
              "Context needed to personalize chatbot interactions",
              "User feedback, corrections, or preferences provided during AI interactions",
            ]}
          />
 
          <SubSubHeader>E. Technical and Usage Information</SubSubHeader>
          <Bullets
            items={[
              "Device information",
              "Browser type and operating system",
              "IP address",
              "Log information",
              "Cookie and similar technology data, where applicable",
              "Diagnostic, troubleshooting, and analytics information",
            ]}
          />
 
          <SubSubHeader>F. Information From Authorized Third Parties</SubSubHeader>
          <Body>We may receive information from:</Body>
          <Bullets
            items={[
              "Physicians, clinics, hospitals, and healthcare professionals;",
              "Caregivers or authorized representatives;",
              "Laboratories or testing providers;",
              "Connected services or platforms approved by the user; and",
              "Other third parties the user has instructed or authorized to share information with Me².",
            ]}
          />
          <Body>
            We collect such information only when we believe appropriate consent, authorization, or other lawful
            permission has been provided.
          </Body>
 
          {/* ---- 3. How We Collect ---- */}
          <SubHeader>3. How We Collect Information</SubHeader>
          <Body>We collect information in several ways, including:</Body>
          <Bullets
            items={[
              "Directly from the user when the user fills out forms, creates an account, chats with Me², uploads records, or otherwise submits information;",
              "From healthcare providers or other authorized third parties when the user has consented to that sharing;",
              "Automatically through normal operation of our website, application, and systems;",
              "From user-authorized integrations or data connections, such as through wearable technology; and",
              "From our third-party authentication and identity management providers when users register, sign in, maintain sessions, or otherwise use account security features.",
            ]}
          />
          <Body>
            We collect only the information we reasonably need to operate, improve, secure, and personalize Me²,
            subject to user consent and applicable law.
          </Body>
 
          {/* ---- 4. How We Use ---- */}
          <SubHeader>4. How We Use Information</SubHeader>
          <Body>
            We may use personal information and health-related information for the following purposes:
          </Body>
 
          <SubSubHeader>A. To Provide the Me² Service</SubSubHeader>
          <Bullets
            items={[
              "Create and maintain user accounts",
              "Build, update, and operate a user’s personalized digital twin",
              "Provide health-related summaries, analysis, trends, and predictions",
              "Enable users to upload, organize, and review their health information",
              "Personalize the Me² experience based on user data and preferences",
            ]}
          />
 
          <SubSubHeader>B. To Support AI and Predictive Features</SubSubHeader>
          <Bullets
            items={[
              "Provide contextual responses through our chatbot or LLM-based interface",
              "Generate user-specific insights, trends, forecasts, or simulation outputs",
              "Support features that estimate possible health trends, medication responses, treatment outcomes, or procedure-related considerations",
              "Improve the relevance and continuity of interactions with the user’s digital twin",
            ]}
          />
 
          <SubSubHeader>C. To Operate, Maintain, and Improve Our Platform</SubSubHeader>
          <Bullets
            items={[
              "Monitor functionality, performance, reliability, and security",
              "Debug technical issues and maintain system integrity",
              "Analyze product usage and feature performance",
              "Conduct internal testing, validation, quality assurance, and safety review",
            ]}
          />
 
          <SubSubHeader>D. To Communicate With Users</SubSubHeader>
          <Bullets
            items={[
              "Send account-related notices and service updates",
              "Respond to support requests or user questions",
              "Notify users of material changes to our services, policies, or practices",
            ]}
          />
 
          <SubSubHeader>E. To Comply With Legal or Safety Obligations</SubSubHeader>
          <Bullets
            items={[
              "Meet legal, regulatory, contractual, or compliance requirements",
              "Protect the rights, safety, and security of users, Me², and others",
              "Detect, investigate, and prevent fraud, misuse, abuse, or unauthorized activity",
            ]}
          />
 
          {/* ---- 5. Health Data and AI Model Training ---- */}
          <SubHeader>5. How We Use Health Data and AI Model Training</SubHeader>
          <Body>
            Me² uses health-related information primarily to create and maintain each user’s personalized digital twin
            and to provide individualized outputs through our platform.
          </Body>
 
          <SubSubHeader>Personal Digital Twin Use</SubSubHeader>
          <Body>A user’s personal data may be used to:</Body>
          <Bullets
            items={[
              "Train, calibrate, and refine that user’s individual digital twin;",
              "Provide personalized predictions, trend analyses, and current health-related summaries; and",
              "Enable contextual interactions with Me²’s chatbot or LLM interface so it can respond based on the user’s own information and patterns.",
            ]}
          />
 
          <SubSubHeader>Use of User Data for General Model Training</SubSubHeader>
          <Body>
            As a default principle, Me² does not use a user’s personal health data to train general-purpose or
            cross-user predictive models unless the user has given clear consent for that use.
          </Body>
          <Body>
            If Me² ever seeks to use user data beyond operating that user’s own digital twin or delivering the
            requested service, we will describe that use and, where required, obtain separate consent.
          </Body>
 
          <SubSubHeader>AI Limitations</SubSubHeader>
          <Body>
            Although Me² may provide health-related insights, forecasts, or conversational responses, AI-generated
            outputs may be incomplete, inaccurate, or inappropriate for a user’s specific medical circumstances. Me²
            does not guarantee that any prediction, summary, or recommendation is medically correct, clinically
            validated for all use cases, or suitable as a substitute for professional judgment.
          </Body>
 
          {/* ---- 6. Consent ---- */}
          <SubHeader>6. Consent and User Control</SubHeader>
          <Body>
            We collect and use health-related information only when the user has provided it directly, has authorized
            us to collect it, or when another lawful basis exists under applicable law.
          </Body>
          <Body>Where required, we will ask for consent before:</Body>
          <Bullets
            items={[
              "Collecting certain sensitive or health-related information;",
              "Receiving health records from a provider, physician, clinic, or other third party;",
              "Connecting to external data sources; or",
              "Using user information for purposes beyond providing the core Me² service.",
            ]}
          />
          <Body>
            Users may withdraw consent for certain data uses, subject to legal, contractual, technical, or operational
            limitations. Withdrawal of consent may affect our ability to provide some or all features of Me².
          </Body>
 
          {/* ---- 7. Sharing ---- */}
          <SubHeader>7. When We Share Information</SubHeader>
          <Body>
            We do not sell personal health information in the ordinary sense of exchanging it for money. We may share
            information only as described below and only to the extent reasonably necessary.
          </Body>
 
          <SubSubHeader>A. Service Providers and Vendors</SubSubHeader>
          <Body>
            We may share information with trusted service providers that help us operate Me², such as cloud hosting
            providers, security vendors, data storage providers, authentication and identity management vendors, or
            other contractors performing services on our behalf. These parties are expected to protect information and
            use it only for authorized purposes.
          </Body>
          <Body>
            For example, if Me² uses a third-party authentication provider such as Auth0 to support account creation,
            sign-in, session management, or account security, that provider may process account and security-related
            information such as name, email address, username, login credentials, authentication tokens, IP address,
            device/browser information, login activity, and related security logs. We use this type of provider to
            authenticate users, manage accounts, maintain platform security, and detect or prevent fraud, misuse, or
            unauthorized access. Me² does not use such providers for the purpose of selling personal information.
          </Body>
 
          <SubSubHeader>B. Healthcare Providers or Authorized Recipients</SubSubHeader>
          <Body>We may share information with physicians, clinics, caregivers, or other third parties when:</Body>
          <Bullets
            items={[
              "The user requests or authorizes the disclosure;",
              "The disclosure is necessary to provide a requested feature or service; or",
              "The disclosure is otherwise permitted or required by law.",
            ]}
          />
 
          <SubSubHeader>C. Legal, Safety, and Compliance Disclosures</SubSubHeader>
          <Body>We may disclose information if we believe doing so is necessary to:</Body>
          <Bullets
            items={[
              "Comply with applicable law, regulation, court order, subpoena, or lawful process;",
              "Enforce our terms, policies, or agreements;",
              "Protect the rights, property, safety, and security of Me², our users, or others; or",
              "Investigate fraud, misuse, abuse, or security incidents.",
            ]}
          />
 
          <SubSubHeader>D. Corporate Transactions</SubSubHeader>
          <Body>
            If Me² is involved in a merger, acquisition, financing, reorganization, sale of assets, or similar
            transaction, user information may be transferred as part of that process, subject to applicable
            confidentiality and legal protections.
          </Body>
 
          <SubSubHeader>E. De-Identified or Aggregated Information</SubSubHeader>
          <Body>
            We may use and disclose information that has been de-identified, anonymized, or aggregated so that it does
            not reasonably identify an individual, as permitted by law.
          </Body>
 
          {/* ---- 8. Privacy Rights ---- */}
          <SubHeader>8. User Privacy Rights</SubHeader>
          <Body>
            Depending on where a user lives and the laws that apply, users may have the right to:
          </Body>
          <Bullets
            items={[
              "Know whether we collect, use, or disclose their personal information;",
              "Access the personal information we maintain about them;",
              "Request correction of inaccurate or incomplete information;",
              "Request deletion of some or all of their information, subject to legal exceptions;",
              "Withdraw consent for certain processing activities;",
              "Request a copy of certain information in a portable format, where applicable;",
              "Limit or object to certain uses of their information, where applicable;",
              "Appeal certain privacy-related decisions, where required by law; and",
              "Opt out of certain non-essential communications or processing activities where applicable.",
            ]}
          />
          <Body>Users may exercise applicable rights by contacting us at 
            <Text style={styles.link} onPress={() => Linking.openURL(`mailto:support.mesquared@gmail.com`)}>
               support.mesquared@gmail.com
            </Text>
      .</Body>
          <Body>
            Before fulfilling certain requests, we may need to verify the user’s identity or authority to act on
            behalf of another individual.
          </Body>
          <Body>
            We will not discriminate against users for exercising applicable privacy rights, subject to lawful and
            operational limitations.
          </Body>
 
          {/* ---- 9. Retention ---- */}
          <SubHeader>9. Data Retention</SubHeader>
          <Body>We retain information for as long as reasonably necessary to:</Body>
          <Bullets
            items={[
              "Provide and maintain Me²;",
              "Preserve a user’s account and digital twin functionality;",
              "Fulfill the purposes described in this Privacy Statement;",
              "Comply with legal, regulatory, tax, accounting, audit, or contractual obligations;",
              "Resolve disputes; and",
              "Enforce our agreements.",
            ]}
          />
          <Body>
            Retention periods may vary depending on the type of information, how it was obtained, the user’s settings,
            legal obligations, and whether continued retention is necessary for safety, integrity, or legitimate
            business purposes.
          </Body>
          <Body>
            When information is no longer needed, we will delete it, de-identify it, or securely dispose of it as
            appropriate and reasonably practicable.
          </Body>
 
          {/* ---- 10. Security ---- */}
          <SubHeader>10. Data Security</SubHeader>
          <Body>
            We use administrative, technical, and physical safeguards designed to protect personal information and
            health-related information from unauthorized access, loss, misuse, alteration, or disclosure.
          </Body>
          <Body>These safeguards may include:</Body>
          <Bullets
            items={[
              "Access controls and authentication measures;",
              "Encryption in transit and, where appropriate, at rest;",
              "Role-based access restrictions;",
              "Audit logging and monitoring;",
              "Secure storage and vendor management practices;",
              "Use of third-party identity and access management tools, such as Auth0, for account protection, authentication workflows, and session management; and",
              "Incident detection and response procedures.",
            ]}
          />
          <Body>
            Me² currently stores user information in Supabase, a database service company. Access to user data is
            intended to be limited to authorized administrative personnel and service providers with a legitimate need
            to know for purposes such as operating the service, troubleshooting, security, legal compliance, or
            fulfilling authorized requests. We do not promise that user data will never be viewed by a human; instead,
            we seek to limit such access through role-based permissions, internal controls, logging, and oversight.
          </Body>
          <Body>
            Our authentication and account security providers may use cookies, tokens, SDKs, or similar technologies
            that are reasonably necessary to maintain secure sign-in sessions, authenticate users, or help protect
            accounts.
          </Body>
          <Body>
            However, no method of transmission, storage, or security is completely secure. As a result, we cannot
            guarantee absolute security.
          </Body>
          <Body>
            Users are also responsible for maintaining the confidentiality of their account credentials and for
            notifying us if they suspect unauthorized access.
          </Body>
 
          {/* ---- 11. HIPAA ---- */}
          <SubHeader>11. HIPAA and Health Information</SubHeader>
          <Body>
            Me² may receive, store, process, or display health-related information, including information received from
            healthcare professionals or providers with user authorization. However, not all health information handled
            by Me² is necessarily protected health information (PHI) under the Health Insurance Portability and
            Accountability Act of 1996 (HIPAA).
          </Body>
          <Body>
            Whether HIPAA applies depends on the role Me² plays, the source of the information, the relationship
            between Me² and healthcare providers or health plans, and whether Me² is acting as a covered entity,
            business associate, or neither under applicable law.
          </Body>
          <Body>For example:</Body>
          <Bullets
            items={[
              "Information a user uploads directly to Me² may not be subject to HIPAA, even though it is still highly sensitive and protected under this Privacy Statement and other applicable laws.",
              "Information disclosed to Me² by a healthcare provider pursuant to a valid authorization or business arrangement may be subject to HIPAA or contractual privacy and security obligations.",
            ]}
          />
          <Body>
            Me² currently uses Supabase to store user information. Any PHI stored in their database should do so only
            in an environment configured for HIPAA-related use, including any required business associate agreement,
            HIPAA add-on, and high-compliance or similar security settings made available by the provider, together
            with appropriate logging, encryption, and access controls. Me² will also ensure that only authorized
            personnel and authorized vendors may access such information for permitted purposes.
          </Body>
          <Body>
            If Me² acts as a business associate or otherwise becomes subject to HIPAA obligations in a particular
            context, Me² intends to handle applicable PHI in accordance with HIPAA and its implementing regulations,
            including appropriate privacy, security, and breach notification requirements.
          </Body>
          <Body>
            Me² will carefully evaluate whether third-party authentication or identity providers receive, store,
            transmit, or can access information that qualifies as PHI. If so, additional contractual, technical, and
            compliance measures may be required, including consideration of whether a business associate agreement is
            necessary.
          </Body>
 
          {/* ---- 12. AI Chat ---- */}
          <SubHeader>12. AI Chat and Sensitive Information Notice</SubHeader>
          <Body>
            The Me² chatbot or conversational AI features may access personal health information and user-specific
            context in order to provide more personalized responses.
          </Body>
          <Body>By using these features, users understand that:</Body>
          <Bullets
            items={[
              "The chatbot may use prior user-provided health information and trends to generate responses;",
              "Responses are generated by automated systems and may not always be accurate, complete, or appropriate;",
              "The chatbot is not a doctor, nurse, therapist, pharmacist, or emergency service;",
              "Chatbot responses should not be treated as a medical diagnosis, prescription, or definitive treatment recommendation; and",
              "Users should contact a qualified healthcare professional for medical concerns and emergency services for urgent or life-threatening situations.",
            ]}
          />
          <Body>
            Users should avoid relying solely on AI-generated responses for decisions involving urgent care,
            diagnosis, medication changes, procedures, or other medical decisions without professional review.
          </Body>
 
          {/* ---- 13. Children ---- */}
          <SubHeader>13. Children’s Privacy</SubHeader>
          <Body>
            Me² is not intended for use by users under 18 years of age unless expressly permitted and appropriately
            authorized by a parent, guardian, or legally authorized representative and allowed by applicable law.
          </Body>
          <Body>
            If we learn that we have collected information from a child in violation of applicable law or our
            policies, we will take steps to delete or restrict that information as appropriate.
          </Body>
 
          {/* ---- 14. International and State ---- */}
          <SubHeader>14. International and State-Specific Privacy Considerations</SubHeader>
          <Body>
            Users may have additional privacy rights under applicable state, federal, or international laws, depending
            on where they reside and how Me² operates.
          </Body>
          <Body>
            These may include rights under consumer privacy, health privacy, biometric privacy, or data protection
            laws. If Me² offers services in jurisdictions with specific notice or consent requirements, we may provide
            supplemental privacy disclosures or obtain additional permissions where required.
          </Body>
          <Body>
            Because Me² may use third-party infrastructure providers, such as authentication providers, certain
            account, security, or service data may be processed or stored in jurisdictions outside a user’s home state
            or country, subject to applicable law and appropriate safeguards.
          </Body>
 
          <SubSubHeader>Virginia Residents</SubSubHeader>
          <Body>
            If Me² is subject to the Virginia Consumer Data Protection Act, Me² will provide Virginia residents with
            the disclosures and rights required by that law, including notice of the categories of personal data
            processed, the purpose of processing, the categories of personal data shared with third parties, the
            categories of third parties with whom personal data is shared, and the methods by which consumers may
            exercise applicable rights and appeal a denied request.
          </Body>
          <Body>
            Where the Virginia Consumer Data Protection Act applies, Me² will not process sensitive data without the
            consumer’s consent, will establish secure and reliable methods for consumers to submit privacy requests,
            and will not sell or offer for sale precise geolocation data concerning a consumer.
          </Body>
 
          {/* ---- 15. Changes ---- */}
          <SubHeader>15. Changes to This Privacy Statement</SubHeader>
          <Body>
            We may update this Privacy Statement from time to time to reflect changes in our practices, technologies,
            legal obligations, or services.
          </Body>
          <Body>
            If we make material changes, we may provide notice through the app, website, email, or other appropriate
            means. The updated version will be posted with a revised effective date.
          </Body>
          <Body>
            Continued use of Me² after an updated Privacy Statement becomes effective may constitute acceptance of the
            revised terms, to the extent permitted by law.
          </Body>
 
          {/* ---- 16. Contact ---- */}
          <SubHeader>16. Contact Us</SubHeader>
          <Body>
            If you have questions, concerns, or requests regarding this Privacy Statement or our privacy practices,
            please contact us at:
          </Body>
          <Body>
            <Strong>Me² Privacy Team</Strong>
            {"\n"}Email: 
            <Text style={styles.link} onPress={() => Linking.openURL(`mailto:support.mesquared@gmail.com`)}>
               support.mesquared@gmail.com
            </Text>
            {"\n"}Address: 3625 Potomac Ave. Alexandria, VA 22305, United States
          </Body>
          <Body>
            If you are an authorized representative making a request on behalf of a user, we may require documentation
            verifying your authority.
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
  disclaimerSubSubHeader: {
    fontFamily: fonts.bold,
    fontSize: fontsize.md,
    paddingTop: 15,
    paddingBottom: 5,
    color: colors.gray2,
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
  link: {
    color: colors.primary,
    textDecorationLine: "underline",
    paddingLeft: 5,
  },
})
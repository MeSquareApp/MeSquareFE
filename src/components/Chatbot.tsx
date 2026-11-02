import { X } from "lucide-react-native"; // Import X icon
import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { colors } from "../theme/color";

// Add onClose prop to the component signature
export default function Chatbot({ onClose }: { onClose: () => void }) {
  const faqDatabase = [
    {
      keywords: ["log", "data", "tracking", "record"],
      question: "How do I log my data?",
      answer:
        "You can log your data by navigating to the 'Log your data' tab in the top menu. From there, you can input your daily metrics directly or sync them from your health apps.",
    },
    {
      keywords: ["doctor", "upload", "files", "physician"],
      question: "Where can my doctor upload files?",
      answer:
        "Your doctor can create an account and upload files on your behalf in the data upload page. Make sure to add your doctor as a medical professional in your account settings!",
    },
    {
      keywords: ["account", "create", "sign up"],
      question: "How do I create an account?",
      answer:
        "You can create an account by selecting 'Sign Up' on the login screen. You'll just need your email and basic health details to get started.",
    },
  ];

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: "Hi! I am Twinny, your Digital Health Assistant. How can I help you today?",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
    };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setShowQuickReplies(false);

    setTimeout(() => {
      const lowerInput = textToSend.toLowerCase();

      const match = faqDatabase.find((faq) =>
        faq.keywords.some((keyword) => lowerInput.includes(keyword)),
      );

      const botResponseText = match
        ? match.answer
        : "I'm still learning! I can help with logging data, account creation, or doctor uploads. Could you rephrase?";

      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponseText,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.outerFrame}>
        {/* Header Row with Close Button */}
        <View style={styles.headerRow}>
          <View style={styles.headerSpacer} />{" "}
          {/* Spacer to center the title */}
          <Text style={styles.headerTitle}>Twinny Chatbot Assistant</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        <View style={styles.innerChatArea}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
            contentContainerStyle={styles.scrollContent}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  msg.sender === "user" ? styles.userRow : styles.botRow,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    msg.sender === "user"
                      ? styles.userBubble
                      : styles.botBubble,
                  ]}
                >
                  <Text
                    style={
                      msg.sender === "user" ? styles.userText : styles.botText
                    }
                  >
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}

            {showQuickReplies && (
              <View style={styles.quickReplyContainer}>
                {faqDatabase.map((faq, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickReplyButton}
                    onPress={() => handleSend(faq.question)}
                  >
                    <Text style={styles.quickReplyText}>{faq.question}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Enter your message"
              placeholderTextColor={colors.gray4}
              onSubmitEditing={() => handleSend(prompt)}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => handleSend(prompt)}
            >
              <Text style={styles.sendButtonText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  outerFrame: {
    width: "90%",
    maxWidth: 400,
    height: "75%", // Changed to % to fit better in modals on different screens
    maxHeight: 650,
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 16,
    shadowColor: colors.black1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerSpacer: {
    width: 24, // Matches the width of the close icon
  },
  headerTitle: {
    color: colors.background,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    padding: 4,
  },
  innerChatArea: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    overflow: "hidden",
    padding: 10,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  userRow: {
    justifyContent: "flex-end",
  },
  botRow: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.black1,
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 4,
  },
  userText: {
    color: colors.black1,
    fontSize: 14,
  },
  botText: {
    color: colors.background,
    fontSize: 14,
  },
  quickReplyContainer: {
    alignItems: "flex-end",
    marginTop: 10,
    gap: 8,
  },
  quickReplyButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: colors.secondaryLight + "20",
  },
  quickReplyText: {
    color: colors.secondaryDark,
    fontSize: 12,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.gray5,
    paddingTop: 10,
    marginTop: "auto",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.black1,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sendButtonText: {
    color: colors.background,
    fontSize: 16,
    marginLeft: 2,
  },
});

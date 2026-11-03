import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/color";

export default function FileUpload() {
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: true });
    if (!result.canceled) setFiles(result.assets);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>File Upload</Text>
      <Pressable onPress={pickFile} style={styles.button}>
        <Text style={styles.buttonText}>Browse Files</Text>
      </Pressable>
      {files.length > 0 &&
        files.map((f) => (
          <Text key={f.uri} style={styles.fileName}>
            {f.name}
          </Text>
        ))}
      <Text style={styles.body}>
        Data Logging UI to be implemented later on in Sprint 3...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 20 },
  heading: { fontSize: 38, fontWeight: "600", marginBottom: 8, marginTop: 50 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    width: 175,
    alignItems: "center",
    marginTop: 100,
  },
  buttonText: { color: "white", fontWeight: "600" },
  fileName: { marginTop: 8 },
  body: { marginTop: 40, textAlign: "center" },
});

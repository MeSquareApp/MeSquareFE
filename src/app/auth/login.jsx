import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
    // const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        //more login authentication logic here once database is setup
    }

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <Text
                style={{
                    color: "black",
                    fontSize: 32,
                    justifyContent: 'center',
                    marginBottom: 20
                }}
            >
                Login
            </Text>

            <TextInput
                placeholder="username"
                placeholderTextColor="grey"
                onChangeText={setUsername}
                value={username}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="username"
                color="black"
                marginTop="25"
            />

            <TextInput
                placeholder="password"
                placeholderTextColor="grey"
                onChangeText={setPassword}
                value={password}
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry
                color="black"
            />
            <Link
                style={{
                    color: "white",
                    fontSize: 15,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: "red",
                    backgroundColor: "red",
                    padding: 10,
                    borderRadius: 5,
                    textAlign: 'center',
                    marginBottom: 10
                }}
                href="/pages/dashboard"
            > Log In
            </Link>

            <Text
                style={{
                    color: "black",
                    fontSize: 15,
                    marginTop: 20
                }}
            >
                Don't have an account?
            </Text>

            <Link
                style={{
                    color: "white",
                    fontSize: 15,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: "red",
                    backgroundColor: "red",
                    padding: 10,
                    borderRadius: 5
                }}
                href="/auth/signUp"
            >
                Create Account
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
    input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5, color: 'black' },
})
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            {/* Constrained form container for clean layout */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Log In</Text>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    placeholder="Enter your username"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={setUsername}
                    value={username}
                    style={styles.input}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={setPassword}
                    value={password}
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry
                />

                <Link href="/pages/dashboard" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
                </Link>

                <Text style={styles.footerText}>
                    Don't have an account?
                </Text>

                <Link href="/auth/signUp" asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA', // Clean light background
        padding: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400, // Keeps the form narrow and centered like the sketch
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 30,
        fontFamily: 'Atkinson Hyperlegible',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
        fontFamily: 'Atkinson Hyperlegible',
    },
    input: {
        width: '100%',
        backgroundColor: '#E5E7EB', // Light grey boxes
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        fontFamily: 'Atkinson Hyperlegible',
        color: '#111827',
    },
    button: {
        backgroundColor: '#14B8A6', // Teal button
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Atkinson Hyperlegible',
    },
    footerText: {
        color: '#6B7280',
        fontSize: 15,
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Atkinson Hyperlegible',
    }
});
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../../../lib/supabase';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try {
            console.log('Logging in with:', username, password);
            // Note: supabase.auth.signInWithPassword usually takes an email. 
            // If you are using a custom username login, ensure your Supabase auth is configured for it.
            const { data, error } = await supabase.auth.signInWithPassword({
                email: username, // Assuming username is the email here
                password: password
            });

            if (error) {
                Alert.alert('Login Error', error.message);
            } else if (data.session) {
                const { data: userData, error: userFetchError } = await supabase.auth.getUser();

                if (userFetchError || !userData?.user) {
                    console.error('Failed to fetch logged-in user:', userFetchError);
                    Alert.alert('User Not Found', 'Failed to fetch user data');
                    return;
                }
                const loggedInUser = userData.user;

                const { data: existingUser, error: fetchError } = await supabase
                    .from('users')
                    .select('id')
                    .eq('id', loggedInUser.id)
                    .maybeSingle();

                if (fetchError) {
                    console.error('Error checking existing user:', fetchError);
                    return;
                }

                if (existingUser && existingUser.id === data.user?.id) {
                    router.replace('/pages/dashboard');
                } else {
                    console.log('New user detected, insert into users table');
                    const { error: insertError } = await supabase.from('users').insert([{
                        id: data.user?.id,
                        // Fixed: changed 'email' to 'username' to prevent a crash
                        email: username,
                    }]);

                    if (insertError) {
                        console.error('Error inserting new user:', JSON.stringify(insertError, null, 2));
                        Alert.alert('Error inserting UserID', 'You already have an existing account.');
                        return;
                    }
                }
            } else {
                Alert.alert('Login Failed', 'No session returned from Authentication');
            }
        } catch (err) {
            Alert.alert('Unexpected Error', err.message);
        }
    }

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
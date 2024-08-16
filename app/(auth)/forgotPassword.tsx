import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await sendPasswordResetEmail(
                auth,
                email,
            );

            router.replace("/");
        } catch (error) {
            const errorMessage = (error as Error).message;
            Alert.alert("Error in Forgot Password: ", errorMessage);
        }
    };

    return (
        <View className="p-4 flex-1 justify-center items-center bg-slate-200">
            <View className="w-full space-y-3">
                <Text className="text-3xl font-bold text-center mb-2">
                    Forgot Password
                </Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    className="grow p-3 rounded-md bg-slate-100"
                />
                <TouchableOpacity onPress={handleSubmit} className="p-4 rounded-lg bg-yellow-400">
                    <Text className="text-white font-semibold text-center">
                        Send
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/register")}>
                    <Text className="font-medium text-center">
                        Don't have an account?{" "}
                        <Text className="text-blue-600">Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ForgotPassword;

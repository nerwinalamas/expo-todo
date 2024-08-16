import { useTogglePasswordVisibility } from "@/hooks/useTogglePasswordVisibility";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

const Register = () => {
    const {
        isSecurePassword,
        isSecureConfirmPassword,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
    } = useTogglePasswordVisibility();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            return
        }

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            Alert.alert("Registration Successfully");
            router.replace("/");
        } catch (error) {
            const errorMessage = (error as Error).message;
            Alert.alert("Error in Registration: ", errorMessage);
        }
    };

    return (
        <View className="p-4 flex-1 justify-center items-center bg-slate-200">
            <View className="w-full space-y-3">
                <Text className="text-3xl font-bold text-center mb-2">
                    Register
                </Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    className="grow p-3 rounded-md bg-slate-100"
                />
                <View className="relative">
                    <TextInput
                        secureTextEntry={isSecurePassword}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        className="grow py-3 pl-3 pr-10 rounded-md bg-slate-100"
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        className="absolute right-3 top-3.5"
                    >
                        {isSecurePassword ? (
                            <EyeOff size={25} className="text-slate-400" />
                        ) : (
                            <Eye size={25} className="text-slate-400" />
                        )}
                    </TouchableOpacity>
                </View>
                <View className="relative">
                    <TextInput
                        secureTextEntry={isSecureConfirmPassword}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        className="grow py-3 pl-3 pr-10 rounded-md bg-slate-100"
                    />
                    <TouchableOpacity
                        onPress={toggleConfirmPasswordVisibility}
                        className="absolute right-3 top-3.5"
                    >
                        {isSecureConfirmPassword ? (
                            <EyeOff size={25} className="text-slate-400" />
                        ) : (
                            <Eye size={25} className="text-slate-400" />
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-4 rounded-lg bg-yellow-400"
                >
                    <Text className="text-white font-semibold text-center">
                        Register
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace("/")}>
                    <Text className="font-medium text-center">
                        Already have an account?{" "}
                        <Text className="text-blue-600">Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;

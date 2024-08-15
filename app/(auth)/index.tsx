import { useTogglePasswordVisibility } from "@/hooks/useTogglePasswordVisibility";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/config/firebaseConfig";

const Login = () => {
    const { isSecurePassword, togglePasswordVisibility } =
        useTogglePasswordVisibility();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const auth = getAuth(app);
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            router.push("/todoList");
        } catch (error) {
            const errorMessage = (error as Error).message;
            Alert.alert("Error in Login: ", errorMessage);
        }
    };

    return (
        <View className="p-4 flex-1 justify-center items-center bg-slate-200">
            <View className="w-full space-y-3">
                <Text className="text-3xl font-bold text-center mb-2">
                    Login
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
                <TouchableOpacity
                    onPress={() => router.push("/forgotPassword")}
                >
                    <Text className="font-medium">Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} className="p-4 rounded-lg bg-yellow-400">
                    <Text className="text-white font-semibold text-center">
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/register")}>
                    <Text className="font-medium text-center">
                        Don't have an account?{" "}
                        <Text className="text-blue-600">Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

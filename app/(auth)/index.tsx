import { useTogglePasswordVisibility } from "@/hooks/useTogglePasswordVisibility";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { loginSchema } from "@/utils/schema";
import { InputError } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const Login = () => {
    const { isSecurePassword, togglePasswordVisibility } =
        useTogglePasswordVisibility();
    const [loading, setLoading] = useState(false);

    const { email, password, errors, setErrors, handleInputChange } = useAuth();

    const handleSubmit = async () => {
        const validation = loginSchema.safeParse({ email, password });

        if (!validation.success) {
            const newErrors: InputError = {};
            validation.error.errors.forEach((error) => {
                if (error.path.includes("email")) {
                    newErrors.email = error.message;
                }
                if (error.path.includes("password")) {
                    newErrors.password = error.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            router.replace("/todoList");
        } catch (error) {
            console.error("Error in logging in: ", error);

            if (error instanceof Error) {
                const firebaseError = error as FirebaseError;
                switch (firebaseError.code) {
                    case "auth/invalid-credential":
                        setErrors({ firebaseError: "Invalid credential" });
                        break;
                    case "auth/network-request-failed":
                        setErrors({
                            firebaseError:
                                "Network error. Please try again later.",
                        });
                        break;
                    default:
                        setErrors({
                            firebaseError:
                                "An error occurred. Please try again.",
                        });
                        break;
                }
            }
        } finally {
            setLoading(false);
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
                    onChangeText={(value) => handleInputChange("email", value)}
                    className="grow p-3 rounded-md bg-slate-100"
                />
                {errors.email && (
                    <Text className="text-red-500">{errors.email}</Text>
                )}
                <View className="relative">
                    <TextInput
                        secureTextEntry={isSecurePassword}
                        placeholder="Password"
                        value={password}
                        onChangeText={(value) =>
                            handleInputChange("password", value)
                        }
                        className="grow py-3 pl-3 pr-10 rounded-md bg-slate-100"
                    />
                    {password && (
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
                    )}
                </View>
                {errors.password && (
                    <Text className="text-red-500">{errors.password}</Text>
                )}
                {errors.firebaseError && (
                    <Text className="text-red-500">{errors.firebaseError}</Text>
                )}
                <TouchableOpacity
                    onPress={() => router.replace("/forgotPassword")}
                    disabled={loading}
                >
                    <Text className="font-medium">Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-4 rounded-lg bg-yellow-400"
                    disabled={loading}
                >
                    <Text className="text-white font-semibold text-center">
                        {loading ? "Loading..." : "Login"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.replace("/register")}
                    disabled={loading}
                >
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

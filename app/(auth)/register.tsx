import { useTogglePasswordVisibility } from "@/hooks/useTogglePasswordVisibility";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { InputError } from "@/types";
import { registerSchema } from "@/utils/schema";
import { FirebaseError } from "firebase/app";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const Register = () => {
    const {
        isSecurePassword,
        isSecureConfirmPassword,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
    } = useTogglePasswordVisibility();
    const [loading, setLoading] = useState(false);

    const {
        email,
        password,
        confirmPassword,
        errors,
        setErrors,
        handleInputChange,
    } = useAuth();

    const handleSubmit = async () => {
        const validation = registerSchema.safeParse({
            email,
            password,
            confirmPassword,
        });

        if (!validation.success) {
            const newErrors: InputError = {};
            validation.error.errors.forEach((error) => {
                if (error.path.includes("email")) {
                    newErrors.email = error.message;
                }
                if (error.path.includes("password")) {
                    newErrors.password = error.message;
                }
                if (error.path.includes("confirmPassword")) {
                    newErrors.confirmPassword = error.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            Alert.alert("Registration Successfully");
            router.replace("/");
        } catch (error) {
            console.error("Error in registration: ", error);

            if (error instanceof Error) {
                const firebaseError = error as FirebaseError;
                switch (firebaseError.code) {
                    case "auth/email-already-in-use":
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
                    Register
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
                <View className="relative">
                    <TextInput
                        secureTextEntry={isSecureConfirmPassword}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(value) =>
                            handleInputChange("confirmPassword", value)
                        }
                        className="grow py-3 pl-3 pr-10 rounded-md bg-slate-100"
                    />
                    {confirmPassword && (
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
                    )}
                </View>
                {errors.confirmPassword && (
                    <Text className="text-red-500">
                        {errors.confirmPassword}
                    </Text>
                )}
                {errors.firebaseError && (
                    <Text className="text-red-500">{errors.firebaseError}</Text>
                )}
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-4 rounded-lg bg-yellow-400"
                    disabled={loading}
                >
                    <Text className="text-white font-semibold text-center">
                        {loading ? "Loading..." : "Register"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.replace("/")}
                    disabled={loading}
                >
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

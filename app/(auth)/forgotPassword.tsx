import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { forgotPasswordSchema } from "@/utils/schema";
import { InputError } from "@/types";
import { FirebaseError } from "firebase/app";
import useAuth from "@/hooks/useAuth";

const ForgotPassword = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const { email, errors, setErrors, handleInputChange } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const validation = forgotPasswordSchema.safeParse({
            email,
        });

        if (!validation.success) {
            const newErrors: InputError = {};
            validation.error.errors.forEach((error) => {
                if (error.path.includes("email")) {
                    newErrors.email = error.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSuccessMessage("");
        setLoading(true);

        try {
            const response = await sendPasswordResetEmail(auth, email);
            setSuccessMessage(
                "A password reset link has been sent to your email."
            );
            setTimeout(() => {
                router.replace("/");
            }, 5000);
        } catch (error) {
            console.error("Error in forgot password: ", error);

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
            } else {
                setErrors({
                    firebaseError:
                        "An unknown error occurred. Please try again.",
                });
            }
        } finally {
            setLoading(false);
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
                    onChangeText={(value) => handleInputChange("email", value)}
                    className="grow p-3 rounded-md bg-slate-100"
                />
                {errors.email && (
                    <Text className="text-red-500">{errors.email}</Text>
                )}
                {errors.firebaseError && (
                    <Text className="text-red-500">{errors.firebaseError}</Text>
                )}
                {successMessage && (
                    <Text className="text-green-500 font-semibold">
                        {successMessage}
                    </Text>
                )}
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-4 rounded-lg bg-yellow-400"
                    disabled={loading}
                >
                    <Text className="text-white font-semibold text-center">
                        {loading ? "Sending..." : "Send"}
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

export default ForgotPassword;

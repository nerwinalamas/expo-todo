import { InputError } from "@/types";
import { useState } from "react";

const useAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<InputError>({});

    const handleInputChange = (
        field: "email" | "password" | "confirmPassword",
        value: string
    ) => {
        if (field === "email") {
            setEmail(value);
        } else if (field === "password") {
            setPassword(value);
        } else if (field === "confirmPassword") {
            setConfirmPassword(value);
        }

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }

        if (errors.firebaseError) {
            setErrors((prev) => ({ ...prev, firebaseError: "" }));
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        setErrors,
        handleInputChange
    };
};

export default useAuth;

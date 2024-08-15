import { useState } from "react";

export const useTogglePasswordVisibility = () => {
    const [isSecurePassword, setIsSecurePassword] = useState(true);
    const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);

    const togglePasswordVisibility = () => {
        setIsSecurePassword(!isSecurePassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsSecureConfirmPassword(!isSecureConfirmPassword);
    };

    return {
        isSecurePassword,
        isSecureConfirmPassword,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility
    };
};

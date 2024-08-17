import { TodoDate } from "@/types";

export const FormatDate = (timestamp?: TodoDate) => {
    if (!timestamp) return "";

    const { seconds } = timestamp;
    
    const date = new Date(seconds * 1000);
    
    return date.toLocaleDateString();
};

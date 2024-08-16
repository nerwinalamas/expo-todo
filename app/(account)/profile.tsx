import { auth } from "@/config/firebaseConfig";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    const user = auth.currentUser;

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-slate-200">
            <Text>current login: {user?.email}</Text>
        </SafeAreaView>
    );
};

export default Profile;

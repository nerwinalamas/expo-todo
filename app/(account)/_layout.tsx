import { Stack } from "expo-router";

const AccountLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AccountLayout;

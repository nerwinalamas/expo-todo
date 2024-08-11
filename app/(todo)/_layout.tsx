import { Stack } from "expo-router";

const TodoLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false, presentation: "modal" }} />
        </Stack>
    );
};

export default TodoLayout;

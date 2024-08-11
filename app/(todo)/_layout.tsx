import { Stack } from "expo-router";

const TodoLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
            <Stack.Screen
                name="createTodo"
                options={{ presentation: "modal", headerTitle: "Create Todo" }}
            />
            <Stack.Screen
                name="editTodo"
                options={{ presentation: "modal", headerTitle: "Edit Todo" }}
            />
        </Stack>
    );
};

export default TodoLayout;

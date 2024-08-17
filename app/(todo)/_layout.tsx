import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient()

const TodoLayout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen
                    name="todoList"
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="[id]" options={{ headerShown: false }} />
                <Stack.Screen
                    name="createTodo"
                    options={{
                        presentation: "modal",
                        headerTitle: "Create Todo",
                    }}
                />
                <Stack.Screen
                    name="editTodo"
                    options={{
                        presentation: "modal",
                        headerTitle: "Edit Todo",
                    }}
                />
            </Stack>
        </QueryClientProvider>
    );
};

export default TodoLayout;

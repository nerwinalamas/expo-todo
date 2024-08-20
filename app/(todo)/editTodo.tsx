import { getTodoById, updateTodoById } from "@/api";
import { InputError, Todo, TodoTitle } from "@/types";
import { todoSchema } from "@/utils/schema";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const statusOptions = ["Pending", "In Progress", "Blocked", "Completed"];

const EditTodo = () => {
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const { id: todoId } = useLocalSearchParams<{ id: string }>();
    const [errors, setErrors] = useState<TodoTitle>({});
    const [loading, setLoading] = useState(false);

    const {
        data: todoItem,
        isLoading,
        error,
    } = useQuery<Todo | null>({
        queryKey: ["todos", todoId],
        queryFn: () => getTodoById(todoId),
        enabled: !!todoId,
    });

    useEffect(() => {
        if (todoItem) {
            setEditTitle(todoItem.title);
            setEditDescription(todoItem.description);
            setEditStatus(todoItem.status);
        }
    }, [todoItem]);

    const handleTitleChange = (value: string) => {
        setEditTitle(value);

        if (errors.title) {
            setErrors((prev) => ({ ...prev, title: "" }));
        }
    };

    const handleStatus = (status: string) => {
        setEditStatus(status);
    };

    const handleSubmit = async () => {
        const validation = todoSchema.safeParse({
            title: editTitle,
            description: editDescription,
        });

        if (!validation.success) {
            const newErrors: InputError = {};
            validation.error.errors.forEach((error) => {
                if (error.path.includes("title")) {
                    newErrors.title = error.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const updatedTodo = {
                title: editTitle,
                description: editDescription,
                status: editStatus,
                updatedAt: Timestamp.now(),
            };

            updateTodoById(todoId, updatedTodo);
            router.replace("/todoList");
        } catch (error) {
            console.error("Error updating todo: ", error);
            Alert.alert("Error updating todo");
        } finally {
            setErrors({});
            setLoading(false);
        }
    };

    if (isLoading)
        return (
            <SafeAreaView className="flex-1 justify-start items-center gap-3 p-4 bg-slate-200">
                <Text>Loading...</Text>
            </SafeAreaView>
        );

    if (error)
        return (
            <SafeAreaView className="flex-1 justify-start items-center gap-3 p-4 bg-slate-200">
                <Text>Error: {error.message}</Text>
            </SafeAreaView>
        );

    return (
        <SafeAreaView className="flex-1 justify-start items-center gap-3 p-4 bg-slate-200">
            <View className="w-full space-y-1">
                <Text>Title:</Text>
                <TextInput
                    placeholder="Enter Title"
                    value={editTitle}
                    onChangeText={handleTitleChange}
                    className="grow p-3 rounded-md bg-slate-100"
                />
                {errors.title && (
                    <Text className="text-red-500">{errors.title}</Text>
                )}
            </View>
            <View className="w-full space-y-1">
                <Text>Description:</Text>
                <TextInput
                    placeholder="Enter Description"
                    value={editDescription}
                    onChangeText={(newText) => setEditDescription(newText)}
                    className="h-28 grow p-3 rounded-md bg-slate-100"
                    textAlignVertical="top"
                />
            </View>
            <View className="w-full space-y-1">
                <Text>Status:</Text>
                <RadioButton.Group
                    onValueChange={(newValue) => setEditStatus(newValue)}
                    value={editStatus}
                >
                    {statusOptions.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => handleStatus(`${item}`)}
                            className="flex-row items-center"
                        >
                            <RadioButton value={item} />
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </RadioButton.Group>
            </View>
            <View className="w-full space-y-3">
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-4 rounded-lg bg-yellow-400"
                    disabled={loading}
                >
                    <Text className="text-white text-center">
                        {loading ? "Loading..." : "Save"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.replace("/todoList")}
                    className="p-4 rounded-lg bg-slate-300"
                    disabled={loading}
                >
                    <Text className="text-center">Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EditTodo;

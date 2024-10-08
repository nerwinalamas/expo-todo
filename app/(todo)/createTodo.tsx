import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { addDoc, Timestamp } from "firebase/firestore";
import { auth, todosCollection } from "@/config/firebaseConfig";
import { InputError, TodoTitle } from "@/types";
import { todoSchema } from "@/utils/schema";

const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<TodoTitle>({});
    const [loading, setLoading] = useState(false);

    const handleTitleChange = (value: string) => {
        setTitle(value);

        if (errors.title) {
            setErrors((prev) => ({ ...prev, title: "" }));
        }
    };

    const handleSubmit = async () => {
        const user = auth.currentUser;
        const userId = user ? user.uid : null;

        const validation = todoSchema.safeParse({ title, description });

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
            const newTodo = {
                title,
                description,
                status: "Pending",
                userId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            };

            await addDoc(todosCollection, newTodo);
            setLoading(false);
            router.replace("/todoList");
        } catch (error) {
            console.error("Error creating todo: ", error);
            Alert.alert("Error creating todo");
        }  finally {
            setLoading(false);
            setTitle("");
            setDescription("");
            setErrors({});
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-start items-center gap-3 p-4 bg-slate-200">
            <View className="w-full space-y-1">
                <Text>Title:</Text>
                <TextInput
                    placeholder="Enter Title"
                    value={title}
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
                    value={description}
                    onChangeText={(newText) => setDescription(newText)}
                    className="h-28 grow p-3 rounded-md bg-slate-100"
                    textAlignVertical="top"
                />
            </View>
            <View className="w-full space-y-3">
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-4 rounded-lg bg-yellow-400"
                    disabled={loading}
                >
                    <Text className="text-white text-center">
                        {loading ? "Loading..." : "Create"}
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

export default CreateTodo;

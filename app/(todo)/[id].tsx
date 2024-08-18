import { getTodoById } from "@/api";
import { todosCollection } from "@/config/firebaseConfig";
import { Todo } from "@/types";
import { FormatDate } from "@/utils/FormatDate";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { Ellipsis } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TodoItem = () => {
    const { id: todoId } = useLocalSearchParams<{ id: string }>();
    const [isToggle, setIsToggle] = useState(false);

    const {
        data: todoItem,
        isLoading,
        error,
    } = useQuery<Todo | null>({
        queryKey: ["todos", todoId],
        queryFn: () => getTodoById(todoId),
        enabled: !!todoId,
    });

    const handleDelete = async (itemId: string) => {
        try {
            const todoDocRef = doc(todosCollection, itemId);
            await deleteDoc(todoDocRef);
            setIsToggle(false);
            router.replace("/todoList");
        } catch (error) {
            console.error("Error deleting todo: ", error);
        }
    };

    return (
        <SafeAreaView className="p-4 flex-1 bg-slate-100">
            {isLoading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>Error: {error.message}</Text>
            ) : todoItem ? (
                <View>
                    <View className="flex flex-row justify-between items-center border-b border-slate-500 pb-2">
                        <View className="space-y-1">
                            <Text className="text-3xl font-bold">
                                {todoItem.title}
                            </Text>
                            <Text className="text-sm font-bold text-slate-600">
                                {FormatDate(todoItem?.createdAt)} -{" "}
                                {todoItem.status}
                            </Text>
                        </View>
                        <View className="relative">
                            <Ellipsis
                                color="black"
                                size={24}
                                onPress={() => setIsToggle((prev) => !prev)}
                            />
                            {isToggle && (
                                <View className="absolute top-7 right-5 w-32 space-y-6 p-4 bg-slate-900 border rounded-md shadow-lg z-10">
                                    <TouchableOpacity
                                        onPress={() =>
                                            router.push({
                                                pathname: "/editTodo",
                                                params: { id: todoItem.id },
                                            })
                                        }
                                    >
                                        <Text className="text-white text-xl">
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleDelete(todoItem.id)
                                        }
                                    >
                                        <Text className="text-red-500 text-xl">
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                    <Text className="mt-5">{todoItem.description}</Text>
                </View>
            ) : (
                <Text>Todo not found</Text>
            )}
        </SafeAreaView>
    );
};

export default TodoItem;

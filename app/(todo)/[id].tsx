import { DATA } from "@/data";
import { router, useLocalSearchParams } from "expo-router";
import { Ellipsis } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TodoItem = () => {
    const { id } = useLocalSearchParams();
    const [isToggle, setIsToggle] = useState(false);
    const item = DATA.find((item) => item.id === id);

    const handleDelete = (todoId: string) => {
        console.log("Delete:", todoId);
        setIsToggle(false);
        router.replace("/todoList");
    };

    return (
        <SafeAreaView className="p-4 flex-1 bg-slate-100">
            {item ? (
                <View>
                    <View className="flex flex-row justify-between items-center border-b border-slate-500 pb-2">
                        <View className="space-y-1">
                            <Text className="text-3xl font-bold">
                                {item.title}
                            </Text>
                            <Text className="text-sm font-bold text-slate-600">
                                {item.created_at} - {item.status}
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
                                        onPress={() => router.push("/editTodo")}
                                    >
                                        <Text className="text-white text-xl">
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDelete(item.id)}
                                    >
                                        <Text className="text-red-500 text-xl">
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                    <Text className="mt-5">{item.description}</Text>
                </View>
            ) : (
                <Text>Item not found</Text>
            )}
        </SafeAreaView>
    );
};

export default TodoItem;

import { DATA } from "@/data";
import { useLocalSearchParams } from "expo-router";
import { Ellipsis } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TodoItem = () => {
    const { id } = useLocalSearchParams();
    const [isToggle, setIsToggle] = useState(false);
    const item = DATA.find((item) => item.id === id);

    return (
        <SafeAreaView
            className={`p-4 flex-1 ${
                item?.status === "Completed"
                    ? "bg-green-100"
                    : item?.status === "In Progress"
                    ? "bg-orange-100"
                    : item?.status === "Pending"
                    ? "bg-slate-100"
                    : "bg-white"
            }`}
        >
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
                                <View className="absolute top-6 right-0 flex p-4 bg-red-300 rounded-md shadow-lg z-10">
                                    <Text className="text-black">Edit</Text>
                                    <Text className="text-black mt-2">
                                        Delete
                                    </Text>
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

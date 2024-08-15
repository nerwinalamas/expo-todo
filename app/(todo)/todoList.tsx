import { SafeAreaView } from "react-native-safe-area-context";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Ellipsis, Plus } from "lucide-react-native";
import { DATA } from "@/data";
import { router } from "expo-router";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/config/firebaseConfig";

const TodoList = () => {
    const [isSearching, setIsSearching] = useState("");
    const [filteredData, setFilteredData] = useState(DATA);
    const [isToggle, setIsToggle] = useState(false);

    const handleSearch = () => {
        if (isSearching.trim() === "") {
            setFilteredData(DATA);
        } else {
            const result = DATA.filter((item) =>
                item.title.toLowerCase().includes(isSearching.toLowerCase())
            );
            setFilteredData(result);
        }
    };

    const handleInputChange = (newText: string) => {
        setIsSearching(newText);

        if (newText.trim() === "") {
            setFilteredData(DATA);
        }
    };

    const handleLogout = async () => {
        const auth = getAuth(app);
        await signOut(auth);
        router.push("/");
    };

    return (
        <SafeAreaView className="relative p-4 flex-1 flex flex-col justify-start items-center gap-2 bg-slate-200">
            <View className="w-full px-2 flex-row justify-between items-center">
                <Text className="text-2xl font-bold">Todo</Text>
                <View className="relative">
                    <Ellipsis
                        color="black"
                        size={24}
                        onPress={() => setIsToggle((prev) => !prev)}
                    />
                    {isToggle && (
                        <View className="absolute top-7 right-5 w-32 space-y-6 p-4 bg-slate-900 border rounded-md shadow-lg z-10">
                            <TouchableOpacity onPress={handleLogout}>
                                <Text className="text-white text-xl">
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            <TouchableOpacity
                className="absolute right-5 bottom-10 z-10 p-4 rounded-full bg-yellow-400"
                onPress={() => router.push("/createTodo")}
            >
                <Text>
                    <Plus color="white" size={25} />
                </Text>
            </TouchableOpacity>

            <View className="w-full px-2 flex flex-row items-center space-x-2">
                <TextInput
                    placeholder="Search Todo"
                    value={isSearching}
                    onChangeText={handleInputChange}
                    className="grow p-3 rounded-md bg-slate-100"
                />
                <TouchableOpacity
                    onPress={handleSearch}
                    className="p-4 rounded-md bg-yellow-400"
                >
                    <Text className="text-white">Search</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-1 w-full">
                <ScrollView className="p-2 flex flex-col">
                    {filteredData.map((d) => (
                        <TouchableOpacity
                            key={d.id}
                            onPress={() => router.push(`/${d.id}`)}
                            className="p-5 mb-3 rounded-md bg-slate-100"
                        >
                            <Text
                                className={`${
                                    d.status === "Completed"
                                        ? "line-through"
                                        : ""
                                }`}
                            >
                                {d.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default TodoList;

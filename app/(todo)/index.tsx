import { SafeAreaView } from "react-native-safe-area-context";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Plus } from "lucide-react-native";
import { DATA } from "@/data";
import { router } from "expo-router";
import { useState } from "react";

const App = () => {
    const [isSearching, setIsSearching] = useState("");
    const [filteredData, setFilteredData] = useState(DATA);

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

    return (
        <SafeAreaView className="relative p-4 flex-1 flex flex-col justify-start items-center gap-2 bg-slate-200">
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

export default App;

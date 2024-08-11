import { SafeAreaView } from "react-native-safe-area-context";
import {
    Button,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { Plus } from "lucide-react-native";
import { DATA } from "@/data";
import { Link } from "expo-router";
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

    return (
        <SafeAreaView className="relative p-4 flex-1 flex flex-col justify-start items-center gap-2 bg-slate-200">
            <Pressable
                className="absolute right-5 bottom-10 z-10 p-4 rounded-full bg-yellow-400"
                onPress={() => console.log("press")}
            >
                <Text>
                    <Plus color="white" size={30} />
                </Text>
            </Pressable>

            <View className="w-full px-2 flex flex-row items-center space-x-2">
                <TextInput
                    placeholder="Search Todo"
                    value={isSearching}
                    onChangeText={newText => setIsSearching(newText)}
                    className="grow p-3 rounded-md bg-slate-100"
                />
                <View>
                    <Button
                        title="Search"
                        color="#facc15"
                        onPress={handleSearch}
                    />
                </View>
            </View>

            <View className="flex-1 w-full">
                <ScrollView className="p-2 flex flex-col">
                    {filteredData.map((d) => (
                        <Link
                            href={`/${d.id}`}
                            key={d.id}
                            className="p-5 mb-3 rounded-md bg-slate-100"
                        >
                            <Text className={`${d.status === "Completed" ? "line-through" : ""}`}>{d.title}</Text>
                        </Link>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default App;

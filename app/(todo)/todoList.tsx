import { SafeAreaView } from "react-native-safe-area-context";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Ellipsis, Plus } from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/api";
import { Todo } from "@/types";

const TodoList = () => {
    const [isSearching, setIsSearching] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [isToggle, setIsToggle] = useState(false);

    const user = auth.currentUser;
    const userId = user ? user.uid : "";

    const {
        data: todos = [],
        isLoading,
        error,
    } = useQuery<Todo[]>({
        queryKey: ["todos", userId, searchTerm],
        queryFn: () => getTodos(userId, triggerSearch ? searchTerm : undefined),
        enabled: !!userId,
    });

    const handleSearch = () => {
        setTriggerSearch(true);
        setIsToggle(false);
        setSearchTerm(isSearching);
    };

    const handleInputChange = (newText: string) => {
        setIsSearching(newText);
        setIsToggle(false);

        if (newText.trim() === "") {
            setTriggerSearch(false);
            setSearchTerm("");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setIsToggle(false);
        router.replace("/");
    };

    return (
        <SafeAreaView className="relative p-4 flex-1 flex flex-col justify-start items-center gap-2 bg-slate-200">
            <View className="w-full px-2 flex-row justify-between items-center">
                <TouchableOpacity
                    onPress={() => {
                        router.replace("/todoList");
                        setIsToggle(false);
                    }}
                >
                    <Text className="text-2xl font-bold">Todo</Text>
                </TouchableOpacity>
                <View className="relative">
                    <Ellipsis
                        color="black"
                        size={24}
                        onPress={() => setIsToggle((prev) => !prev)}
                    />
                    {isToggle && (
                        <View className="absolute top-7 right-5 w-32 space-y-6 p-4 bg-slate-900 border rounded-md shadow-lg z-10">
                            <TouchableOpacity
                                onPress={() => {
                                    router.push("/(account)/profile");
                                    setIsToggle(false);
                                }}
                            >
                                <Text className="text-white text-xl">
                                    Account
                                </Text>
                            </TouchableOpacity>
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
                onPress={() => {
                    router.push("/createTodo");
                    setIsToggle(false);
                }}
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
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : error ? (
                        <Text>Error: {error.message}</Text>
                    ) : todos.length > 0 ? (
                        todos?.map((todo) => (
                            <TouchableOpacity
                                key={todo.id}
                                onPress={() => {
                                    router.push(`/${todo.id}`);
                                    setIsToggle(false);
                                }}
                                className="p-5 mb-3 rounded-md bg-slate-100"
                            >
                                <Text
                                    className={`${
                                        todo.status === "Completed"
                                            ? "line-through"
                                            : ""
                                    }`}
                                >
                                    {todo.title}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : !todos.length ? (
                        <Text>No todos found</Text>
                    ) : null}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default TodoList;

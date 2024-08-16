import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const statusOptions = ["Pending", "In Progress", "Blocked", "Completed"];

const EditTodo = () => {
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState("");

    const handleStatus = (status: string) => {
        setEditStatus(status);
    };

    const handleSubmit = () => {
        if (!editTitle || !editDescription || !editStatus) {
            alert("Please fill out all fields.");
            return;
        }

        console.log("Title:", editTitle);
        console.log("Description:", editDescription);
        console.log("Status:", editStatus);

        router.replace("/todoList");
    };

    return (
        <SafeAreaView className="flex-1 justify-start items-center gap-3 p-4 bg-slate-200">
            <View className="w-full space-y-1">
                <Text>Title:</Text>
                <TextInput
                    placeholder="Enter Title"
                    value={editTitle}
                    onChangeText={(newText) => setEditTitle(newText)}
                    className="grow p-3 rounded-md bg-slate-100"
                />
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
                >
                    <Text className="text-white text-center">Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.replace("/todoList")}
                    className="p-4 rounded-lg bg-slate-300"
                >
                    <Text className="text-center">Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default EditTodo;

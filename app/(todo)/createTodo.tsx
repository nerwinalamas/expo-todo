import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import v4 from "react-native-uuid";

const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
      const newTodo = {
          id: v4.v4(),
          title,
          description,
          status: "Pending",
          created_at: new Date().toLocaleDateString(),
          updated_at: new Date().toLocaleDateString(),
      };

      console.log(newTodo)

      setTitle("");
      setDescription("");
  };

    return (
        <SafeAreaView className="flex-1 justify-start items-center gap-3 p-4 bg-slate-200">
            <View className="w-full space-y-1">
                <Text>Title:</Text>
                <TextInput
                    placeholder="Enter Title"
                    value={title}
                    onChangeText={(newText) => setTitle(newText)}
                    className="grow p-3 rounded-md bg-slate-100"
                />
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
                >
                    <Text className="text-white text-center">Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/")}
                    className="p-4 rounded-lg bg-slate-300"
                >
                    <Text className="text-center">Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CreateTodo;

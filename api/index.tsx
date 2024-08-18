import { todosCollection } from "@/config/firebaseConfig";
import { Todo, UpdateTodo } from "@/types";
import {
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

export const getTodos = async (userId: string, searchTerm?: string) => {
    try {
        let q = query(todosCollection, where("userId", "==", userId));

        if (searchTerm) {
            q = query(
                q,
                where("title", ">=", searchTerm),
                where("title", "<=", searchTerm + "\uf8ff")
            );
        }

        const todoData = await getDocs(q);
        const todos = todoData.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Todo[];

        return todos;
    } catch (error) {
        console.error("Error getting todos:", error);
        throw new Error("Failed to get todos.");
    }
};

export const getTodoById = async (todoId: string) => {
    try {
        const todoItem = doc(todosCollection, todoId);
        const todoData = await getDoc(todoItem);

        if (todoData.exists()) {
            return { id: todoData.id, ...todoData.data() } as Todo;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting todo:", error);
        throw new Error("Failed to get todo.");
    }
};

export const updateTodoById = async (
    todoId: string,
    updatedTodo: UpdateTodo
) => {
    try {
        const todoData = doc(todosCollection, todoId);
        await updateDoc(todoData, updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        throw new Error("Failed to update todo.");
    }
};

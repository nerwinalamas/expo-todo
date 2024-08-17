import { db } from "@/config/firebaseConfig";
import { Todo } from "@/types";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const getTodos = async (userId: string, searchTerm?: string) => {
    let q = query(collection(db, "todos"), where("userId", "==", userId));

    if (searchTerm) {
        q = query(q, where("title", ">=", searchTerm), where("title", "<=", searchTerm + "\uf8ff"));
    }

    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Todo[];

    return todos;
};

export const getTodoById = async (todoId: string): Promise<Todo | null> => {
    const todoDoc = doc(db, "todos", todoId);
    const docSnap = await getDoc(todoDoc);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Todo;
    } else {
        return null;
    }
};

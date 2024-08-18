export type Todo = {
    id: string;
    title: string;
    description: string;
    status: string;
    userId: string;
    createdAt: TodoDate;
    updatedAt: TodoDate;
};

export type TodoDate = {
    seconds: number;
    nanoseconds: number;
};

export type UpdateTodo = {
    title: string;
    description: string;
    status: string;
    updatedAt: TodoDate;
};
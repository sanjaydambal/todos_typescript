export interface TodoInterface {
    id: number;
    title: string; // Optional
    description: string; // Optional
    completed: boolean; // Required
}

export interface AddTodoInterface {
    title: string; // Optional
    description: string; // Optional
    completed: boolean; // Required
}

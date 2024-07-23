export type CreateTaskParam = {
    title:string;
    description: string;
    isCompleted: false;
    isImportant: false;
    userId: string;
    listId?: string | null;
};

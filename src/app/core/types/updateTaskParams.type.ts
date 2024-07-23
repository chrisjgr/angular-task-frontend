export type UpdateTaskParam = {
    title:string;
    description: string;
    isCompleted: false;
    isImportant: false;
    listId?: string | null;
};

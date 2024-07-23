export interface TaskInterface {
    id?: string,
    title: string,
    description: string,
    creation_date: Date,
    isCompleted: boolean,
    isImportant: boolean,
    listId: string | null,
    userId: string
}

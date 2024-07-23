export interface TaskInterface {
    id: string,
    title: string,
    description: string,
    creation_date: CreationDate,
    isCompleted: boolean,
    isImportant: boolean,
    listId: string | null,
    userId: string
}

type CreationDate = {
    _seconds: number;
    _nanoseconds: number;
};

import { TaskInterface } from "./tasks.interface";

export interface ListStateInterface {
    id: string;
    title: string;
    userId: string;
    tasks: TaskInterface[]
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaskInterface } from "@core/models/tasks.interface";
import { CreateTaskParam } from "@core/types/createTaskParams.type";
import { UpdateTaskParam } from "@core/types/updateTaskParams.type";
import { environment } from "@envs/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    private url = environment.apiUrl;
    private tasksState = new BehaviorSubject<TaskInterface[]>([]);

    public tasksState$ = this.tasksState.asObservable();

    constructor(
        private http: HttpClient,
    ) { }

    getTasksByUserId(userId: string) {
        return this.http.get<TaskInterface[]>(`${this.url}/tasks/user/${userId}`);
    }

    getTasksByListId(listId: string) {
        return this.http.get<TaskInterface[]>(`${this.url}/tasks/user/${listId}`);
    }

    createTask(createTask: CreateTaskParam) {
        const params = createTask.listId !== null || undefined ? { listId: createTask.listId } : { listId: null };
        return this.http.post<TaskInterface>(`${this.url}/tasks`, { ...createTask, ...params });
    }

    updateTask(taskId: string, updateTask: UpdateTaskParam) {
        const params = updateTask.listId !== null || undefined ? { listId: updateTask.listId } : { listId: null };
        return this.http.put<TaskInterface>(`${this.url}/tasks/${taskId}`, { ...updateTask, ...params });
    }

    deleteTask(taskId: string) {
        return this.http.delete<boolean>(`${this.url}/tasks/${taskId}`);
    }

    // * State Manipulation
    addTaskToState(newTask: TaskInterface): void {
        const newTasks = [...this.tasksState.value, newTask];
        this.tasksState.next(newTasks);
    }

    updateTaskToState(newTask: TaskInterface): void {
        const newTasks = this.tasksState.value.map((task) => (task.id === newTask.id ? newTask : task));
        this.tasksState.next(newTasks);
    }

    deleteTaskFromState(taskId: string): void {
        const newTasks = this.tasksState.value.filter((task) => task.id !== taskId);
        this.tasksState.next(newTasks);
    }

    replaceAllTasksState(tasks: TaskInterface[]) {
        this.tasksState.next(tasks);
    }
}

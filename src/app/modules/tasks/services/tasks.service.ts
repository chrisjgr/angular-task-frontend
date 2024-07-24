/* eslint-disable class-methods-use-this */
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaskInterface } from "@core/models/tasks.interface";
import { CreateTaskParam } from "@core/types/createTaskParams.type";
import { UpdateTaskParam } from "@core/types/updateTaskParams.type";
import { environment } from "@envs/environment";
import {
    BehaviorSubject,
    catchError,
    of,
    throwError
} from "rxjs";

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
        return this.http.get<TaskInterface[]>(`${this.url}/tasks/user/${userId}`)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    getTasksByListId(listId: string) {
        return this.http.get<TaskInterface[]>(`${this.url}/tasks/user/${listId}`)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    createTask(createTask: CreateTaskParam) {
        const params = createTask.listId !== null || undefined ? { listId: createTask.listId } : { listId: null };
        return this.http.post<TaskInterface>(`${this.url}/tasks`, { ...createTask, ...params })
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    updateTask(taskId: string, updateTask: UpdateTaskParam) {
        const params = updateTask.listId !== null || undefined ? { listId: updateTask.listId } : { listId: null };
        return this.http.put<TaskInterface>(`${this.url}/tasks/${taskId}`, { ...updateTask, ...params })
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    deleteTask(taskId: string) {
        return this.http.delete<boolean>(`${this.url}/tasks/${taskId}`)
            .pipe(
                catchError((error) => this.handleError(error))
            );
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

    handleError(error: HttpErrorResponse) {
        if (error.status !== 500) {
            return of();
        }
        return throwError(() => new Error(`Sorry! something went wrong: ${error}`));
    }
}

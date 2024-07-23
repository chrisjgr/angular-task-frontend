import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ListInterface } from "@core/models/list.interface";
import { ListStateInterface } from "@core/models/listState.interface";
import { TaskInterface } from "@core/models/tasks.interface";
import { environment } from "@envs/environment";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ListsService {
    private url = environment.apiUrl;
    private listsStates = new BehaviorSubject<ListStateInterface[]>([]);

    public listsStates$ = this.listsStates.asObservable();

    constructor(
        private http: HttpClient,
    ) { }

    getAlListsByUserId(userId: string) {
        return this.http.get<ListInterface[]>(`${this.url}/lists/user/${userId}`);
    }

    createList(userId: string, title: string) {
        return this.http.post<ListInterface>(`${this.url}/lists/`, { title, userId });
    }

    updateList(listId: string, title: string) {
        return this.http.put<ListInterface>(`${this.url}/lists/${listId}`, { title });
    }

    deleteList(listId: string) {
        return this.http.delete<boolean>(`${this.url}/lists/${listId}`);
    }

    // * State Manipulation

    addListToState(newList: ListStateInterface): void {
        const newLists = [...this.listsStates.value, newList];
        this.listsStates.next(newLists);
    }

    updateListToState(newList: ListStateInterface): void {
        const newLists = this.listsStates.value.map((list) => (list.id === newList.id ? newList : list));
        this.listsStates.next(newLists);
    }

    deleteListFromState(listId: string): void {
        const newLists = this.listsStates.value.filter((list) => list.id !== listId);
        this.listsStates.next(newLists);
    }

    addTasksToList(listId:string, task: TaskInterface) {
        const listFinded = this.listsStates.value.find((list) => (list.id === listId));

        if (listFinded) {
            listFinded.tasks.push(task);
            this.updateListToState(listFinded);
        }
    }

    replaceAllListState(lists: ListStateInterface[]) {
        this.listsStates.next(lists);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Task } from './task';


@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private url = 'http://localhost:5200';
    private tasks$: Subject<Task[]> = new Subject();

    constructor(private httpClient: HttpClient) { }
 
    private refreshTasks(){
        this.httpClient.get<Task[]>(`${this.url}/tasks`)
        .subscribe(tasks => {
            this.tasks$.next(tasks);
        });
    }

    getTasks(): Subject<Task[]> {
        this.refreshTasks();
        return this.tasks$;
    }
    
      
}
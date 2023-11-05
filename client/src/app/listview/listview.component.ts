import { Component,OnInit } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-listview',
  templateUrl: "./listview.component.html",
  styles: [`
    .list-view {
      width: 100%;
      height: 100%;
  }
  `
  ]
})
export class ListviewComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable();
  constructor(private router: Router, private tasksService: TaskService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  private fetchTasks(): void {
    this.tasks$ = this.tasksService.getTasks();
  }

}

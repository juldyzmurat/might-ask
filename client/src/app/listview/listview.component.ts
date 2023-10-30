import { Component,OnInit } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-listview',
  template: `
  <div>
  
  <table class="table table-striped table-bordered">
  <thead>
      <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Due Date</th>
          <th>Location</th>
      </tr>
  </thead>

  <tbody>
      <tr *ngFor="let task of tasks$ | async">
          <td>{{task.name}}</td>
          <td>{{task.category}}</td>
          <td>{{task.due}}</td>
          <td>{{task.location}}</td>
      </tr>
  </tbody>
</table>

    <div class="task-bar">

      <button id="ellipsis-button">&#8285;</button>

      <div class="task-properties">
        <!-- placeholders -->
        <p><strong>Name:</strong> <span class="name-placeholder">Task Name 1</span></p>
      </div>

      <div class="task-properties">
        <!-- placeholders -->
        <p><strong>Due Date:</strong> <span class="Date-placeholder"> date</span></p>
      </div>

      <div class="task-properties">
        <!-- placeholders -->
        <p><strong>Category:</strong> <span class="Category-placeholder"> cat</span></p>
      </div> 

    </div>

  </div>  
  `,
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

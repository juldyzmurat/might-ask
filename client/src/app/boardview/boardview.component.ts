import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boardview',
  template: `
    <div class="board-view" id="board-view">
      <p>To Do</p>
      <p>In Progress</p>
      <p>Done</p>
    </div>
  `,
  styles: [`
  .board-view {
    width: 100%;
    height: 100%;
    text-align: center; 
  }
  `
  ]
})
export class BoardviewComponent {
  constructor(private router: Router) { }

}

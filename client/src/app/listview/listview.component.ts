import { Component } from '@angular/core';

@Component({
  selector: 'app-listview',
  template: `
  <div>
  
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
export class ListviewComponent {

}

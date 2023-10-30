import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boardview',
  templateUrl: "./boardview.component.html",
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

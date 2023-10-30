import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs'; 
import { ListviewComponent } from '../listview/listview.component';
import { BoardviewComponent } from '../boardview/boardview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-taskpage',
  templateUrl: './taskpage.component.html',
  styles: [`
    body {
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f0f0f0;
    }
  
    .container {
      width: 100%;
      height: 80%;
      border: 2px solid #000;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background-color: #f1b6dc;
    }
  
    .tabs {
      width: 60%;
      height: 80%;
      display: flex;
      justify-content: center; 
      border: 2px solid #ccc;
      background-color: #f0f0f0;
      position:relative;
    }
  
    .tabs button {
      background: none;
      border: 2px;
      cursor: pointer;
      margin: 0; 
      padding: 0;
      margin-right: -110px; 
    }
  
    .tabs button:last-child {
      margin-right: 0;
    }
  
    #list-view-button {
      background-color: #f1b6dc;
      border: 2px solid #000;
      width: 600px; 
      height: 60px;
      clip-path: polygon(0 0, 75% 0, 100% 100%, 0% 100%);
    }
  
    #board-view-button {
      background-color: #d9adfe;
      border: 2px solid #000;
      width: 600px; 
      height: 60px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 25% 100%);
    }
  
    .content {
      display: flex;
      flex: 1;
      padding: 10px;
      align-items: center;
    }
  
    .list-view {
      width: 100%;
      height: 100%;
      
    }
  
    .board-view {
      width: 100%;
      height: 100%;
      text-align: center; 
    }
   
    .task-bar {
      position: relative;
      width: 80%;
      height: 30px;
      background-color: #e0e0e0;
      margin: 10px;
      padding: 10px;
      display: flex;
        
        /*justify-content: space-between;*/
        
    }
    
    .task-properties {
        display: inline-block; /* Display as inline-block to be in a row */
        width: calc(33.33% - 10px); /* Each task-object takes one-third of the width with 10px margin */
        margin: 0.5px; /* Add margin to separate objects */
        vertical-align: top; /* Align the task-objects at the top */
    }
    
    .ellipsisButtonView {
        position: absolute;
        top: 50px; /* Adjust the top value to align with the button */
        right: 600px;
        width: 50px;
        height: 100px;
        background-color: #e0e0e0;
        margin: 10px;
        padding: 10px;
        vertical-align: top;
        display: none; 
        z-index: 1;
        transform: translateX(-400%);
    }
    
    .ellipsisButtonbutton {
        position: relative;
        width: 100%;
        height: 30px;
        margin: 0.5px;
        padding: 0.5px;
        text-align: center;
        border-bottom: 1px solid #ccc; /* Add a border to separate options */
    
    }
    
    .ellipsis-button {
        top: 10px;
        right: 10px;
        font-size: 20px;
    }

    .task-card {
      width:25%;
      height: 450px;
      background-color: #e0e0e0;
      margin: 1%;
      padding: 1%;
      display: inline-block;
    }
  
    .circle-image {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 50px; /* Adjust the width and height for your image size */
      height: 50px;
      overflow: hidden;
      border-radius: 50%; 
      background-color: #fff; 
      border: 2px solid #000; 
    }
  
    .circle-image img {
      width: 100%;
      height: auto;
      display: block;
    }
  
    #gif {
      position: fixed;
      bottom: 40px;
      right: 20px;
      width: 200px; /* Adjust the width to your desired size */
      height: auto; /* Auto-adjust the height to maintain aspect ratio */
    }
  
    .circle-buttons {
      display: none;
      position: absolute;
      top: 70px;
      right: 10px;
      z-index: 1;
      background-color: #fff;
      border: 2px solid #000;
    }
  
    .circle-buttons button {
      display: block;
      width: 100%;
      padding: 10px;
      text-align: center;
      background-color: #fff;
      border: 1px solid #000;
    }
  
    .circle-image {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 50px; /* Adjust the width and height for your image size */
      height: 50px;
      overflow: hidden;
      border-radius: 50%; /* Create a circular shape */
      background-color: #fff; /* Set background color for the circle */
      border: 2px solid #000; /* Add a border */
    }
  
    .circle-image img {
      width: 100%;
      height: auto;
      display: block;
    }`
  ]
})

export class TaskpageComponent{
  viewType: 'list' | 'board' = 'list'; // Set the default view type

  constructor(private router: Router) { }


  showListView() {
    this.viewType = 'list'; // Set viewType to 'list' when the List View tab is clicked
    this.navigateToListView();
  }

  showBoardView() {
    console.log("boardfunc");
    this.viewType = 'board'; // Set viewType to 'board' when the Board View tab is clicked
    this.navigateToBoardView();
  }


  navigateToListView() {
    this.router.navigate(['/list-view']);
  }

  navigateToBoardView() {
    this.router.navigate(['/board-view']);
  }


}




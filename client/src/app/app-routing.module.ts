import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component'; // <-- add this line
import { EditUserComponent } from './edit-user/edit-user.component'; // <-- add this line
import { TaskpageComponent } from './taskpage/taskpage.component';
import { BoardviewComponent } from './boardview/boardview.component';
import { ListviewComponent } from './listview/listview.component';


 
const routes: Routes = [
 { path: '', redirectTo: 'users', pathMatch: 'full' },
 { path: 'users', component: UsersListComponent },
 { path: 'users/new', component: AddUserComponent }, // <-- add this line
 { path: 'users/edit/:id', component: EditUserComponent },// <-- add this line
 { path: 'taskpage', component: TaskpageComponent },
 { path: 'list-view', component: ListviewComponent },
 { path: 'board-view', component: BoardviewComponent },

];
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
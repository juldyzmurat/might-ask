import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component'; 
import { EditUserComponent } from './edit-user/edit-user.component'; 
import { TaskpageComponent } from './taskpage/taskpage.component';
import { BoardviewComponent } from './boardview/boardview.component';
import { ListviewComponent } from './listview/listview.component';


 
const routes: Routes = [
 { path: '', redirectTo: 'users', pathMatch: 'full' },
 { path: 'users', component: UsersListComponent },
 { path: 'users/new', component: AddUserComponent }, 
 { path: 'users/edit/:id', component: EditUserComponent },
 { path: 'taskpage', component: TaskpageComponent },
 { path: 'list-view', component: ListviewComponent },
 { path: 'board-view', component: BoardviewComponent },

];
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
 
@Component({
 selector: 'app-users-list',
 templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
 users$: Observable<User[]> = new Observable();
 
 constructor(private usersService: UserService) { }
 
 ngOnInit(): void {
   this.fetchUsers();
 }
 
 deleteUser(id: string): void {
   this.usersService.deleteUser(id).subscribe({
     next: () => this.fetchUsers()
   });
 }
 
 private fetchUsers(): void {
   this.users$ = this.usersService.getUsers();
 }
}
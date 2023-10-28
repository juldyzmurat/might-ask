import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';
 
@Component({
 selector: 'app-user-form',
 template: `
   <form class="user-form" autocomplete="off" [formGroup]="userForm" (ngSubmit)="submitForm()">
     <div class="form-floating mb-3">
       <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
       <label for="name">Name</label>
     </div>
 
     <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
       <div *ngIf="name.errors?.['required']">
         Name is required.
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Name must be at least 3 characters long.
       </div>
     </div>
 
     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="email" placeholder="Email" required>
       <label for="position">Email</label>
     </div>
 
     <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">
 
       <div *ngIf="email.errors?.['required']">
         Email is required.
       </div>
       <div *ngIf="email.errors?.['minlength']">
         Email must be at least 5 characters long.
       </div>
     </div>

     <div class="form-floating mb-3">
       <input class="form-control" type="text" formControlName="password" placeholder="Password" required>
       <label for="position">Password</label>
     </div>
     <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">
 
       <div *ngIf="password.errors?.['required']">
         Password is required.
       </div>
       <div *ngIf="password.errors?.['minlength']">
         Password must be at least 5 characters long.
       </div>
     </div>
 
     <div class="mb-3">
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="access" name="access" id="access-admin" value="admin" required>
         <label class="form-check-label" for="access-admin">Admin</label>
       </div>
       <div class="form-check">
         <input class="form-check-input" type="radio" formControlName="access" name="access" id="access-normal" value="normal">
         <label class="form-check-label" for="access-normal">Normal</label>
       </div>
     </div>
 
     <button class="btn btn-primary" type="submit" [disabled]="userForm.invalid">Add</button>
   </form>
 `,
 styles: [
   `.user-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class UserFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<User> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<User>();
 
 @Output()
 formSubmitted = new EventEmitter<User>();
 
userForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.userForm.get('name')!; }
 get email() { return this.userForm.get('email')!; }
 get password() { return this.userForm.get('password')!; }
 get access() { return this.userForm.get('access')!; }
 
 ngOnInit() {
   this.initialState.subscribe(user => {
     this.userForm = this.fb.group({
       name: [ user.name, [Validators.required] ],
       email: [ user.email, [ Validators.required, Validators.minLength(5) ] ],
       password: [ user.password, [ Validators.required, Validators.minLength(5) ] ],
       access: [ user.access, [Validators.required] ]
     });
   });
 
   this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
   this.formSubmitted.emit(this.userForm.value);
 }
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';
 
@Component({
 selector: 'app-user-form',
 templateUrl: './user-form.component.html',
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
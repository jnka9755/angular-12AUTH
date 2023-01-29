import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = this.formBuilder.group({
    name: [  , [ Validators.required ]],
    email: [  , [ Validators.required, Validators.email ]],
    password: [  , [ Validators.required, Validators.minLength(6) ]]
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService ) { }

  ngOnInit(): void {
  }

  saveUser(){

    console.log(this.registerForm.value);

    const user = this.registerForm.value;

    this.authService.createUser(user).subscribe(response => {
      if(response === true) 
        this.router.navigateByUrl('/dashboard');
      else
        Swal.fire('Error', response, 'error');
    });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public name;
  public username;
  public email;
  public password;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  clicked = "home";
  public href: string = "";
  url: string = "asdf";

  constructor(private router : Router) { }

  ngOnInit() {
 
  }

  ngDoCheck(){
    this.href = this.router.url;
    this.clicked = this.href.replace('/',"");
  }

  selectMenuItem(name:string){
    this.clicked = name;
    console.log(name)
  }

}

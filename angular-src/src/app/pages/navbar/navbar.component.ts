import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  clicked = 'home';
  public href: String = '';
  url: String = 'asdf';

  constructor(private router: Router) { }

  ngOnInit() {

  }

  ngDoCheck() {
    this.href = this.router.url;
    this.clicked = this.href.replace('/', '');
  }

  selectMenuItem(name: string) {
    this.clicked = name;
  }

}

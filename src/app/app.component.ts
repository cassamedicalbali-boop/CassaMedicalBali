import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cassamedicalclinic';

  showHeaderFooter = true;

  constructor(private router: Router){
    this.router.events.subscribe(() => {
    const url = this.router.url;

    if (url.startsWith('/admin') || url === '/login') {
      this.showHeaderFooter = false;
    } else {
      this.showHeaderFooter = true;
    }
  });
  }

}

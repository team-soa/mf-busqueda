import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mf-nav-busqueda',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  
  constructor(private router: Router){}
  
  

  public navigateTo(direccionDeBusqueda: string): void {
    if(direccionDeBusqueda === 'Login'){
      this.router.navigateByUrl("Login")
    }
    if(direccionDeBusqueda === 'VistaPrincipal'){
      this.router.navigateByUrl("VistaPrincipal")
    }
    if(direccionDeBusqueda === 'VistaPremium'){
      this.router.navigateByUrl("VistaPremium")
    }

  }

  title = 'mf-nav-busqueda';
}



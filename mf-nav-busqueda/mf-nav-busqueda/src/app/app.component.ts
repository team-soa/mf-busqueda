import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataManagerService } from './services/data-manager.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Busqueda } from './Clases/busqueda';
import { Cancion } from './Clases/Cancion';

@Component({
  selector: 'mf-nav-busqueda',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{


  public navigateTo(direccionDeBusqueda: string): void {
    if(direccionDeBusqueda === 'Login'){
      this.router.navigateByUrl("Login")
    }
    if(direccionDeBusqueda === 'VistaPrincipal'){
      this.router.navigateByUrl("VistaPrincipal")
    }
    if(direccionDeBusqueda === 'Dashboard'){
      this.router.navigateByUrl("dashboard")
      console.log('AAAAA')
    }
    if(direccionDeBusqueda === 'VistaPremium'){
      this.router.navigateByUrl("VistaPremium")
    }

  }

  title = 'mf-nav-busqueda';

  constructor(private router: Router,
    private cookieService: CookieService,
    private busquedaService: DataManagerService) { }

  
  vistaPremium = (this.cookieService.get('tipoVistaActual') === 'premium')
  premium = this.cookieService.get('rol') === 'premium'

  values = [{ value: 'Nombre', nombre: 'Nombre' },
    { value: 'Artista', nombre: 'Artista' },
    { value: 'Album', nombre: 'Album' },
    { value: 'Letra', nombre: 'Letra' }];
  
  defaultValue = this.values[3].nombre;

  busqueda: Busqueda = new Busqueda();
  tipoBusqueda: string = ''
  informacionBusqueda: string = ''
  listaDeCanciones: Cancion[] = [];

  ngOnInit(): void {
    this.busquedaService.sharedListaCanciones.subscribe(listaCanciones => this.listaDeCanciones = listaCanciones)
    console.log(JSON.parse(this.cookieService.get('user')))
    this.tipoUsuario();
  }

  public tipoUsuario(): void {
    this.premium = (this.cookieService.get('rol') === 'premium')

  }

  public buscarCancionN(): void {
    this.vistaPremium = (this.cookieService.get('tipoVistaActual') === 'premium')
    console.log(this.vistaPremium)
    if (this.tipoBusqueda === "Artista") {
      this.busqueda.artista = this.informacionBusqueda
    }
    else if (this.tipoBusqueda === "Nombre") {
      this.busqueda.nombre = this.informacionBusqueda
    }
    else if (this.tipoBusqueda === "Album") {
      this.busqueda.album = this.informacionBusqueda
    }
    else if (this.tipoBusqueda === "Letra") {
      this.busqueda.letraCruda = this.informacionBusqueda
    }
    else {
      alert('Debe selecionar un tipo de busqueda')
      return
    }
    if (this.vistaPremium) {
      this.busqueda.user = JSON.parse(this.cookieService.get('user')).username
    }
    this.busquedaService.busqueda(this.busqueda).subscribe(resp => {
      this.busqueda = new Busqueda()

      this.busquedaService.nextListaDeCanciones(resp)
      console.log(resp);
      const event = new CustomEvent('newSearch', { detail: resp });
      window.dispatchEvent(event);
    });
  }


  public navigate(comprobacion: string): void {
    if (comprobacion === 'UsuarioPremium') {
      this.router.navigateByUrl('/VistaPremium');
    }
    if (comprobacion === 'Inicio') {
      this.router.navigateByUrl('/VistaPrincipal');
    }
    if(comprobacion === 'Dashboard'){
      this.router.navigateByUrl('/Dashboard')
    }
    if (comprobacion === 'CerrarSesion') {
      this.cookieService.delete('token')
      this.cookieService.delete('user')
      this.router.navigateByUrl('/Login');
    }

  }
}



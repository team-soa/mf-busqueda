import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Busqueda } from '../Clases/busqueda';
import { Cancion } from '../Clases/Cancion';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  URL = 'http://20.114.105.27:4003/songs'

  public busqueda(busqueda: Busqueda): Observable<Cancion[]> {
    // @ts-ignore
    return this.http.get<Cancion[]>(this.URL, {params: busqueda,
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))});
  }

  private listaCanciones = new BehaviorSubject([new Cancion()]);
  sharedListaCanciones = this.listaCanciones.asObservable();


  nextListaDeCanciones(listaCanciones: Cancion[]) {
    this.listaCanciones.next(listaCanciones);
    // this.cookieService.set('busqueda', 'true');
    // this.cookieService.set("listaCanciones", JSON.stringify(listaCanciones));

  }
}

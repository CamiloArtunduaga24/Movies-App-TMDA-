import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private movieUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private readonly http:HttpClient ) { }

  get params() {
    return {
      api_key:'1647a24c943003f9baf056f3a6cf22b9',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }


  getCartelera():Observable<Movie[]> {

    if( this.cargando ) {
      return of([]);
    }
    

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.movieUrl}/movie/now_playing?`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      } )
    );
  }

  buscarPeliculas( texto: string ):Observable<Movie[]> {

    const params = { ...this.params, page:'1', query: texto }
    return this.http.get<CarteleraResponse>(`${ this.movieUrl }/search/movie`, {
      params
    }).pipe(
      map(res => res.results)
    )
  }
}

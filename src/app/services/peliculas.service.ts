import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Cast, CastElement } from '../interfaces/casting';
import { MovieDetailResponse } from '../interfaces/movie-detail';

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

  getPeliculaDetalle( id: string ) {
    return this.http.get<MovieDetailResponse>(`${ this.movieUrl }/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    )
  }

  getCast( id: string ):Observable<CastElement[]> {
    return this.http.get<Cast>(`${ this.movieUrl }/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( res => res.cast ),
      catchError( err => of([]) )
    );
  }
}

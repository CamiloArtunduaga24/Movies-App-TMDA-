import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private movieUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  constructor( private readonly http:HttpClient ) { }

  get params() {
    return {
      api_key:'1647a24c943003f9baf056f3a6cf22b9',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }


  getCartelera():Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>(`${this.movieUrl}/movie/now_playing?`, {
      params: this.params
    }).pipe(
      tap( () => {
        this.carteleraPage += 1;
      } )
    );
  }
}

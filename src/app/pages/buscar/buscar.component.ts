import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto: string = '';
  public movies: Movie[] = [];

  constructor( private readonly activateRoute:ActivatedRoute,
               private readonly peliculasSvc:PeliculasService ) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe( params => {

      this.texto = params.texto

      //Llamar el servicio
      this.peliculasSvc.buscarPeliculas( params.texto ).subscribe( movies => {
        this.movies = movies
        
      });
      
    } )
  }

}

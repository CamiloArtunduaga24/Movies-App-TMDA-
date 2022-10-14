import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];

  constructor( private readonly peliculasSvc:PeliculasService ) { }

  ngOnInit(): void {
    this.getCartelera();


  }

  getCartelera() {
    this.peliculasSvc.getCartelera().subscribe(res => {
      // console.log(res.results);
      this.movies = res.results
      
    })
  }

}

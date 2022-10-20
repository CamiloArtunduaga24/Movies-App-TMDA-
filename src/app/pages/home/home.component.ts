import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener( 'window:scroll', ['$event'] )
  onScroll() {
    const posicion = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;

    const max = (document.documentElement.scrollHeight || document.body.scrollHeight)

    if( posicion > max ) {
      this.peliculasSvc.getCartelera().subscribe(res => {
        this.movies.push(...res.results)
      })
      
    }

    
    
  }

  constructor( private readonly peliculasSvc:PeliculasService ) { }

  ngOnInit(): void {
    this.getCartelera();


  }

  getCartelera() {
    this.peliculasSvc.getCartelera().subscribe(res => {
      // console.log(res.results);
      this.movies = res.results
      this.moviesSlideShow = res.results;
      
    })
  }

}

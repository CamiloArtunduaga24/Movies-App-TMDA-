import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetailResponse } from '../../interfaces/movie-detail';
import { Location } from '@angular/common';
import { CastElement } from '../../interfaces/casting';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public detalle: MovieDetailResponse;
  public cast: CastElement[] = [];

  constructor( private readonly avtivatedRoute:ActivatedRoute,
               private readonly peliculasSvc:PeliculasService,
               private readonly location:Location,
               private readonly router:Router ) { }

  ngOnInit(): void {

    const {id} = this.avtivatedRoute.snapshot.params;
   
    combineLatest([

      this.peliculasSvc.getPeliculaDetalle(id),
      this.peliculasSvc.getCast(id)


    ]).subscribe( ([detalle, casting]) => {
      console.log(detalle, casting);

      if( !detalle ) {
         this.router.navigateByUrl('/home');
         return;
      }

       this.detalle = detalle

       this.cast = casting.filter( actor => actor.profile_path != null )
     }); 
     

    // this.peliculasSvc.getPeliculaDetalle(id).subscribe(movie => {

    //   if( !movie ) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }

    //   this.detalle = movie
    // }); 

    //  this.peliculasSvc.getCast(id).subscribe(casting => {
    //    console.log(casting);
    //    this.cast = casting.filter( actor => actor.profile_path != null )
    //  });



    
  }

  regresar() {
    this.location.back();
  }

}

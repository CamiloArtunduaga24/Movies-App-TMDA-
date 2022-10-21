import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Cast, CastElement } from 'src/app/interfaces/casting';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() cast: CastElement[]
 
  constructor() { }

  ngOnInit(): void {
    console.log(this.cast);
    
  }

  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    });
  }

}

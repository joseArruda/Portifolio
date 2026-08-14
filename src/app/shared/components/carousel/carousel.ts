import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [ NgFor ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel {

  images = [
    'assets/images/farmaeagle.'
  ]
}

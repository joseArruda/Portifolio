import { Component } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { NgForOf } from "@angular/common";

register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [ NgForOf ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Carousel {

  projects = [

    {
      title:"FarmaEagle",
      video:"assets/videos/FarmaEagle.webm",
      image: "assets/images/projects/farmaEagle.png",
      description:"Desenvolvido um sistema com Angular, Laravel e MySQL, o Farma Eagle oferece uma solução prática para gerenciamento de produtos, estoque e vendas.",
      link:"https://farmacia-online-frontend-001.vercel.app/home"
    },

    {
      title:"Tatu Alugueis",
      video: "assets/videos/TatuAlugueis.webm",
      image:"assets/images/projects/tatuAlugueis.png",
      description:"Sistema de gestão de aluguel. Com Autenticação e controle de acesso trazendo segurança ao inquilino.",
      link:"https://tatu-alugueis.vercel.app/home"
    },

    {
      title:"Farmácia Online",
      video: "assets/videos/FarmaciaOnline.webm",
      image:"assets/images/projects/farmaciaOnline.png",
      description:"Sistema de Gestão de Farmácia Desenvolvi um sistema completo de gestão de produtos para farmácias.",
      link:"https://farmacia-online-frontend.vercel.app/home"
    }

  ];


currentIndex = 0;

next(){
  this.currentIndex = (this.currentIndex + 1) % this.projects.length;
}

prev(){
  this.currentIndex =
    (this.currentIndex - 1 + this.projects.length) % this.projects.length;
}

goTo(index:number){
  this.currentIndex = index;
}
}

import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { ToggleTheme } from "../../shared/components/toggle-theme/toggle-theme";
import { Logo } from "../../shared/components/logo/logo";
import { Background } from "../../shared/components/background/background";
import { RouterLink } from "@angular/router";
import gsap from 'gsap';

@Component({
  selector: 'app-home',
  imports: [Navbar, ToggleTheme, Logo, Background, RouterLink ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home{

    ngAfterOnInit(){
    gsap.to(".container-main",{

    opacity:0,
    x:-100,
    duration:.4

})



gsap.from(".container-mainr",{

    opacity:0,
    x:100,
    duration:.8

})
  }


}
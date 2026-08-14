import { Component } from '@angular/core';
import { Logo } from "../../shared/components/logo/logo";
import { ToggleTheme } from "../../shared/components/toggle-theme/toggle-theme";
import { Navbar } from "../../shared/components/navbar/navbar";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import {Draggable} from "gsap/Draggable";

@Component({
  selector: 'app-contacts',
  imports: [Logo, ToggleTheme, Navbar ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})


export class Contacts {

    ngOnInit(){

    gsap.registerPlugin(InertiaPlugin, Draggable);
    Draggable.create(".bi-contact",{

    type:"rotation",

    inertia:true

});

  }

}

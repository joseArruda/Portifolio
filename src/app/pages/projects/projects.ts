import { Component } from '@angular/core';
import { Logo } from "../../shared/components/logo/logo";
import { ToggleTheme } from "../../shared/components/toggle-theme/toggle-theme";
import { Navbar } from "../../shared/components/navbar/navbar";
import { Carousel } from "../../shared/components/carousel/carousel";

@Component({
  selector: 'app-projects',
  imports: [Logo, ToggleTheme, Navbar, Carousel ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

}

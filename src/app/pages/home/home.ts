import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { ToggleTheme } from "../../shared/components/toggle-theme/toggle-theme";
import { Logo } from "../../shared/components/logo/logo";
import { Background } from "../../shared/components/background/background";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [Navbar, ToggleTheme, Logo, Background, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home{


}
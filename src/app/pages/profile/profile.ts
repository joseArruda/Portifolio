import { Component } from '@angular/core';
import { Logo } from "../../shared/components/logo/logo";
import { ToggleTheme } from "../../shared/components/toggle-theme/toggle-theme";
import { Navbar } from "../../shared/components/navbar/navbar";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-profile',
  imports: [Logo, ToggleTheme, Navbar, NgIf],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  teste: number = 1;

  passador(){
    console.log(this.teste)
    this.teste += 1;

    if(this.teste > 3){
      this.teste = 1
    }
  }
}

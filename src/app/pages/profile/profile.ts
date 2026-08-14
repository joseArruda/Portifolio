import { Component, ElementRef, QueryList } from '@angular/core';
import { Logo } from "../../shared/components/logo/logo";
import { ToggleTheme } from "../../shared/components/toggle-theme/toggle-theme";
import { Navbar } from "../../shared/components/navbar/navbar";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-profile',
  imports: [Logo, ToggleTheme, Navbar, NgIf ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  expirenceNumber: number = 0;
  certificate: number = 0;
  jobExpirence: number = 0;

  defineContentExpirence(value: number){
   this.expirenceNumber = value;
  
  }

  defineCertificate(value: number){
   this.certificate = value;
  }

  defineJobExpirience(value: number){
    this.jobExpirence = value;
  }

}

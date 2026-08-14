import { Component } from '@angular/core';
import { Logo } from "../../shared/components/logo/logo";
import { ToggleTheme } from "../../shared/components/toggle-theme/toggle-theme";
import { Navbar } from "../../shared/components/navbar/navbar";
import { Background } from "../../shared/components/background/background";

@Component({
  selector: 'app-contacts',
  imports: [Logo, ToggleTheme, Navbar ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {

}

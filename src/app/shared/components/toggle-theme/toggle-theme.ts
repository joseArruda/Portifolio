import { Component } from '@angular/core';
import { NgIf } from "@angular/common";
import { Theme } from '../../../core/services/theme';

@Component({
  selector: 'app-toggle-theme',
  imports: [NgIf],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
})
export class ToggleTheme {

themeIsDark: boolean = false;

constructor(
  private themeService: Theme
){}

  ngOnInit() {

  const savedTheme =
    (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light';

  this.themeIsDark = savedTheme === 'dark';

  this.themeService.setTheme(savedTheme);

 }

  isDark() {

  this.themeIsDark = !this.themeIsDark;

  this.themeService.setTheme(
    this.themeIsDark ? 'dark' : 'light'
  );

 }

}

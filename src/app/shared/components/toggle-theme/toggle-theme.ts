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

 toggleTheme(event: MouseEvent) {

  const x = event.clientX;
  const y = event.clientY;

  const html = document.documentElement;

  html.style.setProperty(
    '--x',
    `${x}px`
  );

  html.style.setProperty(
    '--y',
    `${y}px`
  );


  const newTheme: 'light' | 'dark' =
    this.themeIsDark ? 'light' : 'dark';


  const changeTheme = () => {

    this.themeIsDark = newTheme === 'dark';

    this.themeService.setTheme(newTheme);

  };


  if (!document.startViewTransition) {

    changeTheme();

    return;
  }

  html.classList.add('theme-transition');


  const transition =
    document.startViewTransition(changeTheme);


  transition.finished.then(() => {

    html.classList.remove('theme-transition');

  });

}


}

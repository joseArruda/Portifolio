import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private theme_ = new BehaviorSubject<ThemeType>('light');

  theme$ = this.theme_.asObservable();

  setTheme(theme: ThemeType) {

    this.theme_.next(theme);

    document.body.classList.toggle(
      'dark',
      theme === 'dark'
    );

    localStorage.setItem('theme', theme);

  }

  getCurrentTheme(): ThemeType {
    return this.theme_.value;
  }
}

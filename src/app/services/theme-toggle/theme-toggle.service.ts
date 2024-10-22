import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {  
  private currentTheme: string = (localStorage.getItem('theme') != null) ? localStorage.getItem('theme')! : 'light';

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: string): void {
    document.documentElement.setAttribute('data-bs-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }
}

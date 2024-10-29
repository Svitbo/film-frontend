import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { ThemeToggleService } from 'src/app/services/theme-toggle/theme-toggle.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  searchForm : FormGroup;
  isLightTheme : boolean = true;
  showSearch: boolean = true;

  constructor(
    private formBuilder : FormBuilder,
    private themeService : ThemeToggleService,
    private dataService : DataService,
    private userService : UserService,
    private router: Router) {
    this.searchForm = formBuilder.group({
      title: ['']
    });
  }

  ngOnInit() {
    const current = this.themeService.getCurrentTheme();
    this.themeService.setTheme(current);

    if(current == 'light') this.isLightTheme = true;
    if(current == 'dark') this.isLightTheme = false;

    this.router.events.subscribe(() => {
      this.showSearch = this.router.url !== '/home';
    });
  }

  onSubmit() {
    const title = this.searchForm.get('title')?.value;
    this.dataService.updateTitleToSearchBy(title);

    console.log(title);
  }

  resetFilters() {
    this.scrollToTop();
    this.searchForm.get('title')?.setValue('');
    this.dataService.updateTitleToSearchBy('');
  }

  addMoviePermission() {
    let role = this.userService.getUserRole();

    if(role == 'admin') {
      return true;
    }
    return false;
  }

  favoritesPermission() {
    let role = this.userService.getUserRole();

    if(role == 'user') {
      return true;
    }
    return false;
  }

  lightTheme(): void {
    this.themeService.setTheme('light');
    this.isLightTheme = true;
  }

  darkTheme(): void {
    this.themeService.setTheme('dark');
    this.isLightTheme = false;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

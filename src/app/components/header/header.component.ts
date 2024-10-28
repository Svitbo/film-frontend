import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { ThemeToggleService } from 'src/app/services/theme-toggle/theme-toggle.service';
import { ResetSortingService } from 'src/app/services/reset-sorting/reset-sorting.service';
import { User } from 'src/app/entities/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  searchForm : FormGroup;
  isLightTheme : boolean = true;

  constructor(
    private formBuilder : FormBuilder,
    private themeService : ThemeToggleService,
    private dataService : DataService,
    private resetSortingService : ResetSortingService,
    private userService : UserService) {
    this.searchForm = formBuilder.group({
      title: ['']
    });
  }

  ngOnInit() {
    // const current = this.themeService.getCurrentTheme();
    // this.themeService.setTheme(current);

    // if(current == 'light') this.isLightTheme = true;
    // if(current == 'dark') this.isLightTheme = false;
  }

  onSubmit() {
    const title = this.searchForm.get('title')?.value;
    this.dataService.updateTitleToSearchBy(title);

    console.log(title);
  }

  resetFilters() {
    // localStorage.removeItem('filter');
    // this.resetSortingService.trigger();
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

  findMovie(title: string): void {
    //this.dataService.findByTitle(title);
  }





}

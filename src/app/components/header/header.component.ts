import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { ThemeToggleService } from 'src/app/services/theme-toggle/theme-toggle.service';
import { ResetSortingService } from 'src/app/services/reset-sorting/reset-sorting.service';

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
     private resetSortingService : ResetSortingService) {
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
    // this.scrollToTop();
    this.searchForm.get('title')?.setValue('');
    this.dataService.updateTitleToSearchBy('');
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

  favoritesPermission() {
    let role = localStorage.getItem('role');

    if(role == null || role == 'Guest') {
      return false;
    } 
    return true;
  }

  usersPermission() {
    let role = localStorage.getItem('role');

    if(role != 'Admin') {
      return false;
    } 
    return true;
  }

  addPermission() {
    let role = localStorage.getItem('role');

    if(role == 'Admin' || role == 'Moderator') {
      return true;
    } 
    return false;
  }
}

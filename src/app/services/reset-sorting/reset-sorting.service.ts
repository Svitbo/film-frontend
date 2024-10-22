import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetSortingService {
  private resetSortingSource = new Subject<void>();
  resetSorting$ = this.resetSortingSource.asObservable();

  trigger() {
    this.resetSortingSource.next();
  }
}

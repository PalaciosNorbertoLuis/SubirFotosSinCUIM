import { Component, Injectable} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root',
})
export class LoadingService {


  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  show() {
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }
}

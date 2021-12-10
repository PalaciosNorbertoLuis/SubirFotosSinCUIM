import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  clicked = false;
  name = 'Angular';
  constructor(public loader:LoadingService){}
  
  ngOnInit(){

    window.addEventListener("keyup", disableF5);

    window.addEventListener("keydown", disableF5);

   function disableF5(e: { which: any; keyCode: any; preventDefault: () => void; }) {

      if ((e.which || e.keyCode) == 116) e.preventDefault(); 

   };

 }

}

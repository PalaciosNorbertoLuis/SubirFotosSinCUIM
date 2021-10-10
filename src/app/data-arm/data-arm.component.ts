import { Component, OnInit } from '@angular/core';
import { forEachChild } from 'typescript';
import { Filter } from '../models/Filter';
import { ConsultsService } from '../services/consults.service';


@Component({
  selector: 'app-data-arm',
  templateUrl: './data-arm.component.html',
  styleUrls: ['./data-arm.component.css']
})
export class DataArmComponent implements OnInit {

  consult:any;
  referencia:number;
  constructor(private consultService: ConsultsService) { }

  ngOnInit(): void {
  }

  SerchReference (reference:number){
    this.consultService.getReference(reference).subscribe(
      res => {
        this.consult = res;
        if (this.consult.idDescripcionArma != null){
          this.Consult(this.consult.idDescripcionArma)
        }
        console.log(res);
      },
      err => console.log(err)
    );
  }
 


  Consult(idArma:number){
    this.consultService.getConsult(idArma).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  
  Filter(reference: number){
    this.consultService.getFilter(reference).subscribe(
      res => {
        //console.log(typeof res);
        //this.filter = res;
        //for  (var _i = 0 ; _i < this.filter.length; _i++){} 
            },
      err => console.log(err)
    );
    
  }
  Reference(reference: number){
    this.consultService.getReference(reference).subscribe(
      res => console.log(res)
    );
    
  }

  Folder(reference: number){
    this.consultService.getDirectoryArm(reference).subscribe(
      res => console.log(res)
    );
    
  }


}

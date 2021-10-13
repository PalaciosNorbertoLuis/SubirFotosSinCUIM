import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConsultsService } from '../services/consults.service';


@Component({
  selector: 'app-data-arm',
  templateUrl: './data-arm.component.html',
  styleUrls: ['./data-arm.component.css']
})
export class DataArmComponent implements OnInit {

 
  referenceGet:any =[];
  observationGet:any;
  consultGet:any = [];
  filterGet:any;
  folderGet = Array<SafeUrl>();
  folderGet2:any ;
  referencia:number;
  constructor(private consultService: ConsultsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  public getSantizeUrl(imageData: string) {
    
    return this.sanitizer.bypassSecurityTrustUrl(imageData)
    //bypassSecurityTrustUrl(image);
  }

  SerchReference (reference:number){
    this.consultService.getReference(reference).subscribe(
      res => {
        this.referenceGet = res;
        if (this.referenceGet.idDescripcionArma != null){
          this.Consult(this.referenceGet.idDescripcionArma)
        }
        this.Observation(reference);
        this.Filter(reference);
        this.Folder(reference);
        console.log(this.referenceGet);
      },
      err => console.log(err)
    );
  }
 


  Consult(idArma:number){
    this.consultService.getConsult(idArma).subscribe(
      res => {
        this.consultGet = res;
        console.log(this.consultGet);
      },
      err => console.log(err)
    );
  }
  
  Reference(reference: number){
    this.consultService.getReference(reference).subscribe(
      res => console.log(res)
    );
    
  }

  Observation(reference: number){
    this.consultService.getObservation(reference).subscribe(
      res => {
        this.observationGet = res;
        console.log(this.observationGet);
      },
      err => console.log(err)
    );
    
  }

  Filter(reference: number){
    this.consultService.getFilter(reference).subscribe(
      res => {
        this.filterGet = res;
        //console.log(this.filterGet);
            },
      err => console.log(err)
    );
    
  }

  Folder(reference: number){
    this.consultService.getDirectoryArm(reference).subscribe(
      res => {
        //console.log(res)
        this.folderGet2 = res;
        for (let r of this.folderGet2){
          var imageData = this.sanitizer.bypassSecurityTrustUrl(`data:image/*;base64,${r}`);
          this.folderGet.push(imageData);
        }
        //console.log(this.folderGet)
      },
      err => console.log(err)
    );
  }

}

import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultsService } from '../services/consults.service';


@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class UploadPhotoComponent {
  urls =  Array<string>();
  files = [];
  index:number = 0;
  index2:number = 0;
  images = [];

  constructor(config: NgbModalConfig, 
              private modalService: NgbModal,
              private consultService:ConsultsService) {
    // customize default values of modals used by this component tree
    config.backdrop = true; //'static';
    config.keyboard = true;
    config.animation = true;
    config.size = 'lg';
  }
  open(content:any) {
    this.modalService.open(content);
  }

  Reference(reference: number){
    this.consultService.getReference(reference).subscribe(
      res => console.log(res)
    );
    
  }

  Filter(reference: number){
    this.consultService.getFilter(reference).subscribe(
      res => console.log(res)
    );
    
  }

  Folder(reference: number){
    this.consultService.getDirectoryArm(reference).subscribe(
      res => console.log(res)
    );
    
  }
  

  detectFiles(event:any) {
  // console.log(this.urls);
  //  this.urls = [];
   
    let files = event.target.files;
    let images = event.target.files;
    //console.log(files);
    if (files) {
      
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.index2 = this.urls.length + 1;
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  borrarImagen(index:number){
    this.urls.splice(index,1);
    //console.log(this.urls.length);
    this.index2 = this.urls.length;

  }


}

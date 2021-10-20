import { Component, ElementRef, Output, ViewChild } from '@angular/core';
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
  calScroll:any;



  constructor(config: NgbModalConfig, 
              private modalService: NgbModal,
              private consultService:ConsultsService) {
    // customize default values of modals used by this component tree
    config.backdrop = true; //'static';
    config.keyboard = true;
    config.animation = true;
    config.size = 'lg';
  }

  ngOnInit(): void {
    this.scrollShow();
  }

  //Scroll
  scrollShow  (){
    window.scroll({ 
      top: 700, 
      left: 0, 
      behavior: 'smooth' 
    });
  }


  open(content:any) {
    this.modalService.open(content);
  }
  

  

  detectFiles(event:any) {
    let files = event.target.files;
    let images = event.target.files;
    console.log(files);
    if (files) {
      
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.index2 = this.urls.length + 1;
          this.urls.push(e.target.result);
          this.scrollShow()
        }
        reader.readAsDataURL(file);
      }
    }
    
  }

  borrarImagen(index:number){
    this.urls.splice(index,1);
    this.index2 = this.urls.length;

  }


}

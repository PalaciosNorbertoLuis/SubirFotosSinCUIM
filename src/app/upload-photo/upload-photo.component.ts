import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsultsService } from '../services/consults.service';
import {DataArmComponent} from '../data-arm/data-arm.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class UploadPhotoComponent {
//Variables
  urls =  Array<string>();
  files = [];
  index:number = 0;
  index2:number = 0;
  images:Array<string>= [];
  calScroll:any;
  mensaje:any;
  @Input() referencia:any;


  constructor(config: NgbModalConfig, 
              private modalService: NgbModal,
              private consultService:ConsultsService,
              private dataArmComponet:DataArmComponent,
              ) {
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
      top: 2000, 
      left: 0, 
      behavior: 'smooth'
    });
  }

  open(content:any) {
    this.modalService.open(content);
  }

  detectFiles(event:any) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.index2 = this.urls.length + 1;
          this.urls.push(e.target.result);
          this.scrollShow();
        }
        reader.readAsDataURL(file);
      }
    }
  }

  borrarImagen(index:number){
    this.urls.splice(index,1);
    this.index2 = this.urls.length;
  }

  //Guardar los cambios. 
  
  successNotification(){
    Swal.fire({
      allowOutsideClick: false,
      focusConfirm:true,
      title: `Desea guardar las fotos 
       en la Referencia:${this.referencia}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '<i class="material-icons">add_to_photos</i> <i class="buttonConfirm">Guardar</i>',
      denyButtonText: '<i class="material-icons">highlight_off</i> <i class="buttonConfirm">No guardar</i>',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth'
        });
          this.consultService.postDirectoryArm(this.urls,this.referencia).subscribe(
            res =>{
              this.mensaje = res;
              Swal.fire({
                icon: 'success',
                title: 'Se guardaron las fotos',
                confirmButtonText:'<i class="material-icons">done</i>',
                allowOutsideClick: false
              }).then(() => { 
                this.dataArmComponet.reloadPage();
              })},
             err=> console.log(err)
             );
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'info',
          title: 'No se realizaron los cambios',
          confirmButtonText:'<i class="material-icons">done</i>',
          allowOutsideClick: false
        })
      }
    })
  }


}

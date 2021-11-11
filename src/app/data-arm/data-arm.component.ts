import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConsultsService } from '../services/consults.service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

//import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-arm',
  templateUrl: './data-arm.component.html',
  styleUrls: ['./data-arm.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class DataArmComponent implements OnInit {
  //Variables
  referenceGet?: any;
  observationGet?: any;
  filterGet?: any;
  folderGet = Array<SafeUrl>();
  folderGet2?: any;
  referencia: any;
  fecha: string;
  tituloFecha: string;
  showSelected: boolean = false;
  sinFotos: boolean = false;
  imageZani: SafeUrl;
  //Variables Arm
  numeroSerie: any;
  tipo: any;
  marca: any;
  modelo: any;
  calibre: any;
  clase: any;
  medida: any;

  constructor(
    private loginService:LoginService,
    private consultService: ConsultsService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = true; //'static';
    config.keyboard = true;
    config.animation = true;
    config.size = 'lg';
  }

  ngOnInit(): void {}

  ///prueba logout
  
  logout(){
    this.loginService.logout();
  }

  // Modal
  open(content: any) {
    this.modalService.open(content);
  }

  //Mostrar subir fotos
  ShowUpload() {
    this.showSelected = true;
  }

  //refrescar pagina
  Refresh() {
    this.referencia = '';
    this.referenceGet = null;
    this.filterGet = null;
    this.observationGet = null;
    this.folderGet2 = null;
    this.folderGet = [];
    this.showSelected = false;
    this.fecha = '';
  }
// Primera busqueda (por numero de referencia) //
  SerchReference(reference: number) {
    this.consultService.getReference(reference).subscribe(
      (res) => {
        this.referenceGet = res;
        // Si es null la referencia no existe //
        if (this.referenceGet == null) {
          Swal.fire({
            icon: 'info',
            title: `No se encontraron datos 
                    con la referencia ${reference}`,
            showConfirmButton: false,
            timer: 2200,
            timerProgressBar: true,
          });
          this.referencia = '';
          return;
        }

        if (this.referenceGet.idDescripcionArma != null) {
          this.numeroSerie = this.referenceGet.numeroSerie;
          this.Consult(this.referenceGet.idDescripcionArma);
        } else {
          this.numeroSerie = this.referenceGet.numeroSerie;
          this.calibre = this.referenceGet.calibre;
          this.clase = this.referenceGet.clase;
          this.marca = this.referenceGet.marca;
          this.medida = this.referenceGet.medida;
          this.modelo = this.referenceGet.modelo;
          this.tipo = this.referenceGet.tipoArma;
        }
        this.Observation(reference);
        this.Filter(reference);
        this.Folder(reference);
      },
      (err) => console.log(err)
    );
  }

  Consult(idArma: number) {
    this.consultService.getConsult(idArma).subscribe(
      (res) => {
        var data: any = res;
        this.calibre = data.calibre;
        this.clase = data.clase;
        this.marca = data.marca;
        this.medida = data.medida;
        this.modelo = data.modelo;
        this.tipo = data.tipoArma;
      },
      (err) => console.log(err)
    );
  }

  Reference(reference: number) {
    this.consultService
      .getReference(reference)
      .subscribe((res) => console.log(res));
  }

  Observation(reference: number) {
    this.consultService.getObservation(reference).subscribe(
      (res) => {
        this.observationGet = res;
        if (this.observationGet.length == 0){
          this.observationGet = null;
        }
        // else{
        //   this.observationGet = res;
        // }
      },
      (err) => console.log(err)
    );
  }

  Filter(reference: number) {
    this.consultService.getFilter(reference).subscribe(
      (res) => {
        if (res.valueOf() != '') {
          this.filterGet = res;
        }
      },
      (err) => console.log(err)
    );
  }

  //Busqueda de fotos
  Folder(reference: number) {
    this.consultService.getDirectoryArm(reference).subscribe(
      (res) => {
        this.folderGet2 = res;
        //Carga el titulo si no hay fotos.
        if (
          this.folderGet2.indexOf('Aún no hay fotos para la referencia') != -1
        ) {
          this.tituloFecha = this.folderGet2;
          return;
        }
        //Si hay fotos carga las fotos y el titulo con la fecha.
        for (let r of this.folderGet2) {
          this.fecha = r;
          if (this.fecha.indexOf('subieron/actualizaron') != -1) {
            this.tituloFecha = r;
            continue;
          }
          //Sanitiza las Url de las imagenes para visualizar en el navegador.
          var imageData = this.sanitizer.bypassSecurityTrustUrl(
            `data:image/*;base64,${r}`
          );
          this.folderGet.push(imageData);
        }
      },
      (err) => console.log(err)
    );
  }
}

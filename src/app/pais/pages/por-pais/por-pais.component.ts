import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [],
})
export class PorPaisComponent {

  termino: string = '';
  foundError: boolean = false;
  paises:Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino:string) {
    this.foundError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => {        
        this.paises = paises;
      },
      error: (err) => { //404
        this.foundError = true;
        this.paises = [];
      },
    });
  }

  sugerencias(termino:string){
    this.foundError = false;
    //crear sugerencias
  }
}

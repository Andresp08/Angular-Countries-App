import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  foundError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.foundError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;
    
    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: (err) => {
        //404
        this.foundError = true;
        this.paises = [];
      },
    });
  }

  sugerencias(termino: string) {

    this.foundError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    //crear sugerencias

    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      error: (err) => {
        this.paisesSugeridos = [];
      },
    });
  }

  buscarSugerido(termino:string){
    this.buscar(termino);
  }
}

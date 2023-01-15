import { Component } from '@angular/core';

import { Country } from '../../interfaces/pais.interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {

  termino: string = '';
  foundError: boolean = false;
  paises:Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino:string) {
    this.foundError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino).subscribe({
      next: (paises) => {        
        this.paises = paises;
      },
      error: (err) => { //404
        this.foundError = true;
        this.paises = [];
      },
    });
  }

}

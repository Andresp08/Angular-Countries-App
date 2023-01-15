import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  languages!: string[];
  borders!: string[];
  //translations!: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ codigoPais }) =>
          this.paisService.getPaisPorCodigo(codigoPais)
        ),
        tap(console.log) //recibe lo que hace el switchMap y lo impr. consola
      )
      .subscribe(pais => { 
        this.pais = pais[0]; 
        this.languages = Object.values(this.pais.languages);
        this.borders = Object.values(this.pais.borders);
        //this.translations = Object.values(this.pais.translations)
        
      });
  }
}

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  //tipo de observable que permite emitir valores
  debouncer:Subject<string> = new Subject(); 

  termino:string = '';

  ngOnInit(): void { //cuando el componente es creado y ya está inicializado
    this.debouncer
    .pipe(debounceTime(300)) 
    .subscribe(valor => { //no llega hasta que el observable deje de emitir valor por los proximos 300 ms
      this.onDebounce.emit(valor);
    })
  }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    this.debouncer.next(this.termino);
  }
}

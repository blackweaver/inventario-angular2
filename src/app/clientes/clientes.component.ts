//Módulo para la creación de componentes y para saber cuando un componente ha sido iniciado
import { Component, OnInit } from '@angular/core';

//Defino el componente con sus partes
@Component({
  //Referencia del componente de la sección clientes
  selector: 'app-clientes',
  //Entre comitas inclinadas se crea el contenido del template de datos, acepta variables y saltos de línea
  template: `
    <p>
      clientes Works!
    </p>
  `,
  //Referencia de los estilos de la sección clientes
  styles: []
})
//Exporto la clase del componente
export class ClientesComponent implements OnInit {
  //Constructor de la clase
  constructor() { }

  //Método que se ejecuta cuando el componente ha sido creado
  ngOnInit() {
  }

}

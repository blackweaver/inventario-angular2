//Módulo para la creación del componente principal, interface para el inicio del componente y decorador del componente
import { Component, OnInit, HostBinding } from '@angular/core'; 
//Módulo para la creación de rutas
import { Router } from '@angular/router';
//Importo la clase con el servicio
import { InventarioService } from './inventario.service';
//Importo la clase con las propiedades de cada artículo
import { Inventario } from './inventario';
//Importo las animaciones personalizadas para la transición de las subsecciones de inventario
import { slide } from './animations';

@Component({
	//Referencia del componente del listado
	selector: 'inventario-lista',
	//Referencia del template donde se imprimirán los datos
	templateUrl: './inventario-lista.component.html',
	//Asignación de animación para cuando se cargue el componente
	animations: [slide]
})
//Exporto la clase del componente
export class InventarioListaComponent implements OnInit {
	//Decoro el componente con la animación, hago visible el bloque asigno una posición absoluta
	@HostBinding('@routeAnimation') routeAnimation = true;
	@HostBinding('style.display') display = 'block';
	@HostBinding('style.position') position = 'absolute';
	//Defino la propiedad "lista" con los datos del artículo del inventario
	lista: Inventario[];
	//Título para el título de la página
	titulo: string;
	//Constructor de la clase
	constructor(
		//Declaro las propiedades para crear una ruta y el servicio
		private router: Router,
		private servicio: InventarioService
	) {}
	//Cuando se inicia el componente, llamo al método del servicio de la API que trae todo el inventario.
	ngOnInit(){
		this.titulo = "Inventario de productos";
		this.servicio.getInventarios()
			.subscribe(
				//De obtener datos, los guardo en la propiedad lista del tipo Inventario
				rs => this.lista = rs,
				//De existir error lo imprimo en la consola
				er => console.log(er),
				//Imprimo la lista que traigo en la consola
				() => console.log(this.lista) 
			)
	}
	//Método que me redirecciona al formulario para editar un inventario, recibe el formulario por parámetro
	editar(item: Inventario){
		let link = ['./inventario/detalle',item.id];
		this.router.navigate(link);
	}
	//Método para borrar un ítem del inventario, recibe el formulario por parámetro
	borrar(item: Inventario){
		//Si no recibe datos, retorna sin consultar el servicio
		if(!item) return;
		//Llamo al método del servicio que borra un ítem del inventario. Paso como parámetro el ID del ítem.
		this.servicio.delInventario(item.id)
			.subscribe(
				//Tanto al obtener datos, o bien, exista un error, los imprimo en la consola
				rs => console.log(rs),
				er => console.log(er),
				//Asigno el valor del resultado a la propiedad lista del objeto inventario, con la que actualizaré los nuevos datos en la pantalla
				() => { 
					//Muestro los datos filtrando el ítem que he borrado
					this.lista = this.lista.filter(h => h !== item)
				}
			)

	}

}

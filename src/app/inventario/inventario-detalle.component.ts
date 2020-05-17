// Módulo para la creación del componente principal, interface para el inicio del componente y decorador del componente
import { Component, OnInit, HostBinding } from '@angular/core'; 
// Módulo para la creación de rutas y recepción de parámetros en las rutas
import { Router, ActivatedRoute, Params } from '@angular/router';
// Módulos para la creación de formularios y validaciones
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// Importo la clase con el servicio
import { InventarioService } from './inventario.service';
// Importo la clase con las propiedades de cada artículo
import { Inventario } from './inventario';
// Importo las animaciones personalizadas para la transición de las subsecciones de inventario
import { slide } from './animations';

// import { InventarioValidators } from './inventario.validators';

@Component({
	// Referencia del componente del detalle
	selector: 'inventario-detalle',
	// Referencia del template donde se imprimirán los datos
	templateUrl: './inventario-detalle.component.html',
	// Asignación de animación para cuando se cargue el componente
	animations: [slide]
})
export class InventarioDetalleComponent implements OnInit {
	// Decoro el componente con la animación, hago visible el bloque asigno una posición absoluta
	@HostBinding('@routeAnimation') routeAnimation = true;
	@HostBinding('style.display') display = 'block';
	@HostBinding('style.position') position = 'absolute';
	// Declaro las propiedades para el título del formulario, el que dependerá si edita o crea.
	titulo: string;
	// Declaro la propiedad del formulario, del tipo "FormGroup"
	form: FormGroup;
	// Defino la propiedad "inventario" con los datos del artículo editado o nuevo creado.
	inventario: Inventario[];
	// Declaro el estado del formulario, false para crear ítem, true para editarlo.ß
	esEdicion: Boolean = false;
	// Constructor de la clase
	constructor(
		// Declaro las propiedades para crear una ruta, recibir parámetros, el servicio de información y constructor del formulario
		private route: ActivatedRoute, 
		private router: Router,
		private service: InventarioService,
		private fb: FormBuilder,
	) {  }
	// Cuando se inicia el componente, llamo al método del servicio de la API que trae todo el inventario.
	ngOnInit(){
		// Declaro una variable con el valor del ID que recibo en la URL
		let id = this.route.snapshot.params['id'];
		// De no existir ID, el formulario será de creación, llamo al método de crear los controles y retorno
		if(!id) {
			this.titulo = "Agregar un nuevo registro";
			this.crearControlesNuevo();
			return;
		}
		// Esto se ejecutrá en caso de recibir un ID para editar un artículo
		this.titulo = "Editar registro";
		this.crearControlesEditar();			
		// Llamo al método del servicio de la API que trae los datos del artículo pasando el ID
		this.service.getInventario(id)
			.subscribe(
				// De obtener un ítem, los guardo en la propiedad inventario del tipo Inventario
				rs => this.inventario = rs,
				// De existir error lo imprimo en la consola
				er => console.log('Error: %s',er),
				// En caso de que existan un ítem, defino el formulario como de edición y cargo el 
				// FormGroup de la variable form con los datos recibidos, con el objetivo de mostrar la información en los campos
				() => {
					console.log("Total: " + this.inventario.length);
					if(this.inventario.length > 0){
						this.esEdicion = true;
						this.form.patchValue({
							id: this.inventario[0].id,
							producto: this.inventario[0].producto,
							existencia: this.inventario[0].existencia,
							precio: this.inventario[0].precio,
							proveedor: this.inventario[0].proveedor
						})
					}
					// Por último, hago que la variable inventario del tipo Inventario, tenga los datos del formulario
					this.inventario = this.form.value;
				}
			);
	}
	// Método para crear los controles del formulario para un nuevo artículo
	crearControlesNuevo(){
		// Defino cada campo como vacío y con las validaciones requeridas
		this.form = this.fb.group({
			producto: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(10)
			])],
			existencia: ['', Validators.required],
			precio: ['', Validators.required],
			proveedor: ['', Validators.required]
		});
		// Por último, hago que la variable inventario del tipo Inventario, tenga los datos del formulario
		this.inventario = this.form.value;
	}

	crearControlesEditar(){
		// Defino cada campo como vacío y con las validaciones requeridas
		this.form = this.fb.group({
			id: [''],
			producto: ['', Validators.compose([
				Validators.required,
				Validators.maxLength(10)
			])],
			existencia: ['', Validators.required],
			precio: ['', Validators.required],
			proveedor: ['', Validators.required]
		});
		// Por último, hago que la variable inventario del tipo Inventario, tenga los datos del formulario
		this.inventario = this.form.value;
	}
	// Método que guarda las modificaciones de un ítem existente, o bien, agrega el ítem nuevo
	guardarInventario(){
		if(this.esEdicion){
			this.updateInventario(this.form.value);
		}else{
			this.agregarInventario(this.form.value);
		}
	}
	// Método que agrega un ítem nuevo
	agregarInventario(inventario: Inventario){
		console.log(this.form.value);
		///Llamo al método del servicio de la API que guarda un nuevo ítem pasando el objeto inventario como parámetro
		this.service.addInventario(inventario)
					.subscribe(
						// De guardarse con éxito, imprimo objeto de datos en la consola
						rt => console.log(rt),
						// De no ser así, imprimo el error en la consola
						er => console.log(er),
						// Imprimo como terminado y redirecciono a la lista de artículos
						() => { console.log('terminado'), this.goLista() }
					);
	}
	// Método que actualiza un ítem existente
	updateInventario(inventario: Inventario){
		// Si no tengo valores en le formualio, retorno vacío el método
		if(!inventario) return;
		console.log("ID: " + inventario.id);
		// Si tengo datos, llamo al método del servicio de la API que actualiza un ítem pasando el objeto inventario como parámetro
		this.service.putInventario(inventario)
					.subscribe(
						// De guardarse con éxito, imprimo objeto de datos en la consola
						rt => console.log(rt),
						// De no ser así, imprimo el error en la consola
						er => console.log(er),
						// Imprimo como terminado y redirecciono a la lista de artículos
						() => this.goLista()
					)
	}
	// Método que redirecciono la URL actual al listado de artículos
	goLista(){
		let link = ['/inventario/lista'];
		this.router.navigate(link);
	}
	// Método para limpiar los campos del formulario
	limpiarFromulario(form){
		form.reset();
	}
}
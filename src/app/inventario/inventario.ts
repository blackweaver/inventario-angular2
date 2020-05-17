//Objeto que contiene como propiedades, cada una de las columnas de la base de datos para ser modificadas desde el formulario
export class Inventario {
	constructor(
		public id: number,
		public producto: string,
		public existencia: number,
		public precio: number,
		public proveedor: string
	) { }
}

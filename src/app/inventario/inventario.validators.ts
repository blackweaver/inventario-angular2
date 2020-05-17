import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { InventarioService } from './inventario.service';

export class InventarioValidators {
	static valorUnico(servicio: InventarioService): ValidatorFn {
		return (control: AbstractControl): {[Key:string]:any} => {
			if(this.isPresent(Validators.required(control))) return null;

			var v = control.value;

			return new Promise((resolve,reject) => { 
				servicio.getInventario(v).subscribe(
					data => {
						if (data.length > 0)
							resolve({valorUnico:true})
						else
							resolve(null)
					},
					err => resolve({valorUnico:true})
				)
			})
		}
	}

	static isPresent(obj: any): boolean {
		return obj != undefined && obj !== null;
	}
}
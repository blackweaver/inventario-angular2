import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Inventario } from './inventario';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class InventarioService {

  // private headers = new Headers({ 'Content-type':'application/json' });
  private options;
	private url = 'http://localhost:8001/inventario';
	
  	constructor(private http: Http) { 
      let token = localStorage.getItem('token');
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + token
      });
      this.options = new RequestOptions({ headers: headers })
    }

  	getInventarios():Observable<Inventario[]> {
      let url = `${this.url}`;
      return this.http.get(url, this.options)
              .map(r => r.json())
              .catch(this.handleError);
    }

    getInventario(id: number):Observable<Inventario[]> {
  		let url = `${this.url}/${id}`;
  		return this.http.get(url, this.options)
              .first()
  						.map(r => r.json())
  						.catch(this.handleError);
  	}

    addInventario(inventario: Inventario){
      let url = `${this.url}`;
      let iJson = JSON.stringify(inventario);
      //return this.http.post(url, iJson, { headers: this.headers})
      return this.http.post(url, iJson, this.options)
                  .map(r => r.json())
                  .catch(this.handleError)
    }

    putInventario(inventario: Inventario){
      let url = `${this.url}`;
      let iJson = JSON.stringify(inventario);
      //return this.http.put(url, iJson, { headers: this.headers})
      return this.http.put(url, iJson, this.options)
                  .map(r => r.json())
                  .catch(this.handleError)
    }

    delInventario(id: number){
      let url = `${this.url}/${id}`;
      return this.http.delete(url, this.options)
              .map(r => r.json())
              .catch(this.handleError);
    }

  	private handleError(error: Response | any) {
  		let errMsg: string;
  		if(error instanceof Response){
  			let body = error.json() || '';
  			let err = body.error || JSON.stringify(body);
  			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  		}else{
  			errMsg = error.message ? error.message : error.toString();
  		}
  		return Observable.throw(errMsg);
  	}
}
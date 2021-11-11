import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/empresa';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  resourceurl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceurl = environment.ConexionWebApiProxy + 'Empresas/';
  }

  get(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(this.resourceurl);
  }

  post(obj: Empresa) {
    return this.httpClient.post(this.resourceurl, obj);
  }

  put(id: number, obj: Empresa) {
    return this.httpClient.put(`${this.resourceurl}${id}`, obj);
  }
}

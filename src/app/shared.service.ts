import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/data/models/usuarioModel';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="https://localhost:44346/api/Usuarios";

  constructor(private http:HttpClient) { }

  retornaListaUsuarios():Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(this.APIUrl);
  }

  adicionaUsuario(val:any){
    return this.http.post<any>(this.APIUrl, val);
  }

  atualizaUsuario(val:any){

    return this.http.put<any>(this.APIUrl+'/'+val.UsuarioId, val);
  }

  removeUsuario(id:string){
    return this.http.delete<any>(this.APIUrl+'/'+id);
  }
}

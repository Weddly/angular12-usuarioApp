import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditaUsuarioDialog } from './edita-usuario-dialog/edita-usuario-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  constructor(private _service: SharedService, public dialog: MatDialog, datePipe: DatePipe) { }

  ListaUsuarios:any=[];

  displayedColumns: string[] = ['UsuarioId','Nome', 'Sobrenome', 'Email', 'DtNascimento', 'Escolaridade', 'Acoes'];
  dataSource = this.ListaUsuarios;

  ngOnInit(): void {
    this.atualizaListaUsuarios();
  }

  atualizaListaUsuarios(){
    this._service.retornaListaUsuarios().subscribe(data=> {
      this.ListaUsuarios = data;
      this.dataSource = this.ListaUsuarios;
    });
  }

  excluirUsuario(id: string) {
    this._service.removeUsuario(id).subscribe(res=> {
      this.atualizaListaUsuarios();
      alert(res.status);
    });
  }

  adicionarUsuario(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';
    dialogConfig.minHeight = '60%';
    dialogConfig.maxHeight = '80%';
    dialogConfig.data = {
    };
    const dialogRef = this.dialog.open(EditaUsuarioDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.atualizaListaUsuarios();
    });
  }

  atualizarUsuario(element:any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';
    dialogConfig.minHeight = '60%';
    dialogConfig.maxHeight = '80%';
    dialogConfig.data = {
      UsuarioId : element.usuarioId,
      Nome : element.nome,
      Sobrenome : element.sobrenome,
      Email : element.email,
      DtNascimento : element.dtNascimento,
      Escolaridade : element.escolaridade,
    };
    const dialogRef = this.dialog.open(EditaUsuarioDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.atualizaListaUsuarios();
    });
  }
}

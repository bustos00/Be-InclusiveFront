import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {
  usuario: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    this.usuario.categoria = this.tipoUser

    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas não conferem!')
    } else {
      this.authService.atualizarUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['inicio'])
        alert("Usuário atualizado com sucesso, faça o login novamente.")
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])
      });
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
    }
  }

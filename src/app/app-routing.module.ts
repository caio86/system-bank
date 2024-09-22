import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemClienteComponent } from './pages/cliente/listagem-cliente/listagem-cliente.component';
import { CadastroClienteComponent } from './pages/cliente/cadastro-cliente/cadastro-cliente.component';
import { ListagemContaComponent } from './pages/conta/listagem-conta/listagem-conta.component';
import { CadastroContaComponent } from './pages/conta/cadastro-conta/cadastro-conta.component';

const routes: Routes = [
  {
    path: "cliente",
    children: [
      {
        path: "novo",
        component: CadastroClienteComponent,
      },
      {
        path: "editar/:id",
        component: CadastroClienteComponent,
      },
      {
        path: "",
        component: ListagemClienteComponent,
      },
    ],
  },
  {
    path: "conta",
    children: [
      {
        path: "novo",
        component: CadastroContaComponent,
      },
      {
        path: "editar/:id",
        component: CadastroContaComponent,
      },
      {
        path: "",
        component: ListagemContaComponent,
      },
    ],
  },
  {
    path: "",
    component: ListagemClienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

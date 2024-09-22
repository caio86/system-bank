import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemContaComponent } from './listagem-conta/listagem-conta.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CadastroContaComponent } from './cadastro-conta/cadastro-conta.component';
import { SaqueContaComponent } from './saque-conta/saque-conta.component';



@NgModule({
  declarations: [
    ListagemContaComponent,
    CadastroContaComponent,
    SaqueContaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ListagemContaComponent,
  ],
})
export class ContaModule { }

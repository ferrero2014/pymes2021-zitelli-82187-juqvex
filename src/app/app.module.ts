import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {
  NgbDatepickerModule,
  NgbModalModule,
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { ArticulosFamiliasComponent } from './components/articulos-familias/articulos-familias.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { VentasConsultasComponent } from './components/ventas-consultas/ventas-consultas.component';
import { ClientesInfoComponent } from './components/clientes-info/clientes-info.component';
import { EmpresasComponent } from './components/empresas/empresas.component';

import { MyInterceptor } from './shared/my-interceptor';

import { DatePickerAdapterISO } from './shared/DatePickerAdapterISO';
import { DatePickerParserFormatter } from './shared/DatePickerParserFormater';
import { DatePickerSpanish } from './shared/DatePickerSpanish';
import { FormFocusDirective } from './shared/form-focus.directive';

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    //Ref Angular Routing
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioComponent },
        { path: 'articulos', component: ArticulosComponent },
        { path: 'articulosfamilias', component: ArticulosFamiliasComponent },
        //{ path: 'clientes', component: ClientesComponent },
        { path: 'ventas', component: VentasComponent },
        { path: 'ventasconsultas', component: VentasConsultasComponent },
        { path: 'empresas', component: EmpresasComponent },
        //Ref Angular LazyLoad #1  https://angular.io/guide/lazy-loading-ngmodules
        {
          path: 'clientes',
          loadChildren: () =>
            import('./components/clientes/clientes.module').then(
              (m) => m.ClientesModule
            ),
        },
        { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
      ],
      {
        relativeLinkResolution: 'legacy',
        // Ref Angular LazyLoad #2 https://angular.io/guide/lazy-loading-ngmodules
        preloadingStrategy: PreloadAllModules,
      }
    ),
    NgbModule,
    NgbPaginationModule,
    NgbModalModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
  ],
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    ArticulosFamiliasComponent,
    ArticulosComponent,
    ModalDialogComponent,

    ClientesInfoComponent,
    VentasComponent,
    VentasConsultasComponent,
    EmpresasComponent,
    //FormFocusDirective
  ],
  entryComponents: [ModalDialogComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },

    // ref angular ngbootrapt datepicker
    { provide: NgbDateAdapter, useClass: DatePickerAdapterISO },
    { provide: NgbDateParserFormatter, useClass: DatePickerParserFormatter }, // formato datepicker desde/hacia el imput
    { provide: NgbDatepickerI18n, useClass: DatePickerSpanish },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

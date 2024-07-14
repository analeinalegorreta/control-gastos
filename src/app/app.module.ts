import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './Components/form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillsComponent } from './Components/bills/bills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {MatNativeDateModule, ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { ModalComponent } from './Components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { ModalEditComponent } from './Components/modal-edit/modal-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    BillsComponent,
    ModalComponent,
    ModalEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

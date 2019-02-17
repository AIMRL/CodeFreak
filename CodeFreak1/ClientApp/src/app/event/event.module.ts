import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeFreakMaterialModuleModule } from '../Angular Material/code-freak-material-module/code-freak-material-module.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { CreateEventComponent } from './create-event/create-event.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { Md2Module } from 'md2';
import { SiteLayoutComponent } from '../layouts/site-layout/site-layout.component';
import { EventHomeComponent } from './event-home/event-home.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CodeFreakMaterialModuleModule,
    Md2Module,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '', component: SiteLayoutComponent, children: [
          { path: 'create-event', component: CreateEventComponent },
          { path: 'create-event', component: EventHomeComponent },
          { path: 'event-home/:eventId', component: EventHomeComponent }
        ]
      }

    ])

  ],
  declarations: [CreateEventComponent, EventHomeComponent]
})
export class EventModule { }

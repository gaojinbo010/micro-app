import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AssetUrlPipe } from './pipes';
import { SafeHTMLDirective } from './directives';

const MODULES = [
  CommonModule,
  RouterModule
];
const COMPONENTS = [];
const DIRECTIVES = [
    SafeHTMLDirective
];
const PIPES = [
    AssetUrlPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  imports: [
    ...MODULES
  ],
  exports: [
      FormsModule,
    ...MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<Object> {
    return {
      ngModule: SharedModule,
      providers: [
      ]
    };
  }
}
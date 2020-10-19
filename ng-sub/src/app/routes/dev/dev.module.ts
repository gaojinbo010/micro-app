import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DevRoutingModule } from './dev.routing';
import { DevComponent } from './dev/dev.component';

@NgModule({
  declarations: [DevComponent],
  imports: [
    SharedModule,
    DevRoutingModule
  ]
})
export class DevModule { }

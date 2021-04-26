import { NgModule } from '@angular/core'
import { FusejsPipe } from './fusejs.pipe'
import { FusejsService } from './fusejs.service'

@NgModule({
  providers: [
    FusejsService
  ],
  declarations: [
    FusejsPipe,
  ],
  exports: [
    FusejsPipe,
  ]
})
export class FusejsModule {};

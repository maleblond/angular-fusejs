import {NgModule} from '@angular/core'
import {FusejsPipe} from './src/fusejs.pipe'
import {FusejsService} from './src/fusejs.service'

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
export class FusejsModule {}
export * from './src/fusejs.service';
export * from './src/fusejs.pipe';
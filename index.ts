import {NgModule} from '@angular/core'
import {FusejsService} from './src/fusejs.service'

@NgModule({
  providers: [
    FusejsService
  ]
})
export class FusejsModule {
  constructor() {
    console.log('okok');
  }
}

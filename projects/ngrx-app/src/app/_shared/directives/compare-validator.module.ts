import { NgModule } from '@angular/core';

import { CompareValidatorDirective } from './compare-validator.directive';

export { compareValidator } from './compare-validator.directive';

@NgModule({
	declarations: [CompareValidatorDirective],
	exports: [CompareValidatorDirective]
})
export class DirectivesModule {}

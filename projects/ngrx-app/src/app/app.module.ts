import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './_core/core.module';
import { LayoutModule } from './layout/layout.module';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		// main
		CoreModule,
		LayoutModule,
		AppRouting
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

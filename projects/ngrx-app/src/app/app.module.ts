import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		// angular
		BrowserModule,
		BrowserAnimationsModule,

		// core
		CoreModule,

		// app
		AppRouting
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

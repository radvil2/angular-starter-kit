import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular materials
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthRouting, ROUTED_COMPONENTS } from './auth.routing';

@NgModule({
	declarations: [...ROUTED_COMPONENTS],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		// angular materials
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,

		AuthRouting,
	]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from '../../_shared/directives';

// angular materials
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthRouting } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		
		// DirectivesModule,
		
		// angular materials
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		
		AuthRouting,
	]
})
export class AuthModule {}

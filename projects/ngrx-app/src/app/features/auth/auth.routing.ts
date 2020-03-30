import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		data: { title: 'User Login' }
	},
	{
		path: 'register',
		component: RegisterComponent,
		data: { title: 'User Registration' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRouting {}

export const routedComponents = [LoginComponent, RegisterComponent];

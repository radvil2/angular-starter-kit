import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./pages/auth/auth.module').then((m) => m.AuthModule)
	},
	{
		path: 'settings',
		loadChildren: () =>
			import('./pages/settings/settings.module').then(
				(m) => m.SettingsModule
			)
	},
	{
		path: 'user',
		loadChildren: () =>
			import('./pages/user/user.module').then((m) => m.UserModule)
	},
	{
		path: '**',
		redirectTo: 'about'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: false,
			scrollPositionRestoration: 'enabled',
			// preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule]
})
export class AppRouting {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'about',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./features/auth/auth.module').then((m) => m.AuthModule)
	},
	{
		path: 'settings',
		loadChildren: () =>
			import('./features/settings/settings.module').then(
				(m) => m.SettingsModule
			)
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
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule]
})
export class AppRouting {}

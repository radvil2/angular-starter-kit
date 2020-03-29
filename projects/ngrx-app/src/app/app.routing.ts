import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'about',
		pathMatch: 'full'
	},
	{
		path: 'about',
		loadChildren: () =>
			import('./features/about/about.module').then(m => m.AboutModule)
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./features/admin/admin.module').then(m => m.AdminModule)
	},
	{
		path: 'settings',
		loadChildren: () =>
			import('./features/settings/settings.module').then(m => m.SettingsModule)
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

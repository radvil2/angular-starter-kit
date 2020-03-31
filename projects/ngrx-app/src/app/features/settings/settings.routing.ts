import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './container/settings.component';

const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		data: { title: 'App Settings' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SettingsRouting {}

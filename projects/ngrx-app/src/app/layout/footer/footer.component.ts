import { Component, OnInit } from '@angular/core';

// 3rd parties
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
	faCog,
	faBars,
	faRocket,
	faPowerOff,
	faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import {
	faGithub,
	faFacebook,
	faTwitter,
	faInstagram,
	faYoutube
} from '@fortawesome/free-brands-svg-icons';

// app configs
import { environment as env } from '../../../environments/environment';

@Component({
	selector: 'rad-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	isProd = env.production;
	envName = env.envName;
	version = env.version;
	year = new Date().getFullYear();

	constructor(public faIconLibrary: FaIconLibrary) {
		faIconLibrary.addIcons(
			faCog,
			faBars,
			faRocket,
			faPowerOff,
			faUserCircle,
			faGithub,
			faFacebook,
			faTwitter,
			faInstagram,
			faYoutube
		);
	}

	ngOnInit(): void {}
}

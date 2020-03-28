import { Component, OnInit } from '@angular/core';

import { environment as env } from '../../../../environments/environment';

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

  constructor() { }

  ngOnInit(): void {
  }

}

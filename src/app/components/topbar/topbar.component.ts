import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LogoComponent } from '../logo/logo.component';
@Component({
  selector: 'topbar',
  imports: [LogoComponent, ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {}

import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  async ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      GoogleAuth.initialize();
    }
  }
}

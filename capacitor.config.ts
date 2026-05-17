import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lockit.app',
  appName: 'lock-it',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '640970880554-2feo8ft67eej2r8meedq6p3agjqno74s.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;

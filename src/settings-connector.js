// settings-connector.js
import browser from 'webextension-polyfill';

class SettingsConnector {
  static settingsKey = 'settings';
  
  async getAppSettings() {
    let settings = (
      await browser.storage.sync.get(SettingsConnector.settingsKey)
    )[SettingsConnector.settingsKey];
    
    if (!settings || Object.keys(settings).length !== Object.keys(DEFAULT_SETTINGS).length) {
      console.log('no settings found, using default settings');
      await browser.storage.sync.set({
        [SettingsConnector.settingsKey]: DEFAULT_SETTINGS
      });
      settings = DEFAULT_SETTINGS;
    }
    return settings;
  }

  async updateSettings(newSettings) {
    const settings = await this.getAppSettings();
    const updatedSettings = { ...settings, ...newSettings };
    await browser.storage.sync.set({
      [SettingsConnector.settingsKey]: updatedSettings
    });
    return updatedSettings;
  }
}

const singleton = new SettingsConnector();
export default singleton;
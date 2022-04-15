import { CubeIcon } from '@heroicons/react/outline';
// eslint-disable-next-line import/no-unresolved
import { Plugin, PluginSettings, Setting } from 'saifu';

import './style.css';
import MyView from './views/MyView';

interface MyPluginSettings {
  color: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  color: 'red',
};

class MySettings extends PluginSettings {
  plugin: MyPlugin;

  constructor(plugin: MyPlugin) {
    super(plugin);
    this.plugin = plugin;
  }

  display() {
    const setting = new Setting()
      .setName('Main Settings')
      .setDesc('Please enter your favorite color')

      // add a textbox
      .addText((text) => {
        return text
          .setPlaceholder('placeholder')
          .setValue(this.plugin.settings.color)
          .onChange(async (val) => {
            this.plugin.settings.color = val;
            await this.plugin.saveSettings();
          });
      });

    return [setting];
  }
}
class MyPlugin extends Plugin {
  settings: MyPluginSettings = DEFAULT_SETTINGS;

  async onload(): Promise<void> {
    console.log('template plugin onload');

    // load settings data from plugin storage
    await this.loadSettings();

    // set Settings container for this plugin
    this.setSettings(new MySettings(this));

    // add a view
    this.addView({
      title: 'MyView',
      id: 'myview',
      component: <MyView color={this.settings.color} />,
      icon: <CubeIcon />,
    });
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

export default MyPlugin;

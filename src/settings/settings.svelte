<!-- src/settings/settings.svelte -->
<script>
  import settingsConnector from '../settings-connector';

  let appSettings;
  settingsConnector
    .getAppSettings()
    .then(settingsFromStorage => (appSettings = settingsFromStorage));

  const updateDisplayHelpMessage = (e) => {
    const target = e.target;
    const displayHelpMessage = target.checked;
    settingsConnector.updateSettings({ displayHelpMessage });
  };

  $: {
    if (appSettings?.displayHelpMessage) console.log('Get help on GitHub!');
  }
</script>

{#if appSettings}
  <h1>Settings</h1>
  <section>
    <form>
      <div class="form-group">
        <input
          type="checkbox"
          id="show-help-message"
          name="show-help-message"
          checked={appSettings.displayHelpMessage}
          on:change={updateDisplayHelpMessage}
        />
        <label for="show-help-message">Show help message in console</label>
      </div>
    </form>
  </section>
{/if}

<style>
  h1 {
    padding: 1em 0;
  }
</style>
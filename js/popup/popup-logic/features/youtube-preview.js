/**
 * YouTube preview popup logic
 */

import {applySave, optionsToggle, setEnabledStatus} from '../utils';

// ========================================================
// toggleYtPreview
// ========================================================

export function init() {

  // Expand
  document.querySelector('.toggle-group.track-preview').addEventListener('click', function () {
    optionsToggle('.hide-track-preview', this, '.track-preview', 130);
  });

  let input = document.getElementById('ytApiKey'),
      toggle = document.getElementById('toggleYtPreview');

  input.value = localStorage.getItem('ytApiKey') || null;

  input.addEventListener('input', function () {
    localStorage.removeItem('ytApiKey');
    localStorage.setItem('ytApiKey', JSON.stringify(this.value));
    toggle.disabled = input.value.length <= 0;
  });
}

export function setYtPreview() {

  let input = document.getElementById('ytApiKey'),
      apiKey = localStorage.getItem('ytApiKey') || null,
      status = document.querySelector('.toggle-group.track-preview .label .status'),
      toggle = document.getElementById('toggleYtPreview');

  chrome.storage.sync.get('prefs', function(result) {
    if (result.prefs.ytPreview && apiKey !== null) {
      input.disabled = false;
      localStorage.setItem('ytApiKey', input.value);
      setEnabledStatus( status, 'Enabled' );
    } else if (result.prefs.ytPreview && apiKey == null) {
      toggle.checked = false;
      setEnabledStatus( status, 'Disabled' );
    } else {
      setEnabledStatus( status, 'Disabled' );
    }
  });

  toggle.disabled = input.value.length <= 0;
}

/**
 * Toggles Preview field
 * @method   toggleYtPreview
 * @param    {object}         event [the event object]
 * @return   {undefined}
 */
export function toggleYtPreview(event) {

  let status = document.querySelector('.toggle-group.track-preview .label .status');

  if ( !event.target.checked ) {
    setEnabledStatus( status, 'Disabled' );
  } else {
    setEnabledStatus( status, 'Enabled' );
  }

  applySave('refresh', event);
}
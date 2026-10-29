'use client';

import { parseTheme, themeStorageKey, type Theme } from '@/lib/theme';
import { useSyncExternalStore } from 'react';
import ToolIcon, { type IconName } from './tool-icon';

const themes: { value: Theme; label: string; icon: IconName }[] = [
  { value: 'light', label: 'Light mode', icon: 'sun' },
  { value: 'system', label: 'System color theme', icon: 'monitor' },
  { value: 'dark', label: 'Dark mode', icon: 'moon' },
];
const themeChangeEvent = 'utilities-theme-change';

function subscribe(callback: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== themeStorageKey && event.key !== null) return;
    document.documentElement.dataset.theme = parseTheme(event.newValue);
    callback();
  }

  window.addEventListener('storage', onStorage);
  window.addEventListener(themeChangeEvent, callback);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(themeChangeEvent, callback);
  };
}

function getSnapshot() {
  return parseTheme(document.documentElement.dataset.theme);
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    if (theme === 'system') localStorage.removeItem(themeStorageKey);
    else localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The control still works for this page when browser storage is blocked.
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

export default function ThemeSlider() {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    getSnapshot,
    () => 'system'
  );

  return (
    <fieldset className="theme-setting">
      <legend className="sr-only">Color theme</legend>
      <div className="segmented-control theme-control">
        {themes.map(({ value, label, icon }) => (
          <label
            key={value}
            className="segmented-option theme-option"
            title={label}
          >
            <input
              type="radio"
              name="color-theme"
              value={value}
              checked={theme === value}
              onChange={() => setTheme(value)}
            />
            <ToolIcon name={icon} />
            <span className="sr-only">{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

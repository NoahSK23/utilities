export const themeStorageKey = 'utilities-theme';

export type Theme = 'light' | 'system' | 'dark';

export function parseTheme(value: string | null | undefined): Theme {
  return value === 'light' || value === 'dark' ? value : 'system';
}

// Run before the body renders so a saved preference is applied before paint.
export const themeScript = `(() => {
  try {
    const theme = localStorage.getItem('${themeStorageKey}');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.dataset.theme = theme;
    }
  } catch {}
})();`;

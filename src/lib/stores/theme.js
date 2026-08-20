import { writable } from 'svelte/store';

function createThemeStore() {
  const { subscribe, set, update } = writable('dark');

  return {
    subscribe,
    init: () => {
      if (typeof window === 'undefined') return;

      const stored = localStorage.getItem('theme');
      let initial = 'dark';

      if (stored === 'light' || stored === 'dark') {
        initial = stored;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        initial = 'light';
      }

      set(initial);
      applyTheme(initial);

      // Listen for system theme changes if no manual preference is saved
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          set(newTheme);
          applyTheme(newTheme);
        }
      });
    },
    toggle: () => {
      update((current) => {
        const next = current === 'dark' ? 'light' : 'dark';
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', next);
          applyTheme(next);
        }
        return next;
      });
    },
    setTheme: (theme) => {
      if (theme !== 'dark' && theme !== 'light') return;
      set(theme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
        applyTheme(theme);
      }
    }
  };
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#09090b' : '#fafafa');
  }
}

export const theme = createThemeStore();

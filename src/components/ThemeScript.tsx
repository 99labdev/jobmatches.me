export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var t = localStorage.getItem('jm-theme');
            if (t === 'light') {
              document.documentElement.classList.remove('dark');
            } else if (t === 'dark') {
              document.documentElement.classList.add('dark');
            } else if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.classList.remove('dark');
            }
          })();
        `,
      }}
    />
  );
}

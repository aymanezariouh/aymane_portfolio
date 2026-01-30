// Elite Portfolio — Minimal JS

document.addEventListener('DOMContentLoaded', () => {
    // Theme
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    const getTheme = () => localStorage.getItem('theme') ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const setTheme = t => {
        html.dataset.theme = t;
        localStorage.setItem('theme', t);
    };

    setTheme(getTheme());
    toggle.addEventListener('click', () => setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark'));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            const el = document.querySelector(id);
            if (el) {
                window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
            }
        });
    });
});

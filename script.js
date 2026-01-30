// Senior portfolio interactions

document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const nav = document.querySelector('.nav');
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const sections = Array.from(document.querySelectorAll('section[id]'));

    const getTheme = () => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = theme => {
        html.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        toggle.setAttribute('aria-pressed', theme === 'dark');
    };

    setTheme(getTheme());
    requestAnimationFrame(() => {
        html.classList.add('theme-ready');
    });
    toggle.addEventListener('click', () => {
        setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
    });

    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const activateLink = id => {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    };

    if (sections.length) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activateLink(entry.target.id);
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0.1 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        reveals.forEach(el => revealObserver.observe(el));
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

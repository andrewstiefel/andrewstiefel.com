window.addEventListener('load', (event) => {
    document.querySelectorAll('[data-fathom]').forEach(item => {
        item.addEventListener('click', event => {
            let dataFathom = item.getAttribute('data-fathom');
            fathom.trackEvent(`${dataFathom}`);
        });
    });
});
var link_elements = document.querySelectorAll('[data-fathom]');
for (var i = 0, len = link_elements.length; i < len; i++) {
    link_elements[i].addEventListener('click', function(event) {
        fathom.trackGoal(event.currentTarget.getAttribute('data-fathom'), 0);
}, false); }
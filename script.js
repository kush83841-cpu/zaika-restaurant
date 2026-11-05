// ===== ZAIKA RESTAURANT — script.js =====

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// Close the mobile menu when a nav link is clicked
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

// ---------- Menu category filter ----------
const tabs = document.querySelectorAll('.menu-tab');
const items = document.querySelectorAll('.menu-item');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Move the orange "active" style to the clicked tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;

        // Show only the dishes of the chosen category
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// ---------- Book a Table popup ----------
const modal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success');
const bookingClose = document.getElementById('booking-close');

// Open the popup from every "Book a Table" button
document.querySelectorAll('[data-open-booking]').forEach(button => {
    button.addEventListener('click', () => {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // stop the page scrolling behind the popup
    });
});

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Reset the form so the next booking starts fresh
    bookingForm.hidden = false;
    bookingSuccess.hidden = true;
    bookingForm.reset();
}

bookingClose.addEventListener('click', closeModal);

// Close when clicking the dark area outside the popup box
modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

// Close with the Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Demo booking submit — show a thank-you message (no real booking is made)
bookingForm.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the page from reloading
    bookingForm.hidden = true;
    bookingSuccess.hidden = false;
});

// Do not allow booking a table in the past — earliest date is today
const dateInput = document.getElementById('book-date');
dateInput.min = new Date().toISOString().split('T')[0];
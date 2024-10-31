const calendar = document.getElementById('calendar');
const modal = document.getElementById('event-modal');
const closeModal = document.getElementById('close-modal');
const saveEvent = document.getElementById('save-event');
const eventDate = document.getElementById('event-date');
const eventDesc = document.getElementById('event-desc');

let events = JSON.parse(localStorage.getItem('events')) || {}; // Зберігання подій

function createCalendar() {
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    calendar.innerHTML = '';
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        const dateStr = formatDateString(day);
        if (events[dateStr]) {
            dayElement.classList.add('event');
            dayElement.title = events[dateStr];
        }

        dayElement.addEventListener('click', () => openModal(dateStr));
        calendar.appendChild(dayElement);
    }
}

function formatDateString(day) {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function openModal(date) {
    modal.style.display = 'flex';
    eventDate.value = date;
    eventDesc.value = events[date] || '';
}

function closeModalEvent() {
    modal.style.display = 'none';
    eventDate.value = '';
    eventDesc.value = '';
}

function saveEventToCalendar() {
    const date = eventDate.value;
    const description = eventDesc.value.trim();

    if (description) {
        events[date] = description;
        localStorage.setItem('events', JSON.stringify(events));
        createCalendar();
        closeModalEvent();
    } else {
        alert('Будь ласка, введіть опис події');
    }
}

closeModal.addEventListener('click', closeModalEvent);
saveEvent.addEventListener('click', saveEventToCalendar);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModalEvent();
});

createCalendar();

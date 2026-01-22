import { CalendarUI } from './calendar-ui.js';

const ui = new CalendarUI('calendarGrid', 'monthDisplay');
let curDate = new Date();
let curYear = curDate.getFullYear();
let curMonth = curDate.getMonth();

const render = () => {
    ui.render(curYear, curMonth);
};

// Event Listeners Navigasi
document.getElementById('prevBtn').addEventListener('click', () => {
    curMonth--;
    if (curMonth < 0) { curMonth = 11; curYear--; }
    render();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    curMonth++;
    if (curMonth > 11) { curMonth = 0; curYear++; }
    render();
});

// Tombol Close Modal
document.getElementById('closeDetailBtn').addEventListener('click', () => {
    ui.closeDetail();
});

// Render awal
render();

import { CalendarUI } from './calendar-ui.js';



// Pastikan ID ini sama persis dengan yang ada di index.html
const ui = new CalendarUI("calendarGrid", "monthDisplay");
let viewDate = new Date();

function update() {
    ui.render(viewDate.getFullYear(), viewDate.getMonth());
}

// Tunggu HTML selesai dimuat baru gambar grid
document.addEventListener("DOMContentLoaded", () => {
    update();

    // Pasang fungsi tombol navigasi
    document.getElementById("prevBtn").onclick = () => {
        viewDate.setMonth(viewDate.getMonth() - 1);
        update();
    };

    document.getElementById("nextBtn").onclick = () => {
        viewDate.setMonth(viewDate.getMonth() + 1);
        update();
    };
});

document.getElementById("btnGo").onclick = () => {
    const inputDate = document.getElementById("jumpDate").value;
    if (inputDate) {
        const target = new Date(inputDate);
        viewDate = target;
        refresh();
    }
};

document.getElementById("btnGo").addEventListener("click", () => {
    const dateVal = document.getElementById("jumpDate").value;
    if (dateVal) {
        const targetDate = new Date(dateVal);
        // Set viewDate ke tanggal yang dicari
        viewDate = targetDate; 
        ui.render(viewDate.getFullYear(), viewDate.getMonth());
        
        // Opsional: Langsung buka detail tanggal tersebut
        const pasaran = Pasaran.getPasaran(targetDate);
        const wuku = Wuku.getWuku(targetDate);
        ui.showDetail(targetDate, pasaran, wuku);
    }
});

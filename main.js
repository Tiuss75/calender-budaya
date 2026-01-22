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
    document.getElementById("btnGo").onclick = () => {
    const inputDate = document.getElementById("jumpDate").value;
    if (inputDate) {
        viewDate = new Date(inputDate);
        update(); // Panggil fungsi update yang sudah Anda buat di atas
    }
};


document.getElementById("btnGo").onclick = () => {
    const inputDate = document.getElementById("jumpDate").value;
    if (inputDate) {
        const target = new Date(inputDate);
        viewDate = target;
        refresh(); // <--- INI SALAH (Ganti menjadi update())
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

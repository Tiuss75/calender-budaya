export const LunarCalendar = {
    // Indeks 0 dimulai dari Monyet agar selaras dengan rumus (Tahun % 12)
    shioList: ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"],
    
    /**
     * Data Tanggal Imlek (Bulan 0 = Jan, 1 = Feb)
     * Digunakan sebagai "Checkpoints" untuk akurasi transisi shio
     */
    imlekLib: {
        1900: new Date(1900, 0, 31), // 31 Jan 1900
        1924: new Date(1924, 1, 5),  // Siklus baru 
        1975: new Date(1975, 1, 11), // 11 Feb 1975
        2000: new Date(2000, 1, 5),  // 5 Feb 2000
        2005: new Date(2005, 1, 9),  // 9 Feb 2005
        2026: new Date(2026, 1, 17)  // 17 Feb 2026
    },

    getShio(date) {
        let year = date.getFullYear();
        
        // Ambil data imlek untuk tahun tersebut
        let tglImlek = this.imlekLib[year];

        // Jika data tahun spesifik tidak ada, gunakan estimasi rata-rata (5 Februari)
        // untuk menentukan apakah sudah masuk tahun lunar baru atau belum
        if (!tglImlek) {
            tglImlek = new Date(year, 1, 5); 
        }

        // Jika tanggal yang dicari belum melewati Imlek, hitung sebagai tahun sebelumnya
        if (date < tglImlek) {
            year = year - 1;
        }

        // Rumus Modulo 12 untuk mendapatkan indeks shio
        const index = year % 12;
        return this.shioList[index];
    },

    getLunarDate(date) {
        // Estimasi angka tanggal lunar untuk tampilan grid
        const day = date.getDate();
        return (day % 29) + 1;
    }
};

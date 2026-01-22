export const KalenderJawa = {
    bulan: ["Sura", "Sapar", "Mulud", "Bakda Mulud", "Jumadil Awal", "Jumadil Akhir", "Rejeb", "Ruwah", "Pasa", "Syawal", "Selat", "Besar"],
    
    dataBudaya: {
        "Sura": { status: "Tidak Baik", naas: [6, 11, 13, 14, 17, 18, 27], taliWangke: "Rabu Pahing" },
        "Sapar": { status: "Tidak Baik", naas: [1, 10, 12, 20, 22], taliWangke: "Kamis Pon" },
        "Mulud": { status: "Tidak Baik", naas: [1, 3, 8, 10, 13, 15, 20, 23], taliWangke: "Jumat Wage" },
        "Bakda Mulud": { status: "Baik", naas: [10, 15, 16, 20, 25, 28], taliWangke: "Sabtu Kliwon" },
        "Jumadil Awal": { status: "Tidak Baik", naas: [1, 5, 10, 11, 16, 26, 28], taliWangke: "Senin Kliwon" },
        "Jumadil Akhir": { status: "Kurang Baik", naas: [4, 10, 11, 14, 18, 21], taliWangke: "Selasa Legi" },
        "Rejeb": { status: "Tidak Baik", naas: [2, 11, 12, 13, 14, 18, 22, 27], taliWangke: "Rabu Pahing" },
        "Ruwah": { status: "Baik", naas: [4, 12, 13, 19, 24, 26, 28], taliWangke: "Kamis Pon" },
        "Pasa": { status: "Tidak Baik", naas: [7, 9, 10, 15, 20, 21, 24], taliWangke: "Jumat Wage" },
        "Syawal": { status: "Sangat Tidak Baik", naas: [2, 10, 17, 20, 27], taliWangke: "Sabtu Kliwon" },
        "Selat": { status: "Cukup Baik", naas: [2, 6, 11, 12, 13, 21, 22, 24, 28], taliWangke: "Senin Kliwon" },
        "Besar": { status: "Sangat Baik", naas: [1, 6, 10, 13, 20, 23, 25], taliWangke: "Selasa Wage" }
    },

    getTanggalJawa(date) {
        // Referensi Tetap: 1 Jan 2026 = 12 Rejeb 1959
        const refMasehi = new Date(2026, 0, 1);
        const diffDays = Math.floor((date - refMasehi) / (1000 * 60 * 60 * 24));
        
        let totalHariJawa = diffDays + 12; 
        let currentBlnIdx = 6; // Indeks 6 = Rejeb
        let currentTahun = 1959;
        let tglJawa = totalHariJawa;

        // Logika hitung mundur untuk tanggal sebelum 1 Jan 2026
        if (tglJawa <= 0) {
            while (tglJawa <= 0) {
                currentBlnIdx--;
                if (currentBlnIdx < 0) {
                    currentBlnIdx = 11;
                    currentTahun--;
                }
                tglJawa += (this.isPanjang(currentBlnIdx) ? 30 : 29);
            }
        } 
        // Logika hitung maju untuk tanggal setelah 1 Jan 2026
        else {
            while (tglJawa > (this.isPanjang(currentBlnIdx) ? 30 : 29)) {
                tglJawa -= (this.isPanjang(currentBlnIdx) ? 30 : 29);
                currentBlnIdx++;
                if (currentBlnIdx > 11) {
                    currentBlnIdx = 0;
                    currentTahun++;
                }
            }
        }

        const namaBulan = this.bulan[currentBlnIdx];
        const info = this.dataBudaya[namaBulan];

        // VALIDASI NAAS: Cek apakah tglJawa ada di dalam array naas bulan tersebut
        const cekNaas = info.naas.includes(tglJawa);

        return { 
            tgl: tglJawa, 
            bln: namaBulan, 
            thn: currentTahun,
            statusBulan: info.status,
            isNaas: cekNaas, // Ini yang menentukan munculnya peringatan
            taliWangkeTarget: info.taliWangke
        };
    },

    isPanjang(idx) {
        // Struktur umur bulan Jawa (Ganjil 30, Genap 29)
        const pjg = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        return pjg[idx] === 30;
    }
};

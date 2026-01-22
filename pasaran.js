export const Pasaran = {
    list: ["Legi", "Pahing", "Pon", "Wage", "Kliwon"],
    
    // Nilai Neptu Hari
    neptuHari: { 0: 5, 1: 4, 2: 3, 3: 7, 4: 8, 5: 6, 6: 9 }, // 0=Minggu, dst
    
    // Nilai Neptu Pasaran
    neptuPasaran: { "Legi": 5, "Pahing": 9, "Pon": 7, "Wage": 4, "Kliwon": 8 },

    getPasaran(date) {
        const refDate = new Date(1900, 0, 1); // 1 Jan 1900 adalah Pahing
        const diff = Math.floor((date - refDate) / (1000 * 60 * 60 * 24));
        const index = (diff + 1) % 5; 
        const name = this.list[index < 0 ? index + 5 : index];
        
        // Hitung total Neptu
        const nHari = this.neptuHari[date.getDay()];
        const nPasaran = this.neptuPasaran[name];
        
        return {
            name: name,
            neptu: nHari + nPasaran,
            detail: `(Neptu ${nHari} + ${nPasaran} = ${nHari + nPasaran})`
        };
    }
};

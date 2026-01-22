export const Wuku = {
    list: [
        "Sinta", "Landep", "Wukir", "Kurantil", "Tolu", 
        "Gumbreg", "Warigalit", "Warigagung", "Julungwangi", "Sungsang", 
        "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", 
        "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", 
        "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", 
        "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"
    ],

    getWuku(date) {
        // 1 Januari 1900 adalah Senin, Wuku LANGKIR (Indeks 12).
        // Kita hitung mundur ke hari Minggu terdekat: 31 Desember 1899.
        const refDate = new Date(1899, 11, 31); 
        const diffTime = date.getTime() - refDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // Pembagian 7 hari memastikan wuku berganti setiap hari Minggu.
        // Indeks 12 adalah Langkir.
        let wukuIndex = (Math.floor(diffDays / 7) + 12) % 30;
        
        if (wukuIndex < 0) wukuIndex += 30;
        return this.list[wukuIndex];
    }
};

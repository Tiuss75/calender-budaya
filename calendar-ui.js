import { DateUtils } from './date-utils.js';
import { Pasaran } from './pasaran.js';
import { Wuku } from './wuku.js';
import { LunarCalendar } from './lunar.js';
import { KalenderJawa } from './jawa.js';

export class CalendarUI {
    constructor(gridId, monthDisplayId) {
        this.grid = document.getElementById(gridId);
        this.monthDisplay = document.getElementById(monthDisplayId);
        
        // Data Pal Sriti (Perhitungan Rejeki)
        this.rejekiDescriptions = {
            0: "Kesakitan (Penderitaan/Ujian)",
            1: "Penghasilan Sedikit",
            2: "Penghasilan Cukup",
            3: "Penghasilan Baik",
            4: "Penghasilan Besar",
            5: "Hidup Senang & Sejahtera",
            7: "Hidup Mewah & Sempurna",
            8: "Berhasil & Mewah Berkelanjutan"
        };

        this.palSritiData = {
            7: [4, 1, 4, 1, 0, 2, 2],
            8: [4, 1, 0, 1, 0, 3, 0, 7],
            9: [2, 5, 1, 0, 4, 1, 4, 0, 1],
            10: [1, 0, 4, 1, 1, 3, 0, 0, 4, 4],
            11: [2, 4, 1, 1, 8, 1, 0, 1, 2, 0, 2],
            12: [0, 5, 1, 0, 4, 0, 1, 0, 1, 4, 4, 0],
            13: [3, 1, 0, 5, 0, 1, 1, 5, 2, 0, 1, 2, 5],
            14: [1, 0, 1, 4, 0, 0, 4, 4, 1, 4, 0, 1, 4, 4],
            15: [2, 0, 1, 1, 5, 2, 0, 2, 2, 5, 5, 1, 0, 4, 1],
            16: [0, 3, 1, 2, 0, 1, 8, 1, 2, 7, 2, 0, 7, 1, 0, 2],
            17: [1, 1, 0, 5, 0, 1, 1, 5, 2, 0, 1, 2, 5, 5, 1, 0, 4],
            18: [2, 5, 1, 0, 4, 1, 4, 0, 1, 4, 4, 0, 0, 4, 1, 4, 0, 1]
        };
    }

    render(year, month) {
        if (!this.grid) return;
        this.grid.innerHTML = "";
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        this.monthDisplay.innerText = `${monthNames[month]} ${year}`;

        for (let i = 0; i < firstDayOfMonth; i++) {
            const cell = document.createElement("div");
            cell.className = "date-cell empty";
            this.grid.appendChild(cell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month, day);
            const pasaranObj = Pasaran.getPasaran(dateObj); 
            const dataJawa = KalenderJawa.getTanggalJawa(dateObj);
            const cell = document.createElement("div");
            cell.className = "date-cell";
            if (dateObj.getDay() === 0) cell.classList.add("sunday");
            if (DateUtils.isToday(dateObj)) cell.classList.add("today");
            if (dataJawa && dataJawa.isNaas) cell.classList.add("naas-day");

            cell.innerHTML = `
                <span class="masehi-num">${day}</span>
                <div class="cultural-info">
                    <span class="pasaran-text">${pasaranObj.name}</span>
                    <span class="jawa-text-small">${dataJawa.tgl} ${dataJawa.bln}</span>
                </div>
            `;
            cell.onclick = () => this.showDetail(dateObj, pasaranObj, Wuku.getWuku(dateObj));
            this.grid.appendChild(cell);
        }
    }

    showDetail(date, pasaranObj, wuku) {
        const panel = document.getElementById("detailPanel");
        if (!panel) return;

        const dataJawa = KalenderJawa.getTanggalJawa(date);
        const refBulan = KalenderJawa.dataBudaya[dataJawa.bln];
        const hariMasehi = date.toLocaleDateString('id-ID', { weekday: 'long' });
        const wetonSekarang = `${hariMasehi} ${pasaranObj.name}`;
        const formattedDate = date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        
        const isTaliWangke = refBulan.taliWangke.toLowerCase() === wetonSekarang.toLowerCase();
        document.getElementById("detailDate").innerText = formattedDate;

        let infoHtml = `
            <div class="info-box" style="background: #eef5ff; padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 5px solid #4a90e2;">
                <p><strong>Weton:</strong> ${wetonSekarang} (Neptu: ${pasaranObj.neptu})</p>
                <p><strong>Jawa:</strong> ${dataJawa.tgl} ${dataJawa.bln} ${dataJawa.thn}</p>
                <p><strong>Wuku:</strong> ${wuku} | <strong>Shio:</strong> ${LunarCalendar.getShio(date)}</p>
            </div>

            ${(dataJawa.isNaas || isTaliWangke) ? `
                <div class="warning-box" style="background:#fff3f3; border-left:5px solid #e74c3c; padding:10px; margin-bottom:15px; border-radius:5px;">
                    <p style="color:#c0392b; margin:0; font-weight:bold; font-size:0.9rem;">
                        ${dataJawa.isNaas ? '⚠️ Hari Naas!' : ''} 
                        ${isTaliWangke ? '🚫 Tali Wangke!' : ''}
                    </p>
                </div>
            ` : ''}

            <div class="rejeki-section" style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 8px 0; font-size: 0.9rem; color: #2c3e50;">📈 Ramalan Rejeki (Pal Sriti)</h4>
                <div style="max-height: 150px; overflow-y: auto; border: 1px solid #ddd; border-radius: 5px;">
                    <table style="width: 100%; font-size: 0.75rem; border-collapse: collapse;">
                        <thead style="position: sticky; top: 0; background: #f1f1f1;">
                            <tr>
                                <th style="padding: 5px; border-bottom: 1px solid #ddd;">Usia</th>
                                <th style="padding: 5px; border-bottom: 1px solid #ddd;">Nilai</th>
                                <th style="padding: 5px; border-bottom: 1px solid #ddd;">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateRejekiRows(pasaranObj.neptu)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="reference-section" style="background: #f9f9f9; padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px dashed #ccc;">
                <h4 style="margin: 0 0 5px 0; color: #d35400; border-bottom: 1px solid #eee; padding-bottom: 3px;">
                    Info Bulan ${dataJawa.bln}
                </h4>
                <p><strong>Status:</strong> ${refBulan.status}</p>
                <p><strong>Naas Bulan Ini:</strong> <span style="color: #c0392b; font-weight:bold;">${refBulan.naas.join(", ")}</span></p>
                <p><strong>Tali Wangke:</strong> <span style="color: #2980b9;">${refBulan.taliWangke}</span></p>
            </div>

            <button class="btn-wa" id="btnShareWA" style="width:100%; margin-top:15px; background: #25D366; color: white; border: none; padding: 10px; border-radius: 5px; font-weight: bold; cursor: pointer;">Bagikan ke WhatsApp</button>
        `;

        document.getElementById("detailInfo").innerHTML = infoHtml;

        document.getElementById("btnShareWA").onclick = () => {
            const msg = `*Info Kalender Budaya*\n${formattedDate}\nWeton: ${wetonSekarang}\nJawa: ${dataJawa.tgl} ${dataJawa.bln}\nPanduan ${dataJawa.bln}: ${refBulan.status}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
        };

        panel.classList.remove("hidden");
    }

    generateRejekiRows(neptu) {
        const values = this.palSritiData[neptu];
        if (!values) return `<tr><td colspan="3" style="padding:10px; text-align:center;">Data tidak tersedia</td></tr>`;

        return values.map((val, index) => {
            const startAge = index * 6;
            const endAge = (index * 6) + 6;
            return `<tr>
                <td style="padding: 5px; border-bottom: 1px solid #eee; text-align: center;">${startAge}-${endAge}</td>
                <td style="padding: 5px; border-bottom: 1px solid #eee; text-align: center; font-weight: bold;">${val}</td>
                <td style="padding: 5px; border-bottom: 1px solid #eee;">${this.rejekiDescriptions[val]}</td>
            </tr>`;
        }).join('');
    }

    closeDetail() {
        const panel = document.getElementById("detailPanel");
        if (panel) panel.classList.add("hidden");
    }
}

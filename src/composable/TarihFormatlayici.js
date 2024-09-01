// TarihFormatlayici.js
export default class TarihFormatlayici {
    constructor(tarih) {
        this.tarih = new Date(tarih);
    }

    tarihOkunabilir() {
        const gun = this.tarih.getDate();
        const ay = this.ayIsmi(this.tarih.getMonth());
        const yil = this.tarih.getFullYear();

        return `${gun} ${ay} ${yil}`;
    }

    ayIsmi(ayIndex) {
        const aylar = [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];
        return aylar[ayIndex];
    }
}
import { Anak } from "./anak";

export interface Orangtua {
    orangtua_id: number;
    nama: string;
    nik: string;
    no_jkn: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    anaks: Anak[];
}

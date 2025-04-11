import { Tantangan } from "./tantangan";


export interface Fase {
    fase_id: number;
    judul: string;
    subjudul: string;
    deskripsi: string;
    banner: string;
    tantangans: Tantangan[];
    benefits: string[];
    progress: number;
    is_anak_required: boolean;
    status: number;
}

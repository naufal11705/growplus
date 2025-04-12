import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Orangtua } from '@/types/orangtua';

// Define the Laporan interface for table data
interface Laporan {
    tantangan: string;
    fase: string;
    tanggal: string;
    status: string;
}

interface GeneratePDFParams {
    orangtua: Orangtua | null;
    laporan: Laporan[];
    selectedAnakId: string;
    anakName: string;
}

export const generateLaporanPDF = ({ orangtua, laporan, selectedAnakId, anakName }: GeneratePDFParams) => {
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
        title: `Laporan Anak - ${anakName}`,
        author: 'Sistem Laporan',
        creator: 'Sistem Laporan'
    });

    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Laporan Perkembangan Anak', 14, 20);

    // Orang Tua Information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yPosition = 30;

    if (orangtua) {
        const parentInfo = [
            { label: 'Nama Orang Tua', value: orangtua.nama || '-' },
            { label: 'NIK', value: orangtua.nik || '-' },
            { label: 'No JKN', value: orangtua.no_jkn || '-' },
            { label: 'Tempat Lahir', value: orangtua.tempat_lahir || '-' },
            { label: 'Nama Anak', value: anakName || '-' }
        ];

        parentInfo.forEach((info) => {
            doc.text(`${info.label}: ${info.value}`, 14, yPosition);
            yPosition += 8;
        });
    } else {
        doc.text('Data orang tua tidak tersedia', 14, yPosition);
        yPosition += 8;
    }

    // Add spacing
    yPosition += 10;

    // Laporan Table
    const tableData = laporan.map((row, index) => [
        (index + 1).toString(),
        row.tantangan,
        row.fase,
        row.tanggal,
        row.status
    ]);

    autoTable(doc, {
        startY: yPosition,
        head: [['No', 'Tantangan', 'Fase', 'Tanggal', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: {
            fillColor: [100, 100, 100],
            textColor: [255, 255, 255],
            fontSize: 10
        },
        bodyStyles: {
            fontSize: 9
        },
        columnStyles: {
            0: { cellWidth: 15 },
            1: { cellWidth: 60 },
            2: { cellWidth: 30 },
            3: { cellWidth: 40 },
            4: { cellWidth: 35 }
        },
        margin: { left: 14, right: 14 }
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
            `Halaman ${i} dari ${pageCount}`,
            doc.internal.pageSize.width - 30,
            doc.internal.pageSize.height - 10
        );
    }

    // Save the PDF
    doc.save(`laporan_anak_${selectedAnakId}_${new Date().toISOString().split('T')[0]}.pdf`);
};

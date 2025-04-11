import type { Voucher } from "@/types/voucher";
import { jsPDF } from "jspdf";

/**
 * Generates a high-definition scannable barcode with sharp lines
 */
const generateBarcode = async (
    doc: jsPDF,
    text: string,
    x: number,
    y: number,
    width: number,
    height: number
): Promise<void> => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error("Canvas context could not be created");
            resolve();
            return;
        }

        const scale = 12;
        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.scale(scale, scale);
        ctx.imageSmoothingEnabled = false;

        import("jsbarcode")
            .then((JsBarcode) => {
                JsBarcode.default(canvas, text, {
                    format: "CODE128",
                    displayValue: true,
                    fontSize: 14,
                    textMargin: 5,
                    height: height - 12, // Sesuaikan tinggi barcode
                    width: 3,
                    margin: 8,
                    background: "#FFFFFF",
                    lineColor: "#000000",
                    font: "monospace",
                    fontOptions: "bold",
                });

                const imgData = canvas.toDataURL("image/png", 1.0);
                doc.addImage(
                    imgData,
                    "PNG",
                    x,
                    y,
                    width,
                    height,
                    undefined,
                    "NONE"
                );
                resolve();
            })
            .catch((error) => {
                console.error("Failed to load JsBarcode:", error);
                resolve();
            });
    });
};

/**
 * Generate a random numeric string for the barcode
 */
const generateBarcodeText = (): string => {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Adds a bullet point item with proper formatting and spacing
 * Returns the new Y position after adding the text
 */
const addBulletPoint = (
    doc: jsPDF,
    text: string,
    x: number,
    y: number,
    maxWidth: number
): number => {
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);

    doc.text("•", x, y);
    const textLines = doc.splitTextToSize(text, maxWidth - 8);
    doc.text(textLines, x + 4, y);

    return y + textLines.length * 4.5;
};

/**
 * Adds the issuer's logo to the PDF with proper aspect ratio
 */
const addIssuerLogo = async (
    doc: jsPDF,
    x: number,
    y: number,
    width: number,
    height: number,
    logoUrl?: string
): Promise<void> => {
    return new Promise((resolve) => {
        if (logoUrl) {
            const img = new Image();
            img.crossOrigin = "anonymous";

            img.onload = () => {
                try {
                    const aspectRatio = img.width / img.height;
                    let finalWidth = width;
                    let finalHeight = width / aspectRatio;

                    if (finalHeight > height) {
                        finalHeight = height;
                        finalWidth = height * aspectRatio;
                    }

                    const centeredX = x + (width - finalWidth) / 2;
                    doc.addImage(
                        img,
                        "PNG",
                        centeredX,
                        y,
                        finalWidth,
                        finalHeight,
                        undefined,
                        "SLOW"
                    );
                    resolve();
                } catch (error) {
                    console.error("Error adding logo image:", error);
                    createPlaceholderLogo(doc, x, y, width, height);
                    resolve();
                }
            };

            img.onerror = () => {
                console.error("Failed to load logo image");
                createPlaceholderLogo(doc, x, y, width, height);
                resolve();
            };

            img.src = logoUrl;
        } else {
            createPlaceholderLogo(doc, x, y, width, height);
            resolve();
        }
    });
};

/**
 * Creates a placeholder logo with styling similar to the SAYURBOX example
 */
const createPlaceholderLogo = (
    doc: jsPDF,
    x: number,
    y: number,
    width: number,
    height: number
): void => {
    doc.setFillColor(75, 192, 75);
    doc.roundedRect(x, y - height, width, height, 2, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");

    const providerText = "ISSUER";
    doc.text(providerText, x + width / 2, y - height / 2 + 2, {
        align: "center",
    });
};

/**
 * Calculates the total height needed for terms and conditions
 */
const calculateTermsHeight = (
    doc: jsPDF,
    terms: string[],
    maxWidth: number
): number => {
    doc.setFontSize(9);
    let totalHeight = 0;

    for (const term of terms) {
        const textLines = doc.splitTextToSize(term, maxWidth - 8);
        totalHeight += textLines.length * 4.5 + 4;
    }

    return totalHeight;
};

/**
 * Generates an optimized single-page PDF voucher with professional layout
 */
export const generateVoucherPDF = async (voucher: Voucher): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const contentWidth = pageWidth - 2 * margin;

            let currentY = margin;

            // Header
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("VOUCHER RECEIPT", pageWidth / 2, currentY, {
                align: "center",
            });

            const currentDate = new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text(
                `Generated on: ${currentDate}`,
                pageWidth - margin,
                currentY,
                { align: "right" }
            );

            currentY += 20;

            // Logo
            const logoWidth = 30;
            const logoHeight = 15;
            await addIssuerLogo(
                doc,
                margin,
                currentY,
                logoWidth,
                logoHeight,
                voucher.logoUrl
            );
            currentY += logoHeight + 15;

            // Title dan Description
            doc.setFontSize(16);
            doc.text(voucher.title, margin, currentY);
            currentY += 10;

            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            doc.text("Description:", margin, currentY);
            currentY += 6;

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            const descriptionLines = doc.splitTextToSize(
                voucher.description,
                contentWidth
            );
            doc.text(descriptionLines, margin, currentY);
            currentY += descriptionLines.length * 5 + 12;

            // Voucher Code
            if (voucher.code) {
                doc.setFontSize(11);
                doc.setTextColor(60, 60, 60);
                doc.text("Voucher Code:", margin, currentY);
                currentY += 6;

                doc.setFillColor(245, 245, 245);
                doc.roundedRect(margin, currentY, contentWidth, 16, 3, 3, "F");
                doc.setFontSize(16);
                doc.setTextColor(0, 0, 0);
                doc.text(voucher.code, pageWidth / 2, currentY + 11, {
                    align: "center",
                });
                currentY += 22;
            }

            // Dates
            doc.setFontSize(10);
            doc.setTextColor(60, 60, 60);
            if (voucher.redeemDate) {
                doc.text(
                    `Redeemed on: ${voucher.redeemDate}`,
                    margin,
                    currentY
                );
                currentY += 6;
            }
            if (voucher.expiryDate) {
                doc.text(`Expires on: ${voucher.expiryDate}`, margin, currentY);
                currentY += 15;
            }

            // Terms & Conditions
            if (voucher.terms && voucher.terms.length > 0) {
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.text("Terms & Conditions:", margin, currentY);
                currentY += 8;

                for (const term of voucher.terms) {
                    currentY = addBulletPoint(
                        doc,
                        term,
                        margin,
                        currentY,
                        contentWidth
                    );
                    currentY += 4;
                }
                currentY += 15;
            }

            // Barcode (dengan tinggi sedang)
            const barcodeWidth = contentWidth * 0.8;
            const barcodeHeight = 35; // Tinggi diubah dari 25mm menjadi 35mm (sedang, tidak terlalu panjang)
            const barcodeX = margin + (contentWidth - barcodeWidth) / 2;

            doc.setFontSize(12);
            doc.text("Voucher Barcode:", margin, currentY);
            currentY += 8;

            await generateBarcode(
                doc,
                voucher.code || generateBarcodeText(),
                barcodeX,
                currentY,
                barcodeWidth,
                barcodeHeight
            );
            currentY += barcodeHeight + 15;

            // Footer
            doc.setFontSize(8);
            doc.setTextColor(75, 75, 75);
            doc.text(
                "© Grow+ 2025. All rights reserved.",
                pageWidth / 2,
                pageHeight - 15,
                {
                    align: "center",
                }
            );

            doc.setFontSize(7);
            doc.setTextColor(120, 120, 120);
            doc.text(
                "This is an electronically generated voucher receipt.",
                pageWidth / 2,
                pageHeight - 8,
                {
                    align: "center",
                }
            );

            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const filename = `voucher-${timestamp}.pdf`.toLowerCase();
            doc.save(filename);

            resolve();
        } catch (error) {
            console.error("Error generating PDF:", error);
            reject(error);
        }
    });
};

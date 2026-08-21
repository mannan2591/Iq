import jsPDF from 'jspdf';
import { toPng, toJpeg } from 'html-to-image';

/**
 * Downloads a blob as a file cleanly in all browser environments and sandboxed iframes.
 */
function triggerBrowserDownload(blob: Blob, fileName: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.download = fileName;
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  
  setTimeout(() => {
    try {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Ignored if element already detached
    }
  }, 1000);
}

/**
 * Exports a certificate HTML element to a high-resolution print-ready PDF file (A4 Landscape)
 * Configured with skipFonts: true to prevent CORS font-fetching exceptions in sandboxed iframes.
 */
export async function downloadCertificatePdf(
  element: HTMLElement,
  fileName: string = 'IQMANIA-Official-Certificate.pdf'
): Promise<boolean> {
  try {
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Step 1: Render DOM element to high-res image
    // skipFonts: true is critical to prevent CORS fetch failures on external Google Fonts in iframes
    let dataUrl: string;
    try {
      dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#fdfcf7',
        cacheBust: false,
        skipFonts: true,
        fontEmbedCSS: '',
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains('no-print')) {
            return false;
          }
          return true;
        }
      });
    } catch (renderError) {
      console.warn('PNG render fallback to JPEG:', renderError);
      dataUrl = await toJpeg(element, {
        quality: 0.95,
        pixelRatio: 2.0,
        backgroundColor: '#fdfcf7',
        cacheBust: false,
        skipFonts: true,
        fontEmbedCSS: '',
      });
    }

    if (!dataUrl) {
      throw new Error('Image rasterization produced empty output');
    }

    // Step 2: Build A4 Landscape PDF (297mm x 210mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Determine format from data URL
    const format = dataUrl.startsWith('data:image/jpeg') ? 'JPEG' : 'PNG';
    pdf.addImage(dataUrl, format, 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

    // Step 3: Trigger download via Blob
    const pdfBlob = pdf.output('blob');
    triggerBrowserDownload(pdfBlob, fileName);

    return true;
  } catch (error) {
    console.error('Failed to generate PDF:', error);

    // Fallback: Try downloading high-res image directly if PDF generation is blocked
    try {
      const fallbackImg = await toPng(element, {
        quality: 0.95,
        pixelRatio: 2.0,
        backgroundColor: '#fdfcf7',
        skipFonts: true,
      });
      const response = await fetch(fallbackImg);
      const blob = await response.blob();
      const imageFileName = fileName.replace(/\.pdf$/i, '.png');
      triggerBrowserDownload(blob, imageFileName);
      return true;
    } catch (fallbackError) {
      console.error('Image fallback failed, triggering print dialog:', fallbackError);
      window.print();
      return true;
    }
  }
}


import { ListingItem } from '../types';

// Helper to load image from URL to Base64
const getDataUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error loading image for PDF", error);
    return null;
  }
};

export const generateSharePDF = async (item: ListingItem, formattedPrice: string) => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Colors
  const cyanColor = [8, 145, 178]; // Cyan-600
  const orangeColor = [249, 115, 22]; // Orange-500
  const darkColor = [15, 23, 42]; // Slate-900
  const lightGray = [241, 245, 249]; // Slate-100

  // --- HEADER ---
  // Background Header
  doc.setFillColor(...darkColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Brand Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...cyanColor);
  doc.text("ABRAS", 15, 20);
  doc.setTextColor(...orangeColor);
  doc.text("Travel", 60, 20); // Offset manually based on width
  
  // Tagline
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("Expertos en destinos de playa y Brasil", 15, 30);

  // Contact Info in Header
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("+54 9 11 4063 2644", 200, 18, { align: 'right' });
  doc.text("info@abrastravel.com", 200, 26, { align: 'right' });
  doc.text("www.abrastravel.com", 200, 34, { align: 'right' });

  // --- PERSUASIVE TITLE ---
  let persuasiveTitle = "¡TU PRÓXIMO DESTINO TE ESPERA!";
  if (item.isOffer) persuasiveTitle = "¡OFERTA EXCLUSIVA POR TIEMPO LIMITADO!";
  
  if (item.type === 'hotel') persuasiveTitle = "TU DESCANSO IDEAL ESTÁ AQUÍ";
  else if (item.type === 'worldcup') persuasiveTitle = "¡ASEGURA TU LUGAR EN EL MUNDIAL 2026!";
  else if (item.type === 'installment') persuasiveTitle = "¡VIAJA SIN INTERÉS CON ABRAS CUOTAS!";
  else if (item.type === 'rental') persuasiveTitle = "ALQUILER TEMPORARIO PREMIUM";
  else if (item.type === 'excursion') persuasiveTitle = "EXPERIENCIAS INOLVIDABLES";

  doc.setFillColor(...cyanColor);
  doc.rect(0, 40, 210, 15, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text(persuasiveTitle, 105, 50, { align: 'center' });

  // --- MAIN CONTENT ---
  
  // Item Title
  doc.setTextColor(...darkColor);
  doc.setFontSize(22);
  const splitTitle = doc.splitTextToSize(item.title, 180);
  doc.text(splitTitle, 15, 70);
  
  let currentY = 70 + (splitTitle.length * 10);

  // Location
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`📍 ${item.location}`, 15, currentY);
  currentY += 10;

  // IMAGE
  const imageUrl = item.images[0];
  if (imageUrl) {
      try {
          const imgData = await getDataUrl(imageUrl);
          if (imgData) {
              // A4 width is 210mm. Margins 15mm. Width = 180mm.
              // Aspect ratio 16:9 approx height = 100mm
              doc.addImage(imgData, 'JPEG', 15, currentY, 180, 100);
              // Discount Badge overlay
              if (item.discount) {
                  doc.setFillColor(...orangeColor);
                  doc.circle(180, currentY + 10, 12, 'F');
                  doc.setTextColor(255, 255, 255);
                  doc.setFontSize(10);
                  doc.text(`${item.discount}%`, 180, currentY + 9, { align: 'center' });
                  doc.text("OFF", 180, currentY + 13, { align: 'center' });
              }
              currentY += 110;
          }
      } catch (e) {
          currentY += 10; // Skip if fails
      }
  }

  // --- DETAILS GRID ---
  
  // Price Box
  doc.setFillColor(...lightGray);
  doc.roundedRect(15, currentY, 180, 30, 3, 3, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Valor Promocional:", 25, currentY + 12);
  
  doc.setFontSize(26);
  doc.setTextColor(...cyanColor);
  doc.setFont("helvetica", "bold");
  doc.text(formattedPrice, 25, currentY + 24);
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  // Type Label
  let typeLabel = "";
  if (item.type === 'hotel' || item.type === 'rental') typeLabel = "Precio por noche";
  else if (item.type === 'installment' || item.type === 'worldcup') typeLabel = "Cuota Mensual / Plan";
  else typeLabel = "Precio por persona";
  
  doc.text(`(${typeLabel})`, 190, currentY + 22, { align: 'right' });

  currentY += 40;

  // Description
  doc.setFontSize(14);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "bold");
  doc.text("Descripción", 15, currentY);
  currentY += 8;
  
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "normal");
  const splitDesc = doc.splitTextToSize(item.description, 180);
  doc.text(splitDesc, 15, currentY);
  
  currentY += (splitDesc.length * 6) + 10;

  // Amenities / Details List
  doc.setFontSize(14);
  doc.setTextColor(...darkColor);
  doc.setFont("helvetica", "bold");
  doc.text("Detalles Incluidos", 15, currentY);
  currentY += 8;

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");

  let detailsList: string[] = [];
  
  if ('amenities' in item) {
      detailsList = (item as any).amenities || [];
  } else if ('availableDates' in item && (item as any).availableDates.length > 0) {
      detailsList = ["Fechas Disponibles:", ...(item as any).availableDates];
  } else if (item.type === 'worldcup') {
      detailsList = [`Salida: ${(item as any).departureDate}`, `Origen: ${(item as any).originCountry}`, "Entradas Incluidas", "Traslados", "Coordinación Permanente"];
  } else if (item.type === 'installment') {
      detailsList = [`Salida: ${(item as any).departureDate}`, "Plan de Ahorro", "Sin Interés", "Precio Congelado"];
  }

  // Render list in two columns
  const midPoint = Math.ceil(detailsList.length / 2);
  let col1 = detailsList.slice(0, midPoint);
  let col2 = detailsList.slice(midPoint);

  col1.forEach(detail => {
      doc.text(`• ${detail}`, 15, currentY);
      currentY += 6;
  });
  
  // Reset Y for col 2 but offset X
  let col2Y = currentY - (col1.length * 6);
  col2.forEach(detail => {
      doc.text(`• ${detail}`, 110, col2Y);
      col2Y += 6;
  });

  // Ensure currentY is below the lowest column
  if (col2.length > 0) currentY = Math.max(currentY, col2Y);

  // --- FOOTER CTA ---
  const footerY = 270; // Bottom of A4
  doc.setFillColor(...orangeColor);
  doc.rect(0, footerY, 210, 27, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("¿Te interesa esta propuesta?", 105, footerY + 10, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Contáctanos por WhatsApp para reservar tu lugar ahora mismo.", 105, footerY + 18, { align: 'center' });

  // Save
  const cleanTitle = item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`ABRAS_Travel_${cleanTitle}.pdf`);
};

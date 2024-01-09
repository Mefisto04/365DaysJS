const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const csv = require('csv-parser');

async function generateCertificates() {
  const certificatePath = 'cert.pdf';
  const csvPath = 'certf.csv';
  const certificateBytes = await fs.promises.readFile(certificatePath);
  const csvData = await fs.promises.readFile(csvPath, 'utf-8');
  const rows = csvData.split('\n').map(row => row.split(','));

  for (const row of rows) {
    const [name, email, rank] = row.map(field => field.trim());

    if (!name || !email || !rank) {
      console.error('Skipping row due to empty field:', row);
      continue;
    }

    const pdfDoc = await PDFDocument.load(certificateBytes);
    const page = pdfDoc.getPage(0);
    const fontSize = 12;
    const fontsiz = 16;

    const nameX = 350;
    const nameY = 320;
    const emailX = 530;
    const emailY = 140;
    const rankX = 220;
    const rankY = 140;
    page.drawText(`${name}`, { x: nameX, y: nameY, fontSize });
    page.drawText(`${email}`, { x: emailX, y: emailY, fontsiz });
    page.drawText(`${rank}`, { x: rankX, y: rankY, fontSize });

    const modifiedPdfBytes = await pdfDoc.save();
    await fs.promises.writeFile(`${name}_Certificate.pdf`, modifiedPdfBytes);
  }
}

generateCertificates();

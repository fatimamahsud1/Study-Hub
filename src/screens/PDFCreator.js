// import { PDFDocument, StandardFonts, rgb } from 'react-native-pdf-lib';

// const createPDF = async (text, filePath) => {
//   const page1 = PDFDocument.createPage('A4');
  
//   const timesRomanFont = await PDFDocument.embedFont(StandardFonts.TimesRoman);

//   page1.drawText(text, {
//     x: 50,
//     y: 750,
//     size: 12,
//     font: timesRomanFont,
//     color: rgb(0, 0, 0),
//   });

//   PDFDocument.addPage(page1);

//   await PDFDocument.write(filePath);
  
//   return filePath; // The path to the PDF
// };

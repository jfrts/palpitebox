import { GoogleSpreadsheet } from 'google-spreadsheet';

const spreadsheetDocument = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

export default async (req, res) => {
  try {
    await spreadsheetDocument.useServiceAccountAuth({
      client_email: process.env.CREDENTIALS_CLIENT_EMAIL,
      private_key: process.env.CREDENTIALS_PRIVATE_KEY
    });
    await spreadsheetDocument.loadInfo()

    const sheet = spreadsheetDocument.sheetsByTitle['Configurações'];
    await sheet.loadCells('B2:B4');

    const showPromotion = sheet.getCell(1, 1).value;
    const promotionMessage = sheet.getCell(2, 1).value;

    res.end(JSON.stringify({
      showPromotion,
      promotionMessage
    }))
  } catch (err) {

  }
}
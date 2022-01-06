import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment from 'moment';

const spreadsheetDocument = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

export default async (req, res) => {
  try {
    const formData = JSON.parse(req.body);

    await spreadsheetDocument.useServiceAccountAuth({
      client_email: process.env.CREDENTIALS_CLIENT_EMAIL,
      private_key: process.env.CREDENTIALS_PRIVATE_KEY
    });

    await spreadsheetDocument.loadInfo()

    const configSheet = spreadsheetDocument.sheetsByTitle['Configurações'];
    await configSheet.loadCells('B2:B4');

    let gift = '';
    let promotionMessage = '';

    const showPromotion = configSheet.getCell(1, 1).value;

    if (showPromotion) {
      gift = `G-${Math.floor(Math.random() * 30) * Number(moment().format('DDYMMmmH'))}`;
      promotionMessage = configSheet.getCell(2, 1).value
    }

    const sheet = spreadsheetDocument.sheetsByTitle['Opiniões'];

    await sheet.addRow({
      Data: `${moment().format('DD/MM/YY - HH:mm')}h`,
      Nome: formData.Nome,
      Email: formData.Email,
      WhatsApp: formData.WhatsApp,
      'Promoção': promotionMessage,
      Presente: gift,
      'Avaliação': Number(formData['Avaliação']),
      'Opinião': formData['Opinião']
    });

    res.end(JSON.stringify({
      showGift: gift !== '',
      gift,
      promotionMessage
    }))

    res.end(req.body);
  } catch (err) {
    res.end('Error');
  }
}
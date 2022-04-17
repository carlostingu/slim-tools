import axios from 'axios';

import fs from 'fs';

const billet = async (order) => {
    try {
        let billetUrlFrags = order.billet_url.split("/");
        billetUrlFrags = billetUrlFrags[billetUrlFrags.length - 1].split('_');

        const billetHash = billetUrlFrags[billetUrlFrags.length - 1];
        const {
            data: billet
        } = await axios({
            method: "GET",
            url: `https://api-sun.eduzz.com/thankyou2/${billetHash}`
        });

        const {
            data: billetStream
        } = await axios({
            method: "GET",
            responseType: 'stream',
            url: billet.paymentResult.bankslipUrl
        });
        
        const billetPdfPath = `storage/billets/BOLETO - ${order.product_name.toUpperCase()}.pdf`;

        const billetPdf = fs.createWriteStream(billetPdfPath);
        billetStream.pipe(billetPdf);

        billet.pdf_path = billetPdfPath;

        return billet;
    } catch (error) {
        return null;
    }
}

export default billet;
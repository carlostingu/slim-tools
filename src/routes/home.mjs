import dotenv from 'dotenv';
import express from 'express';

import orders from '../tools/orders.mjs';
import billet from '../tools/billet.mjs';

import wpp from '../tools/wpp.mjs';

dotenv.config();

const home = express.Router();

home.get('/', async (req, res) => {
    const name = process.env.WPP_SESSION_NAME;

    const {
        io,
        wpp: wppSession
    } = global;

    io.on('connection', async (socket) => {
        if (!wppSession.hasOwnProperty(name)) {
            wppSession[name] = await wpp(
                name,
                (qrCode) => {
                    io.emit('onQrCode', qrCode);
                },
                (status) => {
                    io.emit('onSession', status);
                }
            );
        } else {
            io.emit('onSession', {
                sessionName: wppSession[name].session,
                sessionStatus: 'isLogged'
            });
        }
    });

    res.render('home');
});

home.get('/orders', async (req, res) => {
    const name = process.env.WPP_SESSION_NAME;
    const ordersPendings = [];

    const ordersList = await orders.get();
    ordersList.map(({
        content,
        stage
    }) => {
        const order = JSON.parse(content);
        order.stage = stage;
        order.wppSessName = name;
        if (order.trans_status == 1 || order.trans_status == 11) {
            ordersPendings.push(order);
        }
    });

    res.render('orders', {
        orders: ordersPendings
    });
});

home.post('/send-billet', async (req, res) => {
    const order = JSON.parse(req.body.order);

    const {
        WPP_FOR_TEST,
        BILLET_AUDIO_LAST_DAY
    } = process.env

    const {
        io,
        wpp: wppSession
    } = global;

    const name = order.wppSessName;

    try {
        if (order.stage == null || order.stage == 1) {
            if (order.trans_paymentmethod = 1) {
                const orderBillet = await billet(order);
                if (orderBillet) {
                    await wppSession[name].sendText(WPP_FOR_TEST, 'stage 1');

                    const fileName = `BOLETO - ${ order.cus_name.toUpperCase() }`;
                    await wppSession[name].sendFile(WPP_FOR_TEST, orderBillet.pdf_path, fileName);
                } else {
                    res.json({
                        status: 'false',
                        message: 'Boleto não encontrado :('
                    });
                    
                    return;
                }
            }
        } else if (order.stage == 2) {
            await wppSession[name].sendAudio(WPP_FOR_TEST, 'stage 2');
        } else {
            await wppSession[name].sendVoice(WPP_FOR_TEST, BILLET_AUDIO_LAST_DAY);
        }

        res.json({
            status: 'success',
            message: 'Cobrança enviada com sucesso :)'
        });
    } catch (error) {
        res.json({
            status: 'false',
            message: 'Houve um erro inesperado, tente novamente!'
        });
    }
});

export default home;
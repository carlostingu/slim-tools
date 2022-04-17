(async (win, doc) => {
    'use strict';

    const socket = io();

    /* Elements */
    const qrCodeBlock = document.getElementById('qrCodeBlock');
    const sessionBlock = document.getElementById('sessionBlock');

    socket.on('onQrCode', ({
        base64
    }) => {
        qrCodeBlock.innerHTML = `
            <figure class="figure">
                <img src="${ base64 }" class="figure-img img-fluid rounded">
                <figcaption class="figure-caption text-center">Escaneie o código QR.</figcaption>
            </figure>
        `;
    });

    socket.on('onSession', ({
        sessionStatus,
        sessionName
    }) => {
        sessionBlock.innerHTML = `
            <span class="text-muted">${ sessionName }: ${ sessionStatus }</span>
        `;
    });
})(window, document);
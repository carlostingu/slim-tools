(async (win, doc) => {
    'use strict';

    win.onbeforeunload = function(event)
    {
        event.preventDefault();
        console.dir(event);
        return false;
    };

    const btnsSendBillet = doc.querySelectorAll('.btn-send-billet');
    [...btnsSendBillet].map((btnSendBillet) => {
        btnSendBillet.onclick = async function(event) {
            event.preventDefault();

            this.disabled = true;
            
            const body = JSON.stringify({
                order: this.dataset.order
            });

            try {
                const response = await fetch(`send-billet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });

                const {
                    status,
                    message
                } = await response.json();

                alert(message);
            } catch (error) {
                alert(`Houve um erro ao enviar :(`);
            }
        }
    });
})(window, document);
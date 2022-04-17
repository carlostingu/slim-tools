import venom from 'venom-bot';
    
const wpp = async (name, qrCode, status) => {
    try {
        const session = await venom.create(
            name,
            (base64Qrimg, asciiQR, attempts, urlCode) => {
                qrCode({
                    ascii: asciiQR,
                    base64: base64Qrimg
                });
            },
            (statusSession, session) => {
                status({
                    sessionName: session,
                    sessionStatus: statusSession
                });
            }, 
            {
                headless: true,
                logQR: false,
                disableWelcome: true
            }
        );
        
        return session;
    } catch (error) {
        return null;
    }
}

export default wpp;
import axios from 'axios';
import fs from 'fs/promises';

const bin = async (number, log = false, dir = null) => {
    try {
        const {
            data: result
        } = await axios({
            method: 'GET',
            url: `https://lookup.binlist.net/${ number }`
        });

        if (log && dir) {
            await fs.appendFile(`${ dir }/bin-${ (new Date()).getTime() }.json`, JSON.stringify(result));
        }

        return result;
    } catch (error) {
        return null;
    }
}

export default bin;

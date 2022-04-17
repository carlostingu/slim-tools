import axios from 'axios';

const bin = async (number) => {
    try {
        const {
            data: result
        } = await axios({
            method: 'GET',
            url: `https://lookup.binlist.net/${ number }`
        });

        return result;
    } catch (error) {
        return null;
    }
}

export default bin;

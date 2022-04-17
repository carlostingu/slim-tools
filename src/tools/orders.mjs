import axios from 'axios';

const get = async () => {
    try {
        const {
            data: orders
        } = await axios({
            method: 'GET',
            url: 'https://saudenadiabetes.com/slim-manager/api/sales/get'
        });

        return orders;
    } catch (error) {
        return null;
    }
}

const edit = async (trans_key, stage) => {
    try {
        const {
            data: response
        } = await axios({
            method: "POST",
            url: 'https://saudenadiabetes.com/slim-manager/api/sales/edit/stage',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: `trans_key=${trans_key}&stage=${stage}`
        });

        return response;
    } catch (error) {
        return null;
    }
}

export default {
    get,
    edit
}
import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

const Model = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE
});
 
export default Model;
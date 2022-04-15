import Sequelize from 'sequelize';

const Model = new Sequelize({
    dialect: 'sqlite',
    storage: './slim-tools.sqlite'
});
 
export default Model;
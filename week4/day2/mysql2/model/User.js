import { Sequelize, DataTypes } from "sequelize"

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

export default User;
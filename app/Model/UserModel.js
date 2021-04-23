const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

module.exports=(sequelize,type)=>{
  return sequelize.Define('user',{
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true
    },
    nom:DataTypes.STRING,
    prenom:DataTypes.STRING,
    email:DataTypes.STRING,
    telephone:DataTypes.STRING,
    password:DataTypes.STRING,
    picture:DataTypes.STRING,
    active:{
      type:DataTypes.BOOLEAN,
      defa
    }
  })
}
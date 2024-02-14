module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    name: { type: DataTypes.STRING(250), unique: true },
    password: { type: DataTypes.STRING(250)},
    emailid: { type: DataTypes.STRING(250), unique: true },
    
  });

  return Users;
};

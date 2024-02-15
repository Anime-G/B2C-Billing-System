module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    name: { type: DataTypes.STRING(250), unique: true ,
      get() {
        const rawValue = this.getDataValue('name');
        return rawValue ? rawValue.toUpperCase() : null;
      }},
    password: { type: DataTypes.STRING(250)},
    emailid: { type: DataTypes.STRING(250), unique: true },
    
  });
  Users.associate=(modals)=>{
    Users.hasMany(modals.Forms);
  }
  return Users;
};

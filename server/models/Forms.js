module.exports = (sequelize, DataTypes) => {
  const Forms = sequelize.define("Forms", {
    name: {
      type: DataTypes.STRING(250),
      unique: true,
      get() {
        const rawValue = this.getDataValue("name");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    shortName: {
      type: DataTypes.STRING(250),
     get() {
        const rawValue = this.getDataValue("shortName");
        return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    formGst: { type: DataTypes.STRING(15), unique: true },
    address: { type: DataTypes.STRING(250)},

    phno: { type: DataTypes.BIGINT(10) },
    logo: { type: DataTypes.STRING(1000) },
  });
  Forms.associate=(modals)=>{
    Forms.hasMany(modals.Goods,{onDelete:'cascade'});
    Forms.hasMany(modals.Clients,{onDelete:'cascade'});
    Forms.hasMany(modals.Bills,{onDelete:'cascade'});
    Forms.belongsTo(modals.Users);
   
  }
  return Forms;
};

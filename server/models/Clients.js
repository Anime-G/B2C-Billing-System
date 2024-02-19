module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define("Clients", {
      name: {
        type: DataTypes.STRING(250),
        
        get() {
          const rawValue = this.getDataValue("name");
          return rawValue ? rawValue.toUpperCase() : null;
        },
      },
      phno: {
        type: DataTypes.INTEGER,
      },
    });
    Clients.associate=(modals)=>{
      
      Clients.hasMany(modals.Bills);
      Clients.belongsTo(modals.Forms);
    }
    return Clients;
  };
  
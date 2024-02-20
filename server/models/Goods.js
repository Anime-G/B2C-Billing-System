module.exports = (sequelize, DataTypes) => {
    const Goods = sequelize.define("Goods", {
      name: {
        type: DataTypes.STRING(250),
        
        get() {
          const rawValue = this.getDataValue("name");
          return rawValue ? rawValue.toUpperCase() : null;
        },
      },
      HsnCode: {
        type: DataTypes.INTEGER,
      },
      GstRate: { type: DataTypes.DOUBLE},
    });
    Goods.associate=(modals)=>{
      Goods.hasMany(modals.BillItems);
     
      Goods.belongsTo(modals.Forms);
    }
    return Goods;
  };
  
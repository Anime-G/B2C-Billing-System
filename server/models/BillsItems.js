module.exports = (sequelize, DataTypes) => {
    const BillItems = sequelize.define("BillItems", {
      Qty: {
        type: DataTypes.DOUBLE,
    },
    rate: {
        type: DataTypes.DOUBLE,
    },
      
    });
    BillItems.associate=(modals)=>{
      BillItems.belongsTo(modals.Bills);
      BillItems.belongsTo(modals.Goods);
    }
    return BillItems;
  };
  
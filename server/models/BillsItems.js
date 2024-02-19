module.exports = (sequelize, DataTypes) => {
    const BillItems = sequelize.define("BillItems", {
      Qty: {
        type: DataTypes.INTEGER,
    },
    rate: {
        type: DataTypes.DATE,
    },
      
    });
    BillItems.associate=(modals)=>{
      BillItems.belongsTo(modals.Bills);
    }
    return BillItems;
  };
  
module.exports = (sequelize, DataTypes) => {
    const Bills = sequelize.define("Bills", {
      InvoiceNo: {
        type: DataTypes.INTEGER,
    },
      Date: {
        type: DataTypes.DATE,
        
      },
      
    });
    Bills.associate=(modals)=>{
        Bills.hasMany(modals.BillItems);
        Bills.belongsTo(modals.Forms);
      Bills.belongsTo(modals.Clients);
    }
    return Bills;
  };
  
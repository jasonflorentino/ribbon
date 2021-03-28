const bookshelf = require('../bookshelf');

const GiftDetail = bookshelf.model('GiftDetail', {
  tableName: 'gift_details',
  gift: function() {
    return this.belongsTo('Gift');
  },
});

module.exports = GiftDetail;
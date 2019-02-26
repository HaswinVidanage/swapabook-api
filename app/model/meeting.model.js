module.exports = (sequelize, Sequelize) => {
  const Meeting = sequelize.define('meeting', {
    MEETING_PARTY_ONE_USER: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
      
    },
    MEETING_PARTY_ONE_BOOK_ID: {
      type: Sequelize.INTEGER,
      references: {
        model: 'books',
        key: 'id',
      }
      
    },
    MEETING_PARTY_TWO_USER: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    MEETING_PARTY_TWO_BOOK_ID: {
      type: Sequelize.INTEGER,
      references: {
        model: 'books',
        key: 'id',
      }
    },
    location: { type: Sequelize.STRING },
    datetime: { type: Sequelize.STRING },
    isAccepted: { type: Sequelize.STRING}
  });
  
  // A meeting is initiated by party 2 hence a meeting gets accepted by party 1
  return Meeting;
}
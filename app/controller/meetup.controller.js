const db = require('../config/db.config.js');
const Swap = db.swap;

const Op = db.Sequelize.Op;

// swipe right. add the book to swiped table.
exports.addMeetupDetails = (req, res) => {
  // Save User to Database
  console.log("Processing func -> addBookAsSwiped");
  const {
    id,
    location,
    datetime
  } = req.body;
  
  const swapDTO = {
    id,
    location,
    datetime,
    meetingBy: req.userId,
  };
  
  Swap.update(
    swapDTO,
    {
      where: {
        id: req.body.id,
      }
    }
    ).then(swap => {
    console.log('Swap meeting : ', req.userId);
    res.status(200).json(swap);
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  });
};

exports.acceptMeetup = (req, res) => {
  // Save User to Database
  console.log("Processing func -> addBookAsSwiped");
  const {
    id
  } = req.body;
  
  const swapDTO = {
    id,
    isAccepted: req.userId
  };
  
  Swap.update(
    swapDTO,
    {
      where: {
        id: req.byod.id,
      }
    }
  ).then(swap => {
    console.log('Swap meeting accepted by: ', req.userId);
    res.status(200).json(swap);
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  });
};


// view all pending meeting to be accepted or rejected
// book owner id should be same. book owner should be the one to get meetings pending to be approved.

exports.getApprovalPendingMeetups = (req, res) => {
  // Save User to Database
  console.log("Processing func -> getApprovalPendingMeetups");
  
  Swap.findAll({
    raw: true,
    where: {
      BOOK_OWNER_ID: req.userId,
      isAccepted: ''
    }
  }).then(swap => {
    console.log('Swap meeting accepted by: ', req.userId);
    res.status(200).json(swap);
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  });
};

// view all meetings accepted
exports.getAllMeetups = (req, res) => {
  // Save User to Database
  console.log("Processing func -> getApprovalPendingMeetups");
  
  Swap.findAll({
    raw: true,
    where: {
      BOOK_OWNER_ID: req.userId,
    }
  }).then(swap => {
    console.log('Swap meeting accepted by: ', req.userId);
    res.status(200).json(swap);
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  });
};
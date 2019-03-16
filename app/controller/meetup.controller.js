const db = require('../config/db.config.js');
const Meeting = db.meeting;
const Book = db.book;
const Swap = db.swap;
const Op = db.Sequelize.Op;

// swipe right. add the book to swiped table.
exports.addMeetupDetails = (req, res) => {
  // Save User to Database
  console.log("Processing func -> addBookAsSwiped");
  
  const meetingDTO = {
    meetingId: req.body.meetingId,
    selectedDateTime: req.body.selectedDateTime,
    location_name: req.body.location.name,
    location_lat: req.body.location.lat,
    location_lng: req.body.location.lng,
    location_icon: req.body.location.icon
  };
  
  Meeting.update(
    meetingDTO,
    {
      where: {
        id: req.body.meetingId,
      }
    }
    ).then(meeting => {
    console.log('meeting : ', req.userId);
    res.status(200).json(meeting);
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

exports.myApprovedOrPendingMeetings = (req, res) => {
  // Save User to Database
  console.log("Processing func -> myApprovedOrPendingMeetings");
  //selecting meetings to be approved by me or already approved by me
  
  // Meeting.findAll({
  //   raw: true,
  //   where: {
  //     MEETING_PARTY_ONE_USER: req.userId,
  //     location_name: { [Op.not]: null}
  //   }
  // }).then(meeting => {
  //   console.log('Meeting Party One User: ', req.userId);
  //   res.status(200).json(meeting);
  // }).catch(err => {
  //   res.status(500).send("Fail! Error -> " + err);
  // });
  db.sequelize.query(
    `SELECT distinct * FROM
    meetings
    inner join books
    on meetings.MEETING_PARTY_TWO_BOOK_ID = books.id
    where
    meetings.MEETING_PARTY_ONE_USER= ${req.userId}
    and meetings.location_name is not null
    `,{ type: db.sequelize.QueryTypes.SELECT }).then( rows =>{
    res.status(200).json(rows);
    console.log('Meeting Party One User: ', req.userId);
  }).catch(err => {
      res.status(500).send("Fail! Error -> " + err);
  });
  
};

exports.getApprovalPendingOrPendingMeetupsForMe = (req, res) => {
  // Save User to Database
  console.log("Processing func -> getApprovalPendingOrPendingMeetupsForMe");
  //selecting meetings to with location set by me already approved or pending for another person to approve
  
  db.sequelize.query(
    `SELECT * FROM
    meetings
    inner join books
    on meetings.MEETING_PARTY_ONE_BOOK_ID = books.id
    where
    meetings.MEETING_PARTY_TWO_USER= ${req.userId}
    and meetings.location_name is not null
    `, { type: db.sequelize.QueryTypes.SELECT }).then( rows =>{
      res.status(200).json(rows);
  }).catch(err => {
      res.status(500).send("Fail! Error -> " + err);
  });
};

// view all meetings accepted
exports.getAllMeetups = (req, res) => {
  // Save User to Database
  console.log("Processing func -> getApprovalPendingMeetups");
  
  Meeting.findAll({
    raw: true,
    where: {
      MEETING_PARTY_ONE_USER: req.userId,
    }
  }).then(swap => {
    console.log('get all meeting for: ', req.userId);
    res.status(200).json(swap);
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  });
};
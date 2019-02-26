const db = require('../config/db.config.js');
const Book = db.book;
const User = db.user;
const Swap = db.swap;
const Meeting = db.meeting;

const Op = db.Sequelize.Op;

// add a book to the collection
exports.addBookToCollection = (req, res) => {
  // Save User to Database
  console.log("Processing func -> addBookToCollection");
  const {
    ISBN_13,
    ISBN_10,
    title,
    subTitle,
    publisher,
    publishedDate,
    description,
    author,
    pageCount,
    category,
    smallThumbnail,
    thumbnail,
    language,
    webReaderLink,
    bookQualityRating
  } = req.body;
  
  const bookDTO = {
    userId: req.userId,
    ISBN_13,
    ISBN_10,
    title,
    subTitle,
    publisher,
    publishedDate,
    description,
    author,
    pageCount,
    category,
    smallThumbnail,
    thumbnail,
    language,
    webReaderLink,
    bookQualityRating
  };
  
  Book.create(bookDTO).then(book => {
    res.status(200).json(book);
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  })
};

// swipe right. add the book to swiped table.
exports.addBookAsSwiped = (req, res) => {
  // Save User to Database
  console.log("Processing func -> addBookAsSwiped");
  const {
    BOOK_ID,
    BOOK_OWNER_ID
  } = req.body;
  
  const swapDTO = {
    BOOK_ID,
    BOOK_OWNER_ID,
    USER_ID: req.userId
  };
  
  Swap.create(swapDTO).then(swap => {
    // res.status(200).json(swap);
    console.log('Swipe right Logged in user id : ', req.userId);
    
    Swap.findAll({
      raw: true,
      where: {
        BOOK_OWNER_ID: req.userId,
        USER_ID: swap.BOOK_OWNER_ID
      }
    }).then(swapMatch => {
      let BookDetails = {};
      if(swapMatch.length>0 && swapMatch[0].BOOK_ID) {
        console.log('HDV MATCH FOUND!!!', swapMatch[0].BOOK_ID);
        
        // create the meeting initial record
        const meetingDTO = {
          MEETING_PARTY_ONE_USER:  req.body.BOOK_OWNER_ID,
          MEETING_PARTY_ONE_BOOK_ID: swapMatch[0].BOOK_ID,
          MEETING_PARTY_TWO_USER: req.userId,
          MEETING_PARTY_TWO_BOOK_ID: req.body.BOOK_ID
        };
  
        Meeting.create(meetingDTO).then(meetingInit => {
         
          console.log('HDV Match stage 2');
          getBookDetails(swapMatch[0].BOOK_ID).then(
            BookDetails => {
              return res.status(200).json({
                ...BookDetails,
                meetingInit: meetingInit
              });
            }
          )
        }).catch(err => {
          res.status(500).send("Fail! addBookAsSwiped Error -> " + err);
        });
        
      } else {
        res.status(200).json(swapMatch);
      }
      
    }).catch(err => {
      res.status(500).json({
        "description": "Failure at swap match",
        "error": err
      });
    })
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  })
};


const getBookDetails  = (bookId) => {
  console.log('HDV Book ID DET CALLED', bookId);
  return Book.findOne({
    raw: true,
    where: { id: bookId}
  }).then(bookDetails => {
    return bookDetails;
  }).catch(err => {
    res.status(500).json({
      "description": "Error in getBookDetails",
      "error": err
    });
  })
};

// get collection details
exports.getCollectionByUserId = (req, res) => {
  console.log("Processing func -> getCollectionByUserId userId:", req.userId);
  Book.findAll({
    where: { userId: req.userId}
  }).then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Books get",
      "error": err
    });
  })
}

//getSwapList
exports.getSwapList = (req, res) => {
  console.log("Processing func -> getSwapList userId:", req.userId);
  Book.findAll({
    where: { userId: { [Op.not]: req.userId}}
  }).then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Books get",
      "error": err
    });
  })
}
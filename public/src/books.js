function findAuthorById(authors, id) {
  return authors.find((author) => author.id == id);
}

function findBookById(books, id) {
  return books.find((book) => book.id == id);
}

//I'd go with commented code, but since the assessment requirement is to use .every method...
//At least this function is more robust since it accounts for possible missorting of .borrows array
function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = [];
  let notReturnedBooks = [];
  //returnedBooks.push(books.filter(book => book.borrows[0].returned))
  //notReturnedBooks.push(books.filter(book => !book.borrows[0].returned))
  books.forEach((book) => {
    const borrowsList = book.borrows;
    if (borrowsList.every((borrow) => borrow.returned == true)){
      returnedBooks.push(book)
    } else {
      notReturnedBooks.push(book)
    }
  })
  return [[...notReturnedBooks],[...returnedBooks]]
}

//I couldn't find the requirement to return no more than 10 elements, where is it???
function getBorrowersForBook(book, accounts) {
  let extendedBorrowsList = [];
  book.borrows.forEach((borrow) => {
    const found = accounts.find((account) => account.id == borrow.id)
    extendedBorrowsList.push({...borrow,...found})
  })
  if (extendedBorrowsList.length < 11) {
    return extendedBorrowsList;
  } else {
    return extendedBorrowsList.splice(0,10);
  }
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

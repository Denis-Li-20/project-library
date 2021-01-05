function findAccountById(accounts, id) {
  const found = accounts.find((account) => account.id===id);
  return found;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA,accountB) => (accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1))
  return accounts;
}

function numberOfBorrows(account, books) {
  let timesBorrowed = 0;
  books.forEach((book) => {
    book.borrows.forEach((borrows) => {
      if (borrows.id == account.id){
        timesBorrowed +=1;
      }
    })
  })
  return timesBorrowed;
}

//This function will work even if borrows array is not sorted properly
function getBooksPossessedByAccount(account, books, authors) {
  let booksInPossession = [];
  books.forEach((book) => {
    if(book.borrows.some((borrow) => borrow.id == account.id && borrow.returned == false)) {
      book["author"] = authors.find((author) => author.id == book.authorId);
      booksInPossession.push(book)
    }
  })
  return booksInPossession;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let booksTaken = 0;
  books.reduce((acc,book) => {
    if (book.borrows[0].returned === false){
      booksTaken+=1;
    }
  },booksTaken)
  return booksTaken;
}

//Generates "topFive" array based on the "count" key
function sortAndCut(array) {
  array.sort((itemA,itemB) => (itemA.count < itemB.count ? 1 : -1))
  if (array.length > 5){
    array.splice(5,array.length)
  }
  return array;
}

function getMostCommonGenres(books) {
  let uniqueGenres = [];
  //Building unique genres (allGenres) array first
  books.forEach((book) => {
    if (!uniqueGenres.includes(book.genre)){
      uniqueGenres.push(book.genre)
    }
  })
  let genresStats = uniqueGenres.map((genre) => {
    const counter = books.filter((book) => book.genre == genre).length;
    return {name:genre,count:counter}
  })
  return sortAndCut(genresStats);
}

function getMostPopularBooks(books) {
  //Adding counter key to each book in order to reformat for helper function
  const allBooks = books.map((book) => {
    book["count"] = book.borrows.length;
    return book
  })
  const topFive = sortAndCut(allBooks)
  return topFive.map((item) => { //Using .map method to generate the output array
    const {title:name,borrows} = item; //destructuring current item, renaming key "title" to "name"
    return {name:name,count:borrows.length}
  })
}

//Helper function, takes author ID and returns total number of borrows
function countByAuthor(books,authorId){
  const authorBooks = books.filter((book) => book.authorId == authorId) //Only books by this author
  let timesBorrowed = 0;
  authorBooks.reduce((acc,book) => {timesBorrowed+=book.borrows.length //borrows.length is essentialy # of borrows
  },timesBorrowed)
  return (timesBorrowed)
}

function getMostPopularAuthors(books, authors) {
  let authorsPopularity = [];
  authors.forEach((author) => {
    const authorsFullName = `${author.name.first} ${author.name.last}` //Template literals to get the full name
    const authorsBorrowsCount = countByAuthor(books,author.id) //Calling helper function to calculate # of borrows
    authorsPopularity.push({name:authorsFullName,count:authorsBorrowsCount})
  })
  //authorsPopularity.sort((authorA,authorB) => (authorA.count < authorB.count ? 1 : -1))
  return sortAndCut(authorsPopularity);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

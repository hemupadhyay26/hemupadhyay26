// function Book(name, author, type) {
//     this.name = name;
//     this.author = author;
//     this.type = type;
// }

// function Display() {

// }

// Display.prototype.add = function (book) {
//     let tableBody = document.getElementById('tableBody')
//     let uistring = `<tr>
//     <td>${book.name}</td>
//     <td>${book.author}</td>
//     <td>${book.type}</td>
//     <td><button type="button" class="btn btn-danger btn-sm">X</button></td>
// </tr>`;
//     tableBody.innerHTML += uistring;
// }
// Display.prototype.clear = function () {
//     let libraryForm = document.getElementById('libraryForm');
//     libraryForm.reset();
// }

// Display.prototype.validate = function (book) {
//     if (book.name.length < 2 || book.author.length < 2) {
//         return false;
//     }
//     else {
//         return true;
//     }
// }
// Display.prototype.show = function (type, displaymessege) {
//     let message = document.getElementById('message');
//     message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
//                             <strong>Messege</strong>${displaymessege}
//                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">x</button>
//                             </div>`
//     setTimeout(function () {
//         message.innerHTML = ' '
//     }, 3000);
// }


// let libraryForm = document.getElementById('libraryForm');
// libraryForm.addEventListener('submit', libraryFormsubmit);

// function libraryFormsubmit(e) {
//     let name = document.getElementById('bookName').value;
//     let author = document.getElementById('author').value;
//     let type;
//     let fiction = document.getElementById('fiction');
//     let programming = document.getElementById('programming');
//     let cooking = document.getElementById('cooking');


//     if (fiction.checked) {
//         type = fiction.value;
//     }
//     else if (programming.checked) {
//         type = programming.value;
//     }
//     else if (cooking.checked) {
//         type = cooking.value;
//     }
//     let book = new Book(name, author, type);
//     e.preventDefault();
//     // console.log(book);
//     let display = new Display();
//     if (display.validate(book)) {
//         display.add(book);
//         display.localcheck(book);
//         display.clear();
//         display.show('success', ' Your book is successfully added.');
//     }
//     else {
//         display.show('danger', ' Sorry you cannot add this book.');
//     }

//     // console.log(book.name);
//     // console.log('library')
// }

// above is used with prototype



// class use here

// Book Class: represent the book 
class book {
    constructor(title, author, type) {
        this.title = title;
        this.author = author;
        this.type = type;

    }
}

// UI class: Handle UI tasks
class UI {
    static displayBook() {
        // const StoredBook = [
        //     {
        //         title: 'Book one',
        //         author: 'Jhon corner',
        //         type: 'friction'
        //     },
        //     {
        //         title: 'Book two',
        //         author: 'James gun',
        //         type: 'Cooking'
        //     }
        // ];
        // dummy data
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#tableBody');
        const rows = document.createElement('tr');
        rows.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            <td><button type="button" class="btn btn-danger btn-sm delete">X</button></td>
        `;
        list.appendChild(rows);

    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields() {
        document.querySelector('#bookName').value = '';
        document.querySelector('#author').value = '';
    }
    static show(type, displaymessege) {
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                    <strong>Messege</strong>${displaymessege}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">x</button>
                                    </div>`
        setTimeout(function () {
            message.innerHTML = ' '
        }, 3000);
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(Book) {
        const books = Store.getBooks();

        books.push(Book); 
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBooks(author) {
        const books = Store.getBooks();
        books.forEach((book,index) => {
            if (books.author==author) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBook);

// Event: Add a Book
document.querySelector('#libraryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#bookName').value;
    const author = document.querySelector('#author').value;
    // const title = document.querySelector('#libraryForm').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');


    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    // validate
    if (title === '' || author === '' ) {
        UI.show('danger', ' Sorry you cannot add this book.');
    }
    else {
        let Book = new book(title, author, type);
        // console.log(Book);
        UI.addBookToList(Book);
        // Add book to Store
        Store.addBooks(Book);
        // alert
        UI.show('success', ' Your book is successfully added.');
        // clear text area after adding book
        UI.clearFields();
    }
});

// Event: Remove a Book

document.querySelector('#tableBody').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    // console.log(e.target)
    // remove book from Store
    Store.removeBooks(e.target.parentElement.previousElementSibling.textcontent);
    // console.log(e.target.parentElement.previousElementSibling.textcontent);
});
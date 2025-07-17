const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}


function displayBooks() {
  const container = document.getElementById('booksContainer');
  container.innerHTML = ''; // Clear current list

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.isRead ? '✅ Read' : '📖 Not read'}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    container.appendChild(card);
  });

  attachCardEventListeners();
}


function attachCardEventListeners() {
  document.querySelectorAll('.remove-book').forEach(button => {
    button.addEventListener('click', e => {
      const id = e.target.closest('.book-card').dataset.id;
      removeBook(id);
    });
  });

  document.querySelectorAll('.toggle-read').forEach(button => {
    button.addEventListener('click', e => {
      const id = e.target.closest('.book-card').dataset.id;
      toggleReadStatus(id);
    });
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function toggleReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}


const addBookBtn = document.getElementById('addBookBtn');
const dialog = document.getElementById('bookDialog');
const form = document.getElementById('bookForm');
const closeDialog = document.getElementById('closeDialog');

addBookBtn.addEventListener('click', () => dialog.showModal());

closeDialog.addEventListener('click', () => dialog.close());

form.addEventListener('submit', e => {
  e.preventDefault(); // Stop it from submitting to a server

  const formData = new FormData(form);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const isRead = formData.get('isRead') === 'on';

  addBookToLibrary(title, author, pages, isRead);
  form.reset();
  dialog.close();
});

document.addEventListener("DOMContentLoaded", function () {
    const bookTitleInput = document.getElementById("bookTitle");
    const bookAuthorInput = document.getElementById("bookAuthor");
    const bookYearInput = document.getElementById("bookYear");
    const bookIsReadInput = document.getElementById("bookIsRead");
    const addBookBtn = document.getElementById("addBookBtn");
    const bookList = document.getElementById("bookList");

    loadBooks();

    addBookBtn.addEventListener("click", function () {
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();
        const year = bookYearInput.value.trim();
        const isRead = bookIsReadInput.checked;

        if (title && author && year) {
            const book = { title, author, year, isRead };
            addBookToDOM(book);
            saveBookToStorage(book);

            bookTitleInput.value = "";
            bookAuthorInput.value = "";
            bookYearInput.value = "";
            bookIsReadInput.checked = false;
        } else {
            alert("Please enter title, author, and year.");
        }
    });

    function addBookToDOM(book) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${book.title} by ${book.author} (${book.year}) 
            <span> ${book.isRead ? "✅ Read" : "📖 Not Read"} </span>
            <button class="delete-btn">Delete</button>`;

        if (book.isRead) {
            listItem.classList.add("read");
        }

        listItem.querySelector(".delete-btn").addEventListener("click", function () {
            bookList.removeChild(listItem);
            removeBookFromStorage(book);
        });

        bookList.appendChild(listItem);
    }

    function saveBookToStorage(book) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    function removeBookFromStorage(book) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books = books.filter(b => b.title !== book.title || b.author !== book.author || b.year !== book.year);
        localStorage.setItem("books", JSON.stringify(books));
    }

    function loadBooks() {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.forEach(book => addBookToDOM(book));
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const bookForm = document.querySelector("[data-testid='bookForm']");
    const bookTitleInput = document.getElementById("bookTitle");
    const bookAuthorInput = document.getElementById("bookAuthor");
    const bookYearInput = document.getElementById("bookYear");
    const bookIsReadInput = document.getElementById("bookIsRead");
    const searchForm = document.querySelector("[data-testid='searchBookForm']");
    const searchBookTitleInput = document.getElementById("searchBookTitle");
    const unreadList = document.getElementById("unreadList");
    const readList = document.getElementById("readList");

    const editModal = document.getElementById("editModal");
    const editBookTitle = document.getElementById("editBookTitle");
    const editBookAuthor = document.getElementById("editBookAuthor");
    const editBookYear = document.getElementById("editBookYear");
    const editBookIsRead = document.getElementById("editBookIsRead");
    const saveEditBtn = document.getElementById("saveEditBtn");
    const closeModal = document.querySelector(".close");

    let currentBookId = null;

    loadBooks();

    bookForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();
        const year = parseInt(bookYearInput.value.trim());  
        const isComplete = bookIsReadInput.checked;       

        if (title && author && year) {
            const book = { 
                id: Date.now(), 
                title, 
                author, 
                year,        
                isComplete   
            };
            saveBookToStorage(book);
            refreshDOM();

            bookForm.reset();
        } else {
            alert("Silakan isi semua data buku.");
        }
    });

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const searchTerm = searchBookTitleInput.value.trim().toLowerCase();
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));

        refreshDOM(filteredBooks);
    });

    function openEditModal(book) {
        currentBookId = book.id;
        editBookTitle.value = book.title;
        editBookAuthor.value = book.author;
        editBookYear.value = book.year;
        editBookIsRead.checked = book.isComplete;  
        editModal.style.display = "block";
    }

    closeModal.addEventListener("click", function () {
        editModal.style.display = "none";
    });

    saveEditBtn.addEventListener("click", function () {
        const updatedBook = {
            id: currentBookId,
            title: editBookTitle.value.trim(),
            author: editBookAuthor.value.trim(),
            year: parseInt(editBookYear.value.trim()),  
            isComplete: editBookIsRead.checked        
        };

        if (updatedBook.title && updatedBook.author && updatedBook.year) {
            updateBookStorage(updatedBook);
            refreshDOM();
            editModal.style.display = "none";
        } else {
            alert("Silakan isi semua data buku.");
        }
    });

    function addBookToDOM(book) {
        const listItem = document.createElement("li");
        listItem.setAttribute('data-testid', 'bookItem');
        listItem.setAttribute('data-bookid', book.id);
        
        listItem.innerHTML = `
            <div>
                <h3 data-testid="bookItemTitle">${book.title}</h3>
                <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
                <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            </div>
            <div>
                <button class="toggle-btn" data-testid="bookItemIsCompleteButton">
                    ${book.isComplete ? "Pindah ke Belum Selesai" : "Pindah ke Selesai"}
                </button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn" data-testid="bookItemDeleteButton">Hapus</button>
            </div>
        `;

        if (book.isComplete) { 
            readList.appendChild(listItem);
        } else {
            unreadList.appendChild(listItem);
        }

        listItem.querySelector(".toggle-btn").addEventListener("click", function () {
            book.isComplete = !book.isComplete;  
            updateBookStorage(book);
            refreshDOM();
        });

        listItem.querySelector(".edit-btn").addEventListener("click", function () {
            openEditModal(book);
        });

        listItem.querySelector(".delete-btn").addEventListener("click", function () {
            removeBookFromStorage(book.id);
            refreshDOM();
        });
    }

    function saveBookToStorage(book) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    function removeBookFromStorage(bookId) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books = books.filter(b => b.id !== bookId);
        localStorage.setItem("books", JSON.stringify(books));
    }

    function updateBookStorage(updatedBook) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books = books.map(b => (b.id === updatedBook.id ? updatedBook : b));
        localStorage.setItem("books", JSON.stringify(books));
    }

    function loadBooks() {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.forEach(book => addBookToDOM(book));
    }

    function refreshDOM(filteredBooks = null) {
        unreadList.innerHTML = "";
        readList.innerHTML = "";

        const books = filteredBooks || JSON.parse(localStorage.getItem("books")) || [];
        books.forEach(book => addBookToDOM(book));
    }
});
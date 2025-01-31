document.addEventListener("DOMContentLoaded", function () {
    const bookTitleInput = document.getElementById("bookTitle");
    const bookAuthorInput = document.getElementById("bookAuthor");
    const bookYearInput = document.getElementById("bookYear");
    const bookIsReadInput = document.getElementById("bookIsRead");
    const addBookBtn = document.getElementById("addBookBtn");
    const unreadList = document.getElementById("unreadList");
    const readList = document.getElementById("readList");

    loadBooks();

    // Tambahkan Buku Baru
    addBookBtn.addEventListener("click", function () {
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();
        const year = bookYearInput.value.trim();
        const isRead = bookIsReadInput.checked;

        if (title && author && year) {
            const book = { id: Date.now(), title, author, year, isRead };
            saveBookToStorage(book);
            refreshDOM();

            // Reset Form Input
            bookTitleInput.value = "";
            bookAuthorInput.value = "";
            bookYearInput.value = "";
            bookIsReadInput.checked = false;
        } else {
            alert("Silakan isi semua data buku.");
        }
    });

    function addBookToDOM(book) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${book.title} oleh ${book.author} (${book.year})</span>
            <div>
                <button class="toggle-btn">${book.isRead ? "Pindah ke Belum Selesai" : "Pindah ke Selesai"}</button>
                <button class="delete-btn">Hapus</button>
            </div>
        `;

        if (book.isRead) {
            readList.appendChild(listItem);
        } else {
            unreadList.appendChild(listItem);
        }

        // Event untuk memindahkan buku antara rak
        listItem.querySelector(".toggle-btn").addEventListener("click", function () {
            book.isRead = !book.isRead;
            updateBookStorage(book);
            refreshDOM();
        });

        // Event untuk menghapus buku
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

    function refreshDOM() {
        unreadList.innerHTML = "";
        readList.innerHTML = "";
        loadBooks();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const bookTitleInput = document.getElementById("bookTitle");
    const bookAuthorInput = document.getElementById("bookAuthor");
    const addBookBtn = document.getElementById("addBookBtn");
    const bookList = document.getElementById("bookList");

    // Memuat data dari localStorage saat halaman dimuat
    loadBooks();

    // Event listener untuk tombol "Add Book"
    addBookBtn.addEventListener("click", function () {
        const title = bookTitleInput.value.trim();
        const author = bookAuthorInput.value.trim();

        if (title && author) {
            const book = { title, author };
            addBookToDOM(book);
            saveBookToStorage(book);

            // Kosongkan input setelah menambahkan buku
            bookTitleInput.value = "";
            bookAuthorInput.value = "";
        } else {
            alert("Please enter both title and author.");
        }
    });

    // Fungsi untuk menambahkan buku ke dalam DOM
    function addBookToDOM(book) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${book.title} by ${book.author} <button class="delete-btn">Delete</button>`;

        // Event listener untuk tombol delete
        listItem.querySelector(".delete-btn").addEventListener("click", function () {
            bookList.removeChild(listItem);
            removeBookFromStorage(book);
        });

        bookList.appendChild(listItem);
    }

    // Fungsi untuk menyimpan buku ke localStorage
    function saveBookToStorage(book) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Fungsi untuk menghapus buku dari localStorage
    function removeBookFromStorage(book) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books = books.filter(b => b.title !== book.title || b.author !== book.author);
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Fungsi untuk memuat buku dari localStorage saat aplikasi dimulai
    function loadBooks() {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.forEach(book => addBookToDOM(book));
    }
});

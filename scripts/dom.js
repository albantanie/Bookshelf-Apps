const UNCOMPLETED_LIST_SHELF_ID = "incompleteBookshelfList";
const COMPLETED_LIST_SHELF_ID = "completeBookshelfList";
const SHELF_ITEMID = "itemId";

// Input book
function addShelf() {
    const unCompletedShelfId = document.getElementById(UNCOMPLETED_LIST_SHELF_ID);
    const completeBookShelfList = document.getElementById(COMPLETED_LIST_SHELF_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;

    // Check Box
    const checkbox = document.getElementById("inputBookIsComplete");

    let shelf = "";
    if(checkbox.checked) {
        shelf = makeShelf(bookTitle, bookAuthor, bookYear, true);
        completeBookShelfList.append(shelf);
    } else {
        shelf = makeShelf(bookTitle, bookAuthor, bookYear, false);
        unCompletedShelfId.append(shelf);
    }

    const shelfObject = composeShelfObject(bookTitle, bookAuthor, bookYear, false);
    shelf[SHELF_ITEMID] = shelfObject.id;
    shelfs.push(shelfObject);

    updateDataToStorage();
}


// Make element
function makeShelf(dataTitle, dataAuthor, dataYear, isCompleted) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = dataTitle;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.innerText = dataAuthor;
    
    const bookYear = document.createElement("p");
    bookYear.classList.add("bookYear");
    bookYear.innerText = dataYear;
    
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");
    bookItem.append(bookTitle, bookAuthor, bookYear);

    if(isCompleted) {
        bookItem.append(createUndoButton(), createTrashButton());
    } else {
        bookItem.append(createCheckButton(), createTrashButton());
    }
    
    return bookItem;
}   


// Check Box
function checkbox() {

    const checkbox = document.getElementById("inputBookIsComplete");
    checkbox.addEventListener("change", function(){
        if(checkbox.checked == false) {
            document.querySelector("span").innerText = "";
        } else {
            document.querySelector("span").innerText = "";
        }     
    })
}


// All Button
function createButton(buttonTypeClass, textButton, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;

    button.addEventListener("click", function(event){
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}


// Check Button
function createCheckButton() {
    return createButton("dibaca", "Selesai dibaca", function(event){
        addTaskToCompleted(event.target.parentElement);
    })
}

function addTaskToCompleted(taskElement) {
    
    const listCompleted = document.getElementById(COMPLETED_LIST_SHELF_ID);   
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .bookAuthor").innerText;
    const bookYear = taskElement.querySelector(".book_item > .bookYear").innerText; 
    const newBook = makeShelf(bookTitle, bookAuthor, bookYear, true);
    const shelf = findBook(taskElement[SHELF_ITEMID]);

    shelf.isCompleted = true;
    newBook[SHELF_ITEMID] = shelf.id;
    listCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();

}


// Button hapus
function createTrashButton() {
    return createButton("hapus", "Hapus Buku", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    })
}

function removeTaskFromCompleted(taskElement) {
    const shelfPosition = findBookIndex(taskElement[SHELF_ITEMID]);
    
    shelfs.splice(shelfPosition, 1);
    taskElement.remove();
    updateDataToStorage();
}


// Button dibaca
function createUndoButton() {
    return createButton("dibaca", "Belum Selesai dibaca", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function undoTaskFromCompleted(taskElement){

    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_SHELF_ID);
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .bookAuthor").innerText;
    const bookYear = taskElement.querySelector(".book_item > .bookYear").innerText;
    const newBook = makeShelf(bookTitle, bookAuthor, bookYear, false);
    const shelf = findBook(taskElement[SHELF_ITEMID]);
    
    shelf.isCompleted = false;
    newBook[SHELF_ITEMID] = shelf.id;
    listUnCompleted.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

// Search 
const searchBook = document.getElementById("searchSubmit");
    searchBook.addEventListener("click", () => {

        event.preventDefault();

        const searchJudul = document.getElementById("searchBookTitle").value.toLowerCase();
        const textSearch = document.querySelectorAll("article");

        for (book of textSearch) {
            const Judul = book.firstElementChild.textContent.toLowerCase();

                if (Judul.indexOf(searchJudul) != -1) {
                    book.style.display = "block";
                } else {
                    book.style.display = "none";
                }
        }
    });

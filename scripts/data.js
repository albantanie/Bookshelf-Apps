
const STORAGE_KEY = "SHELF_APPS";
let shelfs = [];

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(shelfs);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if(data !== null)
        shelfs = data;
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}


function composeShelfObject(bookTitle, bookAuthor, bookYear, isCompleted) {
    return {
        id: +new Date(),
        bookTitle,
        bookAuthor,
        bookYear,
        isCompleted
    };
}

function findBook(bookfId) {
    for(shelf of shelfs){
        if(shelf.id === bookfId)
            return shelf;
    }
    return null;
}

function findBookIndex(bookfId) {
    let index = 0
    for (shelf of shelfs) {
        if(shelf.id === bookfId)
            return index;

        index++;
    }
    return -1;
}

function refreshDataFromShelf() {
    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_SHELF_ID);

    const listCompleted = document.getElementById(COMPLETED_LIST_SHELF_ID);

    for(shelf of shelfs) {
        const newShelf = makeShelf(shelf.bookTitle, shelf.bookAuthor, shelf.bookYear, shelf.isCompleted);
        newShelf[SHELF_ITEMID] = shelf.id;

        if(shelf.isCompleted) {
            listCompleted.append(newShelf);
        } else {
            listUnCompleted.append(newShelf);
        }
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const inputBook = document.getElementById("inputBook");
    inputBook.addEventListener("submit", function(event) {
        event.preventDefault();
        addShelf();
    });

    if(isStorageExist()) {
        loadDataFromStorage();
    }
    checkbox();
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromShelf();
});

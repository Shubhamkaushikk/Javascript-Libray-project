// creating book class
class book {
    // constructor for values
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

}

// creating class for add method and display
let localBook = localStorage.getItem('localBook');
if (localBook == null) {
    localaddBook = [];
}
else {
    localaddBook = JSON.parse(localBook)
}
class display {

    add() {
        let localBook = localStorage.getItem('localBook');
        if (localBook == null) {
            localaddBook = [];
        }
        else {
            localaddBook = JSON.parse(localBook)
        }
        let string = "";
       
        localaddBook.forEach(function (element, index) {
            string += `<tr>
            <th>${element.name}</th>
               <td>${element.author}</td>
               <td>${element.type}</td>
               <td> <button type="submit" class="btn btn-primary dlt" id="${index}" onclick=dlt(this.id) >Delete</button></td>
              
            </tr> `



        });
        let tbody = document.getElementById('tbody');
        if (localaddBook.length != 0) {
            tbody.innerHTML = string;
        }
        else {
            tbody.innerHTML = "no entry"
        }
    }

    // delete function



    clear() {
        let library = document.getElementById('libraryform');
        library.reset();

    }

    validate(Book) {
        if (Book.name < 3 || Book.author < 3) {
            return false
        }
        else {
            return true
        }
    }

    error(type, displayMsg) {

        let msg = document.getElementById('errorMsg');
        let boldtxt;
        if (type === 'success') {
            boldtxt = 'Added';

        }
        else if(type == 'primary'){
            boldtxt = 'Deleted'
        }
        else {
            boldtxt = 'Error!'
        }
        msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldtxt}</strong> ${displayMsg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`

        setTimeout(() => {
            msg.innerHTML = ""
        }, 5000);
    }

}
let show = new display();
show.add()

// delete
function dlt(index) {

    
    let localBook = localStorage.getItem('localBook');
    if (localBook == null) {
        localaddBook = [];
    }
    else {
        localaddBook = JSON.parse(localBook)
    }
    localaddBook.splice(index, 1);
    localStorage.setItem("localBook", JSON.stringify(localaddBook));
    
    let show = new display();
    show.add()
    show.error('primary', 'Successfully')
}

//show all localstorage data



//fetch form using id 
let library = document.getElementById('libraryform');

//adding submit event listner on form 
library.addEventListener('submit', addBook);

//create addBook function
function addBook(e) {

    //stop refreshing page
    e.preventDefault();

    //get values from form
    let name = document.getElementById('BookName').value;
    let author = document.getElementById('author').value;
    let type;
    let comedy = document.getElementById('Comedy');
    let sports = document.getElementById('Sports');
    let programming = document.getElementById('Programming');

    if (comedy.checked) {
        type = Comedy.value;
    }
    else if (sports.checked) {
        type = Sports.value;
    }
    else if (programming.checked) {
        type = Programming.value;
    }
    let localBook = localStorage.getItem('localBook');
    if (localBook == null) {
        localaddBook = [];
    }
    else {
        localaddBook = JSON.parse(localBook)
    }
    let localObj = {
        'name': name,
        'author': author,
        'type': type

    }


    //catch all value in a variable
    let Book = new book(name, author, type);

    //call display class
    let Display = new display();
    // Display.add(Book);


    //validate form
    if (Display.validate(Book)) {

        localaddBook.push(localObj);
        localStorage.setItem('localBook', JSON.stringify(localaddBook));
        // book adding method
        Display.add();

        // clear form 
        Display.clear();
        Display.error('success', 'Your book has been successfully added')

    }
    else {

        Display.error('danger', 'Sorry you cannot add this book')

    }

}
showNotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addtxt");
    let addTitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let myobj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value="";
    // console.log(notesobj);
    showNotes();

});
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text"> ${element.text}</p>
          <button id="${index}" onclick="deletions(this.id)" class="btn btn-primary">Delete</button>
        </div>
      </div>
        `
    });
    let noteselm = document.getElementById("notes");
    if (notesobj.lenght != 0) {
        noteselm.innerHTML = html;
    }
    else {
        noteselm.innerHTML = `Nothing to show you! Use "Add Notes" section to add notes.`;
    }
}

function deletions(index) {
    // console.log('I am deleting',index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}

let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
    let inputvalue = search.value.toLowerCase();
    // console.log("Input event", inputvalue);
    let notecards = document.getElementsByClassName("notecard");
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(inputvalue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardtxt);
    })
})


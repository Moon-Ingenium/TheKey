let addBttnEl = document.getElementById("add");
let storage = localStorage.getItem("resource");
let cardEl = document.querySelector(".resource-body");


addBttnEl.addEventListener("click",function addResource() {
    event.preventDefault();
    const input = document.querySelector("#link").value;
    const aEl = document.createElement("a");
    const pEl = document.createElement("p");
    aEl.setAttribute("href", input);
    aEl.textContent= input;
    const deleteBttnEl = document.createElement("button");
    deleteBttnEl.setAttribute('class', 'btn');
    const delIcon = document.createElement("i");
    delIcon.setAttribute("class", "fa fa-trash");
    deleteBttnEl.append(delIcon);
    cardEl.append(pEl);
    pEl.append(aEl);
    pEl.append(deleteBttnEl);
    // store to local storage
   localStorage.setItem("resource", val);
    document.getElementById('form').reset();
});


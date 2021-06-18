let addBttnEl = document.getElementById("add");
let cardEl = document.querySelector(".resource-body");
var resource = localStorage.getItem("resource");
const deleteBttnEl = document.createElement("button");
let i=0;

function buildCard(input) {
    i++
    const aEl = document.createElement("a");
    const pEl = document.createElement("p");
    aEl.setAttribute("href", input);
    aEl.setAttribute("target", "_blank");
    aEl.textContent= input;
    const deleteBttnEl = document.createElement("button");
    deleteBttnEl.setAttribute('class', 'btn delete');
    const delIcon = document.createElement("i");
    delIcon.setAttribute("class", "fa fa-trash");
    // add data attribute to dynamic delete button 
    deleteBttnEl.setAttribute("data-index", i);
    deleteBttnEl.append(delIcon);
    cardEl.append(pEl);
    pEl.append(aEl);
    pEl.append(deleteBttnEl);
    
}
// when the page loads, read from local storage
window.onload = function() {
    if  (resource) {
        resource.split(',').forEach((item) => {
            buildCard(item);
        })
    }
};

addBttnEl.addEventListener("click",function addResource() {
    event.preventDefault();
    const input = document.querySelector("#link").value.trim();
    
    if (input.length) {
        buildCard(input);
        // store to local storage
        resource = resource ? resource + ',' + input : input;
        localStorage.setItem("resource", resource);
        document.getElementById('form').reset();
    }
    
});


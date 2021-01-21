let addBttnEl = document.getElementById("add");
let cardEl = document.querySelector(".resource-body");
var resource = localStorage.getItem("resource");

function buildCard(input) {
    const aEl = document.createElement("a");
    const pEl = document.createElement("p");
    aEl.setAttribute("href", input);
    aEl.setAttribute("target", "_blank");
    aEl.textContent= input;
    const deleteBttnEl = document.createElement("button");
    deleteBttnEl.setAttribute('class', 'btn');
    const delIcon = document.createElement("i");
    delIcon.setAttribute("class", "fa fa-trash");
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
    const input = document.querySelector("#link").value;
    
    if (input.length) {
        buildCard(input);
        // store to local storage
        resource = resource ? resource + ',' + input : input;
        localStorage.setItem("resource", resource);
        document.getElementById('form').reset();
    }
    
});
// add data attribute to dynamic delete button 
// on click event to delete from card and to delete from local storage

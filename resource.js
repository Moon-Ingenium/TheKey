let addBttnEl = document.getElementById("add");


addBttnEl.addEventListener("click",function addResource() {
    event.preventDefault();
    const input = document.querySelector("#link").value;
    let cardEl = document.querySelector(".resource-body");
    console.log(input)
    const aEl = document.createElement("a");
    const pEl = document.createElement("p");
    aEl.setAttribute("href", input);
    aEl.textContent= input;
    const deleteBttnEl = document.createElement("button");
    deleteBttnEl.setAttribute('class', 'delete')
    cardEl.append(pEl);
    pEl.append(aEl);
    // store to local storage
   let allLinks = localStorage.setItem("resource", input);
   console.log(allLinks)

});

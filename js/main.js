// select Input from doc

let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let btnAdd = document.getElementById("submit");
let btnUpdate = document.getElementById("Update");

var bookMarkArr = [];

var indexUpdate = 0;

if (localStorage.getItem("bookmark") != null) {
  bookMarkArr = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark();
}

console.log(siteName, siteUrl);

function addBookMark() {
  var bookmarkObj = {
    name: siteName.value,
    url: siteUrl.value,
  };
  /*
  if (siteName.value == " " || siteUrl.value == " ") {
    showAlert("Please Complete Data", "danger");
    return;
  */
  bookMarkArr.push(bookmarkObj);
  // save Data in localStorage
  localStorage.setItem("bookmark", JSON.stringify(bookMarkArr));
  // confirmMsg();
  displayBookmark();
  showAlert("Success Add Content", "success");
  clearInput();
}

function displayBookmark() {
  var container = "";
  for (let i = 0; i < bookMarkArr.length; i++) {
    container += `
    <tr>
              <td class="align-middle">${i}</td>
              <td class="align-middle">${bookMarkArr[i].name}</td>
              <td class="align-middle">
                <a class="btn w-50 btn-success" href="${bookMarkArr[i].url}" target="_blank">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  View
                </a>
              </td>
              <td>
              <div>
              <button class="btn btn-danger w-50 mb-3" onclick ="deleteBook(${i})">
              <i class="fa fa-trash" aria-hidden="true"></i> Delete
            </button>
              </div>
              <div>
              <button class="btn btn-warning w-50" onclick ="editBook(${i})">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
            </button>
            </div>
              </td>
            </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = container;
}

function clearInput() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteBook(index) {
  // console.log("Delete Item");
  bookMarkArr.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookMarkArr));
  displayBookmark();
  showAlert("Delete Item Done!", "danger");
}

function editBook(index) {
  // console.log(index);
  indexUpdate = index;
  var EditBook = bookMarkArr[index];
  siteName.value = EditBook.name;
  siteUrl.value = EditBook.url;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateBook() {
  // console.log(indexUpdate);
  var bookmarkObj = {
    name: siteName.value,
    url: siteUrl.value,
  };
  bookMarkArr.splice(indexUpdate, 1, bookmarkObj);
  localStorage.setItem("bookmark", JSON.stringify(bookMarkArr));
  displayBookmark();
  clearInput();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  showAlert("Item Update Done!", "warning");
}

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `w-25 text-center alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  div.classList.add("alertPos");
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);
  setTimeout(() => document.querySelector(".alert").remove(), 4000);
}

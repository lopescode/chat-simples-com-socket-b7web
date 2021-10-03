const socket = io();

let username = "";
let userList = [];
let loginPage = document.querySelector("#loginPage");
let chatPage = document.querySelector("#chatPage");
let loginNameInput = document.querySelector("#loginNameInput");
let chatTextInput = document.querySelector("#chatTextInput");

loginPage.style.display = "flex";
chatPage.style.display = "none";

loginNameInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let name = loginNameInput.value.trim();

    if (name != "") {
      username = name;
      document.title = `Chat (${username})`;

      socket.emit("join-request", {
        username: username,
      });
    }
  }
});

function renderUserList() {
  let ul = document.querySelector(".userList");
  ul.innerHTML = "";

  userList.forEach(i => {
    ul.innerHTML += `<li>${i.username}</li`
  })
}

socket.on("user-ok", (list) => {
  loginPage.style.display = "none"
  chatPage.style.display = "flex"
  chatTextInput.focus();

  userList = list;
  renderUserList();

})

socket.on("list-update", (data) => {

  userList = data.list;
  renderUserList();
})
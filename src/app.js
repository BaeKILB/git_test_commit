const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form Input");

const greeting = document.querySelector("#greeting");

const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const nowDivDate = document.querySelector("#now-date");
const ondate = document.querySelector("#now-date #date");
const clock = document.querySelector("#now-date #clock");

const HIDDEN_CLASSNAME = "hidden";

const TODO_KEY = "todo";

let loginId = "";
let toDos = [];

function onClockTimer() {
  const nowDate = new Date(Date.now());
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth();
  const day = nowDate.getDate();
  const hour = nowDate.getHours();
  const min = nowDate.getMinutes();

  ondate.innerText = `${year} - ${month + 1} - ${day}`;
  clock.innerText = `${hour} : ${min}`;
}

function onLoginSub(event) {
  const username = loginInput.value;

  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);

  loginId = username;
  greeting.innerText = `Hello ${username}`;
  //로그인 할때 로그인 이름보고 Todolist 가져오기
  todoLocalLoad();

  greeting.classList.remove(HIDDEN_CLASSNAME);
  toDoForm.classList.remove(HIDDEN_CLASSNAME);
  toDoList.classList.remove(HIDDEN_CLASSNAME);
}

function todoLocalSave() {
  localStorage.setItem(`${loginId}-todo`, JSON.stringify(toDos));
}

//로그인 이름 기반으로 localstorage 에서 가져오기
function todoLocalLoad() {
  toDos = JSON.parse(localStorage.getItem(`${loginId}-todo`));
  if (toDos !== null) {
    toDos.forEach(printTodo);
  } else {
    // null이 toDos 에 들어가면 나중에 push할때 에러
    //에러처리
    toDos = [];
  }
}

function printTodo(data) {
  const newToDo = data;
  const li = document.createElement("li");
  const newTodoText = document.createElement("span");
  const newTodoRemoveBtn = document.createElement("button");

  li.appendChild(newTodoText);
  li.appendChild(newTodoRemoveBtn);

  li.id = newToDo.id;
  newTodoText.innerText = newToDo.text;
  newTodoRemoveBtn.innerText = "X";

  toDoList.appendChild(li);
  newTodoRemoveBtn.addEventListener("click", removeTodo);
}

function addToDo(event) {
  event.preventDefault();
  const toDoData = { id: Date.now(), text: toDoInput.value };

  toDos.push(toDoData);
  printTodo(toDoData);
  todoLocalSave();
  toDoInput.value = "";
}

function removeTodo(event) {
  const li = event.target.parentElement;

  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  todoLocalSave();
}

setInterval(onClockTimer, 1000);

document.body.style.backgroundImage =
  "url(https://source.unsplash.com/daily?city)";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";
loginForm.addEventListener("submit", onLoginSub);
toDoForm.addEventListener("submit", addToDo);

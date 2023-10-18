let add = document.querySelector("form button");
let section = document.querySelector("section");

//當Add Todo List 被交出去
add.addEventListener("click", (e) => {
  //讓submit不會交出去重整網頁
  e.preventDefault();

  //取得輸入文字
  //按鈕的父標籤是form，
  let form = e.target.parentElement;
  //觀察form的子標籤，發現0、1、2是我們要的
  //console.log(form.children);
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDay = form.children[2].value;
  let todoDone = false;

  //欄位不可以為空
  if (todoText == "") {
    alert("請在空格內填入代辦事項");
    return;
  }
  //在下面Section中新增todolist
  //創造新的div標籤，並設定其class
  let todo = document.createElement("div");
  todo.classList.add("todo");
  //創造新的p標籤、設定其class，並放入上面抓到的文字
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDay;
  //將新增的標籤放入div
  todo.appendChild(text);
  todo.appendChild(time);

  //建立完成與刪除圖標
  //圖標與其HTML標籤來自fontawesome
  let check = document.createElement("button");
  check.classList.add("check");
  check.innerHTML =
    '<i class="fa-solid fa-check" style="color: rgb(113, 255, 47) ;"></i>';
  todo.appendChild(check);
  //加入按鈕效果
  check.addEventListener("click", (e) => {
    //確認按到的東西對不對，發現會點到i，但我們只想要點到button，所以回到CSS做設定
    //console.log(e.target);
    //按下按鈕會增加或刪掉done
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
    //更改localStorage中的(done)狀態
    let thisText = todoItem.children[0].innerText;
    let myTodoArray = JSON.parse(localStorage.getItem("list"));
    myTodoArray.forEach((item, index) => {
      if (item.todoText == thisText) {
        let thisText = item.todoText;
        let thisMonth = item.todoMonth;
        let thisDay = item.todoDay;
        let thisDone = todoItem.classList.contains("done");
        myTodoArray.splice(index, 1, {
          todoText: thisText,
          todoMonth: thisMonth,
          todoDay: thisDay,
          todoDone: thisDone,
        });
        localStorage.setItem("list", JSON.stringify(myTodoArray));
      }
    });
  });

  let trash = document.createElement("button");
  trash.classList.add("trash");
  trash.innerHTML = '<i class="fa-solid fa-trash" style="color: red ;"></i>';
  todo.appendChild(trash);
  //加入按鈕效果，按下按鈕刪掉整個div標籤
  trash.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    //設div標籤消失的動畫
    todo.style.animation = "scaleDown 0.5s forwards";
    //真正刪除標籤，注意要等標籤消失（動畫完成）才能刪除
    todoItem.addEventListener("animationend", () => {
      //刪除localStorage中的資料
      let thisText = todoItem.children[0].innerText;
      let myTodoArray = JSON.parse(localStorage.getItem("list"));
      myTodoArray.forEach((item, index) => {
        if (item.todoText == thisText) {
          myTodoArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myTodoArray));
        }
      });
      //在頁面上刪除
      todoItem.remove();
    });
  });

  //設定div標籤出現的動畫
  todo.style.animation = "scaleUp 0.5s forwards";

  //將頁面的內容保存在localStorage
  //每一項todo是一個object
  let todoObj = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDay: todoDay,
    todoDone: todoDone,
  };
  //如果原本沒有資料，就建立資料清單，將todoObj放進去
  //如果原本有資料，就將資料清單取出，並將新的todoObj放進去，再儲存新的資料清單
  let myTodoList = localStorage.getItem("list");
  if (myTodoList == null) {
    localStorage.setItem("list", JSON.stringify([todoObj]));
  } else {
    let myTodoArray = JSON.parse(myTodoList);
    myTodoArray.push(todoObj);
    localStorage.setItem("list", JSON.stringify(myTodoArray));
  }
  //檢查邏輯
  //console.log(JSON.parse(localStorage.getItem("list")));

  //把todo放進section
  section.appendChild(todo);

  //將todo加入section後，清空輸入欄位的內容
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";
});

//在一打開頁面時，將localStorage裡面的東西抓出來
loadTodo();
function loadTodo() {
  let myTodoList = localStorage.getItem("list");
  if (myTodoList !== null) {
    let myTodoArray = JSON.parse(myTodoList);
    //對清單中的每一個內容作設定
    myTodoArray.forEach((item) => {
      let todo = document.createElement("div");
      todo.classList.add("todo");
      //創造新的p標籤、設定其class，並放入清單中抓到的文字
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = item.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = item.todoMonth + "/" + item.todoDay;
      //如果有完成，就在div標籤增加 class done
      if (item.todoDone) {
        todo.classList.add("done");
      }
      //將新增的標籤放入div
      todo.appendChild(text);
      todo.appendChild(time);

      //建立完成與刪除圖標
      //圖標與其HTML標籤來自fontawesome
      let check = document.createElement("button");
      check.classList.add("check");
      check.innerHTML =
        '<i class="fa-solid fa-check" style="color: rgb(113, 255, 47) ;"></i>';
      todo.appendChild(check);
      //加入按鈕效果
      check.addEventListener("click", (e) => {
        //確認按到的東西對不對，發現會點到i，但我們只想要點到button，所以回到CSS做設定
        //console.log(e.target);
        //按下按鈕會增加或刪掉done
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
        //更改localStorage中的(done)狀態
        let thisText = todoItem.children[0].innerText;
        let myTodoArray = JSON.parse(localStorage.getItem("list"));
        myTodoArray.forEach((item, index) => {
          if (item.todoText == thisText) {
            let thisText = item.todoText;
            let thisMonth = item.todoMonth;
            let thisDay = item.todoDay;
            let thisDone = todoItem.classList.contains("done");
            myTodoArray.splice(index, 1, {
              todoText: thisText,
              todoMonth: thisMonth,
              todoDay: thisDay,
              todoDone: thisDone,
            });
            localStorage.setItem("list", JSON.stringify(myTodoArray));
          }
        });
      });

      let trash = document.createElement("button");
      trash.classList.add("trash");
      trash.innerHTML =
        '<i class="fa-solid fa-trash" style="color: red ;"></i>';
      todo.appendChild(trash);
      //加入按鈕效果，按下按鈕刪掉整個div標籤
      trash.addEventListener("click", (e) => {
        let todoItem = e.target.parentElement;
        //設div標籤消失的動畫
        todo.style.animation = "scaleDown 0.5s forwards";
        //真正刪除標籤，注意要等標籤消失（動畫完成）才能刪除
        todoItem.addEventListener("animationend", () => {
          //在頁面上刪除
          todoItem.remove();
          //刪除localStorage中的資料
          let thisText = todoItem.children[0].innerText;
          let myTodoArray = JSON.parse(localStorage.getItem("list"));
          myTodoArray.forEach((item, index) => {
            if (item.todoText == thisText) {
              myTodoArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myTodoArray));
            }
          });
        });
      });

      //設定div標籤出現的動畫
      todo.style.animation = "scaleUp 0.5s forwards";

      //把todo放進section
      section.appendChild(todo);
    });
  }
}

//排列演算法
//js字串的比較，只會比較第一個字，所以12月會小於2月
//解決方式：將它變成數字
function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
      if (Number(arr1[i].todoDay) > Number(arr2[j].todoDay)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

//排列代辦清單
function mergeTodo(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    //實際上會到middle-1
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeTodo(right), mergeTodo(left));
  }
}

//驗證演算法
//console.log(mergeTodo(JSON.parse(localStorage.getItem("list"))));

let Sort = document.querySelector("div.sort");
Sort.addEventListener("click", () => {
  let sortArray = mergeTodo(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(sortArray));

  //重新排列動畫`,先刪掉，再出現
  //刪掉
  //沒辦法用forEach，因為他是HTML標籤
  //一直把最上面那個刪掉，刪到沒有東西
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }
  //出現
  loadTodo();
});

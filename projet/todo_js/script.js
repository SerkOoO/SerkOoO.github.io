const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");



function addTask()

{
    const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        which: 13,
        keyCode: 13,
      });
    if(inputBox.value == ''){
        alert("Vous devez écrire une tâche");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
      
    }

    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
    }

    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        deleteTask();
    }
}, false)

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function deleteTask(){
    listContainer.innetHTML = localStorage.removeItem("data");
}

showTask();
function openfeatures() {
    let Elements = document.querySelectorAll(".elem");
    let AllElems = document.querySelectorAll(".fullelem")
    let closebutton = document.querySelectorAll(".fullelem .back")

    Elements.forEach(function (val) {
        val.addEventListener("click", () => {
            AllElems[val.id].style.display = "block"

        })

    })
    closebutton.forEach((val) => {

        val.addEventListener("click", () => {
            AllElems[val.id].style.display = "none"

        })
    })
}
openfeatures()

function autoResizeLimit(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
}

function Todo() {
    let form = document.querySelector(".addtask form");
    let taskinput = document.querySelector(".addtask form #Enteredtext");
    let taskdetails = document.querySelector(".addtask form textarea");
    let taskimpcheck = document.querySelector(".addtask form #imptask");
    let alltask = document.querySelector(".alltask")

    let currenttasks = [];

    // local storage me add krna taaki data gayab naa ho
    if (localStorage.getItem("currenttasks")) {
        currenttasks = JSON.parse(localStorage.getItem("currenttasks"));
    } else {
        console.log("task list is empty");
    }

    function rendertask() {
        let sum = "";
        currenttasks.forEach((val, idx) => {
            sum += `<div class="task">
                        <details>
                            <summary> ${val.task} <span class= ${val.imp}>imp</span> </summary>
                            <pre>${val.details}</pre>
                        </details>
                        <button id=${idx} class="taskcompletebtn">Mark As Completed</button>
                    </div>`
        })
        alltask.innerHTML = sum;
        localStorage.setItem("currenttasks", JSON.stringify(currenttasks))

        // mark as complete
        let markcompletedbtn = document.querySelectorAll(".task button");
        markcompletedbtn.forEach((val) => {
            val.addEventListener("click", () => {
                currenttasks.splice(val.id, 1);
                rendertask();
                // location.reload();
            })
        })
    }
    rendertask();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log(taskinput.value);
        // console.log(taskdetails.value);
        // console.log(taskimpcheck.checked);
        currenttasks.push({
            task: taskinput.value,
            details: taskdetails.value,
            imp: taskimpcheck.checked,
        })
        rendertask();
        taskinput.value = "";
        taskdetails.value = "";
        taskimpcheck.checked = false;

    })
}
Todo();

// async function getquote(){
//     let response = await fetch(`http://api.quotable.io/random`)
//     let data = await response.json();
//     console.log(data);

// }
// getquote();

function motivationalquotes() {
    let motivationalquote = document.querySelector(".M-quote p");
    let motivationalauthor = document.querySelector(".M-writer p")

    function getquote() {
        return fetch(`http://api.quotable.io/random`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                motivationalauthor.innerHTML = `~${res.author}`;
                motivationalquote.innerHTML = res.content;
            }).catch(err => {
                alert("Failed to fetch quote")

            })
    }
    getquote();
}
motivationalquotes();

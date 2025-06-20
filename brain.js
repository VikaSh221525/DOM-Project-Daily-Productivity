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



function pomodorotimer() {
    let totalsec = 1500;
    let timerinterval = null;
    let flag = false;
    let timer = document.querySelector(".pomo-timer h5");
    let start = document.querySelector(".pomo-timer .start-timer");
    let pause = document.querySelector(".pomo-timer .pause-timer");
    let reset = document.querySelector(".pomo-timer .reset-timer");
    let session = document.querySelector("#session");
    let isworksession = true;

    function updatetime() {
        let minutes = Math.floor(totalsec / 60);
        let seconds = totalsec % 60;

        timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    updatetime();

    function pausetimer() {
        flag = false;
        clearInterval(timerinterval);
    }
    function resettimer() {
        flag = false;
        totalsec = 1500;
        clearInterval(timerinterval);
        timerinterval = null;
        updatetime();
    }

    function starttimer() {
        if (flag == true) {
            alert("please press pause");
            return;
        }
        flag = true;
        if (isworksession) {
            timerinterval = setInterval(() => {
                if (totalsec > 0) {
                    totalsec--;
                    updatetime();
                }
                else {
                    isworksession = false;
                    clearInterval(timerinterval);
                    timerinterval = null;
                    flag = false;
                    timer.innerHTML = "05:00";
                    session.innerHTML = "Break session";
                    session.style.backgroundColor = "#00a8ff";
                    totalsec = 300;
                    // updatetime();
                }
            }, 1000)
        }
        else {

            session.innerHTML = "Break session";
            session.style.backgroundColor = "#00a8ff";
            timerinterval = setInterval(() => {
                if (totalsec > 0) {
                    totalsec--;
                    updatetime();
                }
                else {
                    isworksession = true;
                    clearInterval(timerinterval);
                    timerinterval = null;
                    flag = false;
                    timer.innerHTML = "25:00";
                    session.innerHTML = "Work session";
                    session.style.backgroundColor = "#098A54";
                    totalsec = 1500;
                    // updatetime();
                }
            }, 1000)
        }
    }


    start.addEventListener("click", () => flag ? alert("please press pause") : starttimer());
    pause.addEventListener("click", pausetimer);
    reset.addEventListener("click", resettimer);
}
pomodorotimer();

let apikey = "87cff9a0a2d54002b26105740251706";
let city = "Delhi";
let country = "IN";

let daytime = document.querySelector(".header1 h1");
let citycountry = document.querySelector(".header1 h4");
let daydate = document.querySelector(".header1 h2")

let temperature = document.querySelector(".header2 #temp");
let precipitation = document.querySelector(".header2 #prep");
let humidity = document.querySelector(".header2 #humi");
let windspeed = document.querySelector(".header2 #speed");
let windreport = document.querySelector(".header2 #report");

let changeimg = document.querySelector("header");



let date = null;
function timedate(){
    date = new Date();
    const dayname = date.toLocaleDateString('en-IN', { weekday: 'long' });
    const timestring = date.toLocaleTimeString('en-IN',{hour: 'numeric', minute: 'numeric', hour12: true});
    daytime.innerHTML = `${dayname}, ${String(timestring).padStart(2,'0')}`

    const month = date.toLocaleString('default', {month:'long'})
    daydate.innerHTML = `${date.getDate()} ${month}, ${date.getFullYear()}`
    
    const hour = date.getHours();
    let imageurl='';
    if(hour>=6 && hour<12){
        imageurl = 'url("https://plus.unsplash.com/premium_photo-1672234253746-99ac19181f0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2t5fGVufDB8MHwwfHx8MA%3D%3D")'
    }
    else if(hour>=12 && hour<19){
        imageurl = 'url("https://images.unsplash.com/photo-1691432922406-a9a808903b78?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'
    }
    else{
        imageurl = 'url("https://images.unsplash.com/photo-1665708469600-bcae2554560c?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'
    }
    changeimg.style.backgroundImage = imageurl;
}


async function wheatherapicall(){
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city},${country}`);
    let data = await response.json();
    console.log(data);
    
    console.log(data.current.temp_c);
    citycountry.innerHTML = `${data.location.region}, ${data.location.country}`
    temperature.innerHTML = `${data.current.temp_c}°C`
    precipitation.innerHTML = `Precipitation: ${data.current.precip_in}%`
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`
    windspeed.innerHTML = `wind: ${data.current.wind_kph} kph`
    windreport.innerHTML = `${data.current.condition.text} `
}
setInterval(()=>{
    wheatherapicall();
    timedate();
},1000)


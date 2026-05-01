const submit = () => {
    const userInput = document.getElementById("usr").value;
    const passInput = document.getElementById("pass").value;
    if (userInput == "admin" && passInput == "admin123") {
        window.location.href = "./dashboard.html";
    } else {
        document.getElementById("usr").value = "";
        document.getElementById("pass").value = "";
        document.getElementById("usr").classList.add("queryWrong");
        document.getElementById("pass").classList.add("queryWrong");
    }
}

const loadAllData = async () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    displayButton(data.data);
    document.getElementById("countIssus").innerHTML = `${data.data.length}`;
    displayData(data.data);
}
const displayButton = (statusData) => {
    const storeBtnData = [];
    for (let singleBtn of statusData) {
        if (!storeBtnData.includes(singleBtn.status)) {
            storeBtnData.push(singleBtn.status)
        }
    }
    buttonUpdate(storeBtnData);
}
const buttonUpdate = (buttons) => {
    const btnId = document.getElementById("buttonUpdate");
    btnId.innerHTML = "";
    for (let button of buttons) {
        const createDiv = document.createElement("div");
        createDiv.innerHTML = `<button onclick="Filters(${button})" class="btn btn-outline btn-primary button-size button-unactive">${button === "open" ? "Open" : "Closed"}</button>`;
        btnId.append(createDiv);
    }
}
const Filters = (singleBtn) => {
    const dis = document.getElementById("display").innerHTML = "";
}
const displayData = (datas) => {
    const display = document.getElementById("display");
    display.innerHTML = "";
    for (let data of datas) {
        const dateObj = new Date(data.updatedAt);
        const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
        const newDiv = document.createElement("div");
        let priorityClass = "";
        let priorityText = data.priority.toUpperCase();
        if (data.priority === "high") {
            priorityClass = "text-[#EF4444] bg-[#FEECEC]";
        } else if (data.priority === "medium") {
            priorityClass = "text-[#F59E0B] bg-[#FFF6D1]";
        } else if (data.priority === "low") {
            priorityClass = "text-[#9CA3AF] bg-[#EEEFF2]";
        }
        newDiv.innerHTML = `
            <div id="staTop-${data.id}" class="shadow-md border-t-4 rounded-[8px] p-4">
                <div class="flex flex-col gap-3 pb-4">
                    <div class="flex justify-between items-center">
                        <span id="statusLogo-${data.id}"></span><span class="px-[25.5px] py-[6px] text-[#EF4444] bg-[#FEECEC] rounded-[100px] text-[12px] font-medium ${priorityClass}">${priorityText}</span>
                    </div>
                    <h4 class="text-4 md:text-start text-center font-semibold">${data.title}</h4>
                    <p class="text-[12px] md:text-start text-center text-[#64748B]">${data.description}</p>
                    <div id="labels-${data.id}" class="flex flex-wrap md:justify-start justify-center items-center gap-1">
                    </div>
                </div>
                <div class="py-4 border-t-[2px] border-[#E4E4E7]">
                    <div class="flex flex-col justify-between md:items-start items-center gap-2">
                        <p class="text-[12px] text-[#64748B]">#${data.id} by ${data.author}</p>
                        <p class="text-[12px] text-[#64748B]">${formattedDate}</p>
                    </div>
                </div>
            </div>
        `;
        display.append(newDiv);
        const statuslogo = document.getElementById(`statusLogo-${data.id}`);
        const statustop = document.getElementById(`staTop-${data.id}`);
        if (data.status === "open") {
            statustop.classList.add("border-green-500");
            const divnewforstatus = document.createElement("div");
            divnewforstatus.innerHTML = `<img class="open" src="./assets/Open-Status.png">`;
            statuslogo.append(divnewforstatus);
        } else if (data.status === "closed") {
            statustop.classList.add("border-purple-500");
            const divnewforstatus = document.createElement("div");
            divnewforstatus.innerHTML = `<img class="closer" src="./assets/Closed- Status .png">`;
            statuslogo.append(divnewforstatus);
        }

        const labelParent = document.getElementById(`labels-${data.id}`);
        data.labels.forEach(labelss => {
            let labelsClass = "";
            if (labelss === "bug") {
                labelsClass = "text-[#EF4444] bg-[#FEECEC] border-[#FECACA]";
            } else if (labelss === "help wanted") {
                labelsClass = "text-[#D97706] bg-[#FFF8DB] border-[#FDE68A]";
            } else if (labelss === "enhancement") {
                labelsClass = "text-[#00A96E] bg-[#DEFCE8] border-[#BBF7D0]";
            } else if (labelss === "good first issue") {
                labelsClass = "text-[#7C3AED] bg-[#F5F3FF] border-[#DDD6FE]";
            } else if (labelss === "documentation") {
                labelsClass = "text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]";
            }
            const span = document.createElement("span");
            span.className = `px-3 py-[4px] text-[10px] font-medium ${labelsClass} border-[2px] rounded-[100px]`;
            span.innerText = labelss.toUpperCase();
            labelParent.appendChild(span);
        });
    }
}
const statusDetect = (statuses) => {
    console.log(statuses);
}
loadAllData();
const loadData = async () => {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const allIssuesData = data.data;
    loopData(allIssuesData);
}
const loopData = (data) => {
    const storeStatus = [];
    data.forEach((sinData) => {
        if (!storeStatus.includes(sinData.status  === "open" ? "Open" : "Closed")) {
            storeStatus.push(sinData.status  === "open" ? "Open" : "Closed");
        }
    });
    const firstBtn = ["All"];
    const finalBtnFollowStatus = [...firstBtn, ...storeStatus];
    const btnId = document.getElementById("buttonUpdate");
    btnId.innerHTML = "";
    for (let Button of finalBtnFollowStatus) {
        const createDiv = document.createElement("div");
        createDiv.innerHTML = `<button id="lessoner-${Button}" class="removeActive btn btn-outline btn-primary button-size">${Button}</button>`;
        btnId.append(createDiv);
        const btn = createDiv.querySelector("button");
        btn.addEventListener("click", () => {
            dataLoad(Button, data);
        });
    }
    dataLoad("All", data);
}
const removeactive = () => {
    const classlist = document.querySelectorAll(".removeActive");
    classlist.forEach(rec=> rec.classList.remove("button-active"));
}
const dataLoad = (Buttons, data) => {
    if (Buttons === "All") {
        removeactive();
        const activeBtn = document.getElementById(`lessoner-${Buttons}`)
        activeBtn.classList.add("button-active");
        document.getElementById("countIssus").innerHTML = "";
        document.getElementById("countIssus").innerHTML = `${data.length}`;
        document.getElementById("searchInput").value = "";
        displayData(data)
    } else if (Buttons === "Open") {
        removeactive();
        const activeBtn = document.getElementById(`lessoner-${Buttons}`)
        activeBtn.classList.add("button-active");
        const openIssues = data.filter((Issue) => Issue.status === "open");
        document.getElementById("countIssus").innerHTML = "";
        document.getElementById("countIssus").innerHTML = `${openIssues.length}`;
        document.getElementById("searchInput").value = "";
        displayData(openIssues);
    } else if (Buttons === "Closed") {
        removeactive();
        const activeBtn = document.getElementById(`lessoner-${Buttons}`)
        activeBtn.classList.add("button-active");
        const closedIssues = data.filter((Issue) => Issue.status === "closed");
        document.getElementById("countIssus").innerHTML = "";
        document.getElementById("countIssus").innerHTML = `${closedIssues.length}`;
        document.getElementById("searchInput").value = "";
        displayData(closedIssues);
    }
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
            <div onclick="loadDetail(${data.id})" id="staTop-${data.id}" class="cursor-pointer shadow-md border-t-4 rounded-[8px] p-4">
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
const loadDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetal(data.data);
}
const displayDetal = (issueDetail) => {
    const displayModal = document.getElementById("displayModal");
    displayModal.innerHTML = "";
    const dateObj = new Date(issueDetail.updatedAt);
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
    const newDiv = document.createElement("div");
    let priorityClass = "";
    let priorityText = issueDetail.priority.toUpperCase();
    if (issueDetail.priority === "high") {
        priorityClass = "text-white bg-[#EF4444]";
    } else if (issueDetail.priority === "medium") {
        priorityClass = "text-white bg-[#F59E0B]";
    } else if (issueDetail.priority === "low") {
        priorityClass = "text-white bg-[#9CA3AF]";
    }
    newDiv.innerHTML = `
        <div id="staTopqq-${issueDetail.id}" class="">
            <div class="flex flex-col gap-3 pb-4">
                <h3 class="text-[24px] md:text-start text-center font-bold">${issueDetail.title}</h3>
                <div class="flex justify-start items-center gap-2">
                    <span id="statusLogoqq-${issueDetail.id}" class="">${issueDetail.status === "open" ? "Opened" : "Closed"}</span>•<p class="text-[12px] text-[#64748B]">${issueDetail.status === "open" ? "Opened" : "Closed"} by ${issueDetail.author}</p>•<p class="text-[12px] text-[#64748B]">${formattedDate}</p>
                </div>
                <div id="labelsqq-${issueDetail.id}" class="flex flex-wrap md:justify-start justify-center items-center gap-1">
                </div>
                <p class="text-[12px] md:text-start text-center text-[#64748B]">${issueDetail.description}</p>
                <div class="w-[100%] p-4 bg-[#F8FAFC] flex">
                    <div class="flex flex-col flex-1">
                        <p class="text-[#64748B] text-[16px]">Assignee:</p>
                        <p class="text-black-500 font-semibold text-[16px]">${issueDetail.assignee ? issueDetail.assignee : "Not Found Assignee"}</p>
                    </div>
                    <div class="flex flex-col flex-1 justify-start items-start">
                        <p class="text-[#64748B] text-[16px]">Priority:</p>
                        <p class="px-[10px] py-[6px] rounded-[100px] text-[12px] font-medium ${priorityClass}">${priorityText}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    displayModal.append(newDiv);
    const statuslogos = document.getElementById(`statusLogoqq-${issueDetail.id}`);
    if (issueDetail.status === "open") {
        statuslogos.classList.add("openBtn");
    } else if (issueDetail.status === "closed") {
        statuslogos.classList.add("closedBtn");
    }

    const labelParent = document.getElementById(`labelsqq-${issueDetail.id}`);
    issueDetail.labels.forEach(labelss => {
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
    document.getElementById("my_modal_5").showModal();
}
const input = document.getElementById("searchInput");
input.addEventListener("input", async (e) => {
    const value = e.target.value;
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`;
    const res = await fetch(url);
    const data = await res.json();
    removeactive();
    document.getElementById("countIssus").innerHTML = "";
    document.getElementById("countIssus").innerHTML = `${data.data.length}`;
    displayData(data.data);
});
loadData();
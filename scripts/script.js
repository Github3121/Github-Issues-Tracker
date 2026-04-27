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
    document.getElementById("countIssus").innerHTML = `${data.data.length}`;
    displayData(data.data);
}
const displayData = (datas) => {
    const display = document.getElementById("display");
    display.innerHTML = "";
    for (let data of datas) => {
        console.log(data);
        const newDiv = document.createElement("div");
        let priorityClass = "";
        let priorityText = data.priority.toUpperCase();
        if (data.priority === "high") {
            priorityClass = "text-[#EF4444] bg-[#FEECEC]";
        } else if (data.priority === "medium") {
            priorityClass = "text-[#F59E0B] bg-[#FFF6D1]";
        }
        } else if (data.priority === "low") {
            priorityClass = "text-[#9CA3AF] bg-[#EEEFF2]";
        }
        newDiv.innerHTML = `
            <div class="shadow-md border-t-3 border-green-500 rounded-[4px] p-4">
                <div class="flex flex-col gap-3 pb-4">
                    <div class="flex justify-between items-center">
                        <span><img src="./assets/Open-Status.png"></span><span class="px-[25.5px] py-[6px] text-[#EF4444] bg-[#FEECEC] rounded-[100px] text-[12px] font-medium ${priorityClass}">${priorityText}</span>
                    </div>
                    <h4 class="text-4 font-semibold">Fix navigation menu on mobile devices</h4>
                    <p class="text-[12px] text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>
                    <div class="flex justify-start items-center gap-1">
                        <span class="px-3 py-[4px] text-[10px] font-medium text-red-500 bg-[#FEECEC] border-[2px] border-[#FECACA] rounded-[100px]">BUG</span><span class="px-3 py-[4px] text-[10px] font-medium text-[#D97706]-500 bg-[#FFF8DB] border-[2px] border-[#FDE68A] rounded-[100px]">HELP WANTED</span>
                    </div>
                </div>
                <div class="py-4 border-t-[2px] border-[#E4E4E7]">
                    <div class="flex flex-col justify-between items-start gap-2">
                        <p class="text-[12px] text-[#64748B]">#1 by john_doe</p>
                        <p class="text-[12px] text-[#64748B]">1/15/2024</p>
                    </div>
                </div>
            </div>
        `;
        display.append(newDiv);
    }
}
const statusDetect = (statuses) => {
    console.log(statuses);
loadAllData();
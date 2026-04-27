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
}
loadAllData();
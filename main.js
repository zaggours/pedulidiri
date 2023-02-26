async function showTab(params) {
    function menuLooping(el, x) {
        el.forEach((element, index) => {
            console.log("element", index);
            if (index === x) {
                if (element.classList.contains("hidden")) {
                    return element.classList.remove("hidden");
                }
            } else {
                return element.classList.add("hidden");
            }
        });
    }

    const el = document.querySelectorAll(".item-id");
    console.log("el", params);
    if (params === "home") {
        menuLooping(el, 0);

    } else if (params === "catatan") {
        el.forEach((element, index) => {
            console.log("element", index);
            if (index === 1) {
                if (element.classList.contains("hidden")) {
                    element.classList.remove("hidden");
                }
            } else {
                element.classList.add("hidden");
            }
        });
        const response = await fetch("http://localhost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nik: localStorage.getItem("isLoggedin"),
                action: "getCatatan",
            }),
        });
        let getData = await response.json();
        
        console.log(" getData", getData);
        const dataTable = document.getElementById("dataFromApi");

        let datas = `<tr>
        <th>Tanggal</th>
        <th>Waktu</th>
        <th>Lokasi</th>
        <th>Suhu Tubuh</th>
        </tr>`;

        getData.forEach((data) => {
            datas += `<tr>
            <td>${data.tanggal}</td>
            <td>${data.waktu}</td>
            <td>${data.lokasi}</td>
            <td>${data.suhu}</td>
            </tr>`;
        });

        dataTable.innerHTML = datas;




    } else {
       el.forEach((element, index) => {
            console.log("element", index);
            if (index === 2) {
                if (element.classList.contains("hidden")) {
                    element.classList.remove("hidden");
                }
            } else {
                element.classList.add("hidden");
            }
        });
    }
}

async function callApi(url) {
    const response = await fetch(url);
    let data = await response.json();

    return data;
}

function getisLoggedinName() {
    const name = localStorage.getItem("isLoggedinName");

    if (name) {
        document.getElementById("isLoggedinName").innerHTML = name;
    }
}

getisLoggedinName();

async function isiCatatan(event) {
    event.preventDefault();
    const tanggal = document.getElementById("tanggal").value;
    const jam = document.getElementById("jam").value;
    const lokasi = document.getElementById("lokasi").value;
    const suhu = document.getElementById("suhu").value;
    const nik = localStorage.getItem("isLoggedin");

let formData = new FormData();
formData.append("tanggal", tanggal);
formData.append("jam", jam);
formData.append("lokasi", lokasi);
formData.append("suhu", suhu);
formData.append("nik", nik);
formData.append("action","isiCatatan");

let object ={};
console.log(formData);
formData.forEach((value, key) => (object[key] = value));
let json = JSON.stringify(object);

try {
    const response = await fetch("http://localhost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: json,
    });
    let data = await response.json();
    console.log("data", data);
    if (data.status == "Sukses") {
        alert("Data Berhasil Ditambahkan");
        showTab("catatan");
    } else {
        alert("Data gagal ditambahkan");
    }
} catch (error) {
    console.log(error);
}


}
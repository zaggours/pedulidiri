async function urutkanTable() {
  alert("Data Berhasil Diurutkan");
  const data = document.getElementById("selectSorting") .value;
  console.log("clicked", data);

  const response = await fetch("http://localhost", {
    method: "POST",
    headers: {
      "Contenet-Type": "application/json",
    },
    body: JSON.stringify({
      nik: localStorage.getItem("isLoggedin"),
      sortBy: data,
      action: "sorting",
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
}
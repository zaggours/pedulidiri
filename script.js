async function handleSubmit(event, action)  {
    event.preventDefault();
    const nik = document.getElementById("nik").value;
    const nama_lengkap = document.getElementById("nama_lengkap").value;
    //console.log(nik);
    //console.log(nama_lengkap);
   // FORMDATA
   if (!nik && !nama_lengkap){
    alert("Harap Isi NIK Dan Nama Lengkap");
    return;
   }

   let formData = new FormData();
   formData.append("nik", nik);
   formData.append("nama_lengkap", nama_lengkap);
   if (action === "daftar") {
    formData.append("action", "daftar");
   }else {
    formData.append("action", "login");
   }
   //
   let object = {};
   console.log(formData);
   formData.forEach((value, key) => (object[key] = value));
   let json = JSON.stringify(object);
   console.log(json);

   if (action === "daftar") {
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

        if (data.status != "Sukses") {
            alert("Nik sudah terdaftar");
        } else  {
            alert("pendaftaran berhasil anda akan diarahakan ke dashboard!");
            localStorage.setItem("isLoggedin", data.nik);
            localStorage.setItem("isLoggedinName", data.nama_lengkap);
            window.location.replace("dashboard.html");
        }
    } catch (error) {
        console.log("error", error);
    }
   } else {

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
        if (data.status === "Sukses") {
            alert("Anda Berhasil Masuk!");
            localStorage.setItem("isLoggedin", data.nik);
            localStorage.setItem("isLoggedinName", data.nama_lengkap);
            window.location.replace("dashboard.html");
        } else {
            alert("username atau password anda salah");
        }
    } catch (error) {
        console.log("error", error);
        
    }
    

   } 
  
}

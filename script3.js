function logout() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("isLoggedinName");
    window.location.replace("index.html");
    alert("Anda Berhasil Keluar");
}
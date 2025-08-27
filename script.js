function showLogin(){
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
}
function showRegister(){
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.remove('hidden');
}

function register(){
  let name = document.getElementById('regName').value;
  let user = document.getElementById('regUser').value;
  let email = document.getElementById('regEmail').value;
  let pass = document.getElementById('regPass').value;
  let pass2 = document.getElementById('regPass2').value;

  if(pass !== pass2){
    alert('Password tidak sama!');
    return;
  }

  let userData = {name, user, email, pass, presensi: []};
  localStorage.setItem('userData', JSON.stringify(userData));
  alert('Akun berhasil dibuat! Silakan login.');
  showLogin();
}

function login(){
  let user = document.getElementById('loginUser').value;
  let pass = document.getElementById('loginPass').value;
  let stored = JSON.parse(localStorage.getItem('userData'));

  if(stored && user === stored.user && pass === stored.pass){
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('presensiApp').classList.remove('hidden');
    document.getElementById('userWelcome').innerText = stored.name;
    renderPresensi(stored.presensi);
  } else {
    alert('Username atau password salah!');
  }
}

function absen(type){
  let stored = JSON.parse(localStorage.getItem('userData'));
  let nama = document.getElementById('presensiNama').value || stored.name;
  let id = document.getElementById('presensiID').value || '-';
  let status = document.getElementById('presensiStatus').value;
  let ket = document.getElementById('presensiKet').value || '-';
  let waktu = new Date().toLocaleString();

  let catatan = {nama, id, status, waktu, ket, type};
  stored.presensi.push(catatan);
  localStorage.setItem('userData', JSON.stringify(stored));
  renderPresensi(stored.presensi);
}

function renderPresensi(list){
  let tbody = document.getElementById('presensiList');
  tbody.innerHTML = '';
  list.forEach(item => {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.nama}</td><td>${item.id}</td><td>${item.status} (${item.type})</td><td>${item.waktu}</td><td>${item.ket}</td>`;
    tbody.appendChild(tr);
  });
}

function logout(){
  document.getElementById('presensiApp').classList.add('hidden');
  showLogin();
}

// if not logged in 
document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn !== 'true') {
    window.location.href = 'index.html';  // Redirect to login page if not authenticated
  }
});
//



let newName = document.getElementById("new-name");
let newEmail = document.getElementById("new-email");
let newPhone = document.getElementById("new-phone");
let newStatus = document.getElementById("user-status");

// const nameError = document.getElementById('name-error');
// const emailError = document.getElementById('email-error');
// const phoneError = document.getElementById('phone-error');

const userList = JSON.parse(localStorage.getItem("savedUserData")) || [];
renderOnPage();

function addUser() {
  //getting input values
  let nameValue = newName.value;
  let emailValue = newEmail.value.trim();
  let phoneValue = newPhone.value.trim();
  let statusValue = newStatus.value.trim();

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6789]\d{9,9}$/;
  const isEmailDuplicate = userList.some(user => user.userEmail === emailValue);
  const isPhoneDuplicate = userList.some(user => user.userPhone === phoneValue);
  //insert data into array
  if (nameValue && emailValue && phoneValue) {
    if (!nameRegex.test(nameValue)) {
      swal.fire({
        title: 'Invalid',
        text: 'Entry',
        icon: 'error',
        confirmButtonText: 'Enter Again'
      });
    }
    else if (!emailRegex.test(emailValue)) {
      swal.fire({
        title: 'Invalid',
        text: 'Email address',
        icon: 'error',
        confirmButtonText: 'Enter Again'
      });
    }
    else if (!phoneRegex.test(phoneValue)) {
      swal.fire({
        title: 'Invalid',
        text: 'Phone Number',
        icon: 'error',
        confirmButtonText: 'Enter Again'
      });
    }
    else if (isEmailDuplicate) {
      alert('A user with this email already exists.');
    } else if (isPhoneDuplicate) {
      alert('A user with this phone number already exists.');
    }
    else {
      let userData = {
        userName: nameValue,
        userEmail: emailValue,
        userPhone: phoneValue,
        userStatus: statusValue,
      };

      userList.push(userData);
      localStorage.setItem("savedUserData", JSON.stringify(userList));
      // Clear the input fields
      newName.value = "";
      newEmail.value = "";
      newPhone.value = "";

      Swal.fire({
        title: 'User added!',
        text: 'successfully!!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = 'Main.html';
      });
    }
  } else {
    swal.fire({
      title: 'Required',
      text: 'All fields are required please check ',
      icon: 'error',
      confirmButtonText: 'Try again '
    });
  }

  //console just for testing, will remove after testing
  //   console.log(userList);
  renderOnPage();
}

function renderOnPage() {
  const userTableBody = document.getElementById("userTableBody");
  userTableBody.innerHTML = "";
  userList.forEach((user, index) => {
    const userRow = `
        <tr>
        <td>${index + 1}</td>
        <td>${user.userName}</td>
        <td>${user.userEmail}</td>
        <td>${user.userPhone}</td>
        <td>
        <span class="badge p-2 rounded-pill ${user.userStatus === 'active' ? 'bg-success' : 'bg-danger'}">${user.userStatus}</span></td>
        <td>
        <button type="button" class="btn  btn-primary action-btns" data-bs-toggle="modal" data-bs-target="#viewUserModal" onclick="viewUser(${index})"><i class="fa-regular fa-eye fa-xs"></i>View</button>
            <button class="btn btn-danger  action-btns" onclick="deleteUser(${index});"><i class="fa-solid fa-trash"></i> </button>
           
        </td>
    </tr>
        `;
    userTableBody.innerHTML += userRow;
  });
}

function deleteUser(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      userList.splice(index, 1);
      localStorage.setItem("savedUserData", JSON.stringify(userList));
      renderOnPage();
      console.log(index);
      Swal.fire(
        'Deleted!',
        'Your item has been deleted.',
        'success'
      );
    }
  });


}

function viewUser(index) {
  const user = userList[index];
  const modalBody = document.getElementById("viewUserModalBody");
  modalBody.innerHTML = `
  <p><strong>Name:</strong>${user.userName}</p>
  <p><strong>Email:</strong>${user.userEmail}</p>
  <p><strong>Phone:</strong>${user.userPhone}</p>
  <p><strong>Status:</strong> <span class="badge ${user.userStatus === 'active' ? 'bg-success' : 'bg-danger'}">${user.userStatus}</span></td></p>
  `;
}

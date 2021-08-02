const url = "http://localhost:3000/categories";
const addModalForm = document.querySelector(".form-user");
const editModalForm = document.querySelector("#myEditModal .form-user ");
let id = "";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((user) => {
      renderUsers(user);
    });
  });

const tableUsers = document.querySelector("#table-user");
const renderUsers = (user) => {
  const output = `
    <tr data-id ='${user.id}'>
                <td>${user.name}</td>
                
                <td><a class=" btn-edit btn btn-primary btn-sm">Edit</a> |
                    <a class="btn-del btn btn-danger btn-sm">Del</a>
                </td>
            </tr>
    `;
  tableUsers.insertAdjacentHTML("beforeend", output);
  // delete
  const btndel = document.querySelector(`[data-id = '${user.id}'] .btn-del`);
  btndel.addEventListener("click", (e) => {
    fetch(`${url}/${user.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });
  //edit
  const btnEdit = document.querySelector(`[data-id = '${user.id}'] .btn-edit`);
  btnEdit.addEventListener("click", (e) => {
    e.preventDefault();
    id = user.id;
    $("#myEditModal").modal("show");
    editModalForm.name.value = user.name;
  });
};

addModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: addModalForm.name.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderUsers(dataArr);
      
    });
  addModalForm.name.value = "";
  location.reload();
});

editModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: editModalForm.name.value,
    }),
  })
    .then((res) => res.json())
    .then(() => location.reload());
  editModalForm.name.value = "";
});

const url = "http://localhost:3000/users";
const addModalForm = document.querySelector(".form-user");
const editModalForm = document.querySelector(" #myEditModal .form-user");

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
    <tr data-id = '${user.id}'>
    <td>${user.fullname}</td>
    <td>${user.phone}</td>
    <td>${user.email}</td>
    <td>${user.age}</td>
    <td> <span>${user.gender}</span> </td>
    <td><a class="btn-edit btn btn-primary btn-sm">Edit</a> |
        <a class="btn-del btn btn-danger btn-sm">Del</a>
    </td>
</tr>
    `;
  tableUsers.insertAdjacentHTML("beforeend", output);
  const btndel = document.querySelector(`[data-id = '${user.id}'] .btn-del`);
  btndel.addEventListener("click", (e) => {
    fetch(`${url}/${user.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });
};
addModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: addModalForm.fullname.value,
      phone: addModalForm.phone.value,
      email: addModalForm.email.value,
      age: addModalForm.age.value,
      gender: addModalForm.gender.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderUsers(dataArr);
    });
});

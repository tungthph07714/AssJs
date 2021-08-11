const url = "http://localhost:3000/orders";
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
                <td>${user.id}</td>
                <td>${user.productId}</td>
                <td>${user.quantity}</td>
                <td>${user.dateOrder}</td>
                <td>${user.phone}</td>
                <td>${user.address}</td>
                <td>
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
};

const url = "http://localhost:3000/product";
const urlCate = "http://localhost:3000/categories";
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

fetch(urlCate)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((cate) => {
      renderCate(cate);
      renderCate1(cate);
    });
  });

const selectCate = document.querySelector("#cate");
const renderCate1 = (cate) => {
  const select = `
    <option >${cate.name}</option>
    `;
  selectCate.insertAdjacentHTML("beforeend", select);
};

const editSelect = document.querySelector("#myEditModal #cate");
const renderCate = (cate) => {
  const select1 = `
    <option>${cate.name}</option>
    `;
  editSelect.insertAdjacentHTML("beforeend", select1);
};

const tableUsers = document.querySelector("#table-user");
const renderUsers = (user) => {
  const output = `
    <tr data-id ='${user.id}'>
                <td>${user.productName}</td>
                <td>${user.productDesc}</td>
                <td>${user.price}</td>
                <td>
                <img src="${user.image}" alt="">
                </td>
                <td>${user.cateId} </td>
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
    editModalForm.productName.value = user.productName;
    editModalForm.productDesc.value = user.productDesc;
    editModalForm.price.value = user.price;
    editModalForm.image.value = user.image;
    editModalForm.cateId.value = user.cateId;
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
      productName: addModalForm.productName.value,
      productDesc: addModalForm.productDesc.value,
      price: addModalForm.price.value,
      image: addModalForm.image.value,
      cateId: addModalForm.cateId.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderUsers(dataArr);
    });
  addModalForm.productName.value = "";
  addModalForm.productDesc.value = "";
  addModalForm.price.value = "";
  addModalForm.image.value = "";
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
      productName: editModalForm.productName.value,
      productDesc: editModalForm.productDesc.value,
      price: editModalForm.price.value,
      image: editModalForm.image.value,
      cateId: editModalForm.cateId.value,
    }),
  })
    .then((res) => res.json())
    .then(() => location.reload());
  editModalForm.productName.value = "";
  editModalForm.productDesc.value = "";
  editModalForm.price.value = "";
  editModalForm.image.value = "";
});

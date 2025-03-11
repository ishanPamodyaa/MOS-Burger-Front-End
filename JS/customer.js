import {
  fetchCustomers,
  addCustomer,
  removeCustomer,
} from "./customerMange.js";

// let currentNumber = 20;
// let isOpenCustomerAddForm = false;
let customerList = fetchCustomers();
//id increment

// function idFormating() {
//   console.log("func atule", currentNumber);

//   const idField = document.getElementById("customerID");
//   const formatNumber = String(currentNumber).padStart(4, 0);
//   idField.value = `C${formatNumber}`;
// }
// document.getElementById("addCustomerBtn").addEventListener("click", () => {
//   if (!isOpenCustomerAddForm) {
//     currentNumber++;
//     idFormating();
//     isOpenCustomerAddForm = true;
//     console.log("func atule add", currentNumber);
//   }
// });

// document.getElementById("canselBtn").addEventListener("click", () => {
//   if (isOpenCustomerAddForm) {
//     currentNumber--;
//     idFormating();
//     isOpenCustomerAddForm = false;
//     console.log("func atule cansel", currentNumber);
//   }
// });

// document.getElementById("publishBtn").addEventListener("click", () => {
//   if (isOpenCustomerAddForm) {
//     isOpenCustomerAddForm = false;
//     console.log("func atule publish", currentNumber);
//   }
// });

const gender = document.getElementById("Gender");
gender.addEventListener("change", () => {
  const genderOption = gender.options[gender.selectedIndex].text;
  console.log(genderOption);

  const imagePreview = document.getElementById("imagePreview");
  if (genderOption === "Male") {
    imagePreview.src = "../image/cutomer icon/men.png";
    imagePreview.style.display = "block";
  } else if (genderOption === "Female") {
    imagePreview.src = "../image/cutomer icon/women.png";
    imagePreview.style.display = "block";
  }
});

console.log(" customerList", customerList);

window.onload = function () {
  displayCustomerList();
  console.log("window ekata awa");
};

function displayCustomerList() {
  const dynamicCustomerTile = document.getElementById("CustomerTile");
  dynamicCustomerTile.innerHTML = "";

  // if (!selectedCatogary) return;

  customerList.forEach((customer, index) => {
    const CustomerTile = document.createElement("div");
    CustomerTile.classList.add(
      "col",
      "col-sm",
      "col-md-4",
      "col-lg-3",
      "col-xl-2",
      "mt-3",
      "custom-card-col"
    );
    CustomerTile.innerHTML = `

            <div class="card card-custom"  >
                    <div class="imgDiv">
                        <img src="${customer.img}" class="card-img-top"
                            alt="${customer.fName}" cap">
                    </div>
                    <div class="card-body cardBody">
                        <div class="nameDiv">
                            <p class="productName">${customer.fName} ${customer.lName}</p>
                        </div>
                        <div class="primaryContactDiv" >
                            <h6 class="price text-center fw-bold ">${customer.primaryContact}</h6>
                        </div>
                        <div class="cityDiv" >
                            <h6 class="price text-center fw-bold ">${customer.city}</h6>
                        </div>

                        <div class="d-flex justify-content-sm-between flex-row ">
                            
   
                                <i class="fa fa-pencil-square-o fa-2x icon" data-index="${index}" data-action="edit" aria-hidden="true"></i>
                                <i class="fa fa-trash-o fa-2x icon" data-index="${index}" data-action="delete" aria-hidden="true"></i>
                               
                        </div>

                        </div>
                    </div>
                </div>
    `;

    dynamicCustomerTile.appendChild(CustomerTile);
  });

  document.querySelectorAll(".icon").forEach((icon) => {
    icon.addEventListener("click", (evt) => {
      const action = evt.target.dataset.action;
      const index = evt.target.dataset.index;

      if (action == "edit") {
        editCustomer(index);
      } else if (action == "delete") {
        removeCustomer(index);
        displayCustomerList();
      }
    });
  });
}

document
  .getElementById("addCustomerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addNewCustomer();
  });

function editCustomer(index) {
  const customerToEdit = customerList[index];
  if (!customerToEdit) {
    console.error("Invalid Customer index:", index);
    return;
  }
  // Populate form fields with the selected product's data
  console.log(
    "customer to edit  : ",
    customerToEdit.customerID,
    customerToEdit.customerNIC,
    customerToEdit.fName,
    customerToEdit.lName,
    customerToEdit.email,
    customerToEdit.primaryContact,
    customerToEdit.secondaryContact,
    customerToEdit.address,
    customerToEdit.city,
    customerToEdit.joinDate,
    customerToEdit.gender
  );

  document.getElementById("customerID").value = customerToEdit.customerID;
  document.getElementById("customerNIC").value = customerToEdit.customerNIC;
  document.getElementById("fName").value = customerToEdit.fName;
  document.getElementById("lName").value = customerToEdit.lName;
  document.getElementById("email").value = customerToEdit.email;
  document.getElementById("primaryContact").value =
    customerToEdit.primaryContact;
  document.getElementById("secondaryContact").value =
    customerToEdit.secondaryContact;
  document.getElementById("customerAddress").value = customerToEdit.address;
  document.getElementById("customerCity").value = customerToEdit.city;
  document.getElementById("joinDate").value = customerToEdit.joinDate;
  document.getElementById("Gender").value = customerToEdit.gender;

  if (customerToEdit.gender == "Male") {
    document.getElementById("imagePreview").src =
      "../image/cutomer icon/men.png";
    document.getElementById("imagePreview").style.display = "block";
  } else if (customerToEdit.gender == "Female") {
    document.getElementById("imagePreview").src =
      "../image/cutomer icon/women.png";
    document.getElementById("imagePreview").style.display = "block";
  }

  const myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
  myModal.show();
}

function addNewCustomer() {
  console.log("add new ekata awa");

  const customerID = document.getElementById("customerID").value;
  const customerNIC = document.getElementById("customerNIC").value;
  const genderElement = document.getElementById("Gender");
  const gender = genderElement.options[genderElement.selectedIndex].text;
  const fName = document.getElementById("fName").value;
  const lName = document.getElementById("lName").value;
  const email = document.getElementById("email").value;
  const primaryContact = document.getElementById("primaryContact").value;
  const secondaryContact = document.getElementById("secondaryContact").value;
  const address = document.getElementById("customerAddress").value;
  const city = document.getElementById("customerCity").value;
  const joinDate = document.getElementById("joinDate").value;
  let imgSrc = document.getElementById("imagePreview").src;
  console.log("add new ekata awa 2");
  if (gender == "Male") {
    imgSrc = "../image/cutomer icon/men.png";
  } else if (gender == "Female") {
    imgSrc = "../image/cutomer icon/women.png";
  }
  console.log("add new ekata awa 3");

  
  for(let i = 0; i < customerList.length-1; i++){
      
    if(customerID == customerList[i].customerID){
        removeCustomer(i);
        displayCustomerList();
    }
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "customerId": "C005",
    "nic": "956789123V",
    "fstName": "Samantha",
    "lstName": "Wijesinghe",
    "email": "samantha.w@gmail.com",
    "contactNumber": "0703344556",
    "address": "78, New Town",
    "city": "Matara",
    "gender": "Female",
    "dateOfJoined": "2024-01-10",
    "profilePic": null,
    "orderIds": []
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8080/customer/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

  const newCustomer = {
    customerID: customerID,
    customerNIC: customerNIC,
    fName: fName,
    lName: lName,
    email: email,
    primaryContact: primaryContact,
    secondaryContact: secondaryContact,
    address: address,
    city: city,
    joinDate: joinDate,
    img: imgSrc,
    gender: gender,
  };
  console.log("add new ekata awa 4");

  addCustomer(newCustomer);
  console.log("add new ekata awa 5");

  updateCustomer(newCustomer, customerList.length - 1);
  console.log("add new ekata awa 6");

  console.log("update eken eliye");

  console.log("add new ekata awa 7");

  displayCustomerList();
}

function updateCustomer(newCustomer, index) {
  const dynamicCustomerTile = document.getElementById("CustomerTile");

  const CustomerTile = document.createElement("div");

  CustomerTile.classList.add(
    "col",
    "col-sm",
    "col-md-4",
    "col-lg-3",
    "col-xl-2",
    "mt-3",
    "custom-card-col"
  );

  CustomerTile.innerHTML = `

            <div class="card card-custom"  >
                    <div class="imgDiv">
                        <img src="${newCustomer.img}" class="card-img-top"
                            alt="${newCustomer.fName}" cap">
                    </div>
                    <div class="card-body cardBody">
                        <div class="nameDiv">
                            <p class="productName">${newCustomer.fName} ${newCustomer.lName}</p>
                        </div>
                        <div class="primaryContactDiv" >
                            <h6 class="price text-center fw-bold ">${newCustomer.primaryContact}</h6>
                        </div>
                        <div class="cityDiv" >
                            <h6 class="price text-center fw-bold ">${newCustomer.city}</h6>
                        </div>

                        <div class="d-flex justify-content-sm-between flex-row ">
                            
   
                                <i class="fa fa-pencil-square-o fa-2x icon" data-index="${index}" data-action="edit" aria-hidden="true"></i>
                                <i class="fa fa-trash-o fa-2x icon" data-index="${index}" data-action="delete" aria-hidden="true"></i>
                               
                        </div>

                        </div>
                    </div>
                </div>
    `;


  console.log("methana p1");

  const editIcon = CustomerTile.querySelector(".fa-pencil-square-o");
  const deleteIcon = CustomerTile.querySelector(".fa-trash-o");
  const shopIcon = CustomerTile.querySelector(".fa-shopping-cart");

  console.log("methana p2");

  editIcon.addEventListener("click", (evt) => {
    editCustomer(index);
    console.log("Edit eken passe");
  });

  deleteIcon.addEventListener("click", (evt) => {
    removeCustomer(index);
    displayCustomerList();
  });

  console.log("methana p3");

  // Append the product tile to the DOM
  dynamicCustomerTile.appendChild(CustomerTile);
  console.log("methana p4");
}

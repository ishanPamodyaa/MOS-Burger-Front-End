import {
  fetchCustomers,
  addCustomer,
  removeCustomer,
} from "./customerMange.js";

import {
  fetchProducts,
  addProduct,
  removeProduct,
} from "./productDataManage.js";

import { fetchOrders, addOrder, removeOrder } from "./orderDataManage.js";
import { addnewOrdersToList } from "./orders.js";
let uploadedImage = "";
const product = fetchProducts();
console.log("Product data:", product);
let isExpired = false;
let productEnabled = false;
let selectedCatogary = "Burgers";
let cartData = [];
let orderArray = [];
let discount = 0;
let amount = 0;
// let currentOrderID = 7;
let lastOrderId = fetchOrders().length

window.onload = function () {
  console.log("last OID",lastOrderId);
  updateOrderID();
  displayProductList(selectedCatogary);
};

function getNextID() {
  return "O#" + lastOrderId.toString().padStart(3, "0");
}

function updateOrderID() {
  const orderIDElement = document.getElementById("orderId");
  lastOrderId++;

  orderIDElement.textContent = getNextID();
  console.log("Order ID updated:", orderIDElement.textContent);
}

let now = new Date();
let currentDate = now.toUTCString().slice(5, 16);
document.getElementById("currentDate").innerHTML = currentDate;

//when select product catogery default catogery is Burger
document
  .getElementById("burgers")
  .addEventListener("click", displayProductList.bind(null, "Burgers"));

document
  .getElementById("submarines")
  .addEventListener("click", displayProductList.bind(null, "Submarines"));

document
  .getElementById("fries")
  .addEventListener("click", displayProductList.bind(null, "Fries"));

document
  .getElementById("pasta")
  .addEventListener("click", displayProductList.bind(null, "Pasta"));

document
  .getElementById("chicken")
  .addEventListener("click", displayProductList.bind(null, "Chicken"));

document
  .getElementById("beverages")
  .addEventListener("click", displayProductList.bind(null, "Beverages"));

function displayProductList(catogary) {
  selectedCatogary = catogary;

  console.log("Selected catogary:", selectedCatogary, catogary);

  const dynamicProductTile = document.getElementById("productTile");
  dynamicProductTile.innerHTML = "";

  if (!selectedCatogary) return;

  product[catogary].forEach((item, index) => {
    const productTile = document.createElement("div");
    productTile.classList.add(
      "col",
      "col-sm",
      "col-md-4",
      "col-lg-3",
      "col-xl-",
      "mt-3",
      "custom-card-col"
    );

    productTile.innerHTML = `
  
              <div class="card card-custom " data-index="${index}" id="clickableCard"  >
                      <div class="imgDiv">
                          <img src="${item.img}" class="card-img-top"
                              alt="${item.name}" cap">
                      </div>
                      <div class="card-body cardBody">
                          <div class="nameDiv">
                              <p class="productName">${item.name}</p>
                          </div>
                          <div class="priceDiv" >
                              <h5 class="price text-center fw-bold ">LKR ${item.price}</h5>
                          </div>
                    
                          <div class="dateDiv pt-2" data-index="${index}">
                                  <p class="text-center fw-bold mb-0">${item.expiryDate}</p>
                              </div>
                          </div>
                      </div>
                  </div>
      `;

    dynamicProductTile.appendChild(productTile);
  });

  const dataDives = document.querySelectorAll(".dateDiv");
  const currentDate = new Date();
  dataDives.forEach((div) => {
    const pElement = div.querySelector("p");
    const expDate = new Date(pElement.textContent.trim());

    if (expDate < currentDate) {
      pElement.classList.add("expired");
      isExpired = true;
    } else {
      pElement.classList.add("not-expired");
      isExpired = false;
    }
  });
}

function checkProductEnabled(index) {
  const currentDate = new Date();
  const expDate = new Date(product[selectedCatogary][index].expiryDate);

  // console.log(expDate, currentDate);
  let productEnabled;
  if (expDate > currentDate && customerObj) {
    productEnabled = true;
    // console.log("productEnabled", productEnabled);
  } else {
    productEnabled = false;
    // console.log("productEnabled", productEnabled);
  }
  return productEnabled;
}

document
  .getElementById("productTile")
  .addEventListener("click", function (event) {
    const clickedCard = event.target.closest("#clickableCard");
    const index = clickedCard.getAttribute("data-index");

    let productEnabled = checkProductEnabled(index);

    if (productEnabled) {
      if (clickedCard) {
        addToCart(selectedCatogary, index);
      }
    } else {
      window.alert("Product is expired or customer is not selected");
    }
  });

function addToCart(catogary, index) {
  let productPotitionInCart = cartData.findIndex(
    (cartItem) =>
      cartItem.item.itemCode === product[selectedCatogary][index].itemCode
  );

  if (cartData.length <= 0) {
    cartData = [
      {
        item: product[catogary][index],
        index: index,
        quantity: 1,
      },
    ];
  } else if (productPotitionInCart < 0) {
    cartData.push({
      item: product[catogary][index],
      index: index,
      quantity: 1,
    });
  } else {
    cartData[productPotitionInCart].quantity++;
  }
  addCartToHtml(catogary, index);
}

function addCartToHtml(catogary, index) {
  const dynamicCartItem = document.getElementById("cartTable");
  const totalCount = document.getElementById("totalCount");

  dynamicCartItem.innerHTML = "";

  let priceItems = 0;
  let discountItems = 0;
  let subTotal = priceItems - discountItems;
  let totalItemCount = cartData.length;

  totalCount.innerHTML = "Total Items : " + totalItemCount;
  if (cartData.length > 0) {
    cartData.forEach((item, index) => {
      let produuctItem = cartData[index].item;

      const cartItem = document.createElement("div");
      cartItem.classList.add(
        "d-flex",
        "flex-row",
        "justify-content-between",
        "p-1",
        "align-items-center",
        "row",
        "row-cols-6",
        "g-0",
        "custom-boarder"
      );
      cartItem.innerHTML = `
          <div class="" style="width: 5%;">
            <p class="mb-0 text-light">${index + 1}</p>
          </div>
          <div class="" style="width: 10%;">
            <img src="${
              produuctItem.img
            }" class="img-fluid" width="45" alt="product">
          </div>
          <div class="" style="width: 25%;">
            <p class="mb-0 text-light">${produuctItem.name}</p>
          </div>
          <div class="" style="width: 20%;">
            <div class="d-block text-light">
              <div class="w-100">
                <p class="mb-0">LKR ${
                  (produuctItem.price -
                    (produuctItem.price * produuctItem.discount) / 100) *
                  item.quantity
                }</p>
              </div>
            </div>
          </div>
          <div class="col-lg-1" style="width: 20%;">
            <div class="quntityChanger">
         
                <div class="">
                  <button class="btn btn-sm btn-outline-warning" id="minus-${index}">-</button>
                  <span class="text-light">${item.quantity}</span>
                  <button class="btn btn-sm btn-outline-warning" id="plus-${index}">+</button>
              </div>

            </div>
          </div>
          <div class="col-lg-1" style="width: 8%;">
            <i class="ri-delete-bin-2-line text-danger fa-2x" id="delete-${index}"></i>     
          </div>
        `;
      dynamicCartItem.appendChild(cartItem);

      priceItems = priceItems + produuctItem.price * item.quantity;
      discountItems =
        discountItems +
        (produuctItem.price * produuctItem.discount * item.quantity) / 100;

      const subTotal = priceItems - discountItems;

      const totaTable = document.getElementById("totalTable");
      totaTable.innerHTML = `
        <tr>
            <td class="leftCol">Sub Total :</td>
            <td id="subTotal">LKR ${priceItems}</td>
        </tr>
            <tr>
        <td class="leftCol">Discount :</td>
        <td id="discount">LKR ${discountItems}</td>
            </tr>
            <tr>
        <td class="f-w-7 leftCol font-18 text-success">
                <h4>Amount :</h4>
        </td>
            <td class="f-w-7 font-18 text-success ">
                <h4 id="amount">LKR ${subTotal}</h4>
            </td>
        </tr>
    `;

      document
        .getElementById(`minus-${index}`)
        .addEventListener("click", () => changeQuantity(index, -1));

      document
        .getElementById(`plus-${index}`)
        .addEventListener("click", () => changeQuantity(index, 1));
      document
        .getElementById(`delete-${index}`)
        .addEventListener("click", () => removeItem(index));
    });

    priceItems, discountItems, subTotal;
  }
}

function changeQuantity(index, change) {
  cartData[index].quantity += change;
  if (cartData[index].quantity <= 0) {
    removeItem(index);
  }
  addCartToHtml();
}

function removeItem(index) {
  //   cartData[index].quantity = 0;
  if (index == 0) {
    let fEle = cartData.shift();
  } else if (index > 0 && index < cartData.length - 1) {
    let pop = cartData.splice(index, 1);
  } else if (index == cartData.length - 1) {
    let pop = cartData.pop();
  }
  addCartToHtml();
}

let customerObj = {};
const searchField = document.getElementById("searchField");

searchField.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    e.preventDefault();

    customerObj = searchCustomer();
  }
});
function searchCustomer() {
  const searchValue = searchField.value.trim();
  let customerData = fetchCustomers();
  const customer = customerData.find(
    (customer) =>
      customer.customerNIC == searchValue ||
      customer.primaryContact == searchValue ||
      customer.secondaryContact == searchValue
  );

  if (customer) {
    document.getElementById("fullName").value =
      customer.fName + " " + customer.lName;
    document.getElementById("location").value = customer.city;
  }

  // orderArray.push({ customer: customer });

  return customer;
}

document.getElementById("placeOrderBtn").addEventListener("click", () => {
  placeOrder();
  console.log("btn clicked");
});

function placeOrder() {
  const totalItems = cartData.length;
  const subTotalElement = document.querySelector(
    "#totalTable tr:nth-child(1) td:nth-child(2)"
  );
  const discountElement = document.querySelector(
    "#totalTable tr:nth-child(2) td:nth-child(2)"
  );
  const amountElement = document.querySelector(
    "#totalTable tr:nth-child(3) td:nth-child(2)"
  );

  const subTotal = subTotalElement
    ? parseFloat(subTotalElement.textContent.replace("LKR", "").trim())
    : 0;
  const discount = discountElement
    ? parseFloat(discountElement.textContent.replace("LKR", "").trim())
    : 0;
  const amount = amountElement
    ? parseFloat(amountElement.textContent.replace("LKR", "").trim())
    : 0;

  const orderDate = currentDate;
  const orderId = getNextID();

  const newOrder = {
    customer: customerObj,
    orderId: orderId,
    orderDate: orderDate,
    totalItems: totalItems,
    items: cartData,
    subTotal: subTotal,
    discount: discount,
    total: amount,
  };

  addOrder(newOrder);
  const orders = fetchOrders();

  console.log("newOrder", newOrder);
  console.log("Order", orders);

  addCartToHtml();
  updateOrderID();

  var docDefinition = {
    content: [
      // Title and Order Info
      { text: "MOS Burgers", style: "header" },
      { text: "123, Galle Road, Colombo 03, Sri Lanka", style: "subHeader" },
      { text: "(+94) 077 123 4567", style: "subHeader" },
      { text: "contact@mosburgers.lk", style: "subHeader" },
      { text: "www.mosburgers.lk", style: "subHeader" },

      {
        text: `Order ID: ${newOrder.orderId}`,
        margin: [0, 10, 0, 5],
        style: "orderInfo",
      },
      {
        text: `Customer Name: ${
          newOrder.customer.fName + " " + newOrder.customer.lName
        }`,
        margin: [0, 0, 0, 5],
        style: "orderInfo",
      },
      {
        text: `Phone Number: ${newOrder.customer.primaryContact}`,
        margin: [0, 0, 0, 5],
        style: "orderInfo",
      },
      {
        text: `Address: ${newOrder.customer.address}`,
        margin: [0, 0, 0, 15],
        style: "orderInfo",
      },

      // Table of Items
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto"],
          body: [
            [
              { text: "Item", style: "tableHeader" },
              { text: "Quantity", style: "tableHeader" },
              { text: "Price", style: "tableHeader" },
              { text: "Total", style: "tableHeader" },
            ],
          ],
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? "#ee9f54" : null),
        },
      },

      // Summary section
      {
        text: `Total Items: ${newOrder.totalItems}`,
        margin: [0, 10, 0, 5],
        style: "summaryText",
      },
      {
        text: `Subtotal: LKR ${newOrder.subTotal}`,
        margin: [0, 0, 0, 5],
        style: "summaryText",
      },
      {
        text: `Discount: LKR ${newOrder.discount}`,
        margin: [0, 0, 0, 5],
        style: "summaryText",
      },
      {
        text: `Total: LKR ${newOrder.total}`,
        style: "total",
        margin: [0, 10, 0, 0],
      },
    ],

    // Styles
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 20],
        color: "#dc6b19",
      },
      subHeader: {
        fontSize: 12,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 3],
        color: "#424242",
      },
      orderInfo: {
        fontSize: 12,
        margin: [0, 5, 0, 5],
        color: "#424242",
      },
      tableHeader: {
        bold: true,
        fontSize: 14,
        color: "white",
        alignment: "center",
      },
      tableContent: {
        fontSize: 12,
        color: "#424242",
        alignment: "center",
      },
      summaryText: {
        fontSize: 12,
        bold: true,
        color: "#424242",
      },
      total: {
        fontSize: 16,
        bold: true,
        alignment: "right",
        color: "#dc6b19",
      },
    },
  };

  // Add order items to the table
  newOrder.items.forEach((item) => {
    if (item.quantity > 0) {
      const itemPrice = Number(item.item.price) || 0;

      const itemQuantity = Number(item.quantity) || 0;

      docDefinition.content[9].table.body.push([
        { text: item.item.name, style: "tableContent" },
        { text: itemQuantity, style: "tableContent" },
        { text: `LKR ${itemPrice}`, style: "tableContent" },
        { text: `LKR ${itemPrice * itemQuantity}`, style: "tableContent" },
      ]);
    }
  });

  // Check if the table has items
  if (docDefinition.content[9].table.body.length <= 1) {
    console.error("No items to display in the table.");
    return;
  }

  // Generate the PDF
  const pdfName = orderId + ".pdf";
  pdfMake.createPdf(docDefinition).download(pdfName);

  addnewOrdersToList(newOrder);
}
//  function addnewOrdersToList(newOrder) {
//   const order = newOrder;

//   const dyanamicOrderTile = document.getElementById("orderTile");

//   dyanamicOrderTile.innerHTML = "";

 
//     const orderTile = document.createElement("div");
//     orderTile.classList.add("row");
//     orderTile.innerHTML = `
//                     <div class="text-center">
//                         <div class="col-lg-12 col-md-12 col-sm-12 b-example-divider "></div>
//                     </div>
//                     <div class="col-lg-2 col-md-2 col-sm-2 text-center text-warning">
//                         <p>${order.orderId}</p>
//                     </div>
//                     <div class="col-lg-2 col-md-2 col-sm-2 text-center text-warning">
//                         <p>${order.orderDate}</p>
//                     </div>
//                     <div class="col-lg-2 col-md-2 col-sm-2 text-center text-warning">
//                         <p>${
//                           order.customer[0].fName +
//                           " " +
//                           order.customer[0].lName
//                         }</p>
//                     </div>
//                     <div class="col-lg-2 col-md-2 col-sm-2 text-center text-warning">
//                         <p>${order.customer[0].primaryContact}</p>
//                     </div>
//                     <div class="col-lg-2 col-md-2 col-sm-2 text-center text-warning">
//                         <p>LKR  ${order.total}</p>
//                     </div>
//                     <div
//                         class="d-flex flex-row justify-content-center align-items-center col-lg-2 col-md-2 col-sm-2 text-warning gap-2">
//                         <a href="">
//                             <p class="">View</p>
//                         </a>
//                         <!-- <img src="../image/icon/doc.png" class="align-items-lg-center" width="30px"> -->
//                     </div>

//     `;

//     dyanamicOrderTile.appendChild(orderTile);
  
// }


document.getElementById("canselBtn").addEventListener("click", () => {
  clearOrder();
});

function clearOrder() {
  cartData.length = 0;
  resetTotals();
  resetCustomerData();
  addCartToHtml();
}

function resetCustomerData() {
  searchField.value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("location").value = "";
}

function resetTotals() {
  const subTotalElement = document.querySelector(
    "#totalTable tr:nth-child(1) td:nth-child(2)"
  );
  const discountElement = document.querySelector(
    "#totalTable tr:nth-child(2) td:nth-child(2)"
  );
  const amountElement = document.querySelector(
    "#totalTable tr:nth-child(3) td:nth-child(2)"
  );

  if (subTotalElement) subTotalElement.innerHTML = "LKR 0.00";
  if (discountElement) discountElement.innerHTML = "LKR 0.00";
  if (amountElement) amountElement.innerHTML = "<h4>LKR 0.00</h4>";
}

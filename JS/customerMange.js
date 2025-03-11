let customerData = [
  {
    customerID: "C001",
    customerNIC: "933394050V",
    fName: "Roshani",
    lName: "Fernando",
    email: "roshani.fernando@gmail.com",
    primaryContact: "0773456789",
    secondaryContact: "0713456789",
    address: "No. 23, Coastal Road, Galle",
    city: "Galle",
    joinDate: "2023-03-14",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C002",
    customerNIC: "931234567V",
    fName: "Sanjaya",
    lName: "Abeywickrama",
    email: "sanjaya.abeywickrama@gmail.com",
    primaryContact: "0716789012",
    secondaryContact: "0766789012",
    address: "No. 23, Railway Avenue, Matara",
    city: "Matara",
    joinDate: "2023-06-18",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
  {
    customerID: "C003",
    customerNIC: "921234567V",
    fName: "Kavindi",
    lName: "Rajapaksha",
    email: "kavindi.rajapaksha@gmail.com",
    primaryContact: "0774567890",
    secondaryContact: "0714567890",
    address: "No. 67, Lake View, Nuwara Eliya",
    city: "Nuwara Eliya",
    joinDate: "2023-04-25",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C004",
    customerNIC: "951234567V",
    fName: "Tharindu",
    lName: "Kumara",
    email: "tharindu.kumara@gmail.com",
    primaryContact: "0707890123",
    secondaryContact: "0767890123",
    address: "No. 88, Temple Lane, Kurunegala",
    city: "Kurunegala",
    joinDate: "2023-07-20",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
  {
    customerID: "C005",
    customerNIC: "941234567V",
    fName: "Shanika",
    lName: "Perera",
    email: "shanika.perera@gmail.com",
    primaryContact: "0772345678",
    secondaryContact: "0712345678",
    address: "No. 78, Hill Side, Kandy",
    city: "Kandy",
    joinDate: "2023-02-18",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C006",
    customerNIC: "951234567V",
    fName: "Kasun",
    lName: "Dissanayake",
    email: "kasun.dissanayake@gmail.com",
    primaryContact: "0718901234",
    secondaryContact: "0768901234",
    address: "No. 14, Seaside Road, Negombo",
    city: "Negombo",
    joinDate: "2023-08-05",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
  {
    customerID: "C007",
    customerNIC: "961234567V",
    fName: "Dilini",
    lName: "Karunaratne",
    email: "dilini.karunaratne@gmail.com",
    primaryContact: "0779012345",
    secondaryContact: "0719012345",
    address: "No. 40, Palm Road, Trincomalee",
    city: "Trincomalee",
    joinDate: "2023-09-10",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C008",
    customerNIC: "981234567V",
    fName: "Ruwan",
    lName: "Karunaratne",
    email: "ruwan.karunaratne@gmail.com",
    primaryContact: "0709012345",
    secondaryContact: "0769012345",
    address: "No. 10, Lake Road, Trincomalee",
    city: "Trincomalee",
    joinDate: "2023-09-12",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
  {
    customerID: "C009",
    customerNIC: "982345678V",
    fName: "Iresha",
    lName: "Ekanayake",
    email: "iresha.ekanayake@gmail.com",
    primaryContact: "0770123456",
    secondaryContact: "0710123456",
    address: "No. 31, Park Lane, Jaffna",
    city: "Jaffna",
    joinDate: "2023-10-20",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C010",
    customerNIC: "991234567V",
    fName: "Chathura",
    lName: "Wijesinghe",
    email: "chathura.wijesinghe@gmail.com",
    primaryContact: "0714567890",
    secondaryContact: "0754567890",
    address: "No. 67, Lake View, Nuwara Eliya",
    city: "Nuwara Eliya",
    joinDate: "2023-04-25",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
  {
    customerID: "C011",
    customerNIC: "902345678V",
    fName: "Kamal",
    lName: "Perera",
    email: "kamal.perera@gmail.com",
    primaryContact: "0711234567",
    secondaryContact: "0771234567",
    address: "No. 12, Temple Road, Colombo 7",
    city: "Colombo",
    joinDate: "2023-01-15",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
  {
    customerID: "C012",
    customerNIC: "912345678V",
    fName: "Nimal",
    lName: "Silva",
    email: "nimal.silva@gmail.com",
    primaryContact: "0712345678",
    secondaryContact: "0772345678",
    address: "No. 45, Main Street, Kandy",
    city: "Kandy",
    joinDate: "2023-02-12",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
  {
    customerID: "C013",
    customerNIC: "922345678V",
    fName: "Nadeeka",
    lName: "Wijeratne",
    email: "nadeeka.wijeratne@gmail.com",
    primaryContact: "0771234567",
    secondaryContact: "0711234567",
    address: "No. 55, Lotus Street, Colombo 3",
    city: "Colombo",
    joinDate: "2023-01-10",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C014",
    customerNIC: "932345678V",
    fName: "Gayathri",
    lName: "Abeysinghe",
    email: "gayathri.abeysinghe@gmail.com",
    primaryContact: "0776789012",
    secondaryContact: "0716789012",
    address: "No. 45, Circular Road, Matara",
    city: "Matara",
    joinDate: "2023-06-10",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C015",
    customerNIC: "942345678V",
    fName: "Sanduni",
    lName: "Dissanayake",
    email: "sanduni.dissanayake@gmail.com",
    primaryContact: "0778901234",
    secondaryContact: "0718901234",
    address: "No. 21, Rose Avenue, Negombo",
    city: "Negombo",
    joinDate: "2023-08-01",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C016",
    customerNIC: "952345678V",
    fName: "Anoma",
    lName: "Kumari",
    email: "anoma.kumari@gmail.com",
    primaryContact: "0777890123",
    secondaryContact: "0717890123",
    address: "No. 90, Station Road, Kurunegala",
    city: "Kurunegala",
    joinDate: "2023-07-15",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C017",
    customerNIC: "962345678V",
    fName: "Pradeep",
    lName: "Ekanayake",
    email: "pradeep.ekanayake@gmail.com",
    primaryContact: "0710123456",
    secondaryContact: "0760123456",
    address: "No. 11, High Street, Jaffna",
    city: "Jaffna",
    joinDate: "2023-10-22",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
  {
    customerID: "C018",
    customerNIC: "972345678V",
    fName: "Ruwandi",
    lName: "Gunasekara",
    email: "ruwandi.gunasekara@gmail.com",
    primaryContact: "0775678901",
    secondaryContact: "0715678901",
    address: "No. 10, Main Road, Trincomalee",
    city: "Trincomalee",
    joinDate: "2023-11-10",
    img: "../image/cutomer icon/women.png",
    gender: "Female",
  },
  {
    customerID: "C019",
    customerNIC: "982345678V",
    fName: "Ranjith",
    lName: "Wijesinghe",
    email: "ranjith.wijesinghe@gmail.com",
    primaryContact: "0712345678",
    secondaryContact: "0752345678",
    address: "No. 18, Market Street, Colombo",
    city: "Colombo",
    joinDate: "2023-03-02",
    img: "../image/cutomer icon/men.png" ,
    gender: "Male",
  },
  {
    customerID: "C020",
    customerNIC: "992345678V",
    fName: "Samantha",
    lName: "De Silva",
    email: "samantha.desilva@gmail.com",
    primaryContact: "0701234567",
    secondaryContact: "0761234567",
    address: "No. 25, Flower Road, Kandy",
    city: "Kandy",
    joinDate: "2023-04-10",
    img: "../image/cutomer icon/men.png",
    gender: "Male",
  },
];

// export function fetchCustomers() {
//   readCustomersFromStorage();
//   return customerData;
// }

// function readCustomersFromStorage() {
//   const customerJSON = localStorage.getItem("customerData");
//   if (customerJSON) {
//     return JSON.parse(customerJSON);
//   }
//   return customerData;
// }

// export function addCustomer(customerObj) {
//   customerData.push(customerObj);
//   saveCustomersToStorage();
//   console.log(customerData);
// }

// export function removeCustomer(index) {
// //   console.log("remove ekata awa", index, gender);
//   customerData.splice(index, 1);
//   saveCustomersToStorage();
//   console.log("remove", customerData);
// }

// function saveCustomersToStorage() {
//   localStorage.setItem("customerData", JSON.stringify(customerData));
// }


// let customerData = []; // Initialize customerData as an empty array

export function fetchCustomers() {
  return readCustomersFromStorage(); // Always return the latest data
}

function readCustomersFromStorage() {
  const customerJSON = localStorage.getItem("customerData");
  if (customerJSON) {
    customerData = JSON.parse(customerJSON); // Update the in-memory array
    return customerData;
  }
  return customerData || []; // Default to an empty array if no data exists
}

export function addCustomer(customerObj) {
  customerData.push(customerObj); // Add the new customer to the in-memory array
  saveCustomersToStorage(); // Save the updated array to localStorage
  console.log("Customer added:", customerData);
}

export function removeCustomer(index) {
  if (index >= 0 && index < customerData.length) {
    customerData.splice(index, 1); // Remove the customer at the specified index
    saveCustomersToStorage(); // Save the updated array to localStorage
    console.log("Customer removed:", customerData);
  } else {
    console.error("Invalid index:", index);
  }
}

function saveCustomersToStorage() {
  localStorage.setItem("customerData", JSON.stringify(customerData)); // Save all customers to localStorage
}

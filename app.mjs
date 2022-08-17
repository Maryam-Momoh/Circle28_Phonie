const phoneNumElement = document.querySelector("#phone");
const form = document.querySelector("form");
const carrierIcon = document.querySelector("#imgDiv");
const error_msg = document.querySelector(".error_msg");
const autoCompDiv = document.querySelector("#autoComplete");

const mtn = ["0703", "0704", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0901"];
const glo = ["0805", "0807", "0705", "0815", "0811", "0905"];
const airtel = ["0802", "0808", "0708", "0704", "0812", "0701", "0901", "0902", "0904"];
const etisalat = ["0809", "0818", "0817", "0909"];



function startApp() {
  phoneNumElement.addEventListener("keyup", (e) => {
    const phoneNum = e.target.value;
    validatePrefix(phoneNum);
  })
  autoCompDiv.addEventListener("click", (e) => {
    phoneNumElement.value = `${e.target.textContent}`;
    validatePrefix(phoneNumElement.value);
    autoCompDiv.innerHTML = '';
  })
  form.addEventListener("submit", (e) => {
    // prevents submit btn default behavior
    e.preventDefault();
  });
};

function validatePrefix(phoneNum) {
  let number = phoneNum.toString().replace(/^\+234/, "0");
  validateInput(number);
}

// this function identifies telecom carrier
function validateInput(phoneNum) {
  displayAutoComplete(phoneNum);

  let prefix = phoneNum.toString().slice(0, 4);
  if (prefix.length === 4 && !glo.includes(prefix)) {
    error_msg.style.display = "block";
  } else {
    error_msg.style.display = "none";
  }
  if (mtn.includes(prefix)) {
    carrierIcon.style.backgroundImage = "url('./assets/mtn.png')";
  } else if (glo.includes(prefix)) {
    carrierIcon.style.backgroundImage = "url('./assets/glo.jpeg')";
  } else if (airtel.includes(prefix)) {
    carrierIcon.style.backgroundImage = "url('./assets/airtel.png')";
  } else if (etisalat.includes(prefix)) {
    carrierIcon.style.backgroundImage = "url('./assets/9mobile.png')";
  } else {
    carrierIcon.style.backgroundImage = "";
  }
};


function displayAutoComplete(phoneNum) {
  autoCompDiv.innerHTML = '';
  let list = '';
  if (phoneNum.length > 4) {
    return [];
  }
  let numbers = autoComplete(phoneNum);
  numbers.map((number) => {
    list += `<li>${number}</li>`;
  })
  autoCompDiv.innerHTML = `<ul>${list}</ul>`;
};

function autoComplete(phoneNum) {
  if (phoneNum === '') {
    error_msg.style.display = "none";
    return [];
  }
  let prefix = phoneNum.toString().slice(0, 4);
  let reg = new RegExp(`^${prefix}`);
  return glo.filter((number) => {
    if (number.match(reg)) {
      return number;
    }
  })
};


// ======= DO NOT EDIT ============== //
  export default startApp;
// ======= EEND DO NOT EDIT ========= //

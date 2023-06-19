const target = el => {
  return document.querySelector(el);
};

const $form = target(".form");
const $username = target("#username");
const $email = target("#email");
const $password = target("#password");
const $password2 = target("#password2");

// 로그인성공시 success추가
// 입력값검증 비어있으면 빈값에 에러추가
// 실패시 error클래스 추가

function showError(input, message) {
  const parent = input.parentElement;

  parent.className = "form-control error";
  const smallEl = parent.querySelector("small");
  smallEl.innerText = message;
}
function showSuccess(input, message) {
  const parent = input.parentElement;
  parent.className = "form-control success";
}

function isEmailchking(input) {
  var re = /\S+@\S+\.\S+/;

  return re.test(input);
}

function showField(input) {
  input.forEach(item => {
    if (item.value.trim() === "") {
      showError(item, `${getIdItem(item)} is required`);
    } else {
      showSuccess(item);
    }
  });
}

function getIdItem(item) {
  return item.id.charAt(0).toUpperCase() + item.id.slice(1);
}

// Check length

function checklength(item, min, max) {
  item.forEach(el => {
    if (el.value.length < 3) {
      showError(el, `${getIdItem(el)} must ber at least ${min} character`);
    } else if (el.value.length > max) {
      showError(el, `${getIdItem(el)} must be less than${max} character`);
    } else {
      showSuccess(el);
    }
  });
}

$form.addEventListener("submit", e => {
  e.preventDefault();

  if (!isEmailchking($email.value)) {
    showError($email, `Error Email`);
  } else {
    showSuccess($email);
  }

  showField([$username, $password, $password2]);
  checklength([$username, $password, $password2], 3, 15);
});

const form = document.querySelector('.form');
const formData = [];
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const errorMsg = document.querySelector('.error');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formValidation()
})

//validate that the form isn't empty
function formValidation() {
  if (emailInput.value === '' 
      && passwordInput.value === '') {
    // errorMsg.textContent = 'The form is empty'
    
    // I chose to show that there's an error by changing the color of the input's border
    emailInput.style.border = '1px solid red';
    passwordInput.style.border = '1px solid red';

  } else if (emailInput.value === '') {
    // errorMsg.textContent = 'Please enter your email'

    emailInput.style.border = '1px solid red';
    passwordInput.style.border = '1px solid #006d77';
  } else if (passwordInput.value === '') {
    // errorMsg.textContent = 'Please enter your password';

    passwordInput.style.border = '1px solid red';
    emailInput.style.border = '1px solid #006d77';
  } else {
    // gets the data from the form
    getFormData()
    // errorMsg.textContent = ''
    emailInput.style.border = '1px solid #006d77';
    passwordInput.style.border = '1px solid #006d77';
    emailInput.value = '';
    passwordInput.value = '';
  }

}
function getFormData() {
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  formData.push(
    {
      'Email': userEmail,
      'Password': userPassword
    }
  )
  console.log(formData) 
}

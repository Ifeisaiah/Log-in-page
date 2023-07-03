# How to validate an html form with JavaScript 
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/io0oqwdn53vrdtczucoq.png)
This is a simple log in page creted with html, css and js, view live on my codepen https://codepen.io/Luwa_I/full/vYQXwWN

So you have or want to create a form and would like to get data from it, as well as have it checked so it doesn't submit empty.

Before we dive into that, I want to assume you are a little bit familiar with JavaScript, if you don't know javascript in-depth don't worry we won't be doing any pro coding.

For this tutorial we will be using this login page as a real life [demo](https://codepen.io/Luwa_I/full/vYQXwWN).

## The Html

I have a really simple html below

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple login page</title>
  </head>
  <body>
    <section class="log-in-page">
      <div class="main-page">
        <div class="welcome">
          <h2>Welcome back</h2>
          <span class="guide">Please enter your details.</span>
        </div>
        <form class="form" action="#!">
          <label for="email" class="label">
            Email
            <input name="email" type="email" class="input-field" id="email"
                   placeholder="Enter your email" />   
          </label>

          <label for="password" class="label">
            Password
            <input name="password" type="password" class="input-field" id="password"
                   placeholder="Enter your password" />
          </label>

          <p class="error"></p>

          <div class="actions">
            <label for="check-box">
              <input type="checkbox" class="check-box" id="check-box" />
              Remember for 30 days</label>

            <a href="#!">Forgot Password?</a>
          </div>
          <button class="btn">Sign in</button>
        </form>

        <p>
<a href="#!">Don't have an account? Sign up</a>
     </p>
      </div>
      <div class="sub-page">
        <img src="https://images.unsplash.com/photo-1675050757561-741bd739bc06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=900&q=60" 
             alt="image from unsplash"
             class="img" 
      />
      </div>
    </section>
  </body>
</html>
```

##The Css 

```css
  body {
        line-height: 1.5em;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
        font-family: poppins, Verdana, Geneva, Tahoma, sans-serif;
        margin: 0;
    }
    .welcome {
        text-align: center;
        margin: 10px 0 10px 0;
    }
    h2 {
        margin-bottom: 10px;
        font-size: 31px;
    }
    .log-in-page {
        width: 100%;
        height: 100vh;
        display: flex;
    }
    .main-page {
        width: 50%;
        height: 100vh;
        background: radial-gradient(circle, #83c5bf85  0%,#d8e2dc 30%);  
     /* background-color: white; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      
    }
    .sub-page {
        width: 50%;
        height: 100vh;
    }
    .form {
        width: 450px;
        margin: 15px 0 15px 0;
        position: relative;
        
    }
    .actions {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 40px 0 10px 0;
    }
    .input-field {
        display: block;
        width: inherit;
        height: 50px;
        margin-top: 15px;
        margin-bottom: 15px;
        padding: 15px;
        border: 1px solid #006d77;
        background-color: transparent;
        font-size: 18px;
        box-sizing: border-box;
        border-radius: 5px;
        transition: ease-in-out;
        transition-duration: .4s;
    }
    .input-field::placeholder {
        font-size: 16px;
    }
    .input-field:focus {
        outline: none;
        border: 1px solid #006d77bb;
    }
    .btn {
        box-sizing: border-box;
        border: none;
        width: 100%;
        height: 46px;
        padding: 10px;
        margin-top: 20px;
        border-radius: 5px;
        background-color: #006d77;
        transition: ease-in-out;
        transition-duration: 1s;
        color: white;
        font-size: 18px;
    }
    .btn:hover {
        background-color: #006d77bb;
    }
    .btn:active {
        transform: scale(0.8);
    }
    .btn:focus {
        outline: none;
    }
    .label {
        width: 100%;
   
    }
    .img {
        width: 100%;
        object-fit: cover;
    }
    a {
        color: #075157;
        text-decoration: none;
    }
    .error {
        text-align: center;
        color: #9d0208;
        font-size: small;
        margin: 10px 0 10px 0;
    }
    .check-box{
        accent-color: #006d77bb;
    }
  
    @media (max-width: 900px) {
        .main-page {
            width: 100%;
            background-color: white; 
        }
        .sub-page {
            display: none;
        }
        .form {
            width: 70%;
        }
  }
    @media (max-width: 600px) {
         .main-page {
            background: white; 
        }
        .form {
            width: 90%;
        }
      .actions {
        font-size: 14px;
      }
      h2 {
        font-size: 25px;
      }
  }
```
After html and css have been sorted we have something like this set up.
![An image of a  login page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0blw4vyjkgf5ixz2h354.png)

## The JavaScript
 The first thing we need to do is to define some variables, now depending on what your form consists of you many need different variable to hold different values, but working with the `html` above, here are the variables we would be using.

```javascript
  const form = document.querySelector('.form');
  const formData = [];

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const errorMsg = document.querySelector('.error');

```
 The `form` is saved in a variable so an event Listener like `submit` can be called on it, the `formData` is empty for now but later on it is going to hold our data gotten from the form. Then, our `html` form fields `email` and `password` are stored in a variable, lastly there's an `html` paragraph that is stored in the `errorMsg` variable which would display any error that occurs, like if a field is empty.

In order to track the effect of what we would be doing to our `form` add the following code below.

```javascript
   form.addEventListener('submit', (event) => {
       event.preventDefault();
      formValidation()
    })
``` 
The event listener above listens for the `submit` event either by clicking on the form's submit button or by clicking on your device's enter key. Then what it does is to first prevent the normal way an `html` form is submitted which by default causes the browser to refresh, right after that a function we would be creating next is called in advance. 

With that being done, lets create the `formValidation` function called above.

The `formValidation` is created to check that the form isn't empty or one of it's fields void, only after that is sorted out, would we be able to get the data from the fields.

Add the code below

```javascript
 function formValidation() {
        if (emailInput.value === '' 
        && passwordInput.value === '') {
          errorMsg.textContent = 'The form is empty';

        } else if (emailInput.value === '') {
           errorMsg.textContent = 'Please enter your email'
        } else if (passwordInput.value === '') {
          errorMsg.textContent = 'Please enter your password';

        } else {
            // At this stage the form is definitely not empty
         
            errorMsg.textContent = ''
            emailInput.value = '';
            passwordInput.value = '';
        }

    }
```

![image of a form](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8ikex86dix4uvm73f03i.png)
The above function consists of `if` statements that sees to the fact that the `form` cannot be submitted empty or one field left out and if that occurs then an error message pops up to alert the user that something is wrong.


A quick addition;
There are different ways to handle errors, you may not need to display an error message but simply changing the colour of say the border of the input to red can point the user to the fact that a particular field is empty.

The code below

```javascript
 function formValidation() {
        if (emailInput.value === '' 
        && passwordInput.value === '') {
            emailInput.style.border = '1px solid red';
            passwordInput.style.border = '1px solid red';
            
        } else if (emailInput.value === '') {
            emailInput.style.border = '1px solid red';
            passwordInput.style.border = '1px solid #006d77';
        } else if (passwordInput.value === '') {
            passwordInput.style.border = '1px solid red';
            emailInput.style.border = '1px solid #006d77';
        } else {
           // At this stage the form is definitely not empty
           emailInput.style.border = '1px solid #006d77';
           passwordInput.style.border = '1px solid #006d77';
            emailInput.value = '';
            passwordInput.value = '';
        }

    }
```

![image of a form input](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zubrjqidqinr3ckwqhpj.png)

Now that we have handled all possible `form` errors, its time to get the data from the form fields, for this another function will be created.

Add the code below;

```javascript
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
   
```
New variables like `userEmail` and `userPassword` are where the form input values are stored and pushed as an object into the `formData` array. If you check your console you will find this data.

![data from a browser's console](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k38lp23gqq3svygtv29d.png)

Right after our form have been proven valid, call `getFormData`  at the top of your `else` statement in your `formValidation` function.

```javascript
 function formValidation() {

      ********
    else {
            // below this comment
           getFormData()
           // above this comment
            errorMsg.textContent = ''
            emailInput.value = '';
            passwordInput.value = '';
        }

    }
```
The full code below:

```javascript
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
    // I chose to show that there's an error by changing the color of the input's border
    emailInput.style.border = '1px solid red';
    passwordInput.style.border = '1px solid red';

  } else if (emailInput.value === '') {
    emailInput.style.border = '1px solid red';
    passwordInput.style.border = '1px solid #006d77';
  } else if (passwordInput.value === '') {
    passwordInput.style.border = '1px solid red';
    emailInput.style.border = '1px solid #006d77';
  } else {
    // gets the data from the form
    getFormData()
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
```
## Conclusion

And congratulations! You've validated a simple form and gotten reasonable data from it.

Keep in mind that there are other ways to do this and it is not within the scope of this tutorial to validate passwords and emails as this isn't an advance form. But don't be limited, now that you have an idea on what to do feel free to try different things, you can create an actual login page that verifies your email and password and a whole lot can be done to improve this simple form.

Drop a comment if you want a more advanced form validation tutorial.

That brings us to the end of the blog post, thanks for reading. 

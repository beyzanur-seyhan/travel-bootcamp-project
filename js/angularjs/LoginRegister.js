
function Register(e) {
    event.preventDefault();

    var NameSurname = document.getElementById('NameandSurname').value;
    var Email = document.getElementById('Email').value;
    var Password = document.getElementById('Password').value;
    var ConfirmPassword = document.getElementById('ConfirmPassword').value;


    var UserData = {
        Name: NameSurname,
        Email: Email,
        Password: Password
    };

    if (NameSurname == null || NameSurname == "") {
        alert("Please enter your name and surname.");
    } else if (Email == null || Email == "") {
        alert("Please enter your email.");
    }
      else if (Password.length < 8) {
        alert("Password has to be at least 8 characters long.");
    } else if (Password.length > 16) {
        alert("Password cannot exceed 16 characters.");
    }
      else if (Password !== ConfirmPassword) {
        alert("Passwords do not match.");
    }
      else {
        var json = JSON.stringify(UserData);
        localStorage.setItem(Email, json);
        alert("Signed up successfully.");
    }
};

function Login(e) {
    event.preventDefault();

    var Email = document.getElementById('LoginEmail').value;
    var Password = document.getElementById('LoginPassword').value;
    var user = localStorage.getItem(Email);
    var data = JSON.parse(user);

    var UserLoginData = {
        Email: Email,
        Password: Password
    };

    if (user == null) {
        alert("Invalid email or password");
    } else if (Email == data.Email && Password == data.Password) {
        alert("Logged in successfully");
        DisplayUsername();
        var json = JSON.stringify(UserLoginData);
        localStorage.setItem(Password, json);
    } else { alert("Invalid email or password"); }

    function DisplayUsername() {
        var Username = document.getElementById('LoggedinName');
        var Name = document.getElementById('NameandSurname').value;
        var User = localStorage.getItem(Email);
        var data = JSON.parse(User);
        Username.innerText = data.Name;
    }

    
    

};

function RemoveClass(){
    var BlackScreen = document.querySelector('.my-mfp-zoom-in');
    // var BlackScreenSecond = document.querySelector('.mfp-close-btn-in');
    BlackScreen.classList.remove("mfp-bg", "my-mfp-zoom-in", "mfp-ready");
    };

    // function StayLoggedIn(){
    //     // document.cookie = `Email=${Email}`;
    //     // document.cookie = `Password=${Password}`;
        
    //     var Username = document.getElementById('LoggedinName');
    //     var User = localStorage.getItem(Password);
    //     var Data = JSON.parse(User);
    //     var RegUser = localStorage.getItem(Email);
    //     var RegData = JSON.parse(RegUser);
    //     // if(Data.Email == RegData.Email && Data.Password == RegData.Password){
    //     //     Username.innerText = RegData.Name;
            

    //     // }
    //     console.log(Data.Email);
    //     };
    
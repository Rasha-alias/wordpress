//Funktion for bringing data from Strapi CMS
async function getStudentDataFromStrapi() {

    //Url for Strapi API to bring all students information
    let url = "http://localhost:1337/api/students";

    //Bring JSON data från API och convert them to JS objekt
    //wait for URL response 
    let stringResponse = await fetch(url);
    //wait for JSON response i URL
    let myObjekt = await stringResponse.json();

    console.log(myObjekt);

    let output = '<table>';

    //Check if the information that we brings is one object or more  
    if (Array.isArray(myObjekt.data)){

        output += generateObj(myObjekt.data[0].attributes, null, true);

        //Create ForEach loop for every elemet i Data-array
        myObjekt.data.forEach(element => {
            
            let obj = element.attributes;

            //write an output 
            output += generateObj(obj,element.id, false);
        });

    } else {

        //if the attribut object is one
        let obj = myObjekt.data.attributes;

        output += generateObj(myObjekt.data[0],null, true);

        //Skriver Output string
        output += generateObj(obj, myObjekt.data.id, false);
    }

    output += "</table >";
    
    //priint out Output string to div-element
    document.getElementById("studentFetched").innerHTML = output;
}


///////////////////////////to post data to Strap need to log in first////////////////////


//Funktion to bring Token for authenticated user with parameters skipValidateStudent
async function getToken(skipValidateStudent=false) {

    let valid = true;

    //Validate username and password!
    if ( !validateLogin() ) valid = false;

    //validate students data and skip validateStudentData when it calls in Delete and Edit functions 
    if (  !skipValidateStudent && !validateStudentData() ) valid = false;

    if (!valid) return null;
//---------------------------------------------
    
    //Url to Strapi.js UserList
    const urlUser = "http://localhost:1337/api/auth/local";

    //bring values from input field for user
    const user = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    //Create an object of username and password which user have writen in the inputfield for user.
    let userObject = {
        identifier : user,
        password : password
    }

    //call API with login data which include post Method och Headers
    let userResponse = await fetch(urlUser,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        // convert userobject from js to json in order to be clear for the server(Strapi)
        body: JSON.stringify(userObject)
    });

    // wait for JSON string response 
       let userJson = await userResponse.json();
   

    //check if the user object hav token then post data via this token.
    
  
     if (userJson.jwt) return userJson.jwt;
    else {
        //Inloggningen har misslyckats. Skriv ut errormeddelande från Strapi.js
        let errMessage = userJson.error.message;

        document.getElementById("userError").innerText = errMessage;

        return null;
    }     
    
}


////////////////////////////post data to strapi by token///////////////////////////////////////////


 async function postStudentData() {

    let token = await getToken();
    if (!token) return;

    //URL for Strapi students collection.
    const urlStudents = "http://localhost:1337/api/students";

    // bring  a new student data from input fields
    const firstName = document.getElementById("studentFName").value;
    const lastName = document.getElementById("studentLName").value;
    const age = document.getElementById("age").value;

    //Greate an object of a new student data.
    let studentObjekt = {
        data : {
            firstname : firstName,
            lastname : lastName,
            age: age
        }
    };

    //call API with student Objekt and wait for URL response 
    let studentResponse = await fetch(urlStudents,
    {
        method: 'POST',

        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token 
        },
                //Covert student object from js to json to be written in the server
        body: JSON.stringify(studentObjekt)
    });

    let studentJson = await studentResponse.json();

    console.log(studentJson);
}

/////////////////////////////validation///////////////////////////////////

//-------------//Funktion for validation to validate username Input------------

function userValidate(comp) {
    //  The field must be filled in

    let valid = true;

    if (comp.value.length == 0) {
        //incorect validation because thereis no value in the username
        valid = false;
    }

    // Check on successful validation
    if (!valid) {
        document.getElementById("userError").innerText = "Du måste fylla i ett användarnamn!";
        return false;
    }
    
    else if (!isNaN( comp.value)){
        document.getElementById("userError").innerText = " Användarnamn måste vara en sträng";
        return false;
    }

      else {
        document.getElementById("userError").innerText = "";
        return true;
    }
}
//---------------//Validering av user Password input------------------------------------

function passValidate(comp) {
    // Field must be at least 5 tecken eller längre

    let valid = true;

    if (comp.value.length <= 4) {
        //faild validation
        valid = false;
    }

    //Check on successful validation
    if (!valid) {
        document.getElementById("passwordError").innerText = "Lösenordet måste vara minst 5 tecken långt!";
        return false;
    } else {
        document.getElementById("passwordError").innerText = "";
        return true;
    }
}
//-------------------------//funktion for loggin validation------------------------------------

function validateLogin() {

    let valid = true;

    //Validate username
    if (!userValidate(document.getElementById("user"))) {
        valid = false;
    }

    //Validate Password
    if (!passValidate(document.getElementById("pass"))) {
        valid = false;
    }

    return valid;
}

//----------------//Funktion to validate student firstName--------------------------------


function firstNameValidate(comp) {
    // 1. field must contain a value
    // 2. field must not be a number

    let valid = true;

    //Check if there is value in the firstname field of student 
    if (comp.value.length == 0) {
        //incorrect validation because there is no value in firstname field
        valid = false;
        document.getElementById("firstNameError").innerText = "Förenamn måste vara ifyllt.";
    }

    //Check  if there is a value in firstname field and the value is not a number
    if ( comp.value.length != 0  &&  !isNaN( comp.value ) ) {
        //incorrect
        valid = false;
        document.getElementById("firstNameError").innerText = "Förenamn får inte vara ett nummer.";
    }
    // conditions are met
    if (valid) {
        document.getElementById("firstNameError").innerText = "";
    }

    return valid;
}
//--------------------//Funktion to validate student lastName-----------------------------------------


function lastNameValidate(comp) {
    // 1. field must contain a value
    // 2. field must not be a number

    let valid = true;

    //Check if there is value in the lastname field of student 
    if (comp.value.length == 0) {
        //incorrect validation because there is no value in lasttname field
        valid = false;
        document.getElementById("lastNameError").innerText = "Efternamn måste vara ifyllt.";
    }

 //Check  if there is a value in firstname field and the value is not a number
    if (comp.value.length != 0 && !isNaN( comp.value ) ) {
        //incorrect
        valid = false;
        document.getElementById("lastNameError").innerText = "Efternamn får inte vara ett nummer.";
    }
     // conditions are met
    if (valid) {
        document.getElementById("lastNameError").innerText = "";
    }

    return valid;
}
//-------------------//Funktion to validate student age-------------------------------------------


function ageValidate(comp) {
    // 1. field must contain a value
    // 2. field must be a number

    let valid = true;

    //Check if there is value in the age field of student 
    if (comp.value.length == 0) {
        //incorrect validation because there is no value in age field
        valid = false;
        document.getElementById("ageError").innerText = "Ålder måste vara ifyllt.";
    }

   //Check  if there is a value in age field and the value is not a number
    if ( comp.value.length != 0  && isNaN( comp.value ) ) {
        //incorrect
        valid = false;
        document.getElementById("ageError").innerText = "Ålder måste vara ett nummer.";
    }
        // conditions are met
    if (valid) {
        document.getElementById("ageError").innerText = "";
    }

    return valid;
}



//----------------//Funktion for validation of student-----------------------------------------------

function validateStudentData() {
    let valid = true;

    //Validate Student firstName
    if ( !firstNameValidate(document.getElementById("studentFName")) ) {
        valid = false;
    }
    //Validate Student LastName
    if ( !lastNameValidate(document.getElementById("studentLName")) ) {
        valid = false;
    }
    //Validate Student age
    if ( !ageValidate(document.getElementById("age")) ) {
        valid = false;
    }


    return valid;
}


////////////////////////////Function for generating student object to the row in the Table///////////////////////////////

function  generateObj(obj, objId, header){

    let output= "<tr>";
    // create an array of these parameters 
    let forbiddenParameters = ["createdAt", "updatedAt", "publishedAt"];

    for(x in obj){

          //to skip these parameter to the next parameter in order to hide them from the table by keyword continue
       if (forbiddenParameters.includes(x)) continue;

       if (header) output += `<th> ${x} </th>`;      //parameters name in the th header
       else        output += `<td> ${obj[x]} </td>`  //parameters value in the td for each tr
       
    }

    if (!header) {
        //URL for the specific student
        let postURL = `http://localhost:1337/api/students/${objId}`;

        // Create update and Delete button for for each row (tr)
        output += `<td><button onclick="deleteStudent('${postURL}');">Radera</button></td>`;
        output += `<td><button onclick="updateStudent('${postURL}');">Uppdatera</button></td>`;
    }
     
    //close tr tag
    output += "</tr>";

    return output;
}

///////////////////////////////////delete a student//////////////////////////////////

async function deleteStudent(url) {

    //bring token from getToken()
    //if there is no token cancel to continue in the delete function
    let token = await getToken(true);
    if (!token) return;

    //call API when inloggningsdata is compelted.
    //Fetch URL API include  Delete Method och Headers for json content and token
    await fetch(url,
        {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
            }
        });

    //call "GetStudentDataFromStrapi" funcion to print out  a new table.
    await getStudentDataFromStrapi();

}

///////////////////////////////////update an specific student//////////////////////////////////

async function updateStudent(url) {

     //bring token from getToken()
    //if there is no token cancel to continue in the delete function
    let token = await getToken(true);
    if (!token) return;

    // Bring student data från inputfields
    const firstName = document.getElementById("studentFName").value;
    const lastName= document.getElementById("studentLName").value;
    const age = document.getElementById("age").value;

    //create an object with data
    let studentObjekt = {
        data : {}
    };

    //fill in parameters value (in the content students collection  in Strapi) with the changing Data which is taken from input fields 
    if (firstName) studentObjekt.data["firstname"] = firstName;
    if (lastName) studentObjekt.data["lastname"] = lastName;
    if (age) studentObjekt.data["age"] = age;

    //call API with studentObjekt
    await fetch(url,
    {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token //include Token from logning.
        },
        body: JSON.stringify(studentObjekt)
    });

    //call "GetDataFromStrapi" function to print out a new table
    await getStudentDataFromStrapi();
}







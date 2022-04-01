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

    let output = "";

    //Check if the information that we brings is one object or more
    if (Array.isArray(myObjekt.data)) {
        //Create ForEach loop for every elemet i Data-array
        myObjekt.data.forEach((element) => {
            let obj = element.attributes;

            for (x in obj) {
                console.log(x + ": " + obj[x]);
            }

            //write an output
            output += `<div>Namn: ${obj.firstname} Efternamn: ${obj.lastname}</div>`;
        });
    } else {
        //if the attribut object is one
        let obj = myObjekt.data.attributes;
        for (x in obj) {
            console.log(x + ": " + obj[x]);
        }

        //write Output string
        output += `<div>Förenamn: ${obj.firstname} Efternamn: ${obj.lastname}
        </div>`;
    }

    //priint out Output string to div-element
    document.getElementById("studentFetched").innerHTML = output;
}

///////////////////////////to post data to Strap need to log in first////////////////////

//Funktion to bring Token for authencated user
async function getToken() {
    //Url to Strapi.js UserList
    const urlUser = "http://localhost:1337/api/auth/local/";

    //bring values from input field for user
    const user = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    //Create an object of username and password which user have writen in the inputfield for user.
    let userObject = {
        identifier: user,
        password: password,
    };

    //call API with login data which include post Method och Headers
    let userResponse = await fetch(urlUser, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // convert userobject from js to json in order to be clear for the server(Strapi)
        body: JSON.stringify(userObject),
    });

    // wait for JSON string response
    let userJson = await userResponse.json();

    //check if the user object hav token then post data via this token.

    if (userJson.jwt) postStudentData(userJson.jwt);
}

////////////////////////////post data to strapi by token///////////////////////////////////////////

async function postStudentData(token) {
    //URL for Strapi students collection.
    const urlStudents = "http://localhost:1337/api/students/";

    // bring  a new student data from input fields
    const firstName = document.getElementById("studentFName").value;
    const lastName = document.getElementById("studentLName").value;
    const age = document.getElementById("age").value;

    //Greate an object of a new student data.
    let studentObjekt = {
        data: {
            firstname: firstName,
            lastname: lastName,
            age: age,
        },
    };

    //call API with student Objekt and wait for URL response
    let studentResponse = await fetch(urlStudents, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token,
        },
        //Covert student object from js to json to be written in the server
        body: JSON.stringify(studentObjekt),
    });

    let studentJson = await studentResponse.json();

    console.log(studentJson);
}

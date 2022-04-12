async function getDataFromStrapi() {
    let url = "http://localhost:1337/api/courses/1";

    let stringResponse = await fetch(url);
    let myObject = await stringResponse.json();

    console.log(myObject);

    let output = "";

    let obj = myObject.data.attributes;

    output += `Som t.ex. vår omåttligt populära kurs ${obj.name}!`;

    document.getElementById("infoHeading").innerHTML += output;
}

getDataFromStrapi();

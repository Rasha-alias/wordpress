async function getDataFromStrapi() {
    let url = "http://localhost:1337/api/courses";

    let stringResponse = await fetch(url);
    let myObject = await stringResponse.json();

    console.log(myObject);

    let output = "";

    if (Array.isArray(myObject.data)) {
        //Skapar en ForEach loop för varje element i Data-arrayen
        myObject.data.forEach((element) => {
            let attr = element.attributes;

            for (x in attr) {
                console.log(x + ": " + attr[x]);
            }

            output += `<div class="col-4"><h3><strong>${attr.name}</strong></h3><p>${attr.description}</p></div>`;
        });
    } else {
        let obj = myObject.data.attributes;

        for (x in obj) {
            console.log(x + ": " + obj[x]);
        }

        output += `<div>Namn: ${obj.name} ${obj.description}</div>`;
    }

    document.getElementById("coursesFetched").innerHTML = output;
}

getDataFromStrapi();

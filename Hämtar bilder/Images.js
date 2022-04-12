  ///////////////////////Rasha Bild/////////////////////////
  
  async function image1(){
        let apiUrl = "http://localhost:1337";
        
        let urlLocalhost = "http://localhost:1337/api/images?populate=";
      
        let imgUrl = "/uploads/pic_2ed8403abb.jpg";
        let stringResponse = await fetch (urlLocalhost);
        let myObject = await stringResponse.json();
        //let obj = myObject.data.attributes;
        let output = '';
      
                output = `
                    <div >
                        <div class="image">
                            <img src="${apiUrl + imgUrl}" width="170px" length="160"></img> <br>
                                                   
                        </div>
                        
                        
                    </div>
                    
                `;  
                // Jag försökte med denna path men den fungerer inte          
            //<img src="${apiUrl + obj.img.data.attributes.formats.thumbnail.url}"></img> 
         document.getElementById("output1").innerHTML = output;  
    }
    
    
    ///////////////////////Frank bild//////////////////

    async function image2(){
        let apiUrl = "http://localhost:1337";
        
        let urlLocalhost = "http://localhost:1337/api/images?populate=";
      
        let imgUrl = "/uploads/1631799518556_195f3daf52.jfif";
        let stringResponse = await fetch (urlLocalhost);
        let myobject = await stringResponse.json();
        let output = '';
      
                output = `
                    <div >
                        <div class="image">
                            <img src="${apiUrl + imgUrl}" width="200px" length="300"></img>   
                            
                        </div>
                        
                        
                    </div>
                    
                `;

         document.getElementById("output2").innerHTML = output;   
    }

    //////////////////////Fredrik bild/////////////////

      
    async function image3(){
        let apiUrl = "http://localhost:1337";
        
        let urlLocalhost = "http://localhost:1337/api/images?populate=";
      
        let imgUrl = "/uploads/1544699695196_527c60036e.jfif";
        let stringResponse = await fetch (urlLocalhost);
        let myobject = await stringResponse.json();
        let output = '';
        
                output = `
                    <div >
                        <div class="image">
                            <img src="${apiUrl + imgUrl}" width="200px" length="300"></img>   
                            
                        </div>
                        
                        
                    </div>
                    
                `;
          
         document.getElementById("output3").innerHTML = output;  
    }
    



    //////////////////Jesper bild//////////////////////

    async function image4(){
        let apiUrl = "http://localhost:1337";
        
        let urlLocalhost = "http://localhost:1337/api/images?populate=";
      
        let imgUrl = "/uploads/jes_61c546a56c.jpg";
        let stringResponse = await fetch (urlLocalhost);
        let myobject = await stringResponse.json();
        let output = '';
        
      
                output = `
                    <div >
                        <div class="image">
                            <img src="${apiUrl + imgUrl}" width="180px", length="150px"></img>   
                            
                        </div>
                        
                        
                    </div>
                    
                `;
                
            
         document.getElementById("output4").innerHTML = output;
        
    }

function allImage(){

    image1();
    image2();
    image3();
    image4();     
}


const apikey ='JKiV4XYc0msceTYMlAI0meyijD64OdWTu77JCD8vNXVAWLpYPtU6DqvU'
const easy = `https://opentdb.com/api.php?amount=20&difficulty=easy`
const medium = `https://opentdb.com/api.php?amount=20&difficulty=medium`
const hard =`https://opentdb.com/api.php?amount=20&difficulty=hard`

let correct_answer;

let lives = null;

let diff =null;

let mulitplyer  = null;

window.onload = function() {

 
} // window.onload
 


// let = amount;

// let stopwords = [/i/, /me/, /my/, /myself/, /we/, /our/, /ours/, /ourselves/, /you/, /your/, /yours/, /yourself/, /yourselves/, /he/, /him/, /his/, /himself/, /she/, /her/, /hers/, /herself/, /it/, /its/, /itself/, /they/, /them/, /their/, /theirs/, /themselves/, /what/, /which/, /who/, /whom/, /this/, /that/, /these/, /those/, /am/, /is/, /are/, /was/, /were/, /be/, /been/, /being/, /have/, /has/, /had/, /having/, /do/, /does/, /did/, /doing/, /a/, /an/, /the/, /and/, /but/, /if/, /or/, /because/, /as/, /until/, /while/, /of/, /at/, /by/, /for/, /with/, /about/, /against/, /between/, /into/, /through/, /during/, /before/, /after/, /above/, /below/, /to/, /from/, /up/, /down/, /in/, /out/, /on/, /off/, /over/, /under/, /again/, /further/, /then/, /once/, /here/, /there/, /when/, /where/, /why/, /how/, /all/, /any/, /both/, /each/, /few/, /more/, /most/, /other/, /some/, /such/, /no/, /nor/, /not/, /only/, /own/, /same/, /so/, /than/, /too/, /very/, /s/, /t/, /can/, /will/, /just/, /don/, /should/, /now/,[a-z]]

let testcase = 'In 1989 what happend in the China'


async function imgDelivery(data) { 
        let i = 0
        let contain = document.querySelector('.container')   
        const query = `${data.results[i].question}`
            console.log(query);
        const imageUrl = await fetchPexelsData(query);

        if (imageUrl){
            console.log(imageUrl)
            // Create an image element
            const img = document.createElement("img");
            img.src = imageUrl.photos[0].src.original;
            img.alt = `Image for ${data.results[i].question}`;
            img.className = "question-image";
            i++


            // Append the image to the corresponding question
            contain.appendChild(img);
        } else{
            console.error(`No image found for question:
            ${data.results[i].question}`);
           i++

        }
}


const testing = () =>{
    // for(let i = 0; i < testcase.length; i++){
    //     if(stopwords){

    //     }else
    //     console.log(testcase[i])
    //     if(testcase[i].toUpperCase == true){
    //         console.log(testcase[i]);
    //         query = i   
    //         img(data)
    //     }else{
    //         console.log('garbage')
    //     }
    // } 

    console.log(testcase.test)
}


async function fetchPexelsData(search) {
    const url = "https://api.pexels.com/v1/search?per_page=1&query=" + search;
    const headers = {

        "Authorization": "JKiV4XYc0msceTYMlAI0meyijD64OdWTu77JCD8vNXVAWLpYPtU6DqvU"
    };

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function searchtrivea(diff) {
    diff = diff;
    let btn = document.getElementById('landing').style.display = 'none';
    try {   
        const response = await fetch(`https://opentdb.com/api.php?amount=20&difficulty=${diff}&type=multiple`);
        
        // const response = await fetch('/questions.json');
        const data = await response.json();
        console.log(data);
        show(data)
        await imgDelivery(data)
        
         
    } catch(error) {
      console.error('Error fetching trivea:', error);
    } // catch
  } // searchTvShows 

function show(data) {
    let i = 0 
    if(data.results[0].difficulty == 'hard'){
        lives=10
    }else if(data.results[0].difficulty == 'medium'){
        lives=25
        console.log(lives)

    }else if(data.results[0].difficulty == 'easy'){
        lives=50
        console.log(lives)

    }

    let contain = document.createElement('div')
    let answer = document.getElementById('questions')
    let btncontain = document.createElement('div')
    btncontain.classList.add('btnconatin')
    contain.classList.add('container')
    contain.appendChild(btncontain)
    answer.appendChild(contain)
    console.log(i)
    console.log(data.results[i].question ) 
    let Div = document.createElement("div");
    Div.classList.add('question')
    Div.innerHTML = "<h2>"+data.results[i].question+"</h2>";
    contain.appendChild(Div)

    if(data.results[i].type == 'multiple'){
        for(let e in data.results[i].incorrect_answers){
            let btns = document.createElement('button')
            btncontain.appendChild(btns)
            btns.innerHTML = data.results[i].incorrect_answers[e];
            if(e == 2){
                let btns = document.createElement('button')
                btncontain.appendChild(btns)
                btns.innerHTML = data.results[i].correct_answer;

            }
            console.log(e)
        }   

    }else if(data.results[i].type == 'boolean'){
        for(let j = 0; j < 2; j++){
            if(j == 0){
                let btns = document.createElement('button')
            btncontain.appendChild(btns)
            btns.innerHTML = 'true'

            }
            
            else{
                let btns = document.createElement('button')
            btncontain.appendChild(btns)
            btns.innerHTML = 'false'
            }
            
        }
     
        

        
    }
    i ++

    // }   

   
} // showEpisodes



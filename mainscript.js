const apikey ='JKiV4XYc0msceTYMlAI0meyijD64OdWTu77JCD8vNXVAWLpYPtU6DqvU'
const easy = `https://opentdb.com/api.php?amount=20&difficulty=easy`
const medium = `https://opentdb.com/api.php?amount=20&difficulty=medium`
const hard =`https://opentdb.com/api.php?amount=20&difficulty=hard`

    let contain = document.createElement('div')
    let btncontain = document.createElement('div')
    let gear = document.getElementById('gear')
    let info = document.getElementById('info')

    let front = document.getElementById('landing');

let data  = ''
let i = 0;
let x = '0'
let y = '0'
onmousemove = function(e){
let pos = document.getElementById('pos')

    // console.log("mouse location:", e.clientX, e.clientY)
     x = e.clientX 
     y = e.clientY
    pos.innerHTML = 'x' +x +'y'+ y

}

function back(){
    document.getElementById('landing').style.display = 'grid'
    document.getElementById('setts').style.display = 'none'
    document.getElementById('creds').style.display = 'none'
}

function settings(){
    document.getElementById('landing').style.display = 'none'
    document.getElementById('setts').style.display = 'grid'

    

}

function creds(){
    document.getElementById('landing').style.display = 'none'
    document.getElementById('creds').style.display = 'grid'


}
let lives = null;


let mulitplyer = null;



let diff =null;

// let mulitplyer  = lives * mult;

window.onload = function() {

 
} // window.onload
 


// let = amount;

// let stopwords = [/i/, /me/, /my/, /myself/, /we/, /our/, /ours/, /ourselves/, /you/, /your/, /yours/, /yourself/, /yourselves/, /he/, /him/, /his/, /himself/, /she/, /her/, /hers/, /herself/, /it/, /its/, /itself/, /they/, /them/, /their/, /theirs/, /themselves/, /what/, /which/, /who/, /whom/, /this/, /that/, /these/, /those/, /am/, /is/, /are/, /was/, /were/, /be/, /been/, /being/, /have/, /has/, /had/, /having/, /do/, /does/, /did/, /doing/, /a/, /an/, /the/, /and/, /but/, /if/, /or/, /because/, /as/, /until/, /while/, /of/, /at/, /by/, /for/, /with/, /about/, /against/, /between/, /into/, /through/, /during/, /before/, /after/, /above/, /below/, /to/, /from/, /up/, /down/, /in/, /out/, /on/, /off/, /over/, /under/, /again/, /further/, /then/, /once/, /here/, /there/, /when/, /where/, /why/, /how/, /all/, /any/, /both/, /each/, /few/, /more/, /most/, /other/, /some/, /such/, /no/, /nor/, /not/, /only/, /own/, /same/, /so/, /than/, /too/, /very/, /s/, /t/, /can/, /will/, /just/, /don/, /should/, /now/,[a-z]]

let testcase = 'In 1989 what happend in the China'


async function imgDelivery(data) { 
        let contain = document.querySelector('.container')   
        const query = `${data.results[i].question}`
            console.log(query);
        const imageUrl = await fetchPexelsData(query);

        if (imageUrl){ // Hitler
            console.log(imageUrl)
            // Create an image element
            const img = document.createElement("img");
            img.src = imageUrl.photos[0].src.medium;
            img.alt = `Image for ${data.results[i].question}`;
            img.className = "question-image";
            i++


            // Append the image to the corresponding question
            contain.appendChild(img);
        } else{
            console.error(`No image found for question:
            ${data.results[i].question}`);

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
    document.getElementById('landing').style.display = 'none'

    try {   
        const response = await fetch(`https://opentdb.com/api.php?amount=20&difficulty=${diff}&type=multiple`);
        
        // const response = await fetch('/questions.json');
        data = await response.json();
        console.log(data);
        show(data)
        await imgDelivery(data)
        
         
    } catch(error) {
      console.error('Error fetching trivea:', error);
    } // catch
  } // searchTvShows 

function show(data) {
    let time = setTimeout(3000)
    contain.innerHTML = ''
    btncontain.innerHTML = ''

    if(data.results[i].difficulty == 'hard'){

        lives=10
        mulitplyer = lives*Math.floor(Math.random() * .90)
        console.log(mulitplyer)
    }else if(data.results[i].difficulty == 'medium'){
        lives=25
        console.log(lives)
        mulitplyer = lives*(Math.random() * .90)
        console.log(mulitplyer)

    }else if(data.results[i].difficulty == 'easy'){
        lives=50
        console.log(lives) 
        mulitplyer = lives*Math.floor(Math.random() * .90)
        console.log(mulitplyer)

    }
    if(data.results.length > i){
        console.log(data.results.length)
    console.log(i)

    let answer = document.getElementById('questions')
    let timer = document.createElement('div'
    )
    timer.classList.add('timer')
    btncontain.classList.add('btnconatin')
    contain.classList.add('container')
    contain.appendChild(btncontain)
    answer.appendChild(contain)
    console.log(data.results[i].question ) 
    let Div = document.createElement("div");
    Div.classList.add('question')
    Div.innerHTML = "<h2>"+data.results[i].question+"</h2>";
    contain.appendChild(Div)
    timer.innerHTML='<i class="fa-regular fa-clock"></i>' + time
    const correctAnswer = data.results[i].correct_answer;
    contain.appendChild(timer)

    if (data.results[i].type === 'boolean') {
        for(let j = 0; j < 2; j++){
            
            if(j == 0){
                let btns = document.createElement('button')
                btncontain.appendChild(btns)
                btns.innerHTML = 'true'

                btns.addEventListener('click', function() {
                    checkAnswer(answerText, correctAnswer);
                });

            }
            else{
                let btns = document.createElement('button')
                btncontain.appendChild(btns)
                btns.innerHTML = 'false'

                btns.addEventListener('click', function() {
                    checkAnswer(answerText, correctAnswer);
                });
            }
        }
    } else if (data.results[i].type === 'multiple') {
        const allAnswers = [...data.results[i].incorrect_answers, correctAnswer];
        allAnswers.sort(function() { return 0.5 - Math.random(); });

        for (let j = 0; j < allAnswers.length; j++) {
            createAnswer(allAnswers[j], correctAnswer);
        }
    }
    }else{
        contain.innerHTML = '<p>hey</p>'

    }
    
}
    // questionDiv.appendChild(answersList);
    // answersContainer.appendChild(questionDiv)

    function createAnswer(answerText, correctAnswer) {

        let btns = document.createElement('button')
        btns.innerHTML = answerText;
    
        btns.addEventListener('click', function() {
            checkAnswer(answerText, correctAnswer);
        });
        btncontain.appendChild(btns);
    }

    function checkAnswer(answerText, correctAnswer){
    console.log(i)

    if(lives > 1){
                
   
        if(answerText == correctAnswer){
            show(data)
            imgDelivery(data)

            i++

            console.log('yup')
        }else{
            console.log(mulitplyer)
            lives = lives - mulitplyer;
            
            console.log(lives)

        }
    }else{
        contain.innerHTML = 'game voer stinky'

    }
    }

    // if(data.results[i].type == 'multiple'){
    //     for(let e in data.results[i].incorrect_answers){
    //         let btns = document.createElement('button')
    //         btncontain.appendChild(btns)
    //         btns.innerHTML = data.results[i].incorrect_answers[e];
    //         if(e == 2){
    //             let btns = document.createElement('button')
    //             btncontain.appendChild(btns)
    //             btns.innerHTML = data.results[i].correct_answer;

    //         }
    //         console.log(e)
    //     }   

    // }else if(data.results[i].type == 'boolean'){
    //     for(let j = 0; j < 2; j++){
    //         if(j == 0){
    //             let btns = document.createElement('button')
    //         btncontain.appendChild(btns)
    //         btns.innerHTML = 'true'

    //         }
            
    //         else{
    //             let btns = document.createElement('button')
    //         btncontain.appendChild(btns)
    //         btns.innerHTML = 'false'
    //         }
            
    //     }
     
        

        
    

    // }   

   



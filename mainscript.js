

const apikey ='JKiV4XYc0msceTYMlAI0meyijD64OdWTu77JCD8vNXVAWLpYPtU6DqvU'
const easy = `https://opentdb.com/api.php?amount=20&difficulty=easy`
const medium = `https://opentdb.com/api.php?amount=20&difficulty=medium`
const hard =`https://opentdb.com/api.php?amount=20&difficulty=hard`
let interval = null;
let ticks = null
    let contain = document.createElement('div')
    let btncontain = document.createElement('div')
    let gear = document.getElementById('gear')
    let info = document.getElementById('info')

    let front = document.getElementById('landing');
let lives = 0
let duration = 0
let data  = ''
let i = 0;
let x = '0'
let y = '0'

let tickCount = 0;

let amount = '10'
let category = '9';
let type = "multiple";

let diff =null;
let right = 0;


//var changes
function varchange(value){
    amount = value
  }
  

  
  function varchange2(value){
    category = value
  
  }
  
  function varchange3(value){
    type = value
  
  }
  


onmousemove = function(e){
let pos = document.getElementById('pos')

     x = e.clientX 
     y = e.clientY
    pos.innerHTML = 'x' +x +'y'+ y

}

function back(){
    document.getElementById('landing').style.display = 'grid'
    document.getElementById('setts').style.display = 'none'
    document.getElementById('creds').style.display = 'none'
    document.getElementById('container').style.display = 'none'
}

function settings(){
    document.getElementById('landing').style.display = 'none'
    document.getElementById('setts').style.display = 'grid'
}

function creds(){
    document.getElementById('landing').style.display = 'none'
    document.getElementById('creds').style.display = 'grid'
}






async function imgDelivery(data) { 
        let contain = document.getElementById('container')   
        const query = `${data.results[i].question}`
            console.log(i)
            console.log(query);
        const imageUrl = await fetchPexelsData(query);

        if (imageUrl){ 
            console.log(imageUrl)
            const img = document.createElement("img");
            img.src = imageUrl.photos[0].src.medium;
            img.alt = `Image for ${data.results[i].question}`;
            img.className = "question-image";
            i++


            if(data.results.length >= i && lives > 0){
            contain.appendChild(img);
            }else{
                console.log('no more questions')
            }
        } else{
            console.error(`No image found for question:
            ${data.results[i].question}`);

        }
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

    tickCount = 0;
    lives = 0;
    temp = ''
    diff = diff;

    if(diff == 'hard'){
        lives = lives=10
    }else if(diff== 'medium'){
        lives = lives=25
        console.log(lives)

    }else if(diff == 'easy'){
        lives = lives=50
        console.log(lives) 

    }

    document.getElementById('landing').style.display = 'none'

    try {   
        const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${diff}&type=${type}`);
        
        // const response = await fetch('/questions.json');
        data = await response.json();
        console.log(data);
        show(data)
        await imgDelivery(data)
        
         
    } catch(error) {
      contain.innerHTML = 'failure to fetch'
      console.error('Error fetching trivea:', error);
    } // catch
  } // searchTvShows 

function show(data) {
    console.log(i)
    lives = lives - tickCount
    console.log('lives '+lives)
    clearInterval(interval); 

    btncontain.innerHTML = ''
    contain.innerHTML = ''

    if(data.results[0].difficulty == 'hard'){
        duration = 5
    }else if(data.results[0].difficulty == 'medium'){
        duration = 10

    }else if(data.results[0].difficulty == 'easy'){
        duration = 15

    }

    
    if(data.results.length >= i  &&  lives > 0){
        console.log(data.results.length)
        console.log(i)

        let answer = document.getElementById('questions')
        let timer = document.createElement('div' )
        let stats = document.createElement('div')

        let tix = document.createElement('div')
        tix.classList.add('ticks')
        tix.innerHTML = "ticks" + tickCount 
        stats.appendChild(tix)
        stats.setAttribute('id', 'stats')
        timer.setAttribute('id', 'timer');
        btncontain.classList.add('btnconatin')
        contain.setAttribute('id', 'container')
        contain.appendChild(btncontain)
        contain.appendChild(stats)
        answer.appendChild(contain)
        console.log(data.results[i].question ) 
        let Div = document.createElement("div");
        Div.classList.add('question')
        Div.innerHTML = "<h2>"+data.results[i].question+"</h2>";
        contain.appendChild(Div)
    document.getElementById('container').style.display = 'grid'
        
        const correctAnswer = data.results[i].correct_answer;
        stats.appendChild(timer)

        startTimer(duration,timer,data,stats)
        life(stats)

        if (data.results[i].type === 'boolean') {
            for(let j = 0; j < 2; j++){
                
                if(j == 0){
                    let btns = document.createElement('button')
                    btncontain.appendChild(btns)
                    btns.innerHTML = 'True'
                    answerText = 'True'

                    btns.addEventListener('click', function() {
                        checkAnswer(answerText, correctAnswer);
                    });

                }
                else{
                    let btns = document.createElement('button')
                    btncontain.appendChild(btns)
                    btns.innerHTML = 'False'
                    answerText = 'False'
                    


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
    }else if(data.results.length <= i || lives <= 0){

        contain.innerHTML = `<h1>game over stinky</h1> \n <p>you got ${right}/${amount} </p>   <i id="back" onclick="back()" class="fa-solid fa-arrow-left"></i>`
        if(lives <= 0){
            contain.innerHTML = `<h1>game over stinky</h1> \n <p>you got ${right}/${amount} </p> \n <p>you ran out of lives</p>   <i id="back" onclick="back()" class="fa-solid fa-arrow-left"></i>`

        }
            right = 0
        i = 0
    }
    
}

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

    if(lives >= 0){
                
   
        if(answerText == correctAnswer){
            show(data)
            imgDelivery(data)
            right++
        }else{
            clearInterval(ticks); 
            console.log(ticks + 'ticks')
            contain.innerHTML = ''
            lives = lives - tickCount;
            tickCount = 0
            let temp = document.createElement('div')
            temp.classList.add('temp')
            if(lives > 0){
                temp.innerHTML = `<h1  style="color: red; font-size: 2.5em;">WRONG</h1>  \n <h2>you have ${lives} lives left</h2>`
            }else{
                temp.innerHTML = `<h1  style="color: red; font-size: 2.5em;">WRONG</h1>  \n <h2>you have 0 lives left</h2>`
            }
            contain.appendChild(temp)

            setTimeout(() => {
                imgDelivery(data)
                show(data)
                temp.innerHTML = ''
            }, 3000); 

        }
    }else{
        gameover()
    }
    }

    

    function life(stats){
        if(lives > 0){
            let lifediv = document.createElement('div')
            lifediv.classList.add('lives')
            lifediv.innerHTML = `<i style="color: red; font-size: 2em;" class="fa-solid fa-heart"></i> x ${lives}`
            stats.appendChild(lifediv)
        }else{
            gameover()
        }
        
    }

    function startTimer(duration, timer, data, stats) {
        console.log('Timer started');
        tickCount = 0;
        clearInterval(ticks)
        
        let times = duration, seconds;
        let startTime = Date.now() + 1000; 
        interval = setInterval(() => {
            seconds = parseInt(times % 60, 10);
            
            
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            
            document.getElementById('timer').innerHTML = '<i class="fa-regular fa-clock"></i>' + seconds +' seconds'   ;
            if (--times < 0) {
                if(lives > 0){
                    console.log(lives)
                    show(data)
                    imgDelivery(data)
                    document.getElementById('timer').innerHTML = "";
                    clearInterval(interval); 
                    startTimer(duration, timer, data);
                }else{
                    gameover()
                }
            }
        }, 1000);

        ticks = setInterval(() => {
            
            tickCount++;
           
            console.log(tickCount);
        }, 1000);
    }

   
    function gameover(){
        contain.innerHTML = `<h1>game over stinky</h1> \n <p>you got ${right}/${amount} </p>         <i id="back" onclick="back()" class="fa-solid fa-arrow-left"></i>`
        i = 0

    }
   
//instal stuff

    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    
      const installButton = document.getElementById('installButton');
      installButton.style.display = 'inline-block';
    
      installButton.addEventListener('click', () => {
        console.log('what the sigma')
        installButton.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      });
      
    });                    
             
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
          }, function(error) {
            console.log('Service Worker registration failed:', error);
          });
        });
      }                    
        

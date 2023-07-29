const main = document.querySelector('.main')
const home = document.querySelector('.home')
const popUp = document.querySelector('.popup-info')
const startBtn = document.querySelector('.start-btn')
const exitBtn = document.querySelector('.exit-btn')
const continueBtn = document.querySelector('.continue-btn')
const nextBtn = document.querySelector('.next-btn')
const quizSection = document.querySelector('.quiz-section')
const quizBox = document.querySelector('.quiz-box')
const resultBox = document.querySelector('.result-box')
const tryAgainBtn = document.querySelector('.tryAgain-btn')
const goHomeBtn = document.querySelector('.goHome-btn')

startBtn.onclick = () =>{
    popUp.classList.add('active');
    main.classList.add('active')
}
exitBtn.onclick = () =>{
    popUp.classList.remove('active');
    main.classList.remove('active')
}

nextBtn.onclick = () =>{
    if( questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);
    
        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active')
    }
    else{
        showResultBox();
        console.log("qdqda")
    }

}

continueBtn.onclick = () =>{
    quizSection.classList.add('active');
    popUp.classList.remove('active');
    main.classList.remove('active')
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);

    headerScore();
}

tryAgainBtn.onclick = () =>{
    quizBox.classList.add('active');
    nextBtn.classList.add('active');
    resultBox.classList.remove('active')

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

goHomeBtn.onclick = () =>{
    quizSection.classList.remove('active');
    nextBtn.classList.add('active');
    resultBox.classList.remove('active')

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const optionList = document.querySelector('.option-list');



//getting questions and options from array
function showQuestions(index){
    const questionText = document.querySelector('.question-text')
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].option[0]}</span></div>
    <div class="option"><span>${questions[index].option[1]}</span></div>
    <div class="option"><span>${questions[index].option[2]}</span></div>
    <div class="option"><span>${questions[index].option[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option')
    for( let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
    
};

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOption = optionList.children.length;         //allOption = 4

    if(userAnswer == correctAnswer){
        answer.classList.add('correct');

        userScore++;
        headerScore()

    }
    else{
        answer.classList.add('incorrect')

        //if answer is incorrect, auto select correct answer
        for (let i = 0; i < allOption; i++){
            if (optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct')
            }
        }
    }

    //if user has selected any option then disable options
    for (let i = 0; i < allOption; i++){
        optionList.children[i].classList.add('disabled')
    }

    nextBtn.classList.add('active')
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total')
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = ` Score ${userScore} / ${questions.length}`
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text')
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress')
    const progressValue = document.querySelector('.progress-value')

    let progressStartValue = -1;
    let progressEndVlaue = (userScore / questions.length) * 100;
    console.log(progressEndVlaue)
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`

        circularProgress.style.background = `conic-gradient(orange ${progressStartValue * 3.6}deg, rgba(255,255,255, .1) 0deg)`

        // console.log(progressStartValue)
        if(progressStartValue == progressEndVlaue){
            clearInterval(progress)
        }
    }, speed)
}


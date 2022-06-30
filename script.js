const questions = [
  {
    id: 1,
    question:
      "Suma oczek na przeciwległych ściankach standardowych kości do gry wynosi:",
    a: "7",
    b: "8",
    c: "9",
    answer: "a",
  },
  {
    id: 2,
    question: "Najczęstszą przyczyną krzywicy jest niedobór:",
    a: "Witaminy D",
    b: "Żelaza",
    c: "Sodu",
    answer: "a",
  },
  {
    id: 3,
    question: "Ktoś, kto porachuje nam kości…",
    a: "rozliczy nas ze wszystkich przewinień",
    b: "będzie nam się uporczywie przyglądać",
    c: "dotkliwie nas pobije",
    answer: "c",
  },
  {
    id: 4,
    question:
      "Choroba polegająca na zmniejszeniu gęstości kości, przez co stają się one bardziej łamliwe, to:",
    a: "osteoporoza",
    b: "skolioza",
    c: "hipotensja",
    answer: "a",
  },
  {
    id: 5,
    question:
      "Czaszki z masy cukrowej przygotowywane na Święto Zmarłych są związane z tradycją…",
    a: "meksykańską",
    b: "bałkańską",
    c: "norweską",
    answer: "a",
  },
  {
    id: 6,
    question: "Kość gnykowa u człowieka jest położona:",
    a: "w stawie łokciowym",
    b: "w okolicy gardła",
    c: "w czaszce",
    answer: "b",
  },
  {
    id: 7,
    question: "…zaś kość zwana rzepką to część:",
    a: "stawu kolanowego",
    b: "stawu skokowego",
    c: "kręgosłupa",
    answer: "a",
  },
  {
    id: 8,
    question:
      "Słowa „kości zostały rzucone” podczas przekraczania rzeki Rubikon miał wypowiedzieć:",
    a: "Aleksander Macedoński",
    b: "Hammurabi",
    c: "Juliusz Cezar",
    answer: "c",
  },
  {
    id: 9,
    question: "Układ kostny dorosłego człowieka składa się z:",
    a: "206 kości",
    b: "311 kości",
    c: "420 kości",
    answer: "a",
  },
  {
    id: 10,
    question:
      "„Kości” to amerykański serial z roku 2000, którego główna bohaterka…",
    a: "pracuje w muzeum archeologicznym",
    b: "jest antropologiem sądowym",
    c: "prowadzi dom pogrzebowy",
    answer: "b",
  },
  {
    id: 11,
    question:
      "Barokowa Kaplica Czaszek, której wystrój tworzą setki ludzkich kości, znajduje się w:",
    a: "Zakopanem",
    b: "Kudowie-Zdroju",
    c: "Kutnie",
    answer: "b",
  },
  {
    id: 12,
    question: "Głównymi składnikami tkanki kostnej człowieka są:",
    a: "magnez i potas",
    b: "węgiel i fosfor",
    c: "wapń i potas",
    answer: "c",
  },
  {
    id: 13,
    question:
      "Dramat, którego główny bohater wygłasza zdanie: ''Biedny Yoryku! Znałem go, mój Horacy'', trzymając w dłoni czaszkę przyjaciela, to",
    a: "''Hamlet'' Williama Szekspira",
    b: "''Czekając na Godota'' Samuela Becketta",
    c: "''Król Edyp'' Sofoklesa",
    answer: "a",
  },
  {
    id: 14,
    question:
      "Kość słoniowa to popularna nazwa materiału pozyskiwanego z zębów słoni, a konkretnie z ich:",
    a: "siekaczy",
    b: "zębów trzonowych",
    c: "zębów mlecznych",
    answer: "a",
  },
  {
    id: 15,
    question: "Paliczki to drobne kości znajdujące się w:",
    a: "ostatnim odcinku kręgosłupa",
    b: "mostku",
    c: "palcach",
    answer: "c",
  },
  {
    id: 16,
    question: "Językiem urzędowym Wybrzeża Kości Słoniowej jest:",
    a: "angielski",
    b: "portugalski",
    c: "francuski",
    answer: "c",
  },
  {
    id: 17,
    question: "Autorem obrazu „Czaszka z palącym się papierosem” jest:",
    a: "Witkacy",
    b: "Rembrandt",
    c: "Vincent van Gogh",
    answer: "c",
  },
];

// {
//   id: 1,
//   question: "Suma oczek na przeciwległych ściankach standardowych kości do gry wynosi:",
//   a: "7",
//   b: "8",
//   c: "9",
//   answer: "a",
// },

const progressBar = document.getElementById('progressBar');
const questionField = document.getElementById('questionText');
const allQuestionsSpan = document.getElementById("allQuestionsSpan");
const aField = document.getElementById("aField");
const bField = document.getElementById("bField");
const cField = document.getElementById("cField");
const aBtn = document.getElementById("aBtn");
const bBtn = document.getElementById("bBtn");
const cBtn = document.getElementById("cBtn");
const nextBtn = document.getElementById("next");
const wrap = document.getElementById("wrap");
const pointsSpan = document.getElementById('points');
const comment = document.getElementById('comment');
const restartBtn = document.getElementById('restart');
const opts = document.getElementsByClassName("opt");
const questionWrap = document.getElementById('questionWrap');

const answerBtns = [aBtn, bBtn, cBtn];
const questionFields = [aField, bField, cField];
const lowGrade = "Dobrze że jeszcze nie narobiłeś błędów ortograficznych przy zaznaczaniu odpowiedzi.";
const mediumGrade = "Nie jesteś po studiach, prawda?";
const highGrade = "No dobra, trzymasz poziom.";

let stage = 0;
let points = 0;

allQuestionsSpan.innerText = questions.length;

const renderQuestion = () => {
  uncheckAll();
  restylePanel();
  questionField.innerText = questions[stage].question;
  aField.innerText = questions[stage].a;
  bField.innerText = questions[stage].b;
  cField.innerText = questions[stage].c;
};
const verification = () => {
  switchLockButtons(true);
  if (isCorrectAnswer()) {
    showCorrectAnswer();
    changingQuestion();
  };
};
const isCorrectAnswer = () => {
  if (aBtn.checked) { 
    if (aBtn.dataset.choice === questions[stage].answer) {
      points++;
    } else {
      aField.previousSibling.style.color = "red";
      aField.style.color = "red";
    }
    return true
  } else if (bBtn.checked) {
    if (bBtn.dataset.choice === questions[stage].answer) {
      points++;
    } else {
    bField.previousSibling.style.color = "red";
    bField.style.color = "red";
    }
    return true
  } else if (cBtn.checked) {
    if (cBtn.dataset.choice === questions[stage].answer) {
      points++;
    } else {
    cField.previousSibling.style.color = "red";
    cField.style.color = "red";
    }
    return true
  } else { // wykonaj, jeśli nic nie zostało zaznaczone
    uncheckAll();
    warningBlinking();
    return false; 
  }
};
const warningBlinking = () => {
  switchBlinking('blink');
  setTimeout(()=> {switchBlinking('');}, 1000); //reset animacji
};
const switchBlinking = (switchAnimation) => {  
  nextBtn.disabled = switchAnimation === "blink" ? true : false;
  Array.from(opts).forEach(btnSpan => btnSpan.style.animationName = `'${switchAnimation}'`);
};
const showCorrectAnswer = () => {
  if ((questions[stage].answer === "a")) {
    aField.previousSibling.style.color = "green";
    aField.style.color = "green";
    aField.style.fontWeight = "900";
  } else if ((questions[stage].answer === "b")) {
    bField.previousSibling.style.color = "green";
    bField.style.color = "green";
    bField.style.fontWeight = "900";
  } else {
    cField.previousSibling.style.color = "green";
    cField.style.color = "green";
    cField.style.fontWeight = "900";
  }
};
const changingQuestion = () => {
  if (stage < questions.length - 1) setTimeout(wrapOpacitySwitch, 400, "0");
  setTimeout(nextQuestion, 500);
  if (stage < questions.length - 1) setTimeout(wrapOpacitySwitch, 550, "1");
  stage++;
  progressBar.style.left = stage / questions.length * 100 + "%";
};
const restylePanel = () => {
  questionFields.forEach(field => field.style.color = "black");
  questionFields.forEach(field => field.style.fontWeight = "normal");
  questionFields.forEach(field => field.previousSibling.style.color = "black");
};
const nextQuestion = () => {
  stage < questions.length ? renderQuestion() : showResult();
};
const uncheckAll = () => {
  answerBtns.forEach(btn => btn.checked = false);
  switchLockButtons(false);
};
const wrapOpacitySwitch = (lvl) => {
  wrap.style.opacity = lvl;
};
const switchLockButtons = (lock) => {
  answerBtns.forEach(btn => btn.disabled = lock);
  nextBtn.disabled = lock;
};
const showResult = () => {
  questionWrap.style.top = "-480px";
  Array.from(document.getElementsByClassName('btn')).forEach(btn => {
    btn.style.top = "120px";
  })
  restartBtn.style.top = "0";
  if (points < 7) comment.innerText = lowGrade;
  else if (points < 15) comment.innerText = mediumGrade;
  else comment.innerText = highGrade;
};
nextBtn.addEventListener("click", () => {
  verification();
  pointsSpan.innerText = points;
});
restartBtn.addEventListener("click", () => {
  stage = 0;
  points = 0;
  questionWrap.style.top = "0px";

  Array.from(document.getElementsByClassName('btn')).forEach(btn => {
    btn.style.top = "0px";
  })
  restartBtn.style.top = "-150px";
  renderQuestion()
});

renderQuestion();

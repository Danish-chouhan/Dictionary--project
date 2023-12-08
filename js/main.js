// ----------------------------------------------- Created Element

const body = document.querySelector("body");
const Main = document.createElement("div")
const mainContainer = document.createElement("div");
const divForDefination = document.createElement("div");
const divForExample = document.createElement("div");
const buttonToGetDefination = document.createElement("button");
const buttonToGetExample = document.createElement("button");
const popUp = document.createElement("div")
const exitPopUp = document.createElement("button");
const Title = document.createElement("div")
const TitleName1 = document.createElement("h1")
const TitleName3 = document.createElement("h4")
const TitleName2 = document.createElement("h2")

// ----------------------------------------------- Setting class

Main.setAttribute("class", "main");
mainContainer.setAttribute("class", "mainContainer");
buttonToGetDefination.setAttribute("class", "buttonToGetDefination");
buttonToGetExample.setAttribute("class", "buttonToGetExample");
divForDefination.setAttribute("class", "Defination");
divForExample.setAttribute("class", "Example");
popUp.setAttribute("class","popUp")
exitPopUp.setAttribute("class","ExitPopUp")
Title.setAttribute("class","Title")
TitleName1.setAttribute("class","TitleName1")
TitleName2.setAttribute("class","TitleName2")
TitleName3.setAttribute("class","TitleName3")
// ----------------------------------------------- Setting Texts inside Element

exitPopUp.innerHTML = '<i class="fa-regular fa-circle-xmark" style="color: #000000;"></i>'
buttonToGetDefination.innerHTML = "Definations <i class='fa-solid fa-arrow-right' style='color: #ffffff;'></i>";
buttonToGetExample.innerHTML = "Examples <i class='fa-solid fa-arrow-right' style='color: #ffffff;'></i>";
TitleName1.innerHTML = "D<span>I</span>F"
TitleName2.textContent = "Dictionary"
TitleName3.textContent = "BY"
// ----------------------------------------------- append Elemet

Title.appendChild(TitleName2)
Title.appendChild(TitleName3)
Title.appendChild(TitleName1)
Main.appendChild(Title)
form(mainContainer);
mainContainer.appendChild(buttonToGetDefination);
mainContainer.appendChild(buttonToGetExample);
popUp.appendChild(exitPopUp)
popUp.appendChild(divForDefination);
popUp.appendChild(divForExample);
Main.appendChild(mainContainer)
body.appendChild(Main);

// ----------------------------------------------- fatched API

async function dictionaryApi(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const getingData = await fetch(apiUrl);
  return getingData.json();
}

// ----------------------------------------------- getting Definations and Examples From that

async function dictionary(word, type) {
  const dataFromApi = await dictionaryApi(word);
  if (!dataFromApi?.map) {
    console.log("sorry pal! no results availble for the poor word");
    return;
  }

  const meaningsArrays = dataFromApi.map((ele) => ele.meanings);
  const flattenedMeanings = meaningsArrays.flat();
  const definitions = flattenedMeanings
    .map((meaning) => meaning.definitions)
    .flat();
  const definitionNames = definitions.map((def) => def.definition);
  const examples = definitions.map((exe) => (exe.example ? exe.example : ""));
  const nonEmptyExamples = examples.filter((ele) => ele !== "");

  if (type === "defination") {
    domForDefination(definitionNames);
  } else if (type === "example") {
    domForExample(nonEmptyExamples);
  }
}

// ----------------------------------------------- Dom For Defination

function domForDefination(type) {
  divForDefination.style.display = "block";
  divForExample.style.display = "none";

  divForDefination.innerHTML = "";
  if (type.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No definitions found";
    divForDefination.appendChild(p);
  } else {
    for (let i = 0; i < type.length; i++) {
      const p = document.createElement("p");
      p.textContent = `${i + 1} : ${type[i]}`;
      divForDefination.appendChild(p);
    }
  }
  body.appendChild(popUp)
  exitPopUp.addEventListener("click",()=>{
    popUp.remove()
  })
}

// ----------------------------------------------- Dom For Examples

function domForExample(type) {
  divForExample.style.display = "block";
  divForDefination.style.display = "none";

  divForExample.innerHTML = "";
  if (type.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No examples found";
    divForExample.appendChild(p);
  } else {
    for (let i = 0; i < type.length; i++) {
      const p = document.createElement("p");
      p.textContent = `${i + 1} : ${type[i]}`;
      divForExample.appendChild(p);
    }
  }
  body.appendChild(popUp)
  exitPopUp.addEventListener("click",()=>{
    popUp.remove()
  })
}


// ----------------------------------------------- Form

function form(mainContainer) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.setAttribute("placeholder", "Find Here 🔍");

  input.type = "text";
  form.appendChild(input);
  mainContainer.appendChild(form);
  buttonToGetDefination.addEventListener("click", function (event) {
    const word = input.value;
    dictionary(word, "defination");
  });

  buttonToGetExample.addEventListener("click", function (event) {
    const word = input.value;
    dictionary(word, "example");
  });
}

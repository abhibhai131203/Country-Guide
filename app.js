

let input = document.querySelector("input");
let btn = document.querySelector("button");
let data;
let country;
let cname = document.querySelector(".name");
let ccapital = document.querySelector(".capital");
let ccurrency = document.querySelector(".currency");
let cpopu = document.querySelector(".popu");
let clang = document.querySelector(".lang");
let flag = document.querySelector("img")
let output = document.querySelector(".output");
// console.log(country);
async function fetch(count){
    try{
        let res = await axios.get(`https://restcountries.com/v3.1/name/${count}?fullText=true`);
        data = res.data[0];
        // console.log(res.data[0]);
    } catch{
       alert("Wrong country name!");
    }
    
}

btn.addEventListener("click",async ()=>{
    country = input.value;
    // country="Canada";
    if(country!=""){

        await fetch(country).then(async ()=>{
            // console.log(country);
            output.style.display="none";
            let flaglink = data.flags.svg;
            flag.setAttribute("src",flaglink);
            let capital = await getCapital();
            let currency = await getCurrency();
            let population = await getPopu();
            let language = await getLang();
            output.style.display="block";
            ccapital.innerHTML ="<b>Capital :</b> " + capital;
            ccurrency.innerHTML ="<b>Currency :</b> "+ currency;
            cpopu.innerHTML ="<b>Population :</b> "+ population;
            clang.innerHTML = "<b>Languages : </b>" +language;
            cname.innerHTML = `${country}`;
            // console.log(capital + " " + currency + " "+ population+ " " + language+ " "+flaglink);
        }) ;
        
    } else alert("Please enter country name!");
   
})
// fetch();

async function getCapital(){
    let cap = await data.capital[0];
    // console.log(cap);
    return cap;
}

async function getCurrency(){
    let curr = await data.currencies[Object.keys(data.currencies)].name;
    // console.log(curr);
    return curr;
}

async function getPopu(){
    let pop = await data.population;
    // console.log(pop);
    return pop;
}

async function getLang(){
    let lang = await Object.values(data.languages);
    let langs="";
    for(lan of lang){
        langs = langs +`${lan}` + ", ";
    }
    langs = langs.substring(0, langs.length-2);
    // console.log(langs);
    return langs;
}


const scriptURL = "PASTE_GOOGLE_SCRIPT_URL"

let index = 0

let system = []
let systemModifier = 0
let capability = []
let leverage = []
let bargaining = []
let ownership = 0

let industryType = "admin"

const industryMultiplier = {

admin:0.6,
manufacturing:0.8,
finance:1.0,
digital:1.15,
tech:1.3

}

function startAudit(){

document.getElementById("landing").classList.add("hidden")
document.getElementById("quizSection").classList.remove("hidden")

loadQuestion()

}

const questions=[

{
q:"Which industry best describes your work?",
type:"industry",
options:[
{text:"Administrative / clerical",score:3,value:"admin"},
{text:"Manufacturing / traditional corporate",score:5,value:"manufacturing"},
{text:"Finance / professional services",score:6,value:"finance"},
{text:"Digital business / ecommerce",score:8,value:"digital"},
{text:"Technology / AI",score:9,value:"tech"}
]
},

{
q:"What type of organization do you work in?",
type:"systemModifier",
options:[
{text:"Government / public sector",score:0},
{text:"Nonprofit / NGO",score:-1},
{text:"Established corporate",score:1},
{text:"High growth startup",score:2},
{text:"Entrepreneurial",score:3}
]
},

{
q:"What is the geographic scope of your market?",
type:"system",
options:[
{text:"Local city",score:3},
{text:"Regional",score:4},
{text:"National",score:5},
{text:"International",score:7},
{text:"Global digital",score:9}
]
},

{
q:"How directly does your role affect revenue?",
type:"system",
options:[
{text:"Internal support",score:3},
{text:"Operational support",score:5},
{text:"Indirect revenue",score:6},
{text:"Direct revenue role",score:8},
{text:"Core value creation",score:9}
]
},

{
q:"How scalable is the output of your industry?",
type:"system",
options:[
{text:"Manual services",score:3},
{text:"Limited scalability",score:4},
{text:"Moderate scalability",score:6},
{text:"Technology scale",score:8},
{text:"Massive digital scale",score:10}
]
},

{
q:"How fast is your industry growing?",
type:"system",
options:[
{text:"Declining",score:2},
{text:"Slow",score:4},
{text:"Stable",score:6},
{text:"Fast",score:8},
{text:"Explosive",score:10}
]
},

{
q:"How many years of experience do you have?",
type:"capability",
options:[
{text:"<1",score:3},
{text:"1–3",score:5},
{text:"3–6",score:7},
{text:"6–10",score:8},
{text:"10+",score:9}
]
},

{
q:"How complex are the problems you solve?",
type:"capability",
options:[
{text:"Routine",score:3},
{text:"Process",score:5},
{text:"Structured",score:6},
{text:"Strategic",score:8},
{text:"Innovative",score:9}
]
},

{
q:"How rare are your skills?",
type:"capability",
options:[
{text:"Common",score:3},
{text:"Moderate",score:4},
{text:"Scarce",score:6},
{text:"Very scarce",score:8},
{text:"Extremely rare",score:9}
]
},

{
q:"Decision autonomy level?",
type:"capability",
options:[
{text:"None",score:3},
{text:"Limited",score:5},
{text:"Moderate",score:6},
{text:"High",score:8},
{text:"Very high",score:9}
]
},

{
q:"How often do others rely on your expertise?",
type:"capability",
options:[
{text:"Rarely",score:3},
{text:"Sometimes",score:5},
{text:"Regularly",score:6},
{text:"Frequently",score:8},
{text:"Critically",score:9}
]
},

{
q:"People impacted by your work?",
type:"leverage",
options:[
{text:"<5",score:3},
{text:"5–20",score:5},
{text:"20–100",score:7},
{text:"100–1000",score:8},
{text:"1000+",score:10}
]
},

{
q:"Technology amplification of your work?",
type:"leverage",
options:[
{text:"None",score:2},
{text:"Limited",score:4},
{text:"Moderate",score:6},
{text:"High",score:8},
{text:"Extreme",score:10}
]
},

{
q:"Do you influence a team?",
type:"leverage",
options:[
{text:"No",score:3},
{text:"Small team",score:6},
{text:"Medium team",score:7},
{text:"Large team",score:8},
{text:"Organization wide",score:9}
]
},

{
q:"How scalable is your work output?",
type:"leverage",
options:[
{text:"Manual",score:2},
{text:"Mostly manual",score:4},
{text:"Some automation",score:6},
{text:"Highly scalable",score:8},
{text:"Platform level",score:10}
]
},

{
q:"If you stop working for a week, how much continues?",
type:"leverage",
options:[
{text:"None",score:2},
{text:"Little",score:4},
{text:"Some",score:6},
{text:"Significant",score:8},
{text:"Almost all",score:10}
]
},

{
q:"How easily could you get another job?",
type:"bargaining",
options:[
{text:"Very difficult",score:0.1},
{text:"Difficult",score:0.2},
{text:"Moderate",score:0.3},
{text:"Easy",score:0.4},
{text:"Very easy",score:0.5}
]
},

{
q:"Professional reputation strength?",
type:"bargaining",
options:[
{text:"Unknown",score:0.1},
{text:"Internal",score:0.2},
{text:"Local",score:0.3},
{text:"Industry known",score:0.4},
{text:"Strong brand",score:0.5}
]
},

{
q:"How many career options do you have?",
type:"bargaining",
options:[
{text:"Almost none",score:0.1},
{text:"Few",score:0.2},
{text:"Several",score:0.3},
{text:"Many",score:0.4},
{text:"Very many",score:0.5}
]
},

{
q:"Do you own equity in any business?",
type:"ownership",
options:[
{text:"None",score:0},
{text:"Bonus share",score:0.02},
{text:"Stock compensation",score:0.05},
{text:"Significant equity",score:0.1},
{text:"Founder",score:0.3}
]
}

]

function loadQuestion(){

const q = questions[index]

const percent = ((index+1)/questions.length)*100

document.getElementById("progressFill").style.width = percent + "%"

document.getElementById("progressText").innerText =
"Question " + (index+1) + " / " + questions.length

document.getElementById("question").innerText = q.q

const answers = document.getElementById("answers")

answers.innerHTML = ""

q.options.forEach(option=>{

const card = document.createElement("div")

card.className="card"
card.innerText=option.text

card.onclick=()=>{

storeAnswer(q.type,option)

index++

if(index<questions.length){

loadQuestion()

}else{

showLeadForm()

}

}

answers.appendChild(card)

})

}

function storeAnswer(type,option){

if(type==="industry"){
industryType=option.value
system.push(option.score)
}

if(type==="system") system.push(option.score)
if(type==="systemModifier") systemModifier=option.score
if(type==="capability") capability.push(option.score)
if(type==="leverage") leverage.push(option.score)
if(type==="bargaining") bargaining.push(option.score)
if(type==="ownership") ownership=option.score

}

function avg(arr){

return arr.reduce((a,b)=>a+b,0)/arr.length

}

function showLeadForm(){

document.getElementById("quizSection").classList.add("hidden")
document.getElementById("leadForm").classList.remove("hidden")

}
const scriptURL = "PASTE_GOOGLE_SCRIPT_URL"

let index = 0

let system = []
let systemModifier = 0
let capability = []
let leverage = []
let bargaining = []
let ownership = 0

let systemScore = 0
let capabilityScore = 0
let leverageScore = 0
let bargainingPower = 0
let captureRate = 0

function startAudit(){

document.getElementById("landing").classList.add("hidden")
document.getElementById("quizSection").classList.remove("hidden")

loadQuestion()

}

const questions = [

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
{text:"Entrepreneurial / independent",score:3}
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
{text:"Global digital market",score:9}
]
},

{
q:"How directly does your role affect revenue?",
type:"system",
options:[
{text:"Internal support role",score:3},
{text:"Operational support",score:5},
{text:"Indirect revenue contribution",score:6},
{text:"Direct revenue contribution",score:8},
{text:"Core value creation role",score:9}
]
},

{
q:"How scalable is the output of your industry?",
type:"system",
options:[
{text:"Mostly manual services",score:3},
{text:"Limited scalability",score:4},
{text:"Moderate scalability",score:6},
{text:"Technology-enabled scale",score:8},
{text:"Massive digital scalability",score:10}
]
},

{
q:"How fast is your industry growing?",
type:"system",
options:[
{text:"Declining",score:2},
{text:"Slow growth",score:4},
{text:"Stable",score:6},
{text:"Fast growth",score:8},
{text:"Explosive growth",score:10}
]
},

{
q:"How many years of professional experience do you have?",
type:"capability",
options:[
{text:"<1 year",score:3},
{text:"1–3 years",score:5},
{text:"3–6 years",score:7},
{text:"6–10 years",score:8},
{text:"10+ years",score:9}
]
},

{
q:"How complex are the problems you solve?",
type:"capability",
options:[
{text:"Routine tasks",score:3},
{text:"Process execution",score:5},
{text:"Structured problem solving",score:6},
{text:"Strategic decision making",score:8},
{text:"System-level innovation",score:9}
]
},

{
q:"How rare are your core skills in the job market?",
type:"capability",
options:[
{text:"Very common",score:3},
{text:"Common",score:4},
{text:"Moderately scarce",score:6},
{text:"Scarce",score:8},
{text:"Extremely scarce",score:9}
]
},

{
q:"How much autonomy do you have in decision making?",
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
q:"How often do others depend on your expertise?",
type:"capability",
options:[
{text:"Rarely",score:3},
{text:"Occasionally",score:5},
{text:"Regularly",score:6},
{text:"Frequently",score:8},
{text:"Critically",score:9}
]
},

{
q:"How many people are affected by your work output?",
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
q:"How much technology amplifies your work?",
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
q:"Do you manage or influence a team?",
type:"leverage",
options:[
{text:"No",score:3},
{text:"Small team (<5)",score:6},
{text:"Medium team (5–20)",score:7},
{text:"Large team (20+)",score:8},
{text:"Organization-wide influence",score:9}
]
},

{
q:"How scalable is your work output?",
type:"leverage",
options:[
{text:"Fully manual",score:2},
{text:"Mostly manual",score:4},
{text:"Some automation",score:6},
{text:"Highly scalable",score:8},
{text:"Platform / system level",score:10}
]
},

{
q:"If you stopped working for a week, how much output continues?",
type:"leverage",
options:[
{text:"None",score:2},
{text:"Very little",score:4},
{text:"Some",score:6},
{text:"Significant",score:8},
{text:"Almost everything",score:10}
]
},

{
q:"How easily could you get a comparable job within 3 months?",
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
q:"How strong is your professional reputation?",
type:"bargaining",
options:[
{text:"Unknown",score:0.1},
{text:"Known internally",score:0.2},
{text:"Known locally",score:0.3},
{text:"Known in industry",score:0.4},
{text:"Strong personal brand",score:0.5}
]
},

{
q:"How many credible career options do you have?",
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
q:"Do you have equity or ownership in a business?",
type:"ownership",
options:[
{text:"None",score:0},
{text:"Bonus / profit share",score:0.02},
{text:"Stock compensation",score:0.05},
{text:"Significant equity",score:0.1},
{text:"Founder / partner",score:0.3}
]
}

]

let industryType = "admin"

const industryMultiplier = {

admin:0.6,
manufacturing:0.8,
finance:1.0,
digital:1.15,
tech:1.3

}

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

card.className = "card"

card.innerText = option.text

card.onclick = ()=>{

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

industryType = option.value
system.push(option.score)

}

if(type==="system") system.push(option.score)

if(type==="systemModifier") systemModifier = option.score

if(type==="capability") capability.push(option.score)

if(type==="leverage") leverage.push(option.score)

if(type==="bargaining") bargaining.push(option.score)

if(type==="ownership") ownership = option.score

}

function avg(arr){

return arr.reduce((a,b)=>a+b,0)/arr.length

}

function showLeadForm(){

document.getElementById("quizSection").classList.add("hidden")

document.getElementById("leadForm").classList.remove("hidden")

}

function detectBottleneck(){

const minScore = Math.min(systemScore,capabilityScore,leverageScore)

if(minScore===systemScore){

return "Your current industry or economic system may be limiting your value creation potential."

}

if(minScore===leverageScore){

return "Your capability appears strong, but your role currently has limited leverage."

}

if(minScore===capabilityScore){

return "Your career growth may be constrained by capability development."

}

}

function submitLead(){

systemScore = Math.min(Math.max(avg(system)+systemModifier,1),10)

capabilityScore = Math.min(avg(capability),8.5)

leverageScore = avg(leverage)

bargainingPower = avg(bargaining)

const effort = 7

const multiplier = industryMultiplier[industryType]

const createdValue =
systemScore *
capabilityScore *
effort *
leverageScore *
multiplier

const capturePower =
(1.2 * bargainingPower) + (4 * ownership)

captureRate =
capturePower / (1 + capturePower)

const capturedValue =
createdValue * captureRate

let tier = "Survival"

if(capturedValue > 700) tier = "Frontier"
else if(capturedValue > 300) tier = "Strategic"
else if(capturedValue > 150) tier = "Professional"
else if(capturedValue > 70) tier = "Stability"

const estimatedIncome =
Math.round(capturedValue * 100000)

const currentIncome =
parseInt(document.getElementById("currentIncome").value) * 1000000

const valueGap =
estimatedIncome - currentIncome

fetch(scriptURL,{
method:"POST",
body:JSON.stringify({

name:document.getElementById("name").value,
email:document.getElementById("email").value,
age:document.getElementById("age").value,
city:document.getElementById("city").value,
role:document.getElementById("role").value,
industry:industryType,

currentIncome,
systemScore,
capabilityScore,
leverageScore,
captureRate,

careerTier:tier,
estimatedIncome,
valueGap

})

})

showResult(tier,estimatedIncome,valueGap)

}

function showResult(tier,income,gap){

document.getElementById("leadForm").classList.add("hidden")
document.getElementById("result").classList.remove("hidden")

document.getElementById("tier").innerText =
"Career Tier: " + tier

document.getElementById("income").innerText =
"Estimated Income Potential: Rp " + income.toLocaleString()

document.getElementById("gap").innerText =
detectBottleneck()

}
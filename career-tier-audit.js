const scriptURL="PASTE_GOOGLE_SCRIPT_URL"

const landing=document.getElementById("landing")
const quizSection=document.getElementById("quizSection")
const leadForm=document.getElementById("leadForm")
const result=document.getElementById("result")

const question=document.getElementById("question")
const answers=document.getElementById("answers")

const progressText=document.getElementById("progressText")
const progressFill=document.getElementById("progressFill")

const tierMarker=document.getElementById("tierMarker")
const careerChart=document.getElementById("careerChart")

const nameInput=document.getElementById("name")
const emailInput=document.getElementById("email")
const ageInput=document.getElementById("age")
const cityInput=document.getElementById("city")
const roleInput=document.getElementById("role")
const currentIncome=document.getElementById("currentIncome")

let index=0
let chart

let answersData=[]
let system=[]
let capability=[]
let leverage=[]
let bargaining=[]
let ownership=0
let industry="finance"

const industryMultiplier={
admin:0.6,
manufacturing:0.8,
finance:1,
digital:1.15,
tech:1.3
}

document.getElementById("startBtn").onclick=()=>{
resetQuiz()
landing.classList.add("hidden")
quizSection.classList.remove("hidden")
loadQuestion()
}

function resetQuiz(){
index=0
answersData=[]
system=[]
capability=[]
leverage=[]
bargaining=[]
ownership=0
}

const questions=[
{q:"Which industry best describes your work?",type:"industry",options:[
{text:"Administrative / clerical",score:3,val:"admin"},
{text:"Manufacturing / corporate",score:5,val:"manufacturing"},
{text:"Finance / professional services",score:6,val:"finance"},
{text:"Digital business / ecommerce",score:8,val:"digital"},
{text:"Technology / AI",score:9,val:"tech"}]},
{q:"What type of organization do you work in?",type:"system",options:[
{text:"Government / public sector",score:4},
{text:"Nonprofit / NGO",score:4},
{text:"Established corporate",score:6},
{text:"High growth startup",score:8},
{text:"Entrepreneurial / independent",score:9}]},
{q:"What is the geographic scope of your market?",type:"system",options:[
{text:"Local city",score:3},
{text:"Regional",score:4},
{text:"National",score:5},
{text:"International",score:7},
{text:"Global digital market",score:9}]},
{q:"How directly does your role affect revenue?",type:"system",options:[
{text:"Internal support role",score:3},
{text:"Operational support",score:5},
{text:"Indirect revenue contribution",score:6},
{text:"Direct revenue contribution",score:8},
{text:"Core value creation role",score:9}]},
{q:"How scalable is the output of your industry?",type:"system",options:[
{text:"Mostly manual services",score:3},
{text:"Limited scalability",score:4},
{text:"Moderate scalability",score:6},
{text:"Technology-enabled scale",score:8},
{text:"Massive digital scalability",score:10}]},
{q:"How fast is your industry growing?",type:"system",options:[
{text:"Declining",score:2},
{text:"Slow growth",score:4},
{text:"Stable",score:6},
{text:"Fast growth",score:8},
{text:"Explosive growth",score:10}]},
{q:"How many years of professional experience do you have?",type:"capability",options:[
{text:"<1 year",score:3},
{text:"1–3 years",score:5},
{text:"3–6 years",score:7},
{text:"6–10 years",score:8},
{text:"10+ years",score:9}]},
{q:"How complex are the problems you solve?",type:"capability",options:[
{text:"Routine tasks",score:3},
{text:"Process execution",score:5},
{text:"Structured problem solving",score:6},
{text:"Strategic decision making",score:8},
{text:"System-level innovation",score:9}]},
{q:"How rare are your core skills in the job market?",type:"capability",options:[
{text:"Very common",score:3},
{text:"Common",score:4},
{text:"Moderately scarce",score:6},
{text:"Scarce",score:8},
{text:"Extremely scarce",score:9}]},
{q:"How much autonomy do you have in decision making?",type:"capability",options:[
{text:"None",score:3},
{text:"Limited",score:5},
{text:"Moderate",score:6},
{text:"High",score:8},
{text:"Very high",score:9}]},
{q:"How often do others depend on your expertise?",type:"capability",options:[
{text:"Rarely",score:3},
{text:"Occasionally",score:5},
{text:"Regularly",score:6},
{text:"Frequently",score:8},
{text:"Critically",score:9}]},
{q:"How many people are affected by your work output?",type:"leverage",options:[
{text:"<5 people",score:3},
{text:"5–20 people",score:5},
{text:"20–100 people",score:7},
{text:"100–1000 people",score:8},
{text:"More than 1000 people",score:10}]},
{q:"How much technology amplifies your work?",type:"leverage",options:[
{text:"None",score:2},
{text:"Limited",score:4},
{text:"Moderate",score:6},
{text:"High",score:8},
{text:"Extreme",score:10}]},
{q:"Do you manage or influence a team?",type:"leverage",options:[
{text:"No",score:3},
{text:"Small team (<5)",score:6},
{text:"Medium team (5–20)",score:7},
{text:"Large team (20+)",score:8},
{text:"Organization-wide influence",score:9}]},
{q:"How scalable is your work output?",type:"leverage",options:[
{text:"Fully manual",score:2},
{text:"Mostly manual",score:4},
{text:"Some automation",score:6},
{text:"Highly scalable",score:8},
{text:"Platform level scalability",score:10}]},
{q:"If you stopped working for a week, how much output continues?",type:"leverage",options:[
{text:"None",score:2},
{text:"Very little",score:4},
{text:"Some",score:6},
{text:"Significant",score:8},
{text:"Almost everything",score:10}]},
{q:"How easily could you get another comparable job within 3 months?",type:"bargaining",options:[
{text:"Very difficult",score:0.1},
{text:"Difficult",score:0.2},
{text:"Moderate",score:0.3},
{text:"Easy",score:0.4},
{text:"Very easy",score:0.5}]},
{q:"How strong is your professional reputation?",type:"bargaining",options:[
{text:"Unknown",score:0.1},
{text:"Known internally",score:0.2},
{text:"Known locally",score:0.3},
{text:"Known in industry",score:0.4},
{text:"Strong personal brand",score:0.5}]},
{q:"How many credible career options do you have?",type:"bargaining",options:[
{text:"Almost none",score:0.1},
{text:"Few",score:0.2},
{text:"Several",score:0.3},
{text:"Many",score:0.4},
{text:"Very many",score:0.5}]},
{q:"Do you have equity or ownership in a business?",type:"ownership",options:[
{text:"None",score:0},
{text:"Bonus / profit share",score:0.02},
{text:"Stock compensation",score:0.05},
{text:"Significant equity",score:0.1},
{text:"Founder / partner",score:0.3}]}
]

function loadQuestion(){
let q=questions[index]
question.innerText=q.q
answers.innerHTML=""
q.options.forEach(opt=>{
let card=document.createElement("div")
card.className="card"
card.innerText=opt.text
card.onclick=function(){
document.querySelectorAll(".card").forEach(c=>c.classList.remove("selected"))
card.classList.add("selected")
storeAnswer(q.type,opt)
setTimeout(()=>{
index++
if(index<questions.length){loadQuestion()}
else{
quizSection.classList.add("hidden")
leadForm.classList.remove("hidden")
}
},200)
}
answers.appendChild(card)
})
progressText.innerText="Question "+(index+1)+" / "+questions.length
progressFill.style.width=((index+1)/questions.length*100)+"%"
}

function storeAnswer(type,opt){
answersData.push(opt.text)
if(type==="industry") industry=opt.val
if(type==="system") system.push(opt.score)
if(type==="capability") capability.push(opt.score)
if(type==="leverage") leverage.push(opt.score)
if(type==="bargaining") bargaining.push(opt.score)
if(type==="ownership") ownership=opt.score
}

function avg(a){if(a.length===0) return 0; return a.reduce((x,y)=>x+y,0)/a.length}

document.getElementById("seeResult").onclick=function(){

let s=avg(system)
let c=avg(capability)
let l=avg(leverage)
let b=avg(bargaining)

let created=Math.pow(s,0.7)*c*Math.pow(l,0.7)*industryMultiplier[industry]

let capturePower=1.2*b+3*ownership
let captureRate=capturePower/(1+capturePower)

let captured=created*captureRate

let income=captured*450000
income=Math.max(3000000,income)
income=Math.min(150000000,income)

const incomeMap={5:3000000,10:7500000,20:15000000,40:30000000,80:60000000}

let current=incomeMap[Number(currentIncome.value)]
let gap=Math.max(0,income-current)

let tierLevel=getTier(captured)
tierMarker.style.left=getTierPosition(tierLevel)

document.getElementById("tier").innerText="Career Tier: "+tierLevel

document.getElementById("income").innerText="Estimated Income Potential: Rp "+Math.round(income).toLocaleString()

document.getElementById("gap").innerText="Income Gap vs Current: Rp "+Math.round(gap).toLocaleString()

document.getElementById("valueCreation").innerText="Value Creation Score: "+created.toFixed(1)

document.getElementById("captureRate").innerText="Value Capture Rate: "+(captureRate*100).toFixed(1)+"%"

document.getElementById("diagnosis").innerText=generateDiagnosis(s,c,l,b,ownership)

renderChart(s,c,l,captureRate)

sendLead()

leadForm.classList.add("hidden")
result.classList.remove("hidden")
}

function getTier(v){
if(v<15) return "Survival"
if(v<35) return "Stability"
if(v<70) return "Professional"
if(v<140) return "Strategic"
return "Frontier"
}

function getTierPosition(t){
return{
Survival:"0%",
Stability:"25%",
Professional:"50%",
Strategic:"75%",
Frontier:"100%"
}[t]
}

function generateDiagnosis(s,c,l,b,o){
let values={System:s,Capability:c,Leverage:l,Bargaining:b*10,Ownership:o*10}
let lowest=Object.keys(values).reduce((a,b)=>values[a]<values[b]?a:b)
if(lowest==="System") return "Your industry system limits value creation."
if(lowest==="Capability") return "Your capability depth may need strengthening."
if(lowest==="Leverage") return "Your work relies mostly on direct labor."
if(lowest==="Bargaining") return "Your bargaining power may limit compensation."
return "Ownership structures could increase upside."
}

function renderChart(s,c,l,cr){
if(chart) chart.destroy()
chart=new Chart(careerChart,{
type:"radar",
data:{labels:["System","Capability","Leverage","Capture"],datasets:[{data:[s,c,l,cr*10]}]},
options:{scales:{r:{min:0,max:10}}}
})
}

function sendLead(){
fetch(scriptURL,{
method:"POST",
mode:"no-cors",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
name:nameInput.value,
email:emailInput.value,
age:ageInput.value,
city:cityInput.value,
role:roleInput.value,
answers:answersData.join("|")
})
}).catch(()=>{})
}

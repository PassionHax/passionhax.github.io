const scriptURL="https://script.google.com/macros/s/AKfycbycrnpRQ7ZnZqMnTlPPnHEyde89VCH1bjUKmudbUPnp_S-0ce0uWgojgSV-IsCShijJ/exec"

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

if(!nameInput.value || !emailInput.value){
alert("Please fill in your name and email.")
return
}

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

let gapScore = 0

if(income>0){
gapScore = Math.max(0, ((income-current)/income)*100)
}

let narrative=""

if(current>income){

narrative="Your current compensation may exceed the structural value of your role. This can happen due to tenure, organizational context, or compensation structures."

}
else if(gap>current){

narrative="Your career income potential appears significantly higher than your current earnings."

}
else if(gap>current*0.5){

narrative="Your career income potential is moderately higher than your current income."

}
else{

narrative="Your current income appears relatively aligned with your estimated career value."

}

document.getElementById("resultNarrative").innerText=narrative

// income comparison bars

const currentBar = document.getElementById("currentIncomeBar")
const potentialBar = document.getElementById("potentialIncomeBar")

if(currentBar && potentialBar){

let maxIncome = Math.max(income, current)

let currentPercent = (current / maxIncome) * 100
let potentialPercent = (income / maxIncome) * 100

currentBar.style.width = currentPercent + "%"
potentialBar.style.width = potentialPercent + "%"

}

let tierLevel=getTier(captured)
let nextTier=getNextTier(tierLevel)
renderTrajectoryProjection(nextTier,current)
tierMarker.style.left=getTierPosition(tierLevel)

document.getElementById("reportUser").innerText=
"Personalized report for: "+nameInput.value

document.getElementById("tier").innerText="Your Career Tier: "+tierLevel

document.getElementById("nextTier").innerText="Your Next Career Tier: "+nextTier

document.getElementById("tierBenchmark").innerText=getTierBenchmark(tierLevel)

document.getElementById("marketSalary").innerText=getMarketSalary(tierLevel)

document.getElementById("income").innerText="Your Estimated Income Potential: Rp "+Math.round(income).toLocaleString()+" / month"

document.getElementById("currentIncomeDisplay").innerText="Your Estimated Current Income: Rp "+Math.round(current).toLocaleString()+" / month"

document.getElementById("gap").innerText="Estimated Income Gap: Rp "+Math.round(gap).toLocaleString()+" / month"

document.getElementById("gapScore").innerText="Career Value Gap: "+gapScore.toFixed(0)+"%"

let severity=getGapSeverity(gapScore)

document.getElementById("gapSeverity").innerText=
"Gap Severity Level: "+severity

const gapBarFill=document.getElementById("gapBarFill")
const gapBarText=document.getElementById("gapBarText")

if(gapBarFill){

let visualGap=Math.min(100,gapScore)

gapBarFill.style.width="0%"

setTimeout(()=>{
gapBarFill.style.width=visualGap+"%"
},300)

let message="Your estimated career value gap is approximately "+visualGap.toFixed(0)+"%."

if(visualGap>60){
message+=" This suggests significant untapped career value."
}
else if(visualGap>30){
message+=" There may be meaningful room for career repositioning."
}
else{
message+=" Your income appears relatively aligned with your career value."
}

gapBarText.innerText=message

}

document.getElementById("valueCreation").innerText="Value Creation Score: "+created.toFixed(1)

document.getElementById("captureRate").innerText="Value Capture Rate: "+(captureRate*100).toFixed(1)+"%"

let constraint=findConstraint(s,c,l,b)

let leadScore=calculateLeadScore(gapScore,c,l,b)

let strategy=generateStrategy(constraint)
document.getElementById("strategyText").innerText=strategy

renderDiagnosticSummary(tierLevel,constraint,gap,gapScore)

document.getElementById("constraintHighlight").innerText=
"Your biggest career constraint: "+constraint

document.getElementById("diagnosis").innerText=generateDiagnosis(s,c,l,b,ownership)

renderChart(s,c,l,captureRate)
renderScorecard(s,c,l,captureRate,constraint)

sendLead({
tier:tierLevel,
income:income,
gap:gap,
gapScore:gapScore,
created:created,
captureRate:captureRate,
constraint:constraint,
leadScore:leadScore
})

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

let constraint=findConstraint(s,c,l,b)

let opportunity=generateOpportunity(constraint)
document.getElementById("opportunity").innerText=opportunity

document.getElementById("frameworkExplain").innerText=
`This audit estimates career value using a simple model:
Captured Value = Created Value × Capture Rate.
Created Value = System × Capability × Effort × Leverage`

let ctaText=generateCTA(constraint)
document.getElementById("ctaExplain").innerText=ctaText

if(constraint==="System"){
return "Your industry or organizational system may limit how much value your work can generate. Careers in higher-growth industries or scalable systems tend to unlock significantly greater value creation."
}

if(constraint==="Capability"){
return "Your current capability depth may be limiting your ability to take on higher-value responsibilities. Developing rare or high-impact skills can significantly increase your career value."
}

if(constraint==="Leverage"){
return "Your current role likely relies heavily on direct labor rather than scalable leverage. Higher-tier careers typically influence larger systems, teams, or technology platforms."
}

if(constraint==="Bargaining"){
return "Your bargaining power may currently limit how much value you capture from your work. Stronger market positioning and reputation can significantly increase compensation outcomes."
}

return "Your career structure may benefit from strategic repositioning to unlock higher value."
}

function renderChart(s,c,l,cr){
if(chart) chart.destroy()
chart=new Chart(careerChart,{
type:"radar",
data:{labels:["System","Capability","Leverage","Capture"],datasets:[{data:[s,c,l,cr*10]}]},
options:{scales:{r:{min:0,max:10}}}
})
}

function sendLead(data){

if(!scriptURL || scriptURL==="PASTE_GOOGLE_SCRIPT_URL") return

fetch(scriptURL,{
method:"POST",
mode:"no-cors",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

name:nameInput.value,
email:emailInput.value,
age:ageInput.value,
city:cityInput.value,
role:roleInput.value,

industry:industry,

tier:data.tier,
incomePotential:Math.round(data.income),
incomeGap:Math.round(data.gap),
gapScore:data.gapScore,

valueCreation:data.created.toFixed(1),
captureRate:(data.captureRate*100).toFixed(1),

constraint:data.constraint,

leadScore:data.leadScore,

answers:answersData.join("|")

})
}).catch(()=>{})

}

function findConstraint(s,c,l,b){

let values={
System:s,
Capability:c,
Leverage:l,
Bargaining:b*20
}

return Object.keys(values)
.reduce((a,b)=>values[a]<values[b]?a:b)

}

function getNextTier(t){

return{
Survival:"Stability",
Stability:"Professional",
Professional:"Strategic",
Strategic:"Frontier",
Frontier:"Frontier"
}[t]

}

function generateOpportunity(c){

if(c==="System"){
return "Moving into higher-growth industries or scalable business environments could significantly increase the value your work creates."
}

if(c==="Capability"){
return "Strengthening rare and high-impact skills may unlock higher-value career opportunities."
}

if(c==="Leverage"){
return "Repositioning into roles with greater leverage over systems, teams, or technology could significantly increase your income potential."
}

if(c==="Bargaining"){
return "Improving your professional positioning and reputation could help you capture more value from your work."
}

return "Strategic career repositioning could unlock higher value opportunities."
}

function generateStrategy(constraint){

if(constraint==="System"){
return "Your current industry or organizational system may be limiting the value your work can generate. Consider repositioning into higher-growth industries or more scalable environments such as technology, digital platforms, or high-growth startups."
}

if(constraint==="Capability"){
return "Your next career tier likely requires deeper or rarer capabilities. Focus on developing high-leverage skills such as strategic problem solving, revenue impact skills, or technical expertise that are scarce in the job market."
}

if(constraint==="Leverage"){
return "Your current role may rely too heavily on direct effort rather than scalable leverage. Consider moving into roles that influence systems, technology platforms, or larger teams where your output can impact hundreds or thousands of people."
}

if(constraint==="Bargaining"){
return "Your bargaining power may be limiting how much value you capture from your work. Strengthening your professional positioning, reputation, and alternative career options can significantly improve compensation outcomes."
}

return "Strategic career repositioning may unlock significantly higher value creation and income potential."
}

function generateCTA(c){

if(c==="System"){
return "In the Career Tier Strategy Call we will explore industries and environments where your skills can create significantly more value."
}

if(c==="Capability"){
return "In the Career Tier Strategy Call we will identify the capabilities that could unlock your next career tier."
}

if(c==="Leverage"){
return "In the Career Tier Strategy Call we will identify roles and career paths with greater leverage over systems, teams, or technology."
}

if(c==="Bargaining"){
return "In the Career Tier Strategy Call we will explore strategies to strengthen your professional positioning and compensation leverage."
}

return "In the Career Tier Strategy Call we will identify the fastest path to your next career tier."
}

function getTierBenchmark(t){

if(t==="Survival"){
return "Professionals in this tier often struggle to create sustainable career value."
}

if(t==="Stability"){
return "Many professionals remain in the Stability tier for much of their careers."
}

if(t==="Professional"){
return "Professionals in this tier typically develop strong skills but may still lack career leverage."
}

if(t==="Strategic"){
return "Strategic tier professionals often influence larger systems, teams, or business outcomes."
}

if(t==="Frontier"){
return "Frontier tier careers are rare and typically involve high leverage, ownership, or industry leadership."
}

return ""
}

function getMarketSalary(t){

if(t==="Survival"){
return "Typical income range in Indonesia: Rp 3M – 6M / month"
}

if(t==="Stability"){
return "Typical income range in Indonesia: Rp 6M – 12M / month"
}

if(t==="Professional"){
return "Typical income range in Indonesia: Rp 10M – 20M / month"
}

if(t==="Strategic"){
return "Typical income range in Indonesia: Rp 20M – 50M / month"
}

if(t==="Frontier"){
return "Typical income range in Indonesia: Rp 50M+ / month"
}

return ""
}

const resetBtn=document.getElementById("resetAuditBtn")

if(resetBtn){

resetBtn.onclick=function(){

result.classList.add("hidden")

landing.classList.remove("hidden")

resetQuiz()

if(chart){
chart.destroy()
chart=null
}

window.scrollTo({
top:0,
behavior:"smooth"
})

}

}

const downloadBtn=document.getElementById("downloadReportBtn")

if(downloadBtn){

downloadBtn.onclick=function(){

window.print()

}

}

function renderScorecard(s,c,l,cr,constraint){

document.querySelectorAll(".constraintHighlight")
.forEach(el=>el.classList.remove("constraintHighlight"))

let captureScore=cr*10

document.getElementById("systemScore").innerText=s.toFixed(1)+" / 10"
document.getElementById("capabilityScore").innerText=c.toFixed(1)+" / 10"
document.getElementById("leverageScore").innerText=l.toFixed(1)+" / 10"
document.getElementById("captureScore").innerText=captureScore.toFixed(1)+" / 10"

document.getElementById("systemBar").style.width=(s*10)+"%"
document.getElementById("capabilityBar").style.width=(c*10)+"%"
document.getElementById("leverageBar").style.width=(l*10)+"%"
document.getElementById("captureBar").style.width=(captureScore*10)+"%"

if(constraint==="System"){
document.getElementById("systemScore").classList.add("constraintHighlight")
}

if(constraint==="Capability"){
document.getElementById("capabilityScore").classList.add("constraintHighlight")
}

if(constraint==="Leverage"){
document.getElementById("leverageScore").classList.add("constraintHighlight")
}

if(constraint==="Bargaining"){
document.getElementById("captureScore").classList.add("constraintHighlight")
}

}

function renderDiagnosticSummary(tier,constraint,gap,gapScore){

let el=document.getElementById("diagnosticSummary")

if(!el){
return
}

let text="<b>Audit Summary</b><br><br>"

text+="Current Career Tier: "+tier+"<br>"
text+="Primary Career Constraint: "+constraint+"<br>"
text+="Estimated Monthly Income Gap: Rp "+Math.round(gap).toLocaleString()+"<br>"
text+="Career Value Gap: "+gapScore.toFixed(0)+"%"

el.innerHTML=text

}

function renderTrajectoryProjection(nextTier,currentValue){

let ranges={
Survival:[3000000,6000000],
Stability:[6000000,12000000],
Professional:[10000000,20000000],
Strategic:[20000000,50000000],
Frontier:[50000000,120000000]
}

let r=ranges[nextTier]

let min=r[0]
let max=r[1]

document.getElementById("projectionTier").innerText=
"If you reach "+nextTier+" tier"

document.getElementById("projectionIncome").innerText=
"Typical income range: Rp "+min.toLocaleString()+" – Rp "+max.toLocaleString()+" / month"

let upsideMin=min-currentValue
let upsideMax=max-currentValue

upsideMin=Math.max(0,upsideMin)
upsideMax=Math.max(0,upsideMax)

document.getElementById("projectionUpside").innerText=
"Potential income upside: + Rp "+upsideMin.toLocaleString()+" – Rp "+upsideMax.toLocaleString()+" / month"

}

function getGapSeverity(gapScore){

if(gapScore<20){
return "Low Gap"
}

if(gapScore<40){
return "Moderate Gap"
}

if(gapScore<70){
return "High Gap"
}

return "Extreme Gap"

}

function calculateLeadScore(gapScore,c,l,b){

let score=0

// gap importance
score+=gapScore*0.5

// capability
score+=c*5

// leverage
score+=l*5

// bargaining
score+=b*40

return Math.round(score)

}
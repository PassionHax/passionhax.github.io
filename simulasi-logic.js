// Backend endpoint (isi URL deployment Apps Script Simulasi)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxiCRc9LmRaLZGV1Z-Kl1-OWyZiMDj1bSLQXdFFyr3asTdS6tUAmkrJ4rM2z3RWsBzk8Q/exec';

// DOM Elements
const screens = document.querySelectorAll('.screen');
const formatCurrency = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);

// State
let userData = {
  name: '',
  role: '',
  age: 28,
  income: 15000000,
  target: 50000000,
  email: '',
  phone: ''
};

let chartParams = {
  annualRaise: 0.06,
  jumpB: 0.25,
  jumpC: 0.40,
  interval: 3
};

let chartInstance = null;

// Realism Variable 1: Tier Difficulty Multiplier (band tier KB v6)
function getDifficultyMultiplier(income) {
  if (income < 10000000) return 1.0; // Tier 1/2: Starter / Executor
  if (income < 25000000) return 0.8; // Tier 3: Specialist
  if (income < 45000000) return 0.6; // Tier 4: Strategist
  if (income < 250000000) return 0.35; // Tier 5: Architect
  return 0.0; // Above 250M: Absolute Structural Ceiling
}

// Realism Variable 2: Age-Based Friction (Aging Out)
function getAgeMultiplier(currentAge, income) {
  if (currentAge >= 40 && income < 45000000) return 0.75; // 25% penalty
  if (currentAge >= 35 && income < 25000000) return 0.85; // 15% penalty
  return 1.0;
}

// Navigation
function nextScreen(targetId) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(targetId).classList.add('active');
  window.scrollTo(0,0);
}

const inIncome = document.getElementById('inIncome');
const inTarget = document.getElementById('inTarget');
const slCurrentIncome = document.getElementById('slCurrentIncome');

function startLoading() {
  userData.role = document.getElementById('inRole').value || 'Profesional';
  userData.age = parseInt(document.getElementById('inAge').value) || 28;
  userData.income = parseInt(inIncome.value) || 15000000;
  userData.target = parseInt(inTarget.value) || 50000000;
  userData.name = ((document.getElementById('inName') || {}).value || '').trim();
  userData.email = document.getElementById('inEmail').value;
  userData.phone = (document.getElementById('inPhone') || {}).value || '';

  sendToBackend();

  slCurrentIncome.value = userData.income;
  document.getElementById('valCurrentIncome').innerText = formatCurrency(userData.income);

  nextScreen('screen-loading');

  setTimeout(() => {
    initChart();
    updateNarrative();
    nextScreen('screen-result');
  }, 2500);
}

// Kirim hasil simulasi ke backend (email wajib + WA opsional)
function sendToBackend() {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.indexOf('PASTE') !== -1) return;
  const { dataA, dataC } = calculateProjection();
  const target = userData.target;
  const yC = dataC.findIndex(v => v >= target);
  const yA = dataA.findIndex(v => v >= target);
  const payload = {
    action: 'simulasi_request',
    name: userData.name,
    email: userData.email,
    whatsapp: userData.phone || '',
    role: userData.role,
    age: userData.age,
    income: userData.income,
    target: userData.target,
    result: {
      projA15: Math.round(dataA[15]),
      projC15: Math.round(dataC[15]),
      ageHitC: yC === -1 ? null : userData.age + yC,
      ageHitA: yA === -1 ? null : userData.age + yA
    }
  };
  try {
    fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
  } catch (e) { console.warn('Sim backend error:', e); }
}

// Chart Logic with V7 Optimistic Realities
function calculateProjection() {
  const years = Array.from({length: 16}, (_, i) => i);
  let dataA = [userData.income];
  let dataB = [userData.income];
  let dataC = [userData.income];
  let initialEquity = userData.income >= 45000000 ? userData.income + (userData.income - 45000000) * 1.5 : userData.income;
  let dataEquity = [initialEquity];

  let currentIntervalB = chartParams.interval;
  let currentIntervalC = chartParams.interval;
  
  let lastJumpYearB = 0;
  let lastJumpYearC = 0;

  for (let i = 1; i <= 15; i++) {
    let currentAge = userData.age + i;

    // Realism Variable 3: Tenure Elasticity
    // Interval dynamically stretches based on the tier you are in
    if (dataC[i-1] >= 45000000) currentIntervalC = Math.max(chartParams.interval, 5);
    else if (dataC[i-1] >= 25000000) currentIntervalC = Math.max(chartParams.interval, 4);

    if (dataB[i-1] >= 45000000) currentIntervalB = Math.max(chartParams.interval, 5);
    else if (dataB[i-1] >= 25000000) currentIntervalB = Math.max(chartParams.interval, 4);

    let isJumpB = (i - lastJumpYearB >= currentIntervalB);
    let isJumpC = (i - lastJumpYearC >= currentIntervalC);
    
    if (isJumpB) lastJumpYearB = i;
    if (isJumpC) lastJumpYearC = i;
    
    let multA = getDifficultyMultiplier(dataA[i-1]) * getAgeMultiplier(currentAge, dataA[i-1]);
    let multB = getDifficultyMultiplier(dataB[i-1]) * getAgeMultiplier(currentAge, dataB[i-1]);
    let multC = getDifficultyMultiplier(dataC[i-1]) * getAgeMultiplier(currentAge, dataC[i-1]);

    // Calculate Nominal Values (No Inflation Discount in V7)
    dataA.push(dataA[i-1] * (1 + (chartParams.annualRaise * multA)));
    
    let raiseB = isJumpB ? (chartParams.jumpB * multB) : (chartParams.annualRaise * multB);
    dataB.push(dataB[i-1] * (1 + raiseB));
    
    let raiseC = isJumpC ? (chartParams.jumpC * multC) : (chartParams.annualRaise * multC);
    dataC.push(dataC[i-1] * (1 + raiseC));

    // Realism Variable 4: Equity & Bonus Explosion
    // The positive vibe reward for reaching Tier 5
    if (dataC[i] >= 45000000) {
      let equityNominal = (dataC[i] - 45000000) * 1.5;
      dataEquity.push(dataC[i] + equityNominal); // Placed ON TOP of Jalur C
    } else {
      dataEquity.push(dataC[i]); // Overlaps perfectly when no equity
    }
  }

  return { years, dataA, dataB, dataC, dataEquity };
}

function initChart() {
  const ctx = document.getElementById('projectionChart').getContext('2d');
  
  Chart.defaults.color = '#7A7A82';
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  const { years, dataA, dataB, dataC, dataEquity } = calculateProjection();

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years.map(y => `Thn ${y}`),
      datasets: [
        {
          label: 'Jalur A (Stay)',
          data: dataA,
          borderColor: '#6B7280',
          borderWidth: 2,
          tension: 0.4
        },
        {
          label: 'Jalur B (Regular Reposition)',
          data: dataB,
          borderColor: '#FBBF24',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4
        },
        {
          label: 'Jalur C (Passion Hax)',
          data: dataC,
          borderColor: '#E8893A',
          backgroundColor: 'rgba(232, 137, 58, 0.1)',
          borderWidth: 3,
          fill: true, // Restore the v2 bottom fill
          tension: 0.4
        },
        {
          label: 'Equity & Bonus (Tier 5)',
          data: dataEquity,
          borderColor: 'transparent',
          backgroundColor: 'rgba(250, 204, 21, 0.25)', // Gold/Yellow
          borderWidth: 0,
          fill: '-1', // Fill down to previous dataset (Jalur C)
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 15, 18, 0.95)',
          titleColor: '#F5F3EE',
          bodyColor: '#F5F3EE',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) {
                let val = context.parsed.y;
                // If it's the Equity dataset (index 3), subtract Jalur C (index 2) to show the isolated equity value
                if (context.datasetIndex === 3) {
                  const dataCValue = context.chart.data.datasets[2].data[context.dataIndex];
                  val = val - dataCValue;
                  if (val === 0) return null; // Don't show tooltip if equity is 0
                }
                label += formatCurrency(val);
              }
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            callback: function(value) {
              return 'Rp ' + (value / 1000000).toFixed(0) + ' Jt';
            }
          }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

function updateChart() {
  if (!chartInstance) return;
  const { dataA, dataB, dataC, dataEquity } = calculateProjection();
  chartInstance.data.datasets[0].data = dataA;      // Jalur A
  chartInstance.data.datasets[1].data = dataB;      // Jalur B
  chartInstance.data.datasets[2].data = dataC;      // Jalur C
  chartInstance.data.datasets[3].data = dataEquity; // Equity
  chartInstance.update();
  updateNarrative();
}

function updateNarrative() {
  const { dataA, dataC } = calculateProjection();
  
  const equityAlert = document.getElementById('equityAlert');
  const ceilingWarning = document.getElementById('ceilingWarning');
  
  const maxC = Math.max(...dataC);
  const maxA = Math.max(...dataA);
  
  // Show equity alert when Path C reaches Architect tier (KB v6: >45jt)
  if (maxC >= 45000000) {
    equityAlert.style.display = 'block';
  } else {
    equityAlert.style.display = 'none';
  }

  // Show ceiling warning only if Path A or B are clearly flattening without hitting equity
  if (maxA < 45000000 && maxA >= 25000000) {
      ceilingWarning.style.display = 'none'; 
  } else {
      ceilingWarning.style.display = 'none';
  }

  let yearHitC = dataC.findIndex(val => val >= userData.target);
  let yearHitA = dataA.findIndex(val => val >= userData.target);

  const outAgeTarget = document.getElementById('outAgeTarget');
  const outTargetIncome = document.getElementById('outTargetIncome');
  const narrativeText = document.getElementById('narrativeText');
  
  outTargetIncome.innerText = formatCurrency(userData.target);
  outAgeTarget.innerText = (userData.age + 5);

  if (yearHitC === -1) {
    narrativeText.innerHTML = `Dalam 15 tahun ke depan (di usia ${userData.age + 15}), target <span class="result-highlight">${formatCurrency(userData.target)}</span> belum tercapai.<br>Bahkan dengan <strong>Jalur C</strong>, nilainya baru di angka ${formatCurrency(dataC[15])}. Waktunya mereposisi *capability* Anda secara radikal.`;
  } else {
    let ageHitC = userData.age + yearHitC;
    if (yearHitA === -1) {
      narrativeText.innerHTML = `Di usia <strong style="color:var(--text)">${ageHitC}</strong>, melalui <strong>Jalur C</strong> kamu sukses menembus target <span class="result-highlight">${formatCurrency(userData.target)}</span>. <br>Jika kamu pasif di <strong>Jalur A</strong>, hingga usia ${userData.age + 15} pun kamu hanya akan mentok di ${formatCurrency(dataA[15])}. Reposisi struktural mengubah segalanya.`;
    } else {
      let ageHitA = userData.age + yearHitA;
      let gap = ageHitA - ageHitC;
      narrativeText.innerHTML = `Melalui <strong>Jalur C</strong> kamu meroket mencapai target <span class="result-highlight">${formatCurrency(userData.target)}</span> di usia <strong style="color:var(--text)">${ageHitC}</strong>. <br>Di <strong>Jalur A</strong>, kamu baru mencapainya di usia ${ageHitA}. Strategi yang tepat menghemat <strong>${gap} tahun</strong> hidupmu!`;
    }
  }
}

// Sliders Event Listeners
const slAnnualRaise = document.getElementById('slAnnualRaise');
const slInterval = document.getElementById('slInterval');
const slJumpC = document.getElementById('slJumpC');

slCurrentIncome.addEventListener('input', (e) => {
  userData.income = parseInt(e.target.value);
  document.getElementById('valCurrentIncome').innerText = formatCurrency(userData.income);
  updateChart();
});

slAnnualRaise.addEventListener('input', (e) => {
  chartParams.annualRaise = parseInt(e.target.value) / 100;
  document.getElementById('valAnnualRaise').innerText = `${e.target.value}%`;
  updateChart();
});

slInterval.addEventListener('input', (e) => {
  chartParams.interval = parseInt(e.target.value);
  document.getElementById('valInterval').innerText = `Tiap ${e.target.value} Tahun`;
  updateChart();
});

slJumpC.addEventListener('input', (e) => {
  chartParams.jumpC = parseInt(e.target.value) / 100;
  document.getElementById('valJumpCSlider').innerText = `${e.target.value}%`;
  const valJumpCLegend = document.getElementById('valJumpC');
  if (valJumpCLegend) valJumpCLegend.innerText = `${e.target.value}%`;
  updateChart();
});

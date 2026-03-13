let rankScore = 0;
let goals = [];

// --- EXPANDED UNIVERSITY DATABASE WITH LINKS ---
const universities = {
  "University of Auckland": {
    "Engineering (Hons)": { rank: 260, req: ["Calculus", "Physics"], note: true, link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-engineering-honours-behons.html" },
    "Computer Science": { rank: 210, req: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-science-bsc.html" },
    "Biomedical Science": { rank: 280, req: ["Chemistry", "Physics"], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-science-bsc.html" },
    "Health Sciences": { rank: 250, req: ["Biology", "Chemistry"], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-health-sciences-bhsc.html" },
    "Law (Part I)": { rank: 260, req: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-laws-llb.html" },
    "Commerce / Business": { rank: 210, req: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-commerce-bcom.html" },
    "Architecture": { rank: 230, req: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-architectural-studies-bas.html" },
    "Arts (BA)": { rank: 150, req: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-arts-ba.html" },
    "Science (BSc - General)": { rank: 165, req: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-science-bsc.html" }
  },
  "University of Otago": {
    "Health Sciences First Year (HSFY)": { rank: 150, req: [], note: "HSFY is required for Medicine, Dentistry, Pharmacy.", link: "https://www.otago.ac.nz/study/hsfy" },
    "Law (First Year)": { rank: 150, req: [], link: "https://www.otago.ac.nz/law/study" },
    "Commerce": { rank: 150, req: [], link: "https://www.otago.ac.nz/business/study" },
    "Science (BSc)": { rank: 150, req: [], link: "https://www.otago.ac.nz/sciences/study" },
    "Arts (BA)": { rank: 150, req: [], link: "https://www.otago.ac.nz/arts/study" }
  },
  "University of Canterbury": {
    "Engineering (First Year)": { rank: 200, req: ["Calculus", "Physics"], note: true, link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-engineering-with-honours" },
    "Computer Science": { rank: 150, req: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-science/computer-science" },
    "Data Science": { rank: 150, req: ["Mathematics"], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-data-science" },
    "Law": { rank: 150, req: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-laws" },
    "Commerce": { rank: 150, req: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-commerce" },
    "Science (BSc)": { rank: 150, req: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-science" },
    "Fine Arts": { rank: 150, req: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-fine-arts" }
  },
  "Victoria University of Wellington": {
    "Engineering (First Year)": { rank: 170, req: ["Calculus", "Physics"], note: true, link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-engineering-with-honours" },
    "Architectural Studies": { rank: 170, req: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-architectural-studies" },
    "Law (First Year)": { rank: 150, req: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-laws" },
    "Commerce": { rank: 150, req: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-commerce" },
    "Computer Science": { rank: 150, req: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-science" },
    "Arts (BA)": { rank: 150, req: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-arts" },
    "Science (BSc)": { rank: 150, req: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-science" }
  },
  "AUT (Auckland University of Technology)": {
    "Engineering (Hons)": { rank: 250, req: ["Calculus", "Physics"], link: "https://www.aut.ac.nz/study/study-options/engineering-computer-and-mathematical-sciences/courses/bachelor-of-engineering-honours" },
    "Computer & Information Sciences": { rank: 150, req: [], link: "https://www.aut.ac.nz/study/study-options/engineering-computer-and-mathematical-sciences/courses/bachelor-of-computer-and-information-sciences" },
    "Business": { rank: 150, req: [], link: "https://www.aut.ac.nz/study/study-options/business/courses/bachelor-of-business" },
    "Design": { rank: 150, req: [], link: "https://www.aut.ac.nz/study/study-options/art-and-design/courses/bachelor-of-design" },
    "Communication Studies": { rank: 150, req: [], link: "https://www.aut.ac.nz/study/study-options/communications/courses/bachelor-of-communication-studies" },
    "Health Science (Nursing)": { rank: 150, req: [], link: "https://www.aut.ac.nz/study/study-options/health-sciences/courses/bachelor-of-health-science-nursing" },
    "Law": { rank: 220, req: [], link: "https://www.aut.ac.nz/study/study-options/law/courses/bachelor-of-laws" }
  },
  "University of Waikato": {
    "Engineering (Hons)": { rank: 150, req: ["Calculus", "Physics"], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-engineering-with-honours" },
    "Computer Science": { rank: 150, req: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-science" },
    "Business": { rank: 150, req: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-business" },
    "Law": { rank: 150, req: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-laws" },
    "Nursing": { rank: 150, req: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-nursing" },
    "Arts (BA)": { rank: 150, req: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-arts" },
    "Science (BSc)": { rank: 150, req: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-science" }
  },
  "Massey University": {
    "Engineering (Hons)": { rank: 150, req: ["Calculus", "Physics"], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-engineering-with-honours-BEHNR/" },
    "Veterinary Science (Pre-selection)": { rank: 150, req: ["Chemistry", "Physics", "Biology"], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-veterinary-science-BVTSC/" },
    "Aviation": { rank: 150, req: [], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-aviation-BAVTN/" },
    "Business": { rank: 150, req: [], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-business-BBSNS/" },
    "Design": { rank: 150, req: [], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-design-with-honours-BDSHR/" },
    "Science (BSc)": { rank: 150, req: [], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-science-BSCNC/" }
  },
  "Lincoln University": {
    "Agricultural Science": { rank: 150, req: [], link: "https://www.lincoln.ac.nz/study/study-programmes/programme-search/bachelor-of-agricultural-science/" },
    "Environmental Management": { rank: 150, req: [], link: "https://www.lincoln.ac.nz/study/study-programmes/programme-search/bachelor-of-environmental-management/" },
    "Landscape Architecture": { rank: 150, req: [], link: "https://www.lincoln.ac.nz/study/study-programmes/programme-search/bachelor-of-landscape-architecture/" },
    "Commerce (Agriculture)": { rank: 150, req: [], link: "https://www.lincoln.ac.nz/study/study-programmes/programme-search/bachelor-of-commerce-agriculture/" },
    "Science (BSc)": { rank: 150, req: [], link: "https://www.lincoln.ac.nz/study/study-programmes/programme-search/bachelor-of-science/" }
  }
};

// --- DOM Elements ---
const excellenceEl = document.getElementById("excellence");
const meritEl = document.getElementById("merit");
const achievedEl = document.getElementById("achieved");
const rankScoreEl = document.getElementById("rankScore");
const ueReading = document.getElementById("ueReading");
const ueWriting = document.getElementById("ueWriting");
const ueNumeracy = document.getElementById("ueNumeracy");
const ueLitCard = document.getElementById("ueLitCard");
const ueNumCard = document.getElementById("ueNumCard");
const universitySelect = document.getElementById("universitySelect");
const degreeSelect = document.getElementById("degreeSelect");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");
const warningList = document.getElementById("warningList");
const subCalc = document.getElementById("subCalc");
const subPhysics = document.getElementById("subPhysics");
const subChem = document.getElementById("subChem");
const subBio = document.getElementById("subBio");
const subStats = document.getElementById("subStats");
const resetBtn = document.getElementById("resetBtn");
const targetScoreInput = document.getElementById("targetScoreInput");
const calcPathwaysBtn = document.getElementById("calcPathwaysBtn");
const pathwayResultsContainer = document.getElementById("pathwayResultsContainer");

// --- UI Elements ---
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const menuOverlay = document.getElementById("menuOverlay");
const openThemeBtn = document.getElementById("openThemeBtn");
const themeModal = document.getElementById("themeModal");
const closeThemeBtn = document.getElementById("closeThemeBtn");
const themeSwatches = document.querySelectorAll(".themeSwatch");
const menuLinks = document.querySelectorAll(".menuLink:not(.themeMenuBtn)");

// --- INIT ---
window.onload = () => {
  populateUniversities();
  loadData();

  [excellenceEl, meritEl, achievedEl, ueReading, ueWriting, ueNumeracy,
   subCalc, subPhysics, subChem, subBio, subStats].forEach(el => {
    el.addEventListener("input", calculate);
    el.addEventListener("change", calculate);
  });
  
  addGoalBtn.addEventListener("click", addGoal);
  resetBtn.addEventListener("click", handleReset);
  calcPathwaysBtn.addEventListener("click", generatePathways);
  
  setupUI();
  calculate();
};

// --- UI & THEME LOGIC ---
function setupUI() {
  menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("active");
  });
  
  const closeMenu = () => {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("active");
  };
  
  closeMenuBtn.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);
  menuLinks.forEach(link => link.addEventListener("click", closeMenu));

  openThemeBtn.addEventListener("click", () => {
    closeMenu();
    themeModal.classList.add("active");
  });

  closeThemeBtn.addEventListener("click", () => {
    themeModal.classList.remove("active");
  });

  themeSwatches.forEach(swatch => {
    swatch.addEventListener("click", (e) => {
      const selectedTheme = e.target.getAttribute("data-theme");
      document.body.className = selectedTheme;
      saveData();
    });
  });
}

// --- LOCAL STORAGE FUNCTIONS ---
function saveData() {
  const appData = {
    excellence: excellenceEl.value,
    merit: meritEl.value,
    achieved: achievedEl.value,
    ueReading: ueReading.checked,
    ueWriting: ueWriting.checked,
    ueNumeracy: ueNumeracy.checked,
    subCalc: subCalc.checked,
    subPhysics: subPhysics.checked,
    subChem: subChem.checked,
    subBio: subBio.checked,
    subStats: subStats.checked,
    savedGoals: goals,
    targetScore: targetScoreInput.value,
    currentTheme: document.body.className || "theme-default"
  };
  localStorage.setItem('nceaRankScoreData', JSON.stringify(appData));
}

function loadData() {
  const savedData = localStorage.getItem('nceaRankScoreData');
  if (savedData) {
    const appData = JSON.parse(savedData);
    
    if(appData.currentTheme) document.body.className = appData.currentTheme;

    excellenceEl.value = appData.excellence || 0;
    meritEl.value = appData.merit || 0;
    achievedEl.value = appData.achieved || 0;
    
    ueReading.checked = appData.ueReading || false;
    ueWriting.checked = appData.ueWriting || false;
    ueNumeracy.checked = appData.ueNumeracy || false;
    subCalc.checked = appData.subCalc || false;
    subPhysics.checked = appData.subPhysics || false;
    subChem.checked = appData.subChem || false;
    subBio.checked = appData.subBio || false;
    subStats.checked = appData.subStats || false;

    goals = appData.savedGoals || [];
    targetScoreInput.value = appData.targetScore || "";
    if (appData.targetScore) generatePathways();
  }
}

function handleReset() {
  if(confirm("Are you sure you want to clear all your data? You can't undo this.")) {
    localStorage.removeItem('nceaRankScoreData');
    location.reload(); 
  }
}

// --- CORE FUNCTIONS ---
function populateUniversities(){
  universitySelect.innerHTML = "";
  Object.keys(universities).forEach(uni=>{
    let option = document.createElement("option");
    option.value = uni; option.text = uni;
    universitySelect.appendChild(option);
  });
  universitySelect.addEventListener("change", updateDegrees);
  updateDegrees();
}

function updateDegrees(){
  const uni = universitySelect.value;
  degreeSelect.innerHTML = "";
  Object.keys(universities[uni]).forEach(deg=>{
    let option = document.createElement("option");
    option.value = deg; option.text = deg;
    degreeSelect.appendChild(option);
  });
}

function calculate(){
  let E = parseInt(excellenceEl.value)||0;
  let M = parseInt(meritEl.value)||0;
  let A = parseInt(achievedEl.value)||0;
  let remaining = 80;
  let useE = Math.min(E, remaining); remaining -= useE;
  let useM = Math.min(M, remaining); remaining -= useM;
  let useA = Math.min(A, remaining);
  
  rankScore = (useE*4)+(useM*3)+(useA*2);
  rankScore = Math.min(rankScore, 320);
  rankScoreEl.innerText = rankScore;
  
  updateUE();
  updateGoals();
  updateWarnings();
  saveData();
}

function updateUE(){
  if (ueReading.checked && ueWriting.checked) {
    ueLitCard.className = "statCard bg-green";
  } else {
    ueLitCard.className = "statCard bg-red";
  }

  if (ueNumeracy.checked) {
    ueNumCard.className = "statCard bg-green";
  } else {
    ueNumCard.className = "statCard bg-red";
  }
}

function getSubjects(){
  let s = [];
  if(subCalc.checked) s.push("Calculus");
  if(subPhysics.checked) s.push("Physics");
  if(subChem.checked) s.push("Chemistry");
  if(subBio.checked) s.push("Biology");
  if(subStats.checked) s.push("Mathematics");
  return s;
}

function addGoal(){
  const uni = universitySelect.value;
  const deg = degreeSelect.value;
  const data = universities[uni][deg];
  const name = uni+" - "+deg;
  
  if(goals.find(g=>g.name===name)) return;
  
  goals.push({name, rank:data.rank, req:data.req, note:data.note, link:data.link});
  updateGoals();
  updateWarnings();
  saveData();
}

function removeGoal(i){
  goals.splice(i,1);
  updateGoals();
  updateWarnings();
  saveData();
}

function updateGoals(){
  goalList.innerHTML = "";
  const subjects = getSubjects();
  goals.forEach((g,i)=>{
    const missingSubjects = g.req.filter(r=>!subjects.includes(r));
    let statusText = "";
    let colorClass = "";

    if(missingSubjects.length>0){
      statusText = "Missing: "+missingSubjects.join(", ");
      colorClass = "bg-red";
    } else if(rankScore < g.rank-20){
      statusText = "A bit far off the required rank";
      colorClass = "bg-red";
    } else if(rankScore < g.rank){
      statusText = "Almost there";
      colorClass = "bg-orange";
    } else {
      statusText = "Goal reached!";
      colorClass = "bg-green";
    }
    
    const displayRank = g.rank <= 150 ? "UE Standard (150+ recommended)" : g.rank;
    const percent = Math.min((rankScore/Math.max(g.rank, 150))*100, 100);
    
    const card = document.createElement("div");
    card.className = `goalCard ${colorClass}`;
    
    card.innerHTML = `
      <div class="goalHeader">
        <h3 style="margin:0;">${g.name}</h3>
      </div>
      <p style="margin:5px 0;"><strong>Target Score:</strong> ${displayRank}</p>
      <p style="margin:5px 0;"><strong>Subjects Needed:</strong> ${g.req.length>0 ? g.req.join(", ") : "None"}</p>
      <p style="margin:5px 0;"><strong>Status:</strong> ${statusText}</p>
      ${g.note ? `<p style='margin:5px 0; font-size:13px; opacity:0.8;'><i>${g.note}</i></p>` : ""}
      
      ${g.link ? `<a href="${g.link}" target="_blank" class="infoLink">Course Info ↗</a>` : ""}
      
      <div class="progressBar"><div class="progressFill" style="width:${percent}%"></div></div>
      <button class="removeBtn" onclick="removeGoal(${i})">Remove</button>
    `;
    goalList.appendChild(card);
  });
}

function updateWarnings(){
  warningList.innerHTML = "";
  const subjects = getSubjects();
  let warningCount = 0;

  goals.forEach(g=>{
    const missingSubjects = g.req.filter(r=>!subjects.includes(r));
    if(missingSubjects.length>0){
      const card = document.createElement("div");
      card.className="warningCard";
      card.innerHTML = `<b>${g.name}</b>: Looks like you're missing ${missingSubjects.join(", ")}`;
      warningList.appendChild(card);
      warningCount++;
    }
  });
  
  if(!ueReading.checked || !ueWriting.checked){
    const card = document.createElement("div");
    card.className="warningCard medium";
    card.innerHTML="Missing UE Literacy";
    warningList.appendChild(card);
    warningCount++;
  }
  
  if(!ueNumeracy.checked){
    const card = document.createElement("div");
    card.className="warningCard medium";
    card.innerHTML="Missing UE Numeracy";
    warningList.appendChild(card);
    warningCount++;
  }
  
  if(subPhysics.checked && !subCalc.checked){
    const card = document.createElement("div");
    card.className="warningCard";
    card.innerHTML="Tip: If you're doing Engineering or Physics, you really should take Calculus.";
    warningList.appendChild(card);
    warningCount++;
  }

  if (warningCount === 0) {
    warningList.innerHTML = `<p class="noWarningsPlaceholder">Looking good! No missing requirements right now.</p>`;
  }
}

// --- TARGET PATHWAY ALGORITHMS ---
function generatePathways() {
  const target = parseInt(targetScoreInput.value);
  pathwayResultsContainer.innerHTML = '';
  saveData();

  if (isNaN(target) || target <= 0 || target > 320) {
    pathwayResultsContainer.innerHTML = '<p style="color: #ef4444; margin-top: 10px;">Make sure you enter a score between 1 and 320.</p>';
    return;
  }

  // 1. Easiest Path
  let e1 = 0, m1 = 0, a1 = Math.min(80, Math.ceil(target / 2));
  let currentScore1 = a1 * 2;
  if (currentScore1 < target && a1 === 80) {
    let diff = target - 160;
    m1 = Math.min(80, diff);
    a1 -= m1;
    let score = (a1 * 2) + (m1 * 3);
    if (score < target) {
      let diff2 = target - score;
      e1 = diff2;
      m1 -= e1;
    }
  }

  // 2. Fastest Path
  let e2 = Math.floor(target / 4);
  let m2 = 0, a2 = 0;
  let rem = target - (e2 * 4);
  if (rem === 3) m2 = 1;
  else if (rem === 2 || rem === 1) a2 = 1;

  // 3. Balanced Path
  let e3 = 0, m3 = 0, a3 = 0;
  let bestVar = Infinity;
  for(let e=0; e<=80; e++) {
    for(let m=0; m<=80-e; m++) {
      let a = Math.max(0, Math.ceil((target - 4*e - 3*m)/2));
      if (e+m+a <= 80 && (4*e + 3*m + 2*a) >= target) {
         let avg = (e+m+a)/3;
         let variance = Math.pow(e-avg, 2) + Math.pow(m-avg, 2) + Math.pow(a-avg, 2);
         let creditPenalty = Math.pow(80 - (e+m+a), 2) * 0.1; 
         if (variance + creditPenalty < bestVar) {
           bestVar = variance + creditPenalty;
           e3 = e; m3 = m; a3 = a;
         }
      }
    }
  }

  // Generate Top 3 HTML
  let mainHtml = `
    <div class="pathwayGrid">
      ${createPathwayCard("Easiest Route", "Heavy on Achieved & Merit", e1, m1, a1)}
      ${createPathwayCard("Balanced Spread", "A mix of everything", e3, m3, a3)}
      ${createPathwayCard("Fewest Credits", "Mostly Excellence credits", e2, m2, a2)}
    </div>
  `;

  // Generate Extra Alternatives
  let extraPaths = [];
  let usedCombos = new Set([`${e1},${m1},${a1}`, `${e2},${m2},${a2}`, `${e3},${m3},${a3}`]);

  for (let e = 0; e <= 80; e += 4) {
    if (e * 4 >= target) {
       if (e <= 80 && !usedCombos.has(`${e},0,0`)) {
           extraPaths.push({e: e, m: 0, a: 0});
           usedCombos.add(`${e},0,0`);
       }
       continue;
    }
    
    let rem1 = target - (e * 4);
    let m_heavy = Math.ceil(rem1 / 3);
    let a_heavy = 0;
    if (e + m_heavy + a_heavy <= 80 && !usedCombos.has(`${e},${m_heavy},${a_heavy}`)) {
       extraPaths.push({e: e, m: m_heavy, a: a_heavy});
       usedCombos.add(`${e},${m_heavy},${a_heavy}`);
    }
    
    let m_bal = Math.floor(rem1 / 5);
    let a_bal = Math.ceil((rem1 - m_bal * 3) / 2);
    if (e + m_bal + a_bal <= 80 && !usedCombos.has(`${e},${m_bal},${a_bal}`)) {
       extraPaths.push({e: e, m: m_bal, a: a_bal});
       usedCombos.add(`${e},${m_bal},${a_bal}`);
    }
  }
  
  extraPaths.sort((a,b) => Math.abs(80 - (a.e+a.m+a.a)) - Math.abs(80 - (b.e+b.m+b.a)));
  extraPaths = extraPaths.slice(0, 6);

  let extraHtml = '';
  if (extraPaths.length > 0) {
    let cardsHtml = extraPaths.map((p, index) => 
      createPathwayCard(`Option ${index + 1}`, `Alternative mix`, p.e, p.m, p.a)
    ).join('');
    
    extraHtml = `
      <div style="text-align: center; width: 100%; margin-top: 15px;">
        <button id="showMoreBtn" class="secondaryBtn">Show More Combinations ↓</button>
      </div>
      <div id="extraPathwaysGrid" class="pathwayGrid" style="display: none; margin-top: 20px;">
        ${cardsHtml}
      </div>
    `;
  }

  pathwayResultsContainer.innerHTML = mainHtml + extraHtml;

  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      const extraGrid = document.getElementById('extraPathwaysGrid');
      if (extraGrid.style.display === 'none') {
        extraGrid.style.display = 'grid';
        this.innerText = 'Hide Combinations ↑';
      } else {
        extraGrid.style.display = 'none';
        this.innerText = 'Show More Combinations ↓';
      }
    });
  }
}

function createPathwayCard(title, desc, e, m, a) {
  const totalCredits = e + m + a;
  const exactScore = (e*4) + (m*3) + (a*2);
  return `
    <div class="pathwayCard">
      <h3>${title}</h3>
      <p style="font-size: 13px; color: var(--text-muted); margin-top: -5px; margin-bottom: 15px;">${desc}</p>
      <ul>
        <li><span style="color: #10b981; font-weight: 600;">Excellence:</span> <span>${e}</span></li>
        <li><span style="color: #3b82f6; font-weight: 600;">Merit:</span> <span>${m}</span></li>
        <li><span style="color: #f59e0b; font-weight: 600;">Achieved:</span> <span>${a}</span></li>
        <li class="total"><span style="color: var(--text-muted);">Total Credits:</span> <span>${totalCredits} / 80</span></li>
        <li style="font-size: 12px; color: var(--text-muted); margin-top: 5px; border:none; padding-top:0;">Score Generated: ${exactScore}</li>
      </ul>
    </div>
  `;
}

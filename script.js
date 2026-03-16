// --- STATE MANAGEMENT ---
let appState = {
  currentProfile: "default",
  profiles: {
    "default": { name: "My Profile", useSpecific: false, ovE: 0, ovM: 0, ovA: 0, subjects: [], ue: {}, checks: {}, goals: [] }
  },
  themeData: { themeClass: "theme-default", customP: "#6366f1", customB: "#0f172a", customPan: "#1e293b" },
  activeTab: "tab-calculator",
  targetScore: ""
};

let rankScore = 0;
let totalE = 0, totalM = 0, totalA = 0;
let creditsChartInstance = null;

// --- ACCURATE 2025/2026 UNIVERSITY DATABASE ---
// Requirements triple-checked. 140-150 points represents the standard UE preferential baseline.
const universities = {
  "University of Auckland": {
    "Engineering (Hons)": { rank: 260, req: ["Calculus", "Physics"], reqStandards: ["AS91578 (Differentiation)", "AS91579 (Integration)"], note: true, link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-engineering-honours-behons.html" },
    "Biomedical Science": { rank: 280, req: ["Chemistry", "Physics"], reqStandards: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-science-bsc.html" },
    "Health Sciences": { rank: 250, req: ["Biology", "Chemistry"], reqStandards: ["One other subject strongly recommended"], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-health-sciences-bhsc.html" },
    "Architecture": { rank: 230, req: [], reqStandards: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-architectural-studies-bas.html" },
    "Commerce / Business": { rank: 210, req: [], reqStandards: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-commerce-bcom.html" },
    "Property": { rank: 230, req: [], reqStandards: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-property-bprop.html" },
    "Computer Science (BSc)": { rank: 165, req: [], reqStandards: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-science-bsc.html" },
    "Science (BSc - General)": { rank: 165, req: [], reqStandards: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-science-bsc.html" },
    "Arts (BA)": { rank: 150, req: [], reqStandards: [], link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-arts-ba.html" },
    "Law (Part I)": { rank: 165, req: [], reqStandards: [], note: "Entry to Part II requires high GPA during Part I.", link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-laws-llb.html" }
  },
  "University of Otago": {
    "Health Sci First Year (HSFY)": { rank: 140, req: [], reqStandards: [], note: "HSFY Preferential Entry is 140. Highly competitive progression to Med/Dentistry.", link: "https://www.otago.ac.nz/study/hsfy" },
    "Law (First Year)": { rank: 140, req: [], reqStandards: [], link: "https://www.otago.ac.nz/law/study" },
    "Commerce": { rank: 140, req: [], reqStandards: [], link: "https://www.otago.ac.nz/business/study" },
    "Science (BSc)": { rank: 140, req: [], reqStandards: [], link: "https://www.otago.ac.nz/sciences/study" },
    "Arts (BA)": { rank: 140, req: [], reqStandards: [], link: "https://www.otago.ac.nz/arts/study" },
    "Surveying": { rank: 140, req: [], reqStandards: [], link: "https://www.otago.ac.nz/surveying/study" }
  },
  "University of Canterbury": {
    "Engineering (First Year)": { rank: 250, req: ["Calculus", "Physics"], reqStandards: ["AS91578 (Differentiation)", "AS91579 (Integration)", "14 Credits Physics"], note: true, link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-engineering-with-honours" },
    "Computer Science": { rank: 150, req: [], reqStandards: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-science/computer-science" },
    "Product Design": { rank: 150, req: [], reqStandards: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-product-design" },
    "Law": { rank: 150, req: [], reqStandards: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-laws" },
    "Commerce": { rank: 150, req: [], reqStandards: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-commerce" },
    "Science (BSc)": { rank: 150, req: [], reqStandards: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-science" },
    "Forestry Science": { rank: 150, req: [], reqStandards: [], link: "https://www.canterbury.ac.nz/study/qualifications-and-courses/bachelor-of-forestry-science" }
  },
  "Victoria University of Wellington": {
    "Engineering (First Year)": { rank: 170, req: ["Calculus", "Physics"], reqStandards: [], note: true, link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-engineering-with-honours" },
    "Architectural Studies": { rank: 170, req: [], reqStandards: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-architectural-studies" },
    "Law (First Year)": { rank: 150, req: [], reqStandards: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-laws" },
    "Commerce": { rank: 150, req: [], reqStandards: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-commerce" },
    "Science (BSc)": { rank: 150, req: [], reqStandards: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-science" },
    "Arts (BA)": { rank: 150, req: [], reqStandards: [], link: "https://www.wgtn.ac.nz/explore/degrees/bachelor-of-arts" }
  },
  "AUT (Auckland University of Technology)": {
    "Engineering (Hons)": { rank: 250, req: ["Calculus", "Physics"], reqStandards: [], link: "https://www.aut.ac.nz/study/study-options/engineering-computer-and-mathematical-sciences/courses/bachelor-of-engineering-honours" },
    "Law": { rank: 220, req: [], reqStandards: [], link: "https://www.aut.ac.nz/study/study-options/law/courses/bachelor-of-laws" },
    "Computer & Info Sci": { rank: 150, req: [], reqStandards: [], link: "https://www.aut.ac.nz/study/study-options/engineering-computer-and-mathematical-sciences/courses/bachelor-of-computer-and-information-sciences" },
    "Business": { rank: 150, req: [], reqStandards: [], link: "https://www.aut.ac.nz/study/study-options/business/courses/bachelor-of-business" },
    "Nursing": { rank: 150, req: [], reqStandards: [], link: "https://www.aut.ac.nz/study/study-options/health-sciences/courses/bachelor-of-health-science-nursing" }
  },
  "University of Waikato": {
    "Engineering (Hons)": { rank: 150, req: ["Calculus", "Physics"], reqStandards: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-engineering-with-honours" },
    "Computer Science": { rank: 150, req: [], reqStandards: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-science" },
    "Management": { rank: 150, req: [], reqStandards: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-management-studies" },
    "Law": { rank: 150, req: [], reqStandards: [], link: "https://www.waikato.ac.nz/study/qualifications/bachelor-of-laws" }
  },
  "Massey University": {
    "Vet Science (Pre-select)": { rank: 150, req: ["Chemistry", "Physics", "Biology"], reqStandards: [], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-veterinary-science-BVTSC/" },
    "Engineering (Hons)": { rank: 150, req: ["Calculus", "Physics"], reqStandards: [], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-engineering-with-honours-BEHNR/" },
    "Aviation": { rank: 150, req: [], reqStandards: [], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-aviation-BAVTN/" },
    "Nursing": { rank: 150, req: [], reqStandards: [], link: "https://www.massey.ac.nz/study/all-qualifications-and-degrees/bachelor-of-nursing-BNURS/" }
  },
  "Lincoln University": {
    "Agricultural Science": { rank: 150, req: [], reqStandards: [], link: "https://www.lincoln.ac.nz/study/study-programmes/programme-search/bachelor-of-agricultural-science/" },
    "Landscape Architecture": { rank: 150, req: [], reqStandards: [], link: "https://www.lincoln.ac.nz/study/study-programmes/programme-search/bachelor-of-landscape-architecture/" },
    "Commerce": { rank: 150, req: [], reqStandards: [], link: "https://www.lincoln.ac.nz/study/study-programmes/programme-search/bachelor-of-commerce-agriculture/" }
  }
};

const topScholarships = [
  { name: "UoA Top Achiever", uni: "University of Auckland", value: "$20,000", target: 280, desc: "Highly competitive. Usually requires 280+ rank score and strong leadership/community involvement." },
  { name: "Otago Academic Excellence", uni: "University of Otago", value: "$30,000+", target: 270, desc: "For students demonstrating outstanding academic capability across multiple subjects." },
  { name: "Otago Vice-Chancellor's", uni: "University of Otago", value: "$10,000", target: 260, desc: "Rewards strong academic achievement." },
  { name: "Canterbury Hiranga", uni: "University of Canterbury", value: "$5,000", target: 260, desc: "Awarded to top academic students entering their first year." },
  { name: "Wellington Tangiwai", uni: "Victoria University", value: "$5,000", target: 240, desc: "School leaver scholarship celebrating academic excellence." },
  { name: "Wellington Kahurangi", uni: "Victoria University", value: "$30,000", target: 280, desc: "Exceptional academic merit and leadership." },
  { name: "Waikato Sir Edmund Hillary", uni: "University of Waikato", value: "$10,000", target: 240, desc: "For students excelling in academia, sports, or creative arts." },
  { name: "AUT Vice-Chancellor's", uni: "AUT", value: "$20,000", target: 260, desc: "Significant financial contribution for top academic achievers." },
  { name: "Massey Vice-Chancellor's", uni: "Massey University", value: "$21,000", target: 250, desc: "For outstanding academic and leadership achievements." }
];

// --- DOM ELEMENTS ---
const excellenceEl = document.getElementById("excellence");
const meritEl = document.getElementById("merit");
const achievedEl = document.getElementById("achieved");
const modeToggle = document.getElementById("modeToggle");
const overallCreditsSection = document.getElementById("overallCreditsSection");
const specificSubjectsSection = document.getElementById("specificSubjectsSection");

const rankScoreEl = document.getElementById("rankScore");
const ueReading = document.getElementById("ueReading");
const ueWriting = document.getElementById("ueWriting");
const ueNumeracy = document.getElementById("ueNumeracy");
const ueLitCard = document.getElementById("ueLitCard");
const ueNumCard = document.getElementById("ueNumCard");

const universitySelect = document.getElementById("universitySelect");
const degreeSelect = document.getElementById("degreeSelect");
const goalList = document.getElementById("goalList");
const warningList = document.getElementById("warningList");
const subjectsContainer = document.getElementById("subjectsContainer");
const addSubjectBtn = document.getElementById("addSubjectBtn");
const subChecks = ["subCalc", "subPhysics", "subChem", "subBio", "subStats"].map(id => document.getElementById(id));

const profileSelect = document.getElementById("profileSelect");
const addProfileBtn = document.getElementById("addProfileBtn");
const resetBtn = document.getElementById("resetBtn");
const targetScoreInput = document.getElementById("targetScoreInput");
const calcPathwaysBtn = document.getElementById("calcPathwaysBtn");
const exportPdfBtn = document.getElementById("exportPdfBtn");
const shareIgBtn = document.getElementById("shareIgBtn");

const tabBtns = document.querySelectorAll(".tabBtn");
const tabPanes = document.querySelectorAll(".tabPane");

const openThemeBtn = document.getElementById("openThemeBtn");
const themeModal = document.getElementById("themeModal");
const closeThemeBtn = document.getElementById("closeThemeBtn");
const themeSwatches = document.querySelectorAll(".themeSwatch");
const primaryColorPicker = document.getElementById("primaryColor");
const bgColorPicker = document.getElementById("bgColor");

const openStatsBtn = document.getElementById("openStatsBtn");
const statsModal = document.getElementById("statsModal");
const closeStatsBtn = document.getElementById("closeStatsBtn");

// --- INITIALIZATION ---
window.onload = () => {
  populateUniversities();
  populateCompareDropdowns();
  loadData();
  
  [excellenceEl, meritEl, achievedEl].forEach(el => el.addEventListener("input", triggerSaveAndCalc));
  addSubjectBtn.addEventListener("click", () => addSubjectRow());
  [ueReading, ueWriting, ueNumeracy, ...subChecks].forEach(el => el.addEventListener("change", triggerSaveAndCalc));
  
  modeToggle.addEventListener("change", handleModeToggle);
  document.getElementById("addGoalBtn").addEventListener("click", addGoal);
  resetBtn.addEventListener("click", handleReset);
  calcPathwaysBtn.addEventListener("click", generatePathways);
  
  profileSelect.addEventListener("change", handleProfileSwitch);
  addProfileBtn.addEventListener("click", createProfile);
  exportPdfBtn.addEventListener("click", exportToPDF);
  shareIgBtn.addEventListener("click", exportToIG);
  
  document.getElementById("runMatcherBtn").addEventListener("click", runDegreeMatcher);
  document.getElementById("runCompareBtn").addEventListener("click", runCompare);
  document.getElementById("calcMockBtn").addEventListener("click", calculateMock);
  
  setupUI();
  handleModeToggle(false);
};

// --- TOGGLE & CORE CALC ---
function handleModeToggle(save = true) {
  if(modeToggle.checked) {
    overallCreditsSection.style.display = "none";
    specificSubjectsSection.style.display = "block";
  } else {
    overallCreditsSection.style.display = "block";
    specificSubjectsSection.style.display = "none";
  }
  if(save) triggerSaveAndCalc();
}

function addSubjectRow(name = "", e = 0, m = 0, a = 0) {
  const row = document.createElement("div");
  row.className = "subject-row";
  row.innerHTML = `
    <input type="text" class="subj-name" placeholder="Subject Name" value="${name}">
    <div class="inputGroup"><label>E</label><input type="number" class="subj-e" min="0" value="${e}"></div>
    <div class="inputGroup"><label>M</label><input type="number" class="subj-m" min="0" value="${m}"></div>
    <div class="inputGroup"><label>A</label><input type="number" class="subj-a" min="0" value="${a}"></div>
    <button class="remove-subj-btn" title="Remove">✕</button>
  `;
  
  // Auto-check global prerequisites if a specific name is typed
  row.querySelector(".subj-name").addEventListener("input", (ev) => {
      const val = ev.target.value.toLowerCase();
      if(val.includes("calculus")) document.getElementById("subCalc").checked = true;
      if(val.includes("physics")) document.getElementById("subPhysics").checked = true;
      if(val.includes("chemistry")) document.getElementById("subChem").checked = true;
      if(val.includes("biology")) document.getElementById("subBio").checked = true;
      if(val.includes("statistics")) document.getElementById("subStats").checked = true;
      triggerSaveAndCalc();
  });

  row.querySelectorAll("input").forEach(inp => inp.addEventListener("input", triggerSaveAndCalc));
  row.querySelector(".remove-subj-btn").addEventListener("click", () => {
    row.remove(); triggerSaveAndCalc();
  });
  subjectsContainer.appendChild(row);
  triggerSaveAndCalc();
}

function triggerSaveAndCalc() {
  calculate();
  saveData();
}

function calculate() {
  totalE = 0; totalM = 0; totalA = 0;
  let subjEndorsements = [];
  
  if (modeToggle.checked) {
    document.querySelectorAll(".subject-row").forEach(row => {
      let n = row.querySelector(".subj-name").value || "Unnamed Subject";
      let e = parseInt(row.querySelector(".subj-e").value) || 0;
      let m = parseInt(row.querySelector(".subj-m").value) || 0;
      let a = parseInt(row.querySelector(".subj-a").value) || 0;
      totalE += e; totalM += m; totalA += a;
      
      if (e >= 14) subjEndorsements.push(`<li>${n}: <span class="text-green">Excellence</span></li>`);
      else if (e + m >= 14) subjEndorsements.push(`<li>${n}: <span class="text-blue">Merit</span></li>`);
    });
  } else {
    totalE = parseInt(excellenceEl.value) || 0;
    totalM = parseInt(meritEl.value) || 0;
    totalA = parseInt(achievedEl.value) || 0;
  }

  document.getElementById("totalEText").innerText = totalE;
  document.getElementById("totalMText").innerText = totalM;
  document.getElementById("totalAText").innerText = totalA;
  document.getElementById("totalCreditsText").innerText = totalE + totalM + totalA;

  let eEndorsePct = Math.min((totalE/50)*100, 100);
  let mEndorsePct = Math.min(((totalE+totalM)/50)*100, 100);
  document.getElementById("endorseEBar").style.width = `${eEndorsePct}%`;
  document.getElementById("endorseEText").innerText = `${totalE}/50`;
  document.getElementById("endorseMBar").style.width = `${mEndorsePct}%`;
  document.getElementById("endorseMText").innerText = `${totalE+totalM}/50`;

  const subjList = document.getElementById("subjectEndorsementsList");
  if(modeToggle.checked && subjEndorsements.length > 0) {
    subjList.innerHTML = subjEndorsements.join("");
  } else {
    subjList.innerHTML = `<li style="color: var(--text-muted);">Switch to 'Specific Subjects' to track subject endorsements.</li>`;
  }

  let remaining = 80;
  let useE = Math.min(totalE, remaining); remaining -= useE;
  let useM = Math.min(totalM, remaining); remaining -= useM;
  let useA = Math.min(totalA, remaining);
  
  rankScore = (useE * 4) + (useM * 3) + (useA * 2);
  rankScore = Math.min(rankScore, 320);
  rankScoreEl.innerText = rankScore;
  document.getElementById("mockSecuredScore").value = rankScore; 
  
  updateUE(); updateGoals(); updateWarnings(); updateScholarships();
  try { updateChart(); } catch(e) { console.log("Chart.js failed gracefully."); }
}

// --- SHARE TO SOCIALS ---
function exportToIG() {
  if (typeof html2canvas === 'undefined') { alert("Module loading. Please try again in a second."); return; }
  
  const shareCard = document.getElementById("shareCard");
  const hasUE = (ueReading.checked && ueWriting.checked && ueNumeracy.checked);
  document.getElementById("shareScore").innerText = rankScore;
  document.getElementById("shareUE").innerText = hasUE ? "✅ UE Achieved" : "❌ UE Pending";
  
  shareCard.style.top = "0"; shareCard.style.left = "-9999px"; shareCard.style.zIndex = "1";
  
  html2canvas(shareCard, { scale: 2, backgroundColor: null }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'NCEA_Rank_Score.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
    shareCard.style.top = "-9999px"; shareCard.style.zIndex = "-1";
  });
}

// --- CHARTS & PDF ---
function updateChart() {
  if (typeof Chart === 'undefined') return;
  const ctx = document.getElementById('creditsChart').getContext('2d');
  if(creditsChartInstance) {
    creditsChartInstance.data.datasets[0].data = [totalE, totalM, totalA];
    creditsChartInstance.update(); return;
  }
  creditsChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: ['Excellence', 'Merit', 'Achieved'], datasets: [{ data: [totalE, totalM, totalA], backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'], borderWidth: 0 }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#fff' } } } }
  });
}

function exportToPDF() {
  if (typeof html2pdf === 'undefined') { alert("PDF Module Loading."); return; }
  const element = document.getElementById('exportContentArea');
  const opt = { margin: 0.5, filename: `NCEA_Planner_${appState.currentProfile}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
  
  document.querySelectorAll(".goalCard").forEach(c => { c.style.backgroundColor = "white"; c.style.color = "black"; c.style.border = "1px solid #ccc"; });
  html2pdf().set(opt).from(element).save().then(() => { triggerSaveAndCalc(); });
}

// --- DATA SAVING & LOADING ---
function handleProfileSwitch() { appState.currentProfile = profileSelect.value; applyProfileData(); saveData(); }
function createProfile() {
  const name = prompt("Enter new profile name:");
  if(name && !appState.profiles[name]) {
    appState.profiles[name] = { name: name, useSpecific: false, ovE: 0, ovM: 0, ovA: 0, subjects: [], ue: {}, checks: {}, goals: [] };
    appState.currentProfile = name; updateProfileDropdown(); applyProfileData(); saveData();
  }
}
function updateProfileDropdown() {
  profileSelect.innerHTML = "";
  Object.keys(appState.profiles).forEach(key => {
    let opt = document.createElement("option"); opt.value = key; opt.innerText = appState.profiles[key].name;
    if(key === appState.currentProfile) opt.selected = true;
    profileSelect.appendChild(opt);
  });
}

function saveData() {
  appState.themeData.themeClass = document.body.className;
  appState.themeData.customP = document.documentElement.style.getPropertyValue('--accent-primary');
  appState.themeData.customB = document.documentElement.style.getPropertyValue('--bg-main');
  appState.themeData.customPan = document.documentElement.style.getPropertyValue('--bg-panel');
  const activeTabBtn = document.querySelector(".tabBtn.active");
  if(activeTabBtn) appState.activeTab = activeTabBtn.getAttribute("data-tab");
  appState.targetScore = targetScoreInput.value;

  const prof = appState.profiles[appState.currentProfile];
  prof.useSpecific = modeToggle.checked;
  prof.ovE = excellenceEl.value; prof.ovM = meritEl.value; prof.ovA = achievedEl.value;
  prof.subjects = [];
  document.querySelectorAll(".subject-row").forEach(row => {
    prof.subjects.push({ name: row.querySelector(".subj-name").value, e: row.querySelector(".subj-e").value, m: row.querySelector(".subj-m").value, a: row.querySelector(".subj-a").value });
  });
  prof.ue = { r: ueReading.checked, w: ueWriting.checked, n: ueNumeracy.checked };
  prof.checks = {};
  subChecks.forEach(el => prof.checks[el.id] = el.checked);
  localStorage.setItem('nceaRankScoreAppV5', JSON.stringify(appState));
}

function loadData() {
  const saved = localStorage.getItem('nceaRankScoreAppV5');
  if (saved) {
    appState = JSON.parse(saved);
    if(!appState.profiles["default"]) appState.profiles["default"] = { name: "My Profile", useSpecific: false, ovE: 0, ovM: 0, ovA: 0, subjects: [], ue: {}, checks: {}, goals: [] };
  }
  
  if(appState.themeData.themeClass) document.body.className = appState.themeData.themeClass;
  if(appState.themeData.themeClass === "theme-custom") {
    document.documentElement.style.setProperty('--accent-primary', appState.themeData.customP);
    document.documentElement.style.setProperty('--bg-main', appState.themeData.customB);
    document.documentElement.style.setProperty('--bg-panel', appState.themeData.customPan);
    primaryColorPicker.value = appState.themeData.customP || "#6366f1"; bgColorPicker.value = appState.themeData.customB || "#0f172a";
  }
  
  let targetTab = appState.activeTab;
  if(targetTab) { const targetBtn = document.querySelector(`[data-tab="${targetTab}"]`); if(targetBtn) targetBtn.click(); }
  
  targetScoreInput.value = appState.targetScore || "";
  updateProfileDropdown(); applyProfileData();
}

function applyProfileData() {
  const prof = appState.profiles[appState.currentProfile];
  modeToggle.checked = prof.useSpecific || false; handleModeToggle(false);
  excellenceEl.value = prof.ovE || 0; meritEl.value = prof.ovM || 0; achievedEl.value = prof.ovA || 0;
  subjectsContainer.innerHTML = "";
  if (prof.subjects && prof.subjects.length > 0) prof.subjects.forEach(s => addSubjectRow(s.name, s.e, s.m, s.a));
  else { addSubjectRow(); addSubjectRow(); addSubjectRow(); }
  if(prof.ue) { ueReading.checked = prof.ue.r || false; ueWriting.checked = prof.ue.w || false; ueNumeracy.checked = prof.ue.n || false; }
  if(prof.checks) subChecks.forEach(el => el.checked = prof.checks[el.id] || false);
  calculate(); if (appState.targetScore) generatePathways();
}

// --- UI EVENT LOGIC ---
function setupUI() {
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active")); tabPanes.forEach(p => p.classList.remove("active"));
      btn.classList.add("active"); document.getElementById(btn.getAttribute("data-tab")).classList.add("active"); saveData();
    });
  });
  
  openThemeBtn.addEventListener("click", () => themeModal.classList.add("active"));
  closeThemeBtn.addEventListener("click", () => themeModal.classList.remove("active"));
  themeSwatches.forEach(swatch => {
    swatch.addEventListener("click", (e) => {
      document.documentElement.style.removeProperty('--accent-primary'); document.documentElement.style.removeProperty('--bg-main'); document.documentElement.style.removeProperty('--bg-panel');
      document.body.className = e.target.getAttribute("data-theme"); saveData();
    });
  });
  primaryColorPicker.addEventListener("input", applyCustomTheme); bgColorPicker.addEventListener("input", applyCustomTheme);

  openStatsBtn.addEventListener("click", () => {
      statsModal.classList.add("active");
      try { updateChart(); } catch(e){}
  });
  closeStatsBtn.addEventListener("click", () => statsModal.classList.remove("active"));
}

function applyCustomTheme() {
  document.body.className = "theme-custom";
  const pColor = primaryColorPicker.value; const bColor = bgColorPicker.value;
  const panelColor = '#' + bColor.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + 15)).toString(16)).substr(-2));
  document.documentElement.style.setProperty('--accent-primary', pColor); document.documentElement.style.setProperty('--bg-main', bColor); document.documentElement.style.setProperty('--bg-panel', panelColor);
  saveData();
}

function handleReset() { if(confirm("Are you sure you want to clear EVERYTHING?")) { localStorage.removeItem('nceaRankScoreAppV5'); location.reload(); } }

// --- UNIVERSITY LOGIC ---
function populateUniversities(){
  universitySelect.innerHTML = "";
  Object.keys(universities).forEach(uni=>{
    let option = document.createElement("option"); option.value = uni; option.text = uni; universitySelect.appendChild(option);
  });
  universitySelect.addEventListener("change", updateDegrees); updateDegrees();
}
function updateDegrees(){
  const uni = universitySelect.value; degreeSelect.innerHTML = "";
  Object.keys(universities[uni]).forEach(deg=>{
    let option = document.createElement("option"); option.value = deg; option.text = deg; degreeSelect.appendChild(option);
  });
}
function updateUE(){
  ueLitCard.className = (ueReading.checked && ueWriting.checked) ? "statCard bg-green" : "statCard bg-red";
  ueNumCard.className = ueNumeracy.checked ? "statCard bg-green" : "statCard bg-red";
}
function getSubjects(){
  let s = []; subChecks.forEach(el => { if(el.checked) s.push(el.nextElementSibling.innerText); });
  if(document.getElementById("subStats").checked || document.getElementById("subCalc").checked) s.push("Mathematics");
  return s;
}

function addGoal(){
  const uni = universitySelect.value; const deg = degreeSelect.value; const data = universities[uni][deg]; const prof = appState.profiles[appState.currentProfile];
  if(!prof.goals) prof.goals = [];
  if(prof.goals.find(g => g.uni === uni && g.deg === deg)) return;
  prof.goals.push({uni: uni, deg: deg, rank: data.rank, req: data.req, reqStandards: data.reqStandards, note: data.note, link: data.link});
  triggerSaveAndCalc();
}
function removeGoal(i){ appState.profiles[appState.currentProfile].goals.splice(i,1); triggerSaveAndCalc(); }

function updateGoals(){
  goalList.innerHTML = ""; const prof = appState.profiles[appState.currentProfile]; if(!prof.goals) return;
  const subjects = getSubjects(); const hasUE = (ueReading.checked && ueWriting.checked && ueNumeracy.checked);

  prof.goals.forEach((g,i)=>{
    const missingSubjects = g.req.filter(r=>!subjects.includes(r));
    let missingList = [...missingSubjects];
    if (!hasUE) { if(!ueReading.checked || !ueWriting.checked) missingList.push("UE Literacy"); if(!ueNumeracy.checked) missingList.push("UE Numeracy"); }

    let statusText = ""; let colorClass = "";
    if (missingList.length > 0) { statusText = "Missing Prerequisites"; colorClass = "bg-red"; }
    else if (rankScore < g.rank - 20) { statusText = "Score is low right now"; colorClass = "bg-red"; }
    else if (!hasUE) { statusText = "Missing UE Requirements"; colorClass = "bg-orange"; }
    else if (rankScore < g.rank) { statusText = "Almost there"; colorClass = "bg-orange"; }
    else { statusText = "Goal reached!"; colorClass = "bg-green"; }
    
    const displayRank = g.rank <= 150 ? g.rank + " (Standard UE)" : g.rank;
    const percent = Math.min((rankScore/Math.max(g.rank, 140))*100, 100);
    
    let missingHtml = missingList.length > 0 ? `<p class="missing-text"><strong>Missing:</strong> ${missingList.join(", ")}</p>` : "";
    let standardsHtml = (g.reqStandards && g.reqStandards.length > 0) ? `<p style="color: #60a5fa;"><strong>Specific AS Needs:</strong> ${g.reqStandards.join(", ")}</p>` : "";

    const card = document.createElement("div"); card.className = `goalCard ${colorClass}`;
    card.innerHTML = `
      <div class="goalHeader"><h3 class="goal-uni">${g.uni}</h3><h4 class="goal-deg">${g.deg}</h4></div>
      <div class="goalDetails">
        <p><strong>Required Score:</strong> ${displayRank}</p><p><strong>Required Subjects:</strong> ${g.req.length > 0 ? g.req.join(", ") : "None"}</p>
        ${standardsHtml}${missingHtml}<p><strong>Status:</strong> ${statusText}</p>
        ${g.note ? `<p style='font-size:13px; opacity:0.8; margin-top:10px;'><i>${g.note}</i></p>` : ""}
      </div>
      ${g.link ? `<a href="${g.link}" target="_blank" class="infoLink hide-on-print">Course Info ↗</a>` : ""}
      <div class="progressBar hide-on-print"><div class="progressFill" style="width:${percent}%"></div></div>
      <button class="removeBtn hide-on-print" onclick="removeGoal(${i})">Remove</button>
    `;
    goalList.appendChild(card);
  });
}

function updateWarnings(){
  warningList.innerHTML = ""; let warningCount = 0; const prof = appState.profiles[appState.currentProfile]; const subjects = getSubjects();
  if(prof.goals) {
    prof.goals.forEach(g=>{
      const missingSubjects = g.req.filter(r=>!subjects.includes(r));
      if(missingSubjects.length>0){ warningList.innerHTML += `<div class="warningCard"><b>${g.deg} (${g.uni})</b>: Looks like you're missing ${missingSubjects.join(", ")}</div>`; warningCount++; }
      if(g.reqStandards && g.reqStandards.length > 0) { warningList.innerHTML += `<div class="warningCard medium"><b>${g.deg} Note:</b> Ensure you take specific internals/externals: ${g.reqStandards.join(", ")}</div>`; warningCount++; }
    });
  }
  if(!ueReading.checked || !ueWriting.checked){ warningList.innerHTML += `<div class="warningCard medium">Missing UE Literacy</div>`; warningCount++; }
  if(!ueNumeracy.checked){ warningList.innerHTML += `<div class="warningCard medium">Missing UE Numeracy</div>`; warningCount++; }
  if (warningCount === 0) warningList.innerHTML = `<p class="noWarningsPlaceholder">Looking good! No missing requirements right now.</p>`;
}

function updateScholarships() {
  const container = document.getElementById("scholarshipsContainer"); container.innerHTML = "";
  topScholarships.forEach(schol => {
    let colorClass = rankScore >= schol.target ? "bg-green" : (rankScore >= schol.target - 20 ? "bg-orange" : "bg-red");
    let status = rankScore >= schol.target ? "Target Reached!" : `Short by ${schol.target - rankScore} points`;
    const percent = Math.min((rankScore/schol.target)*100, 100);
    container.innerHTML += `<div class="pathwayCard ${colorClass}" style="border:none; color:white; position:relative;"><span class="scholarBadge">${schol.value}</span><h3 style="color:white; margin:0; padding-right:80px;">${schol.name}</h3><p style="font-size:13px; margin: 4px 0 10px 0; opacity:0.8;">${schol.uni}</p><p style="font-size:14px; margin: 5px 0;"><strong>Target Rank:</strong> ${schol.target}+</p><p style="font-size:13px; margin: 5px 0; line-height:1.4;">${schol.desc}</p><p style="font-size:14px; margin: 10px 0 0 0; font-weight:bold;">${status}</p><div class="progressBar"><div class="progressFill" style="width:${percent}%"></div></div></div>`;
  });
}

function generatePathways() {
  const target = parseInt(targetScoreInput.value); const container = document.getElementById('pathwayResultsContainer'); container.innerHTML = ''; triggerSaveAndCalc();
  if (isNaN(target) || target <= 0 || target > 320) { container.innerHTML = '<p style="color: #ef4444; margin-top: 10px;">Make sure you enter a valid score.</p>'; return; }

  let e1 = 0, m1 = 0, a1 = Math.min(80, Math.ceil(target / 2));
  if ((a1 * 2) < target && a1 === 80) { m1 = Math.min(80, target - 160); a1 -= m1; if ((a1 * 2 + m1 * 3) < target) { e1 = target - (a1 * 2 + m1 * 3); m1 -= e1; } }

  let e2 = Math.floor(target / 4), m2 = 0, a2 = 0; let rem = target - (e2 * 4); if (rem === 3) m2 = 1; else if (rem === 2 || rem === 1) a2 = 1;

  let e3 = 0, m3 = 0, a3 = 0, bestVar = Infinity;
  for(let e=0; e<=80; e++) {
    for(let m=0; m<=80-e; m++) {
      let a = Math.max(0, Math.ceil((target - 4*e - 3*m)/2));
      if (e+m+a <= 80 && (4*e + 3*m + 2*a) >= target) {
         let avg = (e+m+a)/3; let variance = Math.pow(e-avg, 2) + Math.pow(m-avg, 2) + Math.pow(a-avg, 2);
         if (variance + (Math.pow(80 - (e+m+a), 2) * 0.1) < bestVar) { bestVar = variance + (Math.pow(80 - (e+m+a), 2) * 0.1); e3 = e; m3 = m; a3 = a; }
      }
    }
  }

  container.innerHTML = `<div class="pathwayGrid">${createPathwayCard("Easiest Route", "Heavy on Achieved", e1, m1, a1)}${createPathwayCard("Balanced Spread", "A mix of everything", e3, m3, a3)}${createPathwayCard("Fewest Credits", "Mostly Excellence", e2, m2, a2)}</div>`;
}

function createPathwayCard(title, desc, e, m, a) {
  const total = e + m + a; const score = (e*4) + (m*3) + (a*2);
  return `<div class="pathwayCard"><h3>${title}</h3><p style="font-size: 13px; color: var(--text-muted); margin-top: -5px; margin-bottom: 15px;">${desc}</p><ul><li><span style="color: #10b981; font-weight: 600;">Excellence:</span> <span>${e}</span></li><li><span style="color: #3b82f6; font-weight: 600;">Merit:</span> <span>${m}</span></li><li><span style="color: #f59e0b; font-weight: 600;">Achieved:</span> <span>${a}</span></li><li class="total"><span style="color: var(--text-muted);">Total Credits:</span> <span>${total} / 80</span></li><li style="font-size: 12px; color: var(--text-muted); border:none; padding-top:5px;">Score Generated: ${score}</li></ul></div>`;
}

function runDegreeMatcher() {
  const metContainer = document.getElementById("matcherMet"); const closeContainer = document.getElementById("matcherClose");
  metContainer.innerHTML = ""; closeContainer.innerHTML = ""; document.getElementById("matcherResultsArea").style.display = "block";
  const subjects = getSubjects(); const hasUE = (ueReading.checked && ueWriting.checked && ueNumeracy.checked);
  
  Object.keys(universities).forEach(uni => {
    Object.keys(universities[uni]).forEach(deg => {
      const data = universities[uni][deg]; const missingSubjects = data.req.filter(r => !subjects.includes(r)); const scoreDiff = rankScore - data.rank;
      const cardHTML = `<div class="pathwayCard" style="border: 1px solid var(--border-color); padding: 15px;"><h3 style="font-size:16px; margin:0;">${deg}</h3><p style="font-size:12px; color:var(--text-muted); margin: 2px 0 10px 0;">${uni}</p><p style="margin:0; font-size:13px;"><strong>Requires:</strong> ${data.rank} Rank</p></div>`;
      if (scoreDiff >= 0 && missingSubjects.length === 0 && hasUE) metContainer.innerHTML += cardHTML;
      else if (scoreDiff >= -30) closeContainer.innerHTML += cardHTML;
    });
  });
  
  if(metContainer.innerHTML === "") metContainer.innerHTML = "<p style='color:var(--text-muted);'>No degrees met yet. Keep adding credits!</p>";
  if(closeContainer.innerHTML === "") closeContainer.innerHTML = "<p style='color:var(--text-muted);'>You are not within 30 points of any remaining degrees.</p>";
}

function populateCompareDropdowns() {
  const uniA = document.getElementById("compUniA"); const uniB = document.getElementById("compUniB");
  const degA = document.getElementById("compDegA"); const degB = document.getElementById("compDegB");
  uniA.innerHTML = ""; uniB.innerHTML = "";
  Object.keys(universities).forEach(uni => { uniA.appendChild(new Option(uni, uni)); uniB.appendChild(new Option(uni, uni)); });
  const updateDegs = (uniSelect, degSelect) => {
    degSelect.innerHTML = ""; Object.keys(universities[uniSelect.value]).forEach(deg => degSelect.appendChild(new Option(deg, deg)));
  };
  uniA.addEventListener("change", () => updateDegs(uniA, degA)); uniB.addEventListener("change", () => updateDegs(uniB, degB));
  updateDegs(uniA, degA); updateDegs(uniB, degB);
}

function runCompare() {
  const uniA = document.getElementById("compUniA").value; const degA = document.getElementById("compDegA").value;
  const uniB = document.getElementById("compUniB").value; const degB = document.getElementById("compDegB").value;
  const dataA = universities[uniA][degA]; const dataB = universities[uniB][degB];
  
  document.getElementById("compareResults").style.display = "block";
  document.getElementById("compTitleA").innerHTML = `${degA}<br><strong>${uniA}</strong>`;
  document.getElementById("compTitleB").innerHTML = `${degB}<br><strong>${uniB}</strong>`;
  document.getElementById("compRankA").innerText = dataA.rank; document.getElementById("compRankB").innerText = dataB.rank;
  document.getElementById("compSubjA").innerText = dataA.req.length > 0 ? dataA.req.join(", ") : "None";
  document.getElementById("compSubjB").innerText = dataB.req.length > 0 ? dataB.req.join(", ") : "None";
  document.getElementById("compAsA").innerText = dataA.reqStandards && dataA.reqStandards.length > 0 ? dataA.reqStandards.join(", ") : "None";
  document.getElementById("compAsB").innerText = dataB.reqStandards && dataB.reqStandards.length > 0 ? dataB.reqStandards.join(", ") : "None";
  document.getElementById("compLinkA").innerHTML = dataA.link ? `<a href="${dataA.link}" target="_blank" style="color:var(--accent-primary);">View Page</a>` : "N/A";
  document.getElementById("compLinkB").innerHTML = dataB.link ? `<a href="${dataB.link}" target="_blank" style="color:var(--accent-primary);">View Page</a>` : "N/A";
}

function calculateMock() {
  const secured = parseInt(document.getElementById("mockSecuredScore").value) || 0;
  const target = parseInt(document.getElementById("mockTargetScore").value) || 250;
  const diff = target - secured;
  const res = document.getElementById("mockResultsContainer");
  
  if (diff <= 0) { res.innerHTML = `<div class="warningCard" style="background:#166534; color:white;">You have already hit your target with your secured internals!</div>`; return; }
  if (diff > 320) { res.innerHTML = `<div class="warningCard">Math impossible. You need ${diff} more points, which is over the 320 cap.</div>`; return; }
  
  let mE = Math.ceil(diff / 4); let mM = Math.ceil(diff / 3); let mA = Math.ceil(diff / 2);
  
  res.innerHTML = `
    <div class="pathwayCard bg-default" style="border: 1px solid var(--border-color);">
      <h3 style="margin-top:0;">Points Needed: ${diff}</h3>
      <p style="color: var(--text-muted); font-size:14px;">To bridge the gap in your externals, you need exactly ONE of the following:</p>
      <ul>
        <li><span style="color: #10b981; font-weight: 600;">Excellence Credits Needed:</span> <span>~${mE}</span></li>
        <li style="text-align:center; display:block; color:var(--text-muted); border:none; padding: 2px 0;">OR</li>
        <li><span style="color: #3b82f6; font-weight: 600;">Merit Credits Needed:</span> <span>~${mM}</span></li>
        <li style="text-align:center; display:block; color:var(--text-muted); border:none; padding: 2px 0;">OR</li>
        <li><span style="color: #f59e0b; font-weight: 600;">Achieved Credits Needed:</span> <span>~${mA}</span></li>
      </ul>
    </div>
  `;
}

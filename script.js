:root {
  --bg-main: #0f172a;
  --bg-panel: #1e293b;
  --border-color: rgba(255, 255, 255, 0.15);
  --accent-primary: #6366f1;
  --accent-hover: #4f46e5;
  --text-main: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.6);
}

body.theme-ocean { --bg-main: #082f49; --bg-panel: #0c4a6e; --accent-primary: #0ea5e9; --accent-hover: #0284c7; }
body.theme-forest { --bg-main: #022c22; --bg-panel: #064e3b; --accent-primary: #10b981; --accent-hover: #059669; }
body.theme-sunset { --bg-main: #2e1065; --bg-panel: #4c1d95; --accent-primary: #8b5cf6; --accent-hover: #7c3aed; }

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; font-family: 'Inter', sans-serif;
  background: var(--bg-main); color: var(--text-main);
  -webkit-tap-highlight-color: transparent; transition: background-color 0.4s ease;
}

header { padding: 30px 20px 10px; max-width: 1200px; margin: 0 auto; }
.header-content { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; }
.header-titles h1 { font-family: 'Space Grotesk', sans-serif; font-size: 32px; margin: 0 0 5px 0; }
.header-titles p { font-size: 15px; color: var(--text-muted); margin: 0; }
.header-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap;}

.profileSelect {
  background: var(--bg-panel); border: 1px solid var(--border-color); color: var(--text-main);
  font-size: 14px; font-weight: 600; padding: 10px; border-radius: 8px; cursor: pointer; width: 140px;
}
.iconBtn {
  background: var(--bg-panel); border: 1px solid var(--border-color); color: var(--text-main);
  font-size: 14px; font-weight: 600; padding: 10px 14px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
}
.iconBtn:hover { background: rgba(255, 255, 255, 0.1); }
.resetBtn { color: var(--text-muted); }
.resetBtn:hover { background: #7f1d1d; color: white; border-color: #ef4444; }

/* --- TABS NAVIGATION --- */
.tabNav { display: flex; gap: 10px; border-bottom: 2px solid var(--border-color); margin-bottom: 25px; overflow-x: auto; padding-bottom: 5px;}
.tabBtn {
  background: none; border: none; color: var(--text-muted); font-size: 16px; font-weight: 500;
  padding: 12px 20px; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.2s ease; white-space: nowrap;
}
.tabBtn:hover { color: var(--text-main); }
.tabBtn.active { color: white; border-bottom: 3px solid white; font-weight: 600; }

.tabPane { display: none; animation: fadeIn 0.4s ease; }
.tabPane.active { display: block; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.instructions {
  background: rgba(255, 255, 255, 0.05); border-left: 4px solid var(--accent-primary);
  padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 25px; font-size: 15px; color: var(--text-muted); line-height: 1.5;
}
.instructions strong { color: var(--text-main); }

/* --- TOGGLE SWITCH --- */
.toggle-container { display: flex; align-items: center; }
.switch { position: relative; display: inline-block; width: 46px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.2); transition: .4s; border-radius: 24px; }
.slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
input:checked + .slider { background-color: var(--accent-primary); }
input:checked + .slider:before { transform: translateX(22px); }

/* --- SUBJECT ROWS --- */
.subjects-container { display: flex; flex-direction: column; gap: 15px; }
.subject-row {
  display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
  background: rgba(0,0,0,0.1); padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);
}
.subject-row input[type="text"] { flex: 2; min-width: 120px; }
.subject-row .inputGroup { flex: 1; min-width: 60px; margin:0;}
.subject-row .inputGroup label { font-size: 11px; margin-bottom: 4px; }
.remove-subj-btn { background: #7f1d1d; color: white; border: none; border-radius: 6px; padding: 10px; cursor: pointer; font-weight:bold;}
.remove-subj-btn:hover { background: #dc2626;}

/* --- FLOATING STATS BUTTON --- */
.floatingStatsBtn {
  position: fixed; bottom: 30px; right: 30px; background: var(--accent-primary);
  color: white; border: none; padding: 15px 20px; border-radius: 50px;
  font-weight: bold; font-size: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  cursor: pointer; z-index: 999; display: flex; align-items: center; gap: 8px;
  transition: transform 0.2s, background 0.2s;
}
.floatingStatsBtn:hover { transform: scale(1.05); background: var(--accent-hover); }

/* --- SHARE CARD (HIDDEN) --- */
.shareCardHidden {
  position: absolute; top: -9999px; left: -9999px; width: 400px; height: 400px;
  background: linear-gradient(135deg, var(--bg-panel), var(--bg-main));
  color: white; display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border: 4px solid var(--border-color); z-index: -1;
}

/* --- COMPARE TABLE --- */
.compareTable { width: 100%; border-collapse: collapse; margin-top: 15px; }
.compareTable th, .compareTable td { border: 1px solid var(--border-color); padding: 15px; text-align: left; }
.compareTable th { background: rgba(0,0,0,0.2); font-family: 'Space Grotesk', sans-serif; font-size: 18px; }
.compareTable td strong { color: var(--text-muted); font-size: 14px; }

/* --- MODALS --- */
.modalOverlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(3px);
  opacity: 0; pointer-events: none; transition: opacity 0.3s ease; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modalOverlay.active { opacity: 1; pointer-events: all; }
.modalContent {
  background: var(--bg-panel); padding: 30px; border-radius: 16px; width: 100%; max-width: 400px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: translateY(20px); transition: transform 0.3s ease;
  max-height: 90vh; overflow-y: auto;
}
.statsModalContent { max-width: 700px; }
.modalOverlay.active .modalContent { transform: translateY(0); }

.themeGrid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; margin-top: 15px; }
.themeSwatch { height: 40px; border-radius: 8px; border: 2px solid transparent; cursor: pointer; transition: transform 0.2s; }
.themeSwatch:hover { transform: scale(1.05); }

.customThemeGroup { display: flex; gap: 15px; margin-top: 10px;}
.colorPickerItem { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.colorPickerItem label { font-size: 13px; color: var(--text-muted); }
.colorPickerItem input[type="color"] { width: 100%; height: 40px; border: none; border-radius: 8px; cursor: pointer; background: transparent; padding: 0; }
.colorPickerItem input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
.colorPickerItem input[type="color"]::-webkit-color-swatch { border: 1px solid var(--border-color); border-radius: 8px; }

/* --- PANELS --- */
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px 40px; }
.panel { background: var(--bg-panel); border-radius: 16px; padding: 25px; box-shadow: 0 8px 20px rgba(0,0,0,0.3); transition: background-color 0.4s ease; }
.fullWidthPanel { width: 100%; }
.row { margin-bottom: 25px; }

.topBar { display: flex; gap: 20px; }
.statCard {
  flex: 1; text-align: center; padding: 22px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: background-color 0.4s ease; display: flex; flex-direction: column; justify-content: center;
}
.statCard h3 { margin: 0 0 10px 0; font-size: 18px; color: #e2e8f0; }
.statCard p { font-size: 42px; font-weight: 600; margin: 0; color: white;}

.middleBar { display: flex; justify-content: space-between; gap: 30px; }
.inputSection { flex: 1; min-width: 200px; }
.inputSection h3 { margin-top: 0; margin-bottom: 15px; font-size: 18px; color: var(--text-main); border-bottom: 1px solid var(--border-color); padding-bottom: 8px; }

.creditRow { display: flex; gap: 15px; }
.inputGroup { flex: 1; }
.inputGroup label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--text-muted); }

input[type=number], input[type=text], select {
  width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);
  background: rgba(0,0,0,0.2); color: var(--text-main); font-size: 15px; transition: all 0.4s ease;
}

.checkboxGrid { display: flex; flex-direction: column; gap: 10px; }
.checkItem {
  display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03);
  padding: 10px 14px; border-radius: 8px; cursor: pointer; transition: background 0.2s; font-size: 15px;
}
.checkItem:hover { background: rgba(255,255,255,0.08); }

.bottomSplit { display: grid; grid-template-columns: 1fr 2fr; gap: 25px; }
.warningPanel h2, .goalsPanel h2, .fullWidthPanel h2 { margin-top: 0; font-size: 20px; color: var(--text-main); border-bottom: 1px solid var(--border-color); padding-bottom: 10px; }

.goalControls { display: flex; gap: 15px; margin-bottom: 25px; }
.warningCard { background: #7f1d1d; color: #fca5a5; padding: 14px; border-radius: 10px; margin-bottom: 10px; font-size: 14px; line-height: 1.4; }
.warningCard.medium { background: #9a3412; color: #fdba74; }
.noWarningsPlaceholder { color: var(--text-muted); font-style: italic; font-size: 14px; }

.goalCard {
  padding: 20px; border-radius: 12px; margin-bottom: 16px; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.25); position: relative; color: white;
}
.goalHeader { margin-bottom: 15px; padding-right: 80px; }
.goal-uni { font-size: 13px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0; }
.goal-deg { font-size: 20px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; margin: 0; }
.goalDetails p { margin: 6px 0; font-size: 14px; color: rgba(255,255,255,0.9); }
.missing-text { color: #fca5a5 !important; font-weight: 600; }
.bg-orange .missing-text { color: #fed7aa !important; }

.infoLink { display: inline-block; background: rgba(255,255,255,0.15); color: white; text-decoration: none; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; transition: background 0.2s; margin-top: 10px; }
.infoLink:hover { background: rgba(255,255,255,0.3); }
.removeBtn { position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.3); border: none; color: white; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; }

.progressBar { height: 8px; background: rgba(0,0,0,0.3); border-radius: 4px; margin: 15px 0 5px; overflow: hidden; }
.progressFill { height: 100%; background: rgba(255,255,255,0.8); width: 0; transition: width 0.5s ease; }

.pathwayGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;}
.pathwayCard { background: rgba(0,0,0,0.2); padding: 22px; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: background 0.4s ease, border 0.4s ease; position: relative;}
.pathwayCard h3 { margin-top: 0; margin-bottom: 5px; color: var(--text-main); font-size: 18px; }
.pathwayCard ul { list-style: none; padding: 0; margin: 15px 0 0 0; }
.pathwayCard li { margin-bottom: 8px; font-size: 15px; display: flex; justify-content: space-between; }
.pathwayCard .total { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-color); font-weight: 600; }

.scholarBadge { position: absolute; top: 15px; right: 15px; background: #10b981; color: white; font-weight: bold; padding: 4px 10px; border-radius: 6px; font-size: 13px; }

.primaryBtn { background: var(--accent-primary); border: none; padding: 12px 24px; border-radius: 8px; color: white; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 15px; white-space: nowrap; }
.primaryBtn:hover { filter: brightness(1.1); transform: translateY(-2px); }
.secondaryBtn { background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); padding: 12px 24px; border-radius: 8px; color: var(--text-muted); font-weight: 500; cursor: pointer; transition: all 0.2s; font-size: 14px; }
.secondaryBtn:hover { background: rgba(255, 255, 255, 0.1); color: white; }

.bg-green { background-color: #166534 !important; }
.bg-orange { background-color: #9a3412 !important; }
.bg-red { background-color: #7f1d1d !important; }
.bg-default { background-color: var(--bg-panel) !important; }

.text-green { color: #10b981; font-weight: bold; }
.text-blue { color: #3b82f6; font-weight: bold; }

.app-footer { text-align: center; padding: 20px; border-top: 1px solid var(--border-color); color: var(--text-muted); font-size: 13px; line-height: 1.5; transition: border-color 0.4s ease;}
.app-footer p { margin: 5px 0; }

@media print {
  .hide-on-print { display: none !important; }
  body { background: white !important; color: black !important; }
  .panel { box-shadow: none; border: 1px solid #ccc; background: white !important;}
  .goalCard { background: white !important; color: black !important; border: 2px solid #ccc; page-break-inside: avoid;}
  .missing-text { color: red !important; }
  .goal-uni, .goalDetails p, .goal-deg { color: black !important; }
}

@media(max-width: 900px) {
  .bottomSplit { grid-template-columns: 1fr; }
  .middleBar { flex-wrap: wrap; }
  .inputSection { flex: 1 1 100%; }
}
@media(max-width: 650px) {
  header h1 { font-size: 24px; }
  .header-content { flex-direction: column; text-align: left; }
  .header-actions { width: 100%; justify-content: space-between; }
  .hideMobile { display: none; }
  .topBar { flex-direction: column; }
  .middleBar { flex-direction: column; gap: 20px; }
  .goalControls { flex-direction: column; }
  .pathwayGrid { grid-template-columns: 1fr; }
  .subject-row input[type="text"] { width: 100%; }
  
  .floatingStatsBtn { bottom: 20px; right: 20px; padding: 12px; }
  .floatingStatsBtn .btnText { display: none; }
}

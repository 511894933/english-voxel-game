/* app.js: 简易浏览器原型逻辑 */
const worldEl = document.getElementById('world');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalPrompt = document.getElementById('modal-prompt');
const modalInput = document.getElementById('modal-input');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const feedback = document.getElementById('modal-feedback');
const keysEl = document.getElementById('keys');
const messageEl = document.getElementById('message');

// 简单任务数据（示例）
const tasks = {
  "chest1":{type:'fill',prompt:'I eat an ___ every day.',answer:'apple'},
  "chest2":{type:'fill',prompt:'What is the plural of "child"?',answer:'children'},
  "chest3":{type:'fill',prompt:'He ____ to school yesterday. (go past)',answer:'went'},
  "chest4":{type:'fill',prompt:'She has a pet ___. (animal, 3 letters)',answer:'cat'}
};

let keys = 0;
let opened = {};

function buildWorld(){
  worldEl.innerHTML = '';
  // 10x6 grid
  const total = 10*6;
  for(let i=0;i<total;i++){
    const cell = document.createElement('div');
    cell.className = 'block ground';
    // place chests at some indices
    if(i===12 || i===27 || i===41 || i===8){
      const id = ['chest1','chest2','chest3','chest4'][ [12,27,41,8].indexOf(i) ];
      cell.className = 'block chest';
      cell.textContent = 'Chest';
      cell.dataset.task = id;
      cell.onclick = onChestClick;
      if(opened[id]){
        cell.classList.add('open');
        cell.textContent = 'Open';
      }
    }
    worldEl.appendChild(cell);
  }
}

function onChestClick(e){
  const id = e.currentTarget.dataset.task;
  if(opened[id]){ messageEl.textContent = '这个箱子已经打开。'; return; }
  startTask(id);
}

function startTask(id){
  const task = tasks[id];
  if(!task) return;
  modalTitle.textContent = '学习任务';
  modalPrompt.textContent = task.prompt;
  modalInput.value = '';
  feedback.textContent = '';
  modal.classList.remove('hidden');
  modalInput.focus();

  submitBtn.onclick = ()=>{
    const ans = modalInput.value.trim().toLowerCase();
    if(!ans){ feedback.textContent = '请输入答案。'; return; }
    const ok = ans === task.answer.toLowerCase();
    if(ok){
      feedback.textContent = '正确！获得一把钥匙。';
      modalInput.disabled = true;
      markOpened(id);
      setTimeout(closeModal,900);
    } else {
      feedback.textContent = '错误，试试再想想。';
    }
  }
  cancelBtn.onclick = ()=>{
    closeModal();
  }
}

function markOpened(id){
  opened[id]=true;
  keys += 1;
  keysEl.textContent = keys;
  messageEl.textContent = `恭喜！你获得了钥匙（${keys}/3）。`;
  // 更新世界 display
  buildWorld();
  checkWin();
}

function checkWin(){
  if(keys>=3){
    messageEl.textContent = '全部钥匙已收集！出口解锁，你获胜了 🎉';
    // reveal a visual change: change some blocks to indicate exit
    showExit();
  }
}

function showExit(){
  // 将右下角几个方块改色
  const blocks = worldEl.querySelectorAll('.block');
  for(let i=0;i<blocks.length;i++){
    if(i>=58){ blocks[i].style.background = 'linear-gradient(180deg,#ffd166,#ffb03b)'; blocks[i].textContent='Exit'; }
  }
}

function closeModal(){ modal.classList.add('hidden'); }

// 初始化
buildWorld();

// 快捷键：Enter 提交
modalInput && modalInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') submitBtn.click(); });

// 说明：这是一个最小可玩演示，后续可以：
// - 用 Web Speech API 做朗读识别
// - 用 three.js 做 3D voxel 世界或用 Unity WebGL 构建导出

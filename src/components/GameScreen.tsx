import React from 'react';
import { useGame } from '../useGame';

export default function GameScreen({ game }: { game: ReturnType<typeof useGame> }) {
  const { theme, frustration, anxiety, turn, testkits, currentPartner, useItem, goToHospital, takeAction, doRest } = game;
  const isPanic = anxiety >= 80;

  // ===== 路由枢纽：根据不同主题加载完全不同的游戏组件 =====
  if (theme.id === 'programmer') {
    return <ProgrammerGameScreen game={game} />;
  }

  // 默认的月抛/打工人核心玩法
  if (!currentPartner) return null;

  let constraints: string[] = [];
  let hiddenCount = 0;

  currentPartner.tags.forEach(tag => {
    const forceHide = isPanic && Math.random() < 0.5;
    if (!tag.revealed || forceHide) {
      hiddenCount++;
    } else if (tag.constraint) {
      constraints.push(tag.constraint);
    }
  });

  const disableOralCondom = constraints.includes('no_condom') || constraints.includes('no_oral');
  const disableSexCondom = constraints.includes('no_condom') || constraints.includes('oral_only');
  const disableOralRaw = constraints.includes('condom_only') || constraints.includes('no_oral');
  const disableSexRaw = constraints.includes('condom_only') || constraints.includes('oral_only');

  const chatDisabled = hiddenCount === 0 && !isPanic;

  return (
    <div className={`relative z-10 w-full max-w-md glass-panel rounded-3xl overflow-hidden flex flex-col shadow-2xl min-h-[800px] transition-opacity duration-500 border-t border-white/10 ${isPanic ? 'panic-mode' : ''}`}>
      <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
        <div>
          <h1 className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">
            {theme.name}
          </h1>
          <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{theme.subtitle}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right flex flex-col items-end">
            <div className="text-[10px] uppercase text-slate-500 font-bold">{theme.moneyName}</div>
            <div className="text-lg font-mono font-bold text-emerald-400 leading-none">￥{game.money}</div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="text-[10px] uppercase text-slate-500 font-bold">Round</div>
            <div className="text-xl font-mono font-bold text-white leading-none">{turn.toString().padStart(2, '0')}</div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-900/30 space-y-3">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-wider">
            <span className="text-rose-400 flex items-center gap-1">🔥 {theme.frustrationName} (Urge)</span>
            <span className="text-white">{frustration}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 p-0.5 shadow-inner">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-rose-600 transition-all duration-700 ease-out" style={{ width: `${frustration}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-wider">
            <span className="text-violet-400 flex items-center gap-1">🧠 {theme.anxietyName} (Anxiety)</span>
            <span className="text-white">{anxiety}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 p-0.5 shadow-inner">
            <div className={`h-full rounded-full transition-all duration-700 ease-out ${isPanic ? 'bg-violet-500' : 'bg-gradient-to-r from-indigo-500 to-violet-600'}`} style={{ width: `${anxiety}%` }}></div>
          </div>
          {isPanic && <p className="text-[10px] text-violet-300 mt-1 text-center animate-pulse">⚠️ 恐慌状态：视线模糊，无法看清细节</p>}
        </div>

        <div className="grid grid-cols-5 gap-2 pt-1">
          {/* Testkit */}
          <div className="bg-slate-800/50 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center group relative overflow-hidden">
            <span className="text-xl mb-1">🧪</span>
            <span className="text-[10px] text-slate-400 font-bold">{theme.itemNames.testkit} x{testkits}</span>
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {testkits > 0 && (
                <button onClick={() => game.useItem('testkit')} className="text-xs text-sky-400 font-bold py-1.5 w-full hover:bg-sky-900/30">使用</button>
              )}
              <button onClick={() => game.buyItem('testkit')} className="text-[10px] text-emerald-400 font-bold py-1.5 w-full hover:bg-emerald-900/30 border-t border-white/5">购买 ￥50</button>
            </div>
          </div>

          {/* PrEP */}
          <div className="bg-slate-800/50 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center group relative overflow-hidden">
            <span className="text-xl mb-1">💊</span>
            <span className="text-[10px] text-slate-400 font-bold">{theme.itemNames.prep} x{game.prep}</span>
            {game.prepActive && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>}
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {game.prep > 0 && !game.prepActive && (
                <button onClick={() => game.useItem('prep')} className="text-xs text-sky-400 font-bold py-1.5 w-full hover:bg-sky-900/30">使用</button>
              )}
              <button onClick={() => game.buyItem('prep')} className="text-[10px] text-emerald-400 font-bold py-1.5 w-full hover:bg-emerald-900/30 border-t border-white/5">购买 ￥100</button>
            </div>
          </div>

          {/* Alcohol */}
          <div className="bg-slate-800/50 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center group relative overflow-hidden">
            <span className="text-xl mb-1">🍷</span>
            <span className="text-[10px] text-slate-400 font-bold">{theme.itemNames.alcohol} x{game.alcohol}</span>
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {game.alcohol > 0 && (
                <button onClick={() => game.useItem('alcohol')} className="text-xs text-sky-400 font-bold py-1.5 w-full hover:bg-sky-900/30">使用</button>
              )}
              <button onClick={() => game.buyItem('alcohol')} className="text-[10px] text-emerald-400 font-bold py-1.5 w-full hover:bg-emerald-900/30 border-t border-white/5">购买 ￥30</button>
            </div>
          </div>

          {/* Gift */}
          <div className="bg-slate-800/50 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center group relative overflow-hidden">
            <span className="text-xl mb-1">🎁</span>
            <span className="text-[10px] text-slate-400 font-bold">{theme.itemNames.gift} x{game.gift}</span>
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {game.gift > 0 && (
                <button onClick={() => game.useItem('gift')} className="text-xs text-sky-400 font-bold py-1.5 w-full hover:bg-sky-900/30">使用</button>
              )}
              <button onClick={() => game.buyItem('gift')} className="text-[10px] text-emerald-400 font-bold py-1.5 w-full hover:bg-emerald-900/30 border-t border-white/5">购买 ￥150</button>
            </div>
          </div>

          {/* Medicine */}
          <div className="bg-slate-800/50 rounded-lg p-2 border border-white/5 flex flex-col items-center justify-center group relative overflow-hidden">
            <span className="text-xl mb-1">💊</span>
            <span className="text-[10px] text-slate-400 font-bold">{theme.itemNames.medicine} x{game.medicine}</span>
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {game.medicine > 0 && (
                <button onClick={() => game.useItem('medicine')} className="text-xs text-sky-400 font-bold py-1.5 w-full hover:bg-sky-900/30">使用</button>
              )}
              <button onClick={() => game.buyItem('medicine')} className="text-[10px] text-emerald-400 font-bold py-1.5 w-full hover:bg-emerald-900/30 border-t border-white/5">购买 ￥300</button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-2">
          <button onClick={game.doWork} className="w-full bg-amber-900/30 hover:bg-amber-800/50 rounded-lg p-2 border border-amber-500/20 flex items-center justify-center gap-2 group transition-all">
            <span className="text-xl">💼</span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-amber-300 font-bold uppercase">{theme.workName} (+￥)</span>
              <span className="text-[9px] text-amber-400/60 group-hover:text-amber-300 transition-colors">{theme.frustrationName}+10 / {theme.anxietyName}+5</span>
            </div>
          </button>
          
          <button onClick={doRest} className="w-full bg-sky-900/30 hover:bg-sky-800/50 rounded-lg p-2 border border-sky-500/20 flex items-center justify-center gap-2 group transition-all">
            <span className="text-xl">🛋️</span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-sky-300 font-bold uppercase">{theme.restName}</span>
              <span className="text-[9px] text-sky-400/60 group-hover:text-sky-300 transition-colors">{theme.frustrationName}+5 / {theme.anxietyName}-15</span>
            </div>
          </button>

          <button onClick={goToHospital} className="w-full bg-violet-900/30 hover:bg-violet-800/50 rounded-lg p-2 border border-violet-500/20 flex items-center justify-center gap-2 group transition-all">
            <span className="text-xl">🏥</span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-violet-300 font-bold uppercase">{theme.hospitalName} (￥200)</span>
              <span className="text-[9px] text-violet-400/60 group-hover:text-violet-300 transition-colors">{theme.frustrationName}+10 / 清空{theme.anxietyName}</span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col overflow-y-auto relative">
        <div className="text-center mb-4 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-4xl shadow-xl border-2 border-slate-600 avatar-float mb-3 relative">
            <span>{currentPartner.avatar}</span>
          </div>
          <h2 className="text-base font-bold text-white">{theme.partnerName}</h2>
          <p className="text-[11px] text-pink-300/90 italic mt-2 font-serif tracking-wide">{currentPartner.flirtLine}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6 content-start min-h-[60px]">
          {currentPartner.tags.map((tag, idx) => {
            const forceHide = isPanic && Math.random() < 0.5;
            if (!tag.revealed || forceHide) {
              return (
                <div key={idx} className="tag-badge px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 bg-slate-900 border border-slate-700 shadow-sm mb-1 flex items-center gap-1.5 cursor-help">
                  {isPanic ? <span className="blur-sm">???</span> : <span>❓ 隐藏信息</span>}
                </div>
              );
            } else {
              let icon = '⏺';
              if (tag.color.includes('red')) icon = '⚠️';
              else if (tag.constraint) icon = '🚫';
              else if (tag.color.includes('emerald')) icon = '🛡️';
              return (
                <div key={idx} className={`tag-badge tag-reveal px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg mb-1 flex items-center gap-1.5 border border-white/10 ${tag.color}`}>
                  <span className="opacity-75">{icon}</span> {tag.text}
                </div>
              );
            }
          })}
        </div>

        <div className="space-y-2 mt-auto">
          <button onClick={() => takeAction('chat')} disabled={chatDisabled} className={`w-full py-3 bg-indigo-900/40 hover:bg-indigo-800/60 text-indigo-200 rounded-xl font-bold border border-indigo-500/20 transition-all flex items-center justify-center gap-2 text-sm ${chatDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <span>💬</span> {chatDisabled ? '已完全了解' : theme.actionNames.chat} {!chatDisabled && <span className="opacity-50 text-[10px] font-normal ml-1">({theme.frustrationName}+3)</span>}
          </button>

          <div className="h-px bg-white/5 my-2"></div>

          <div className="grid grid-cols-2 gap-2">
            <ActionButton id="btn-oral-condom" onClick={() => takeAction('oral_condom')} disabled={disableOralCondom} className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/5" icon="🍬" title={theme.actionNames.oral_condom} subtitle={`收益极低 | ${theme.anxietyName}+2`} />
            <ActionButton id="btn-sex-condom" onClick={() => takeAction('sex_condom')} disabled={disableSexCondom} className="bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-100 border-emerald-500/20 shadow-lg" icon="🛡️" title={theme.actionNames.sex_condom} subtitle={`收益一般 | ${theme.anxietyName}+5`} />
            <ActionButton id="btn-oral-raw" onClick={() => takeAction('oral_raw')} disabled={disableOralRaw} className="bg-amber-900/40 hover:bg-amber-800/50 text-amber-100 border-amber-500/10" icon="🍭" title={theme.actionNames.oral_raw} subtitle={`收益中等 | ${theme.anxietyName}+15`} />
            <ActionButton id="btn-sex-raw" onClick={() => takeAction('sex_raw')} disabled={disableSexRaw} className="bg-rose-900/60 hover:bg-rose-800 text-rose-100 border-rose-500/30 shadow-lg danger-pulse" icon="🔥" title={theme.actionNames.sex_raw} subtitle={`收益较高 | ${theme.anxietyName}+30`} />
          </div>

          <button onClick={() => takeAction('refuse')} className="w-full py-3 mt-2 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white rounded-xl font-bold border border-white/10 transition-all text-xs flex items-center justify-center gap-1">
            <span>👋</span> {theme.actionNames.refuse} ({theme.frustrationName}+8)
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ id, onClick, disabled, className, icon, title, subtitle }: { id: string, onClick: () => void, disabled: boolean, className: string, icon: string, title: string, subtitle: string }) {
  return (
    <button id={id} onClick={onClick} disabled={disabled} className={`relative py-3 rounded-xl font-semibold text-xs border transition-all ${className} ${disabled ? 'btn-disabled' : ''}`}>
      {icon} {title}
      <span className="block text-[9px] opacity-60 mt-0.5">{subtitle}</span>
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-rose-500 font-bold rotate-[-3deg] text-[10px] uppercase border border-rose-500/30 rounded-xl backdrop-blur-[1px]">
          对方拒绝
        </div>
      )}
    </button>
  );
}

// ==========================================
// 全新独立玩法：程序员视角 (Package.json 俄罗斯轮盘)
// 核心机制：原版信息博弈 + 长线被动技术债构筑 (Dependencies)
// ==========================================
function ProgrammerGameScreen({ game }: { game: ReturnType<typeof useGame> }) {
  const { theme, frustration, anxiety, turn, currentPartner, useItem, goToHospital, takeAction, doRest, money, testkits, prep, alcohol, gift } = game;
  const isPanic = anxiety >= 80;

  // 记录长线技术栈资产/债务
  const [dependencies, setDependencies] = React.useState<Array<{id: number, name: string, fCost: number, aCost: number, isBad: boolean}>>([]);
  const [prevTurn, setPrevTurn] = React.useState(turn);

  // 核心创新点：回合结算，触发所有已安装 SDK 的被动效果
  React.useEffect(() => {
    if (turn > prevTurn) {
      let passiveF = 0;
      let passiveA = 0;
      dependencies.forEach(dep => {
        passiveF += dep.fCost;
        passiveA += dep.aCost;
      });
      
      // 调用我们在手术1中暴露出的底层接口
      if (passiveF !== 0 && game.setFrustration) game.setFrustration(prev => Math.max(0, prev + passiveF));
      if (passiveA !== 0 && game.setAnxiety) game.setAnxiety(prev => Math.min(100, prev + passiveA));
      
      setPrevTurn(turn);
    }
  }, [turn, prevTurn, dependencies, game]);

  if (!currentPartner) return null;

  // 统计隐藏标签与限制逻辑 (完美保留原版原汁原味的博弈)
  let constraints: string[] = [];
  let hiddenCount = 0;
  let hasRedTags = false;
  let hasGreenTags = false;

  currentPartner.tags.forEach(tag => {
    const forceHide = isPanic && Math.random() < 0.5;
    if (!tag.revealed || forceHide) {
      hiddenCount++;
    } else {
      if (tag.constraint) constraints.push(tag.constraint);
      if (tag.color.includes('red')) hasRedTags = true;
      if (tag.color.includes('emerald')) hasGreenTags = true;
    }
  });

  const disableOralCondom = constraints.includes('no_condom') || constraints.includes('no_oral');
  const disableSexCondom = constraints.includes('no_condom') || constraints.includes('oral_only');
  const disableOralRaw = constraints.includes('condom_only') || constraints.includes('no_oral');
  const disableSexRaw = constraints.includes('condom_only') || constraints.includes('oral_only');
  const chatDisabled = hiddenCount === 0 && !isPanic;

  // 拦截核心操作，计算并加入 Dependencies
  const handleInstall = (actionType: string) => {
    let fCost = 0;
    let aCost = 0;
    let isBad = false;

    // 根据你接入的方式和代码库的隐藏质量，决定这个库日后的被动属性
    const isSafe = actionType.includes('condom');
    
    if (hasRedTags) {
      // 如果库有红标签（Bug），且你没做安全防护（无套），每回合疯狂涨焦虑
      aCost = isSafe ? 1 : 3;
      fCost = isSafe ? 0 : 1;
      isBad = true;
    } else if (hasGreenTags && !isBad) {
      // 优秀的开源库，会持续帮你降低压力
      fCost = -2;
      aCost = -1;
    } else {
      // 普通库，只是稍微拖慢一点编译速度（涨一点点微量压抑）
      fCost = isSafe ? 0 : 1;
    }

    setDependencies(prev => [...prev, {
      id: turn,
      name: currentPartner.avatar + ' ' + theme.partnerName,
      fCost, aCost, isBad
    }]);

    takeAction(actionType); // 继续执行原版生病/结算逻辑
  };

  // 汇总当前所有被动属性用于 UI 显示
  const totalPassiveF = dependencies.reduce((acc, curr) => acc + curr.fCost, 0);
  const totalPassiveA = dependencies.reduce((acc, curr) => acc + curr.aCost, 0);

  return (
    <div className={`relative z-10 w-full max-w-md bg-[#0d1117] rounded-3xl overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-[#30363d] font-mono transition-opacity duration-500 min-h-[800px] ${isPanic ? 'saturate-150' : ''}`}>
      
      {/* GitHub/NPM 风格顶部状态栏 */}
      <div className="bg-[#161b22] border-b border-[#30363d] p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center text-[#c9d1d9]">
          <div className="flex items-center gap-2">
            <span className="text-xl">📦</span>
            <span className="font-bold tracking-tight">NPM Registry</span>
            <span className="text-[10px] bg-[#238636] text-white px-2 py-0.5 rounded-full font-sans">v{turn}.0</span>
          </div>
          <span className="text-[#e3b341] font-bold text-sm">💰 ¥{money}</span>
        </div>

        {/* 核心监控面板 */}
        <div className="flex gap-4 bg-[#010409] p-3 rounded-lg border border-[#30363d]">
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-[#8b949e] mb-1">
              <span>{theme.frustrationName} (进度压力)</span>
              <span className="text-[#e3b341]">{frustration}%</span>
            </div>
            <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
              <div className="h-full bg-[#e3b341] transition-all" style={{ width: `${frustration}%` }}></div>
            </div>
            {totalPassiveF !== 0 && <div className="text-[9px] mt-1 text-right text-[#8b949e]">被动: {totalPassiveF > 0 ? '+' : ''}{totalPassiveF}/回合</div>}
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] text-[#8b949e] mb-1">
              <span>{theme.anxietyName} (线上风险)</span>
              <span className={isPanic ? 'text-[#f85149]' : 'text-[#58a6ff]'}>{anxiety}%</span>
            </div>
            <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
              <div className={`h-full transition-all ${isPanic ? 'bg-[#f85149] animate-pulse' : 'bg-[#58a6ff]'}`} style={{ width: `${anxiety}%` }}></div>
            </div>
            {totalPassiveA !== 0 && <div className="text-[9px] mt-1 text-right text-[#8b949e]">被动: {totalPassiveA > 0 ? '+' : ''}{totalPassiveA}/回合</div>}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll p-4 flex flex-col">
        {/* 当前检索到的 SDK 信息 (Partner) */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg mb-4 relative">
          {isPanic && <div className="absolute top-0 left-0 w-full h-full bg-[#f85149]/5 pointer-events-none rounded-xl animate-pulse"></div>}
          
          <div className="flex items-start gap-3 mb-3">
            <div className="text-4xl drop-shadow-md">{currentPartner.avatar}</div>
            <div>
              <h2 className="text-lg font-bold text-[#c9d1d9] leading-none mb-1">{theme.partnerName}</h2>
              <div className="text-[10px] text-[#8b949e]">npm install {theme.partnerName.toLowerCase().replace(/\s/g, '-')}</div>
            </div>
          </div>
          
          <div className="text-xs text-[#8b949e] italic bg-[#0d1117] p-3 rounded border border-[#30363d] mb-4">
            " {currentPartner.flirtLine} "
          </div>

          <div className="text-[10px] text-[#8b949e] font-bold uppercase mb-2">Package Traits (特性)</div>
          <div className="flex flex-wrap gap-2">
            {currentPartner.tags.map((tag, idx) => {
              const forceHide = isPanic && Math.random() < 0.5;
              if (!tag.revealed || forceHide) {
                return <span key={idx} className="bg-[#21262d] text-[#8b949e] px-2 py-1 rounded text-[10px] border border-[#30363d] cursor-help transition-all hover:bg-[#30363d]">/* [加密/未测试模块] */</span>;
              }
              
              let bg = "bg-[#238636]/20 text-[#3fb950] border border-[#238636]/50";
              if (tag.color.includes('red')) bg = "bg-[#f85149]/20 text-[#ff7b72] border border-[#f85149]/50";
              else if (tag.constraint) bg = "bg-[#8957e5]/20 text-[#a371f7] border border-[#8957e5]/50";

              return <span key={idx} className={`${bg} px-2 py-1 rounded text-[10px] font-bold shadow-sm`}>{tag.text}</span>;
            })}
          </div>
        </div>

        {/* 已安装的依赖列表 Dependencies (核心长线玩法展示) */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 flex-1 flex flex-col">
          <div className="text-[10px] text-[#8b949e] font-bold uppercase mb-2 flex justify-between items-center">
            <span>dependencies {"{"} {dependencies.length} {"}"}</span>
            <span className="text-[#e3b341]">长线收益/技术债</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[120px] custom-scroll pr-1 space-y-1.5">
            {dependencies.length === 0 ? (
              <div className="text-[#8b949e] text-xs h-full flex items-center justify-center opacity-50 italic">项目很干净，暂无外部依赖...</div>
            ) : (
              dependencies.map((dep, i) => (
                <div key={i} className={`flex justify-between items-center p-2 rounded border text-[10px] ${dep.isBad ? 'bg-[#f85149]/10 border-[#f85149]/30 text-[#ff7b72]' : 'bg-[#238636]/10 border-[#238636]/30 text-[#3fb950]'}`}>
                  <span className="truncate w-3/5 font-bold">"{dep.name}": "^1.{dep.id}.0"</span>
                  <span className="text-[9px] font-mono opacity-80">
                    {dep.fCost !== 0 && `F${dep.fCost > 0 ? '+' : ''}${dep.fCost} `}
                    {dep.aCost !== 0 && `A${dep.aCost > 0 ? '+' : ''}${dep.aCost}`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 底部操控面板 */}
      <div className="bg-[#161b22] border-t border-[#30363d] p-3 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] z-20">
        {/* 工具栏 (原版排雷道具) */}
        <div className="flex gap-2 mb-3 px-1 overflow-x-auto custom-scroll pb-1">
          <ToolBtn icon="🧪" name="Unit Test" count={testkits} onClick={() => useItem('testkit')} active={false} />
          <ToolBtn icon="🛡️" name="Sandbox" count={prep} onClick={() => useItem('prep')} active={game.prepActive} />
          <ToolBtn icon="☕" name="Coffee" count={alcohol} onClick={() => useItem('alcohol')} active={false} />
          <ToolBtn icon="🎫" name="Auth Token" count={gift} onClick={() => useItem('gift')} active={false} />
          <ToolBtn icon="🏥" name="StackOverflow" count={0} onClick={goToHospital} isAction active={false} />
          <ToolBtn icon="💤" name="摸鱼" count={0} onClick={doRest} isAction active={false} />
        </div>

        {/* 核心动作 (接入方式) */}
        <div className="grid grid-cols-2 gap-2">
          {/* 安全封装 (口交戴套) */}
          <ActionBtn 
            onClick={() => handleInstall('oral_condom')} disabled={disableOralCondom}
            cmd="Fork & 深度封装" sub="进度慢 | 日后极度安全"
            colorClass="text-[#3fb950] border-[#3fb950]/40 hover:bg-[#238636]/20"
          />
          {/* 直接引源码 (口交无套) */}
          <ActionBtn 
            onClick={() => handleInstall('oral_raw')} disabled={disableOralRaw}
            cmd="Ctrl+C 拷源码" sub="进度适中 | Bug隐患中"
            colorClass="text-[#e3b341] border-[#e3b341]/40 hover:bg-[#e3b341]/20"
          />
          {/* 正常引包 (性交戴套) */}
          <ActionBtn 
            onClick={() => handleInstall('sex_condom')} disabled={disableSexCondom}
            cmd="npm install --save" sub="进度快 | 标准隐患"
            colorClass="text-[#58a6ff] border-[#58a6ff]/40 hover:bg-[#58a6ff]/20"
          />
          {/* 强行发布 (性交无套) */}
          <ActionBtn 
            onClick={() => handleInstall('sex_raw')} disabled={disableSexRaw}
            cmd="sudo npm force" sub="瞬间起飞 | 极易暴雷"
            colorClass="text-[#ff7b72] border-[#f85149]/50 hover:bg-[#f85149]/20 shadow-[0_0_10px_rgba(248,81,73,0.2)]"
          />
        </div>
        
        <div className="flex gap-2 mt-2">
          <button onClick={() => takeAction('chat')} disabled={chatDisabled} className={`flex-1 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-[10px] font-bold rounded-lg border border-[#30363d] transition-all flex justify-center items-center gap-1 ${chatDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
             🔍 {chatDisabled ? '文档已读完' : '阅读官方文档'}
          </button>
          <button onClick={() => takeAction('refuse')} className="px-4 py-2 bg-transparent hover:bg-[#f85149]/10 text-[#8b949e] hover:text-[#ff7b72] text-[10px] font-bold rounded-lg border border-[#30363d] transition-all">
            🗑️ 放弃该库
          </button>
        </div>
      </div>
    </div>
  );
}

// 辅助子组件：工具按钮
function ToolBtn({ icon, name, count, onClick, active, isAction }: any) {
  return (
    <button onClick={onClick} className={`flex-shrink-0 flex flex-col items-center justify-center bg-[#21262d] border rounded-lg w-14 h-14 transition-all relative group ${active ? 'border-[#3fb950] shadow-[0_0_8px_rgba(63,185,80,0.4)]' : 'border-[#30363d] hover:bg-[#30363d]'}`}>
      <span className="text-xl mb-1 drop-shadow">{icon}</span>
      <span className="text-[8px] font-bold text-[#8b949e] leading-none">{name}</span>
      {!isAction && count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#1f6feb] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0d1117]">
          {count}
        </span>
      )}
    </button>
  );
}

// 辅助子组件：动作按钮
function ActionBtn({ onClick, disabled, cmd, sub, colorClass }: any) {
  return (
    <button onClick={onClick} disabled={disabled} className={`relative p-2 rounded-lg text-left border transition-all bg-[#0d1117] overflow-hidden ${disabled ? 'border-[#30363d] opacity-40 cursor-not-allowed grayscale' : colorClass}`}>
      <div className="font-bold text-xs mb-0.5 tracking-tight z-10 relative">{cmd}</div>
      <div className="text-[9px] font-mono opacity-70 z-10 relative">{sub}</div>
    </button>
  );
}




import React from 'react';
import { useGame } from '../useGame';
import { DISEASES } from '../constants';

export default function FeedbackModal({ game }: { game: ReturnType<typeof useGame> }) {
  const { feedback, screen, setScreen, nextTurn, turn, history, theme } = game;

  if (!feedback) return null;

  const isHistory = screen === 'history';

  let counts = { enjoy: 0, escape: 0, leave: 0, miss: 0, infected: 0 };
  let actionCounts = { sex_raw: 0, sex_condom: 0, oral_raw: 0, oral_condom: 0, refuse: 0 };

  history.forEach(h => {
    if (h.outcomeLabel.includes(theme.outcomeNames.enjoy)) counts.enjoy++;
    if (h.outcomeLabel.includes(theme.outcomeNames.escape)) counts.escape++;
    if (h.outcomeLabel.includes(theme.outcomeNames.leave)) counts.leave++;
    if (h.outcomeLabel.includes(theme.outcomeNames.miss)) counts.miss++;
    if (h.outcomeLabel.includes(theme.outcomeNames.infected)) counts.infected++;

    if (actionCounts[h.action as keyof typeof actionCounts] !== undefined) {
      actionCounts[h.action as keyof typeof actionCounts]++;
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-md max-h-[90vh] rounded-3xl border border-white/10 shadow-2xl relative flex flex-col overflow-hidden">
        
        {!isHistory && (
          <>
            <div className="p-6 pb-2 text-center flex-shrink-0">
              <div className="text-6xl mb-2 filter drop-shadow-lg">{feedback.icon}</div>
              <h2 className={`text-2xl font-black uppercase tracking-tight ${feedback.isGameOver ? (feedback.title === '幸存者' ? 'text-emerald-400' : 'text-rose-500 animate-pulse') : 'text-white'}`}>
                {feedback.title}
              </h2>
            </div>

            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="px-6 py-2 flex-shrink-0 overflow-y-auto custom-scroll">
                <div className="bg-slate-800/80 rounded-xl p-4 text-sm text-slate-300 leading-relaxed border border-white/5">
                  <p dangerouslySetInnerHTML={{ __html: feedback.msg }}></p>
                  
                  {feedback.isGameOver && (
                    <div className="mt-4 bg-slate-950/50 rounded-xl p-3 border border-white/5 text-xs">
                      <h4 className="text-slate-500 font-bold uppercase tracking-widest mb-2 text-center text-[10px]">生涯结果</h4>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-blue-300">✅ {theme.outcomeNames.enjoy}</span>
                          <span className="font-mono font-bold text-white text-sm">{counts.enjoy}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-emerald-300">🛡️ {theme.outcomeNames.leave}</span>
                          <span className="font-mono font-bold text-white text-sm">{counts.leave}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-amber-300">😰 {theme.outcomeNames.escape}</span>
                          <span className="font-mono font-bold text-white text-sm">{counts.escape}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-slate-400">👋 {theme.outcomeNames.miss}</span>
                          <span className="font-mono font-bold text-white text-sm">{counts.miss}</span>
                        </div>
                        <div className="col-span-2 flex justify-between items-center border-b border-white/5 pb-1 bg-rose-950/20 px-1 -mx-1 rounded">
                          <span className="text-rose-400 font-bold">💀 {theme.outcomeNames.infected}</span>
                          <span className="font-mono font-black text-rose-400 text-sm">{counts.infected}</span>
                        </div>
                      </div>

                      <h4 className="text-slate-500 font-bold uppercase tracking-widest mb-2 text-center text-[10px]">行为统计 (次数)</h4>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-rose-900/20 border border-rose-500/20 rounded p-1 text-center">
                          <div className="text-[9px] text-rose-300 opacity-70">{theme.actionNames.sex_raw}</div>
                          <div className="font-mono font-bold text-rose-200">{actionCounts.sex_raw}</div>
                        </div>
                        <div className="bg-amber-900/20 border border-amber-500/20 rounded p-1 text-center">
                          <div className="text-[9px] text-amber-300 opacity-70">{theme.actionNames.oral_raw}</div>
                          <div className="font-mono font-bold text-amber-200">{actionCounts.oral_raw}</div>
                        </div>
                        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded p-1 text-center">
                          <div className="text-[9px] text-emerald-300 opacity-70">{theme.actionNames.sex_condom}</div>
                          <div className="font-mono font-bold text-emerald-200">{actionCounts.sex_condom}</div>
                        </div>
                        <div className="bg-slate-800/50 border border-white/10 rounded p-1 text-center">
                          <div className="text-[9px] text-slate-400 opacity-70">{theme.actionNames.oral_condom}</div>
                          <div className="font-mono font-bold text-slate-300">{actionCounts.oral_condom}</div>
                        </div>
                        <div className="col-span-2 bg-slate-800 border border-white/5 rounded p-1 flex justify-between px-3 items-center">
                          <div className="text-[9px] text-slate-400">👋 {theme.actionNames.refuse}</div>
                          <div className="font-mono font-bold text-white">{actionCounts.refuse}</div>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                        <span className="font-bold text-slate-300">⏱️ 存活回合</span>
                        <span className="font-mono font-black text-xl text-white">{turn - 1}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {feedback.disease && (
                  <div className="mt-4 bg-rose-950/30 border border-rose-500/30 rounded-xl p-4">
                    <p className="text-xs text-rose-100/80 space-y-2">
                      <b>确诊：</b>{theme.diseases[feedback.disease].name}<br/>
                      <b>途径：</b>{theme.diseases[feedback.disease].transmission}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 pt-4 flex flex-col gap-3 flex-shrink-0 mt-auto">
                {feedback.isGameOver && (
                  <button onClick={() => setScreen('history')} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-colors">
                    📋 查看详细复盘
                  </button>
                )}

                <div className="flex gap-3">
                  {!feedback.isGameOver && (
                    <button onClick={() => {
                      if (feedback.isSimpleAlert) setScreen('game');
                      else nextTurn();
                    }} className="flex-1 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg">
                      {feedback.isSimpleAlert ? '关闭' : '继续'}
                    </button>
                  )}
                  {feedback.isGameOver && (
                    <button onClick={() => setScreen('intro')} className="flex-1 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-500 transition-colors shadow-lg shadow-rose-900/50">
                      返回首页
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {isHistory && (
          <div className="flex flex-col flex-1 overflow-hidden h-full">
            <div className="px-6 py-2 pb-0 flex-shrink-0">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center border-b border-white/5 pb-2">详细记录</h3>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scroll">
              <div className="space-y-3 text-xs">
                {history.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-white/5">
                    <div className="relative text-2xl bg-slate-900 rounded-full w-10 h-10 flex items-center justify-center border border-white/10 flex-shrink-0">
                      {item.avatar}
                      {item.diseases.length > 0 && <span className="absolute -bottom-1 -right-1 text-[10px]">🦠</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 leading-tight">
                        {item.tags.map((t, i) => (
                          <span key={i} className="inline-block px-1.5 py-0.5 rounded bg-slate-700 text-[10px] text-slate-300 mr-1 mb-1">{t.text}</span>
                        ))}
                        <br/>
                        {item.diseases.length > 0 ? (
                          <span className="text-[10px] text-rose-400 font-bold">携带: {item.diseases.map(d => theme.diseases[d].name).join(", ")}</span>
                        ) : (
                          <span className="text-[10px] text-emerald-500/50">健康</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold border ${item.outcomeClass}`}>{item.outcomeLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 pt-2 flex-shrink-0 bg-slate-900 border-t border-white/5">
              <button onClick={() => setScreen('feedback')} className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-colors">
                ⬅️ 返回结算页面
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

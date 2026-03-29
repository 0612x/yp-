import React from 'react';
import { useGame } from '../useGame';

export default function HelpModal({ onClose, game }: { onClose: () => void, game: ReturnType<typeof useGame> }) {
  const { theme } = game;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
      <div className="bg-slate-900 w-full max-w-md h-[85vh] rounded-3xl border border-white/10 shadow-2xl flex flex-col relative overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-white/5 bg-slate-800/50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">游戏指南手册</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6 overflow-y-auto custom-scroll text-sm text-slate-300 space-y-6">
          <section>
            <h3 className="text-emerald-400 font-bold mb-2 uppercase tracking-wide">🏆 胜利条件</h3>
            <ul className="list-disc pl-4 space-y-1 marker:text-emerald-500">
              <li><b>{theme.frustrationName}归零</b>：通过行动释放所有{theme.frustrationName}。</li>
              <li><b>且未中招</b>：在游戏结算时，必须是安全的。如果虽然{theme.frustrationName}清零但已触发致命问题，仍判定为失败。</li>
            </ul>
          </section>
          <section>
            <h3 className="text-rose-400 font-bold mb-2 uppercase tracking-wide">💀 失败条件</h3>
            <ul className="list-disc pl-4 space-y-1 marker:text-rose-500">
              <li><b>{theme.loseFrustrationTitle}</b>：{theme.frustrationName}达到 100%。(失去理智随机高危行为)</li>
              <li><b>{theme.loseAnxietyTitle}</b>：{theme.anxietyName}达到 100%。(游戏结束)</li>
              <li><b>{theme.loseDiseaseTitle}</b>：排查出致命问题，或检测对方时不幸中招(部分情况)。</li>
              <li><b>糟糕的胜利</b>：{theme.frustrationName}清零，但在最终结算时发现已中招。</li>
            </ul>
          </section>
          <div className="h-px bg-white/10 my-4"></div>
          <section>
            <h3 className="text-violet-400 font-bold mb-2 uppercase tracking-wide">🧠 核心机制：延迟判决</h3>
            <div className="bg-violet-900/20 p-3 rounded-lg border border-violet-500/20 text-xs">
              <p>🚫 <b>不会弹出</b>“你已中招”的提示。</p>
              <p>✅ 游戏会继续，你必须带着疑虑继续生活。</p>
              <p>🏥 只有<b>“{theme.hospitalName}”</b>或<b>“通关结算”</b>时才会揭晓谜底。</p>
            </div>
          </section>
          <div className="h-px bg-white/10 my-4"></div>
          <section>
            <h3 className="text-emerald-400 font-bold mb-2 uppercase tracking-wide">💸 {theme.moneyName}与道具</h3>
            <ul className="list-disc pl-4 space-y-1 marker:text-emerald-500 text-xs">
              <li><b>{theme.workName}</b>：消耗时间赚取{theme.moneyName}，但会增加{theme.frustrationName}和{theme.anxietyName}。</li>
              <li><b>{theme.itemNames.testkit} (￥50)</b>：可检测当前{theme.partnerName}是否携带风险。</li>
              <li><b>{theme.itemNames.prep} (￥100)</b>：使用后本回合内免疫最高风险，但会增加{theme.anxietyName}。</li>
              <li><b>{theme.itemNames.alcohol} (￥30)</b>：大幅降低{theme.anxietyName}，但会增加{theme.frustrationName}。</li>
              <li><b>{theme.itemNames.gift} (￥150)</b>：使用后解锁对方所有隐藏信息，且有概率软化对方的态度（解除某些行为限制）。</li>
              <li><b>{theme.hospitalName} (￥200)</b>：清空{theme.anxietyName}并检查是否中招，但会消耗大量时间（增加{theme.frustrationName}）。</li>
            </ul>
          </section>
          <section>
            <h3 className="text-sky-400 font-bold mt-4 mb-2 uppercase tracking-wide">🎲 突发事件</h3>
            <p className="text-xs">每次行动都有几率触发随机事件，可能带来意外之财，也可能让你欲火焚身或精神崩溃。</p>
          </section>
        </div>
        <div className="p-4 border-t border-white/5 bg-slate-900 text-center">
          <button onClick={onClose} className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-colors">知道了</button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { THEMES } from '../themes';

export default function IntroModal({ game, onStart, onHelp }: { game: any, onStart: () => void; onHelp: () => void }) {
  const { themeId, setThemeId, theme } = game;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl transition-opacity duration-500">
      <div className="bg-slate-900 p-8 rounded-3xl max-w-sm w-full border border-white/10 shadow-2xl text-center relative flex flex-col max-h-[90vh]">
        <div className="text-7xl mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">{theme.icon}</div>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{theme.name}</h1>
        <p className="text-xs font-bold text-pink-500 tracking-widest uppercase mb-4">{theme.subtitle}</p>
        
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">选择视角 (Theme)</label>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${themeId === t.id ? 'bg-pink-600/20 border-pink-500 text-pink-400' : 'bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700'}`}
              >
                {t.name.replace('模拟器', '')}
              </button>
            ))}
          </div>
        </div>

        <div className="text-left text-xs text-slate-300 space-y-3 mb-6 bg-slate-800/50 p-5 rounded-xl border border-white/5 overflow-y-auto custom-scroll flex-1 min-h-[120px]">
          {theme.description.map((desc: string, i: number) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: desc }}></p>
          ))}
        </div>
        
        <div className="space-y-3 mt-auto">
          <button onClick={onStart} className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
            开始游戏
          </button>
          
          <button onClick={onHelp} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
            <span>📖</span> 游戏帮助
          </button>
        </div>
      </div>
    </div>
  );
}

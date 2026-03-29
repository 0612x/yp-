/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useGame } from './useGame';
import IntroModal from './components/IntroModal';
import GameScreen from './components/GameScreen';
import FeedbackModal from './components/FeedbackModal';
import HelpModal from './components/HelpModal';

export default function App() {
  const game = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1623949566270-3d23157e0573?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-fixed text-slate-300 font-sans select-none overflow-x-hidden">
      <div className="fixed inset-0 bg-black/90 backdrop-blur-[2px] z-0"></div>

      {game.screen === 'intro' && <IntroModal game={game} onStart={game.startGame} onHelp={() => game.setScreen('help')} />}
      
      {game.screen === 'help' && <HelpModal game={game} onClose={() => game.setScreen('intro')} />}

      {(game.screen === 'game' || game.screen === 'feedback' || game.screen === 'history') && (
        <GameScreen game={game} />
      )}

      {(game.screen === 'feedback' || game.screen === 'history') && (
        <FeedbackModal game={game} />
      )}
    </div>
  );
}


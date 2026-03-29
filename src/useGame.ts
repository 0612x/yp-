import { useState, useCallback, useMemo } from 'react';
import { CONFIG, Tag } from './constants';
import { THEMES, Theme } from './themes';

export interface PartnerTag extends Tag {
  revealed: boolean;
}

export interface Partner {
  tags: PartnerTag[];
  diseases: string[];
  avatar: string;
  flirtLine: string;
}

export interface HistoryItem {
  avatar: string;
  tags: PartnerTag[];
  diseases: string[];
  action: string;
  outcomeLabel: string;
  outcomeClass: string;
}

export interface FeedbackData {
  title: string;
  msg: string;
  icon: string;
  isGameOver?: boolean;
  disease?: string | null;
  isSimpleAlert?: boolean;
  event?: any;
}

export function useGame() {
  const [themeId, setThemeId] = useState<string>('original');
  const theme = useMemo(() => THEMES.find(t => t.id === themeId) || THEMES[0], [themeId]);

  const [screen, setScreen] = useState<'intro' | 'game' | 'help' | 'feedback' | 'history'>('intro');
  const [frustration, setFrustration] = useState(CONFIG.startFrustration);
  const [anxiety, setAnxiety] = useState(0);
  const [turn, setTurn] = useState(1);
  const [testkits, setTestkits] = useState(1);
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
  const [isInfected, setIsInfected] = useState(false);
  const [infectionData, setInfectionData] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  
  const [money, setMoney] = useState(CONFIG.startMoney);
  const [prep, setPrep] = useState(0);
  const [alcohol, setAlcohol] = useState(0);
  const [gift, setGift] = useState(0);
  const [medicine, setMedicine] = useState(0);
  const [prepActive, setPrepActive] = useState(false);

  const generateNewPartner = useCallback(() => {
    const numTags = Math.floor(Math.random() * 2) + 3;
    const partnerTags: PartnerTag[] = [];
    const selectedIndices = new Set<number>();
    const isCarrier = Math.random() < 0.4;
    const hasConstraint = Math.random() < 0.4;

    let loopLimit = 0;
    while (partnerTags.length < numTags && loopLimit < 100) {
      loopLimit++;
      const idx = Math.floor(Math.random() * theme.tags.length);
      if (selectedIndices.has(idx)) continue;
      const tagTemplate = theme.tags[idx];
      if (isCarrier && partnerTags.length === 0 && !tagTemplate.color.includes('red') && !tagTemplate.color.includes('purple')) continue;
      if (hasConstraint && !partnerTags.some(t => t.constraint) && !tagTemplate.constraint && loopLimit < 50) continue;

      const currentConstraints = partnerTags.map(t => t.constraint).filter(Boolean);
      if (tagTemplate.constraint) {
        if (tagTemplate.constraint === 'no_oral' && currentConstraints.includes('oral_only')) continue;
        if (tagTemplate.constraint === 'oral_only' && currentConstraints.includes('no_oral')) continue;
      }
      selectedIndices.add(idx);
      let isHidden = false;
      const currentHiddenCount = partnerTags.filter(t => !t.revealed).length;
      if (currentHiddenCount === 0 && tagTemplate.hiddenChance > 0) isHidden = Math.random() < tagTemplate.hiddenChance;
      partnerTags.push({ ...tagTemplate, revealed: !isHidden });
    }
    if (partnerTags.every(t => !t.revealed)) partnerTags[0].revealed = true;

    let activeDiseases: string[] = [];
    if (Math.random() < 0.05) {
      const keys = Object.keys(theme.diseases);
      activeDiseases.push(keys[Math.floor(Math.random() * keys.length)]);
    }
    partnerTags.forEach(tag => {
      if (tag.risk) {
        for (const [dKey, prob] of Object.entries(tag.risk)) {
          if (Math.random() < prob && !activeDiseases.includes(dKey)) activeDiseases.push(dKey);
        }
      }
      if (tag.safeChance && Math.random() < tag.safeChance) activeDiseases = [];
    });

    setCurrentPartner({
      tags: partnerTags,
      diseases: activeDiseases,
      avatar: theme.avatars[Math.floor(Math.random() * theme.avatars.length)],
      flirtLine: theme.flirtLines[Math.floor(Math.random() * theme.flirtLines.length)]
    });
  }, [theme]);

  const startGame = useCallback(() => {
    setFrustration(CONFIG.startFrustration);
    setAnxiety(0);
    setTurn(1);
    setTestkits(1);
    setIsInfected(false);
    setInfectionData(null);
    setHistory([]);
    setMoney(CONFIG.startMoney);
    setPrep(0);
    setAlcohol(0);
    setGift(0);
    setMedicine(0);
    setPrepActive(false);
    setScreen('game');
    generateNewPartner();
  }, [generateNewPartner]);

  const showGameOver = useCallback((title: string, msg: string, icon: string, disease: string | null = null) => {
    setFeedback({ title, msg, icon, isGameOver: true, disease });
    setScreen('feedback');
  }, []);

  const showWin = useCallback(() => {
    setFeedback({
      title: theme.winTitle,
      msg: theme.winMsg,
      icon: "✨",
      isGameOver: true,
    });
    setScreen('feedback');
  }, [theme]);

  const advanceTime = useCallback((fCost: number, aCost: number = 0) => {
    setTurn(t => t + 1);
    setPrepActive(false);

    let newF = frustration + fCost;
    let newA = anxiety + aCost;
    if (newA > 20) newA += CONFIG.anxietyGainPassive;

    let event = null;
    if (Math.random() < 0.2) {
      event = theme.randomEvents[Math.floor(Math.random() * theme.randomEvents.length)];
      newF += event.effect.frustration;
      newA += event.effect.anxiety;
      setMoney(m => Math.max(0, m + event.effect.money));
    }

    if (newF > 100) newF = 100;
    if (newA > 100) newA = 100;
    if (newF < 0) newF = 0;
    if (newA < 0) newA = 0;
    
    setFrustration(newF);
    setAnxiety(newA);

    if (newF >= 100) {
      showGameOver(theme.loseFrustrationTitle, theme.loseFrustrationMsg, "🤯");
      return { isGameOver: true, event: null, finalF: newF };
    }
    if (newA >= 100) {
      showGameOver(theme.loseAnxietyTitle, theme.loseAnxietyMsg, "😵‍💫");
      return { isGameOver: true, event: null, finalF: newF };
    }
    return { isGameOver: false, event, finalF: newF };
  }, [frustration, anxiety, showGameOver, theme]);

  const recordHistory = useCallback((action: string, infectedThisTurn: boolean) => {
    if (!currentPartner) return;
    let outcomeLabel = "", outcomeClass = "";
    const isDiseased = currentPartner.diseases.length > 0;

    if (action === 'refuse') {
      if (isDiseased) {
        outcomeLabel = `🛡️ ${theme.outcomeNames.leave}`; outcomeClass = "text-emerald-400 border-emerald-500/30 bg-emerald-900/20";
      } else {
        outcomeLabel = `👋 ${theme.outcomeNames.miss}`; outcomeClass = "text-slate-400 border-slate-500/30 bg-slate-800";
      }
    } else {
      if (infectedThisTurn) {
        outcomeLabel = `💀 ${theme.outcomeNames.infected}`; outcomeClass = "text-rose-500 border-rose-500/30 bg-rose-900/30";
      } else if (isDiseased) {
        outcomeLabel = `😰 ${theme.outcomeNames.escape}`; outcomeClass = "text-amber-400 border-amber-500/30 bg-amber-900/20";
      } else {
        outcomeLabel = `✅ ${theme.outcomeNames.enjoy}`; outcomeClass = "text-blue-400 border-blue-500/30 bg-blue-900/20";
      }
    }

    setHistory(prev => [...prev, {
      avatar: currentPartner.avatar,
      tags: currentPartner.tags,
      diseases: currentPartner.diseases,
      action,
      outcomeLabel,
      outcomeClass
    }]);
  }, [currentPartner]);

  const buyItem = useCallback((type: string) => {
    const price = CONFIG.prices[type as keyof typeof CONFIG.prices];
    if (money >= price) {
      setMoney(m => m - price);
      if (type === 'testkit') setTestkits(t => t + 1);
      if (type === 'prep') setPrep(p => p + 1);
      if (type === 'alcohol') setAlcohol(a => a + 1);
      if (type === 'gift') setGift(g => g + 1);
      if (type === 'medicine') setMedicine(m => m + 1);
    } else {
      setFeedback({ title: "余额不足", msg: "你的钱不够买这个物品。", icon: "💸", isSimpleAlert: true });
      setScreen('feedback');
    }
  }, [money]);

  const useItem = useCallback((type: string) => {
    if (type === 'testkit' && testkits > 0 && currentPartner) {
      setTestkits(t => t - 1);
      let msg = "", icon = "";
      if (currentPartner.diseases.length > 0) {
        const names = currentPartner.diseases.map(d => theme.diseases[d].name).join(", ");
        msg = `<span class="text-rose-400 font-bold">⚠️ 发现风险！</span><br>风险项：${names}。<br>请立即离开。`;
        icon = "🦠";
      } else {
        msg = `<span class="text-emerald-400 font-bold">✅ 安全。</span><br>未检测到常见风险。<br>(注：无法检测隐藏极深的隐患)`;
        icon = "🛡️";
      }
      setCurrentPartner(prev => prev ? { ...prev, tags: prev.tags.map(t => ({ ...t, revealed: true })) } : null);
      setFeedback({ title: "检测结果", msg, icon, isSimpleAlert: true });
      setScreen('feedback');
    } else if (type === 'prep' && prep > 0) {
      setPrep(p => p - 1);
      setPrepActive(true);
      const newA = Math.min(100, anxiety + 5);
      setAnxiety(newA);
      
      if (newA >= 100) {
        showGameOver(theme.loseAnxietyTitle, "副作用成为了压垮你的最后一根稻草。你开始出现幻觉，游戏结束。", "😵‍💫");
      } else {
        setFeedback({ title: `使用 ${theme.itemNames.prep}`, msg: `你使用了 ${theme.itemNames.prep}。<br>本回合内 <b>致命风险</b> 降为 0%。<br><span class='text-violet-400'>副作用：${theme.anxietyName} +5</span>`, icon: "💊", isSimpleAlert: true });
        setScreen('feedback');
      }
    } else if (type === 'alcohol' && alcohol > 0) {
      setAlcohol(a => a - 1);
      const newA = Math.max(0, anxiety - 15);
      const newF = Math.min(100, frustration + 5);
      setAnxiety(newA);
      setFrustration(newF);
      
      if (newF >= 100) {
        showGameOver(theme.loseFrustrationTitle, "催化剂让你彻底失去了理智。你无法再思考后果，在绝望中发生了一次随机的高危行为。", "🤯");
      } else {
        setFeedback({ title: `使用 ${theme.itemNames.alcohol}`, msg: `你使用了 ${theme.itemNames.alcohol}。<br>${theme.anxietyName} <span class='text-emerald-400'>-15</span><br>${theme.frustrationName} <span class='text-rose-400'>+5</span>`, icon: "🍷", isSimpleAlert: true });
        setScreen('feedback');
      }
    } else if (type === 'gift' && gift > 0 && currentPartner) {
      setGift(g => g - 1);
      let msg = `你送出了一份 ${theme.itemNames.gift}。对方很开心，对你放下了防备！<br><b>已解锁所有隐藏信息。</b>`;
      let newTags = currentPartner.tags.map(t => ({ ...t, revealed: true }));
      
      let removedConstraint = false;
      newTags = newTags.map(t => {
        if (t.constraint && Math.random() < 0.5) {
          removedConstraint = true;
          return { ...t, constraint: undefined, text: t.text + " (已妥协)" };
        }
        return t;
      });

      if (removedConstraint) {
        msg += "<br><br><span class='text-pink-400 font-bold'>对方的态度软化了，放宽了某些限制！</span>";
      }

      setCurrentPartner({ ...currentPartner, tags: newTags });
      setFeedback({ title: `赠送 ${theme.itemNames.gift}`, msg, icon: "🎁", isSimpleAlert: true });
      setScreen('feedback');
    } else if (type === 'medicine' && medicine > 0) {
      setMedicine(m => m - 1);
      if (isInfected) {
        setIsInfected(false);
        setInfectionData(null);
        setFeedback({ title: `使用 ${theme.itemNames.medicine}`, msg: `你使用了 ${theme.itemNames.medicine}。<br><span class='text-emerald-400 font-bold'>奇迹发生了！你体内的隐患被彻底清除了！</span>`, icon: "💊", isSimpleAlert: true });
      } else {
        const newF = Math.max(0, frustration - 30);
        const newA = Math.max(0, anxiety - 30);
        setFrustration(newF);
        setAnxiety(newA);
        setFeedback({ title: `使用 ${theme.itemNames.medicine}`, msg: `你使用了 ${theme.itemNames.medicine}。<br>虽然你并没有感染，但强大的药效让你身心舒畅。<br>${theme.frustrationName} <span class='text-emerald-400'>-30</span><br>${theme.anxietyName} <span class='text-emerald-400'>-30</span>`, icon: "💊", isSimpleAlert: true });
      }
      setScreen('feedback');
    }
  }, [testkits, prep, alcohol, gift, medicine, currentPartner, anxiety, frustration, isInfected, showGameOver, theme]);

 const doWork = useCallback(() => {
    const earned = Math.floor(Math.random() * 80) + 50; // 50-130
    setMoney(m => m + earned);
    
    const { isGameOver, event } = advanceTime(10, 5);
    if (isGameOver) return;
    
    let msg = `你努力${theme.workName}了一段时间。<br>获得${theme.moneyName} <span class='text-emerald-400'>+${earned}</span><br>${theme.frustrationName} <span class='text-rose-400'>+10</span><br>${theme.anxietyName} <span class='text-violet-400'>+5</span>`;
    if (event) {
      msg += `<br><br><div class="p-2 bg-slate-800 rounded border border-white/10"><b>🎲 突发事件：${event.title}</b><br>${event.desc}</div>`;
    }
    
    setFeedback({ title: theme.workName, msg, icon: "💼", isSimpleAlert: true });
    setScreen('feedback');
  }, [advanceTime, theme]);

  const doRest = useCallback(() => {
    const { isGameOver, event } = advanceTime(5, -15);
    if (isGameOver) return;
    
    let msg = `你${theme.restName}了一段时间，稍微平复了焦虑，但问题依然存在。<br>${theme.frustrationName} <span class='text-rose-400'>+5</span><br>${theme.anxietyName} <span class='text-emerald-400'>-15</span>`;
    if (event) {
      msg += `<br><br><div class="p-2 bg-slate-800 rounded border border-white/10"><b>🎲 突发事件：${event.title}</b><br>${event.desc}</div>`;
    }
    
    setFeedback({ title: theme.restName, msg, icon: "🛋️", isSimpleAlert: true });
    setScreen('feedback');
  }, [advanceTime, theme]);

  const goToHospital = useCallback(() => {
    if (money < CONFIG.hospitalCostMoney) {
      setFeedback({ title: "余额不足", msg: `${theme.hospitalName}需要 ${CONFIG.hospitalCostMoney}，你没${theme.moneyName}了。`, icon: "🏥", isSimpleAlert: true });
      setScreen('feedback');
      return;
    }
    setMoney(m => m - CONFIG.hospitalCostMoney);

    const { isGameOver, event } = advanceTime(CONFIG.hospitalCost, 0);
    if (isGameOver) return;

    setAnxiety(0);

    if (isInfected) {
      showGameOver(theme.loseDiseaseTitle, theme.loseDiseaseMsg, "🏥", infectionData);
    } else {
      let msg = `<span class='text-emerald-400 font-bold'>检测结果安全。</span><br>你是安全的。${theme.anxietyName}已清空，但你也为此浪费了宝贵的时间（${theme.frustrationName}大幅上升）。`;
      if (event) {
        msg += `<br><br><div class="p-2 bg-slate-800 rounded border border-white/10"><b>🎲 突发事件：${event.title}</b><br>${event.desc}</div>`;
      }
      setFeedback({
        title: "虚惊一场",
        msg,
        icon: "🏥",
        isSimpleAlert: true
      });
      setScreen('feedback');
    }
  }, [money, advanceTime, isInfected, infectionData, showGameOver, theme]);

  const nextTurn = useCallback(() => {
    setScreen('game');
    generateNewPartner();
  }, [generateNewPartner]);

  const takeAction = useCallback((actionType: string) => {
    if (frustration >= 100 || anxiety >= 100 || !currentPartner) return;

    if (actionType === 'chat') {
      const hiddenIndices = currentPartner.tags.map((t, i) => !t.revealed ? i : -1).filter(i => i !== -1);
      if (hiddenIndices.length > 0) {
        const idx = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
        const newTags = [...currentPartner.tags];
        newTags[idx].revealed = true;
        setCurrentPartner({ ...currentPartner, tags: newTags });
      }
      const { isGameOver, event } = advanceTime(CONFIG.chatCost, 0);
      if (!isGameOver && event) {
        setFeedback({ title: "突发事件", msg: `<b>${event.title}</b><br>${event.desc}`, icon: "🎲", isSimpleAlert: true });
        setScreen('feedback');
      }
      return;
    }

    let infectedThisTurn = false;
    let newIsInfected = isInfected;
    let newInfectionData = infectionData;

    if (actionType === 'refuse') {
      recordHistory('refuse', false);
      const { isGameOver, event } = advanceTime(CONFIG.passiveGain + CONFIG.refuseCost, 0);
      if (!isGameOver) {
        let msg = `你选择了${theme.actionNames.refuse}。${theme.frustrationName}上升，但至少你暂时是安全的。`;
        if (event) {
          msg += `<br><br><div class="p-2 bg-slate-800 rounded border border-white/10"><b>🎲 突发事件：${event.title}</b><br>${event.desc}</div>`;
        }
        setFeedback({ title: "继续寻找", msg, icon: "🏃" });
        setScreen('feedback');
      }
      return;
    }

    const reduction = CONFIG.rewards[actionType as keyof typeof CONFIG.rewards];
    const anxietyGain = CONFIG.stress[actionType as keyof typeof CONFIG.stress];

    if (!isInfected && currentPartner.diseases.length > 0) {
      for (let dKey of currentPartner.diseases) {
        const disease = theme.diseases[dKey];
        let chance = 0;
        if (actionType === 'sex_raw') chance = 0.95;
        else if (actionType === 'oral_raw') chance = (disease.riskType.includes('skin') || disease.riskType.includes('mucous')) ? 0.5 : 0.1;
        else if (actionType === 'sex_condom') {
          if (disease.riskType === 'skin_hair') chance = 1.0;
          else if (disease.riskType === 'contact') chance = 0.3;
          else chance = 0.02;
        }
        else if (actionType === 'oral_condom') chance = 0.01;

        if (Math.random() < chance) {
          if (dKey === 'HIV' && prepActive) continue;
          newIsInfected = true;
          newInfectionData = dKey;
          infectedThisTurn = true;
          break;
        }
      }
    }

    setIsInfected(newIsInfected);
    setInfectionData(newInfectionData);
    recordHistory(actionType, infectedThisTurn);

    const frustrationDelta = CONFIG.passiveGain - reduction;
    const { isGameOver, event, finalF } = advanceTime(frustrationDelta, anxietyGain);
    if (isGameOver) return;

    if (finalF === 0) {
      if (newIsInfected) {
        showGameOver("糟糕的胜利", `你的${theme.frustrationName}清零了，你感到无比轻松...<br>但在几天后，开始出现异常反应。<br>你虽然释放了压力，却输掉了游戏。`, "🥀", newInfectionData);
      } else {
        showWin();
      }
    } else {
      let title = "宣泄与不安";
      let icon = "🍬";
      let msg = `压力得到了释放。<br>${theme.frustrationName} <span class="text-emerald-400">-${reduction}</span>`;

      if (anxietyGain > 5) {
        msg += `<br>${theme.anxietyName} <span class="text-violet-400">+${anxietyGain}</span>`;
        icon = "😰";
      }

      if (newIsInfected) {
        msg += `<br><span class="text-xs text-slate-500 italic mt-2">你感觉到了一丝异样，但也许只是错觉...？</span>`;
      } else if (currentPartner.diseases.length > 0) {
        msg += `<br><span class="text-xs text-slate-500 italic mt-2">虽然过程很惊险，但你似乎运气不错...暂时。</span>`;
      }

      if (event) {
        msg += `<br><br><div class="p-2 bg-slate-800 rounded border border-white/10"><b>🎲 突发事件：${event.title}</b><br>${event.desc}</div>`;
      }

      setFeedback({ title, msg, icon });
      setScreen('feedback');
    }
  }, [frustration, anxiety, currentPartner, isInfected, infectionData, prepActive, advanceTime, recordHistory, showGameOver, showWin, theme]);

  return {
    theme, themeId, setThemeId,
    screen, setScreen,
    frustration, anxiety, turn, testkits, currentPartner,
    history, feedback, money, prep, alcohol, gift, medicine, prepActive,
    startGame, useItem, buyItem, doWork, doRest, goToHospital, nextTurn, takeAction
  };
}

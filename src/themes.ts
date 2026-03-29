import { ALL_TAGS, DISEASES, FLIRT_LINES, AVATARS, RANDOM_EVENTS, Tag } from './constants';

export interface Theme {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  description: string[];
  frustrationName: string;
  anxietyName: string;
  moneyName: string;
  partnerName: string;
  actionNames: {
    refuse: string;
    chat: string;
    oral_condom: string;
    oral_raw: string;
    sex_condom: string;
    sex_raw: string;
  };
  itemNames: {
    testkit: string;
    prep: string;
    alcohol: string;
    gift: string;
    medicine: string;
  };
  hospitalName: string;
  workName: string;
  restName: string;
  outcomeNames: {
    enjoy: string;
    escape: string;
    leave: string;
    miss: string;
    infected: string;
  };
  diseases: Record<string, { name: string; riskType: string; desc: string; transmission: string }>;
  tags: Tag[];
  flirtLines: string[];
  avatars: string[];
  randomEvents: any[];
  winTitle: string;
  winMsg: string;
  loseFrustrationTitle: string;
  loseFrustrationMsg: string;
  loseAnxietyTitle: string;
  loseAnxietyMsg: string;
  loseDiseaseTitle: string;
  loseDiseaseMsg: string;
}

export const THEMES: Theme[] = [
  {
    id: 'original',
    name: '月抛模拟器',
    subtitle: 'Panic Edition',
    icon: '💘',
    description: [
      '1. 延迟判决：高危行为后，你不会立即知道是否感染。',
      '2. 心理压力：无套或高危行为会累积心理压力。压力过高会导致视线模糊。',
      '3. 去医院：确认自己是否安全的唯一方法，但代价高昂。',
      '4. 目标：将压抑值降至 0，且身体健康。'
    ],
    frustrationName: '生理压抑',
    anxietyName: '心理压力',
    moneyName: '资金',
    partnerName: '潜在伴侣',
    actionNames: {
      refuse: '换一个',
      chat: '试探 / 聊天',
      oral_condom: '戴套口交',
      oral_raw: '无套口交',
      sex_condom: '戴套性交',
      sex_raw: '无套性交'
    },
    itemNames: {
      testkit: '试纸',
      prep: 'PrEP',
      alcohol: '酒精',
      gift: '礼物',
      medicine: '特效药'
    },
    hospitalName: '去医院检查',
    workName: '搬砖打工',
    restName: '在家休息',
    outcomeNames: {
      enjoy: '理智享受',
      escape: '死里逃生',
      leave: '正确离开',
      miss: '遗憾错过',
      infected: '被ta感染'
    },
    diseases: DISEASES,
    tags: ALL_TAGS,
    flirtLines: FLIRT_LINES,
    avatars: AVATARS,
    randomEvents: RANDOM_EVENTS,
    winTitle: '幸存者',
    winMsg: '你成功清零了压抑值，且身体健康。<br><br>在这场充满迷雾和风险的游戏中，你靠着谨慎、策略和一点运气活了下来。',
    loseFrustrationTitle: '欲火焚身',
    loseFrustrationMsg: '长期的压抑让你彻底失去了理智。你无法再思考后果，在绝望中发生了一次随机的高危行为。',
    loseAnxietyTitle: '精神崩溃',
    loseAnxietyMsg: '巨大的心理压力压垮了你。你开始出现幻觉，被送进了精神病院，游戏结束。',
    loseDiseaseTitle: '确诊感染',
    loseDiseaseMsg: '很遗憾，医院的检查结果显示你已感染。<br>之前的侥幸心理终究没能救你。'
  },
  {
    id: 'programmer',
    name: '程序员模拟器',
    subtitle: 'Deadline Edition',
    icon: '💻',
    description: [
      '1. 延迟判决：强行上线后，你不会立即知道是否有Bug。',
      '2. 发版压力：不写单测或强行上线会累积发版压力。压力过高会导致视线模糊。',
      '3. 请教大佬：确认代码是否安全的唯一方法，但代价高昂（欠人情）。',
      '4. 目标：将需求压抑降至 0，且线上无事故。'
    ],
    frustrationName: '需求压抑',
    anxietyName: '发版压力',
    moneyName: '精力',
    partnerName: '新需求',
    actionNames: {
      refuse: '打回需求',
      chat: '开会拉扯',
      oral_condom: '写单测防范',
      oral_raw: '直接Copy代码',
      sex_condom: '规范重构',
      sex_raw: '强行上线'
    },
    itemNames: {
      testkit: 'Code Review',
      prep: '拜服务器',
      alcohol: '喝咖啡',
      gift: '请喝奶茶',
      medicine: '紧急回滚'
    },
    hospitalName: '请教大佬排查',
    workName: '摸鱼恢复',
    restName: '带薪拉屎',
    outcomeNames: {
      enjoy: '平稳落地',
      escape: '侥幸过关',
      leave: '成功避坑',
      miss: '错失绩效',
      infected: '引发事故'
    },
    diseases: {
      HIV: { name: "P0级线上事故", riskType: "fluid", desc: "核心链路崩溃，不可逆转。", transmission: "核心代码" },
      SYPHILIS: { name: "内存泄漏", riskType: "contact", desc: "服务器逐渐卡死。", transmission: "全局变量" },
      HERPES: { name: "死锁", riskType: "skin", desc: "偶尔卡住，难以复现。", transmission: "并发控制" },
      HPV: { name: "数据污染", riskType: "contact", desc: "脏数据蔓延，极难清理。", transmission: "数据库操作" },
      GONORRHEA: { name: "无限循环", riskType: "fluid_mucous", desc: "CPU 100%，直接宕机。", transmission: "逻辑错误" },
      CRABS: { name: "UI错位", riskType: "skin_hair", desc: "看着很难受，但不致命。", transmission: "样式冲突" },
      CHLAMYDIA: { name: "依赖冲突", riskType: "fluid_mucous", desc: "包版本不兼容，编译报错。", transmission: "包管理" },
      HEPATITIS_B: { name: "安全漏洞", riskType: "fluid", desc: "被黑客利用，数据泄露。", transmission: "接口设计" },
    },
    tags: [
      { text: "祖传代码", color: "bg-purple-800", risk: { HIV: 0.3, SYPHILIS: 0.4, GONORRHEA: 0.5, HPV: 0.6 }, clue: "【危险】没人知道这块代码是干嘛的，但千万别动。", hiddenChance: 0.8 },
      { text: "产品拍脑袋", color: "bg-red-600", risk: { HIV: 0.1, SYPHILIS: 0.1, GONORRHEA: 0.1 }, clue: "【状态】逻辑根本不通，强行做肯定出事。", hiddenChance: 0.5 },
      { text: "文档缺失", color: "bg-slate-500", risk: { GONORRHEA: 0.05 }, constraint: "oral_only", clue: "【状态】没有任何注释和文档。", hiddenChance: 0.2 },
      { text: "紧急插队", color: "bg-rose-900", risk: { HIV: 0.2 }, constraint: "oral_only", clue: "【限制】老板说明天就要上。", hiddenChance: 0.5 },
      { text: "核心模块", color: "bg-yellow-600", risk: { HIV: 0.15, SYPHILIS: 0.2, GONORRHEA: 0.3, HPV: 0.4 }, constraint: "condom_only", clue: "【身份】牵一发而动全身。", hiddenChance: 0.8 },
      { text: "简单文案修改", color: "bg-sky-500", risk: {}, constraint: "no_sex", clue: "【状态】非常简单，闭着眼睛都能改。", hiddenChance: 0.3 },
      { text: "有详细文档", color: "bg-emerald-500", risk: {}, safeChance: 0.9, clue: "【健康】前人留下了极其详细的文档。", hiddenChance: 0.6 },
      { text: "依赖过期库", color: "bg-red-800", risk: { SYPHILIS: 0.8, HIV: 0.2 }, clue: "【危险】还在用几年前的废弃库。", hiddenChance: 0.9 },
      { text: "自带单测", color: "bg-sky-700", risk: {}, safetyBonus: true, constraint: "condom_only", clue: "自带完善的测试用例，很安全。", hiddenChance: 0.3 },
      { text: "无法本地运行", color: "bg-rose-800", risk: { HIV: 0.15 }, constraint: "no_condom", clue: "【限制】只能在线上环境调试。", hiddenChance: 0.2 },
      { text: "硬编码", color: "bg-orange-600", risk: { HPV: 0.1, GONORRHEA: 0.1 }, clue: "【状态】到处都是写死的魔法数字。", hiddenChance: 0.5 },
      { text: "全量覆盖", color: "bg-red-700", risk: { HIV: 0.2, SYPHILIS: 0.3 }, clue: "【危险】修改会影响所有用户。", hiddenChance: 0.7 },
      { text: "灰度发布", color: "bg-teal-500", risk: {}, safeChance: 0.8, clue: "【健康】只影响小部分用户，风险可控。", hiddenChance: 0.4 },
      { text: "跨部门合作", color: "bg-indigo-600", risk: { HERPES: 0.2 }, clue: "【状态】需要等其他部门的接口，容易扯皮。", hiddenChance: 0.6 },
      { text: "外包代码", color: "bg-fuchsia-700", risk: { HIV: 0.2, SYPHILIS: 0.3, GONORRHEA: 0.4 }, clue: "【危险】代码风格极其诡异，到处是坑。", hiddenChance: 0.7 },
      { text: "无脑复制", color: "bg-yellow-800", risk: { HPV: 0.2, HERPES: 0.1 }, clue: "【状态】从StackOverflow上直接抄来的代码。", hiddenChance: 0.5 },
      { text: "老板亲自盯", color: "bg-red-900", risk: { HIV: 0.1 }, constraint: "oral_only", clue: "【限制】压力极大，不能出任何差错。", hiddenChance: 0.8 },
      { text: "重构契机", color: "bg-emerald-600", risk: {}, safeChance: 0.6, clue: "【机会】终于有时间把这坨屎山重构了。", hiddenChance: 0.4 },
      { text: "第三方API", color: "bg-blue-700", risk: { SYPHILIS: 0.2 }, clue: "【状态】完全依赖外部接口，极其不稳定。", hiddenChance: 0.6 },
      { text: "深夜上线", color: "bg-gray-800", risk: { HIV: 0.1, GONORRHEA: 0.2 }, clue: "【状态】大家都困得要死，最容易出低级错误。", hiddenChance: 0.7 },
    ],
    flirtLines: [
      "这个需求很简单，怎么实现我不管。",
      "老板说明天就要，你今晚加个班吧。",
      "竞品都有了，我们为什么做不出来？",
      "随便改改就行，不会出问题的。",
      "这个接口我没动过，怎么就报错了？",
      "先上线再说，有问题再热更。",
      "这块逻辑我也不清楚，你看着办吧。",
      "测试环境没问题啊，怎么线上挂了？",
      "你先评估一下时间，越快越好。",
      "这个功能砍掉吧，来不及了。",
      "加个字段而已，能有多难？",
      "用户反馈说卡，你优化一下性能。",
      "这个Bug是历史遗留问题，不是我写的。",
      "你重启一下服务器试试？",
      "清一下缓存就好了。",
      "这个设计图只是参考，具体你看着办。",
      "这个需求又变了，你重新改一下。",
      "别管什么架构了，先跑起来再说。",
      "你这代码怎么连个注释都没有？",
      "这个库已经不维护了，你赶紧换一个。"
    ],
    avatars: ['💻', '⌨️', '🖥️', '🖱️', '📱', '🔌', '🔋', '💾', '💿', '🎧'],
    randomEvents: [
      { id: 'ex', title: '前同事的问候', desc: '离职的同事突然问你那个祖传Bug修了没...', effect: { frustration: 15, anxiety: 10, money: 0 } },
      { id: 'video', title: '深夜技术群', desc: '看到群里有人删库被抓了，越看越害怕。', effect: { frustration: 0, anxiety: 20, money: 0 } },
      { id: 'bonus', title: '意外之财', desc: '解决了一个陈年老Bug，心情大好！', effect: { frustration: 0, anxiety: 0, money: 200 } },
      { id: 'peace', title: '贤者时间', desc: '突然看破红尘，觉得代码写得再好也会被重构。', effect: { frustration: -15, anxiety: -10, money: 0 } },
      { id: 'coffee', title: '咖啡机坏了', desc: '公司唯一的咖啡机坏了，全员精神萎靡。', effect: { frustration: 10, anxiety: 5, money: 0 } },
      { id: 'meeting', title: '无意义的会议', desc: '被拉去开了一下午的会，什么都没决定。', effect: { frustration: 20, anxiety: 10, money: -50 } },
      { id: 'praise', title: '大佬点赞', desc: '你的代码被技术总监在群里表扬了！', effect: { frustration: -20, anxiety: -15, money: 0 } },
      { id: 'server', title: '服务器波动', desc: '测试环境突然连不上了，浪费了一小时。', effect: { frustration: 15, anxiety: 5, money: 0 } },
      { id: 'keyboard', title: '键盘进水', desc: '不小心把水洒在了机械键盘上，心痛到无法呼吸。', effect: { frustration: 30, anxiety: 20, money: -500 } },
      { id: 'pizza', title: '老板请客', desc: '老板突然大发慈悲请大家吃披萨。', effect: { frustration: -15, anxiety: -5, money: 0 } },
      { id: 'github', title: 'GitHub挂了', desc: '全球最大的同性交友网站宕机了，大家被迫摸鱼。', effect: { frustration: -10, anxiety: -10, money: 0 } },
      { id: 'rmrf', title: '误删文件', desc: '手滑执行了 rm -rf，吓出一身冷汗，还好有备份。', effect: { frustration: 10, anxiety: 40, money: 0 } },
      { id: 'new_framework', title: '新框架发布', desc: '前端又出了新框架，学不动了，焦虑感爆棚。', effect: { frustration: 20, anxiety: 15, money: 0 } },
      { id: 'eye_pain', title: '眼睛干涩', desc: '盯着屏幕太久，眼睛疼得睁不开，只能买眼药水。', effect: { frustration: 10, anxiety: 10, money: -30 } },
      { id: 'code_review', title: '残酷的CR', desc: '代码被大佬批得体无完肤，自尊心受挫。', effect: { frustration: 25, anxiety: 20, money: 0 } },
      { id: 'free_snack', title: '零食补给', desc: '行政小姐姐推来了满满一车的免费零食！', effect: { frustration: -15, anxiety: -10, money: 0 } },
      { id: 'git_conflict', title: '合并冲突', desc: '解Git冲突解了一个小时，心态崩了。', effect: { frustration: 20, anxiety: 15, money: 0 } },
      { id: 'massage', title: '颈椎按摩', desc: '去按了个摩，感觉脖子终于属于自己了。', effect: { frustration: -25, anxiety: -20, money: -150 } },
    ],
    winTitle: '顺利发版',
    winMsg: '你成功清空了需求池，且线上平稳运行。<br><br>在这场充满Bug和Deadline的游戏中，你靠着谨慎、策略和一点运气活了下来。',
    loseFrustrationTitle: '需求爆炸',
    loseFrustrationMsg: '长期的需求积压让你彻底失去了理智。你无法再思考后果，胡乱敲了一通代码强行提交了。',
    loseAnxietyTitle: '精神崩溃',
    loseAnxietyMsg: '巨大的发版压力压垮了你。你开始出现幻觉，砸了电脑，游戏结束。',
    loseDiseaseTitle: '线上事故',
    loseDiseaseMsg: '很遗憾，大佬排查结果显示线上已经炸了。<br>之前的侥幸心理终究没能救你。'
  },
  {
    id: 'gamedev',
    name: '游戏开发模拟器',
    subtitle: 'Crunch Edition',
    icon: '🎮',
    description: [
      '1. 延迟判决：堆屎山硬上后，你不会立即知道是否有恶性Bug。',
      '2. 资金焦虑：乱买资产或强行开发会累积资金焦虑。焦虑过高会导致视线模糊。',
      '3. 延期跳票：确认游戏是否安全的唯一方法，但代价高昂（消耗预算）。',
      '4. 目标：将开发进度压力降至 0，且游戏无恶性Bug。'
    ],
    frustrationName: '进度压力',
    anxietyName: '资金焦虑',
    moneyName: '开发预算',
    partnerName: '新系统/功能',
    actionNames: {
      refuse: '砍掉功能',
      chat: '技术调研',
      oral_condom: '做个Demo',
      oral_raw: '买现成插件',
      sex_condom: '稳扎稳打开发',
      sex_raw: '堆屎山硬上'
    },
    itemNames: {
      testkit: 'QA测试',
      prep: '版本备份',
      alcohol: '吃顿好的',
      gift: '给美术加鸡腿',
      medicine: '热更新补丁'
    },
    hospitalName: '延期跳票排查',
    workName: '接外包回血',
    restName: '玩竞品游戏',
    outcomeNames: {
      enjoy: '顺利实现',
      escape: '侥幸没崩',
      leave: '明智砍掉',
      miss: '错失亮点',
      infected: '引发恶性Bug'
    },
    diseases: {
      HIV: { name: "坏档", riskType: "fluid", desc: "玩家存档全毁，差评如潮。", transmission: "核心系统" },
      SYPHILIS: { name: "严重掉帧", riskType: "contact", desc: "PPT游戏，根本没法玩。", transmission: "渲染模块" },
      HERPES: { name: "闪退黑屏", riskType: "skin", desc: "随机崩溃，难以复现。", transmission: "内存管理" },
      HPV: { name: "穿模卡死", riskType: "contact", desc: "物理引擎崩溃。", transmission: "物理碰撞" },
      GONORRHEA: { name: "逻辑死循环", riskType: "fluid_mucous", desc: "游戏直接卡死无响应。", transmission: "游戏逻辑" },
      CRABS: { name: "贴图丢失", riskType: "skin_hair", desc: "满屏幕紫黑格子。", transmission: "资源管理" },
      CHLAMYDIA: { name: "音效丢失", riskType: "fluid_mucous", desc: "玩着玩着突然没声音了。", transmission: "音频系统" },
      HEPATITIS_B: { name: "外挂泛滥", riskType: "fluid", desc: "防作弊没做好，神仙满天飞。", transmission: "网络同步" },
    },
    tags: [
      { text: "核心玩法", color: "bg-yellow-600", risk: { HIV: 0.15, SYPHILIS: 0.2, GONORRHEA: 0.3, HPV: 0.4 }, constraint: "condom_only", clue: "【身份】游戏的核心，不能出差错。", hiddenChance: 0.8 },
      { text: "花里胡哨", color: "bg-purple-600", risk: { HIV: 0.05, SYPHILIS: 0.1, HPV: 0.2, GONORRHEA: 0.15 }, clue: "【生活】看起来很酷，但极耗性能。", hiddenChance: 0.6 },
      { text: "底层重构", color: "bg-red-800", risk: { SYPHILIS: 0.8, HIV: 0.2 }, clue: "【危险】牵一发而动全身。", hiddenChance: 0.9 },
      { text: "简单UI", color: "bg-sky-500", risk: {}, constraint: "no_sex", clue: "【状态】非常简单，闭着眼睛都能做。", hiddenChance: 0.3 },
      { text: "成熟方案", color: "bg-emerald-500", risk: {}, safeChance: 0.9, clue: "【健康】有成熟的开源方案可以参考。", hiddenChance: 0.6 },
      { text: "性能黑洞", color: "bg-purple-800", risk: { HIV: 0.3, SYPHILIS: 0.4, GONORRHEA: 0.5, HPV: 0.6 }, clue: "【危险】极度消耗CPU和内存。", hiddenChance: 0.8 },
      { text: "必须联机", color: "bg-rose-800", risk: { HIV: 0.15 }, constraint: "no_condom", clue: "【限制】只能在联机环境下测试。", hiddenChance: 0.2 },
      { text: "自带测试", color: "bg-sky-700", risk: {}, safetyBonus: true, constraint: "condom_only", clue: "自带完善的测试用例，很安全。", hiddenChance: 0.3 },
      { text: "第三方插件", color: "bg-orange-600", risk: { HPV: 0.1, GONORRHEA: 0.1 }, clue: "【状态】不知道里面有什么坑。", hiddenChance: 0.5 },
      { text: "未经验证的算法", color: "bg-red-700", risk: { HIV: 0.2, SYPHILIS: 0.3 }, clue: "【危险】可能导致游戏逻辑崩溃。", hiddenChance: 0.7 },
      { text: "官方教程", color: "bg-teal-500", risk: {}, safeChance: 0.8, clue: "【健康】跟着官方文档做，基本不会出错。", hiddenChance: 0.4 },
      { text: "美术资源未到位", color: "bg-indigo-600", risk: { HERPES: 0.2 }, clue: "【状态】只能先用白模代替，容易出问题。", hiddenChance: 0.6 },
      { text: "祖传引擎", color: "bg-gray-700", risk: { HIV: 0.2, SYPHILIS: 0.2 }, clue: "【危险】公司自研的破引擎，文档全无。", hiddenChance: 0.8 },
      { text: "没有策划案", color: "bg-red-600", risk: { GONORRHEA: 0.3 }, clue: "【状态】全靠口头沟通，做完肯定要改。", hiddenChance: 0.7 },
      { text: "美术外包拉胯", color: "bg-orange-800", risk: { HPV: 0.2 }, clue: "【状态】交上来的资源根本没法用。", hiddenChance: 0.5 },
      { text: "内存泄漏", color: "bg-purple-900", risk: { HIV: 0.4, SYPHILIS: 0.3 }, clue: "【危险】玩久了必崩，极难排查。", hiddenChance: 0.9 },
    ],
    flirtLines: [
      "加个大逃杀模式吧，现在很火。",
      "这个光影效果必须拉满，不然没人玩。",
      "为什么别人的游戏能做到，我们不行？",
      "先上EA抢先体验，Bug以后再修。",
      "这个系统很简单，一天就能写完吧？",
      "玩家就是喜欢这种又肝又氪的。",
      "把掉率调低点，增加游戏寿命。",
      "这块美术外包做得很差，你凑合用吧。",
      "策划案又改了，你重新写一下逻辑。",
      "别管性能了，先跑起来再说。",
      "这个特效不够炫酷，再加点粒子。",
      "玩家反馈说太难了，削弱一下boss。",
      "能不能加个自走棋模式？",
      "这个功能竞品有，我们也得有。",
      "明天就要上展会了，今晚必须搞定。"
    ],
    avatars: ['🎮', '🕹️', '👾', '🎲', '🧩', '🎯', '🏆', '🥇', '🎧', '📺'],
    randomEvents: [
      { id: 'ex', title: '玩家催更', desc: '看到玩家群里每天都在催更，压力山大...', effect: { frustration: 15, anxiety: 10, money: 0 } },
      { id: 'video', title: '竞品爆火', desc: '刷视频看到同类竞品爆火，越看越焦虑。', effect: { frustration: 0, anxiety: 20, money: 0 } },
      { id: 'bonus', title: '意外投资', desc: '突然拉到了一笔小天使投资！', effect: { frustration: 0, anxiety: 0, money: 200 } },
      { id: 'peace', title: '贤者时间', desc: '突然看破红尘，觉得做游戏就是图一乐。', effect: { frustration: -15, anxiety: -10, money: 0 } },
      { id: 'engine', title: '引擎更新', desc: '手贱更新了游戏引擎，导致一堆插件报错。', effect: { frustration: 20, anxiety: 15, money: 0 } },
      { id: 'art', title: '美术跑路', desc: '主美突然离职，项目进度大受影响。', effect: { frustration: 10, anxiety: 25, money: -100 } },
      { id: 'praise', title: '玩家好评', desc: 'Demo放出后收到了很多玩家的鼓励！', effect: { frustration: -20, anxiety: -15, money: 0 } },
      { id: 'sale', title: '资产打折', desc: '心仪已久的插件打骨折，果断拿下！', effect: { frustration: -5, anxiety: -5, money: -50 } },
      { id: 'steam', title: 'Steam审核', desc: '被Steam打回要求修改，又要延期了。', effect: { frustration: 25, anxiety: 20, money: 0 } },
      { id: 'publisher', title: '发行商画饼', desc: '发行商承诺给推荐位，结果什么都没有。', effect: { frustration: 15, anxiety: 10, money: 0 } },
      { id: 'streamer', title: '主播试玩', desc: '大主播玩了你的游戏，愿望单暴涨！', effect: { frustration: -30, anxiety: -20, money: 0 } },
      { id: 'bug', title: '神奇Bug', desc: '发现了一个能把玩家卡出地图的Bug，修了一整天。', effect: { frustration: 20, anxiety: 5, money: 0 } },
      { id: 'server_down', title: '服务器宕机', desc: '开服第一天服务器就被挤爆了，玩家疯狂差评。', effect: { frustration: 30, anxiety: 25, money: -100 } },
      { id: 'player_riot', title: '玩家炎上', desc: '因为一个平衡性改动，玩家在贴吧把你祖宗十八代骂了一遍。', effect: { frustration: 25, anxiety: 30, money: 0 } },
      { id: 'lead_quit', title: '主程跑路', desc: '核心主程受不了加班跑路了，带走了一堆祖传代码的秘密。', effect: { frustration: 20, anxiety: 40, money: -200 } },
    ],
    winTitle: '顺利发售',
    winMsg: '你成功完成了开发，且游戏没有恶性Bug。<br><br>在这场充满跳票和加班的游戏中，你靠着谨慎、策略和一点运气活了下来。',
    loseFrustrationTitle: '进度崩溃',
    loseFrustrationMsg: '长期的进度压力让你彻底失去了理智。你无法再思考后果，胡乱打包了一个版本强行发售了。',
    loseAnxietyTitle: '资金断裂',
    loseAnxietyMsg: '巨大的资金焦虑压垮了你。工作室破产，游戏结束。',
    loseDiseaseTitle: '差评如潮',
    loseDiseaseMsg: '很遗憾，排查结果显示游戏里全是恶性Bug。<br>之前的侥幸心理终究没能救你。'
  },
  {
    id: 'pm',
    name: '产品经理模拟器',
    subtitle: 'Backlog Edition',
    icon: '📊',
    description: [
      '1. 延迟判决：强压开发上线后，你不会立即知道数据是否暴跌。',
      '2. 汇报焦虑：乱抄竞品或强压开发会累积汇报焦虑。焦虑过高会导致视线模糊。',
      '3. 甩锅离职：确认项目是否安全的唯一方法，但代价高昂（消耗资源）。',
      '4. 目标：将KPI压力降至 0，且项目平稳运行。'
    ],
    frustrationName: 'KPI压力',
    anxietyName: '汇报焦虑',
    moneyName: '项目资源',
    partnerName: '业务方诉求',
    actionNames: {
      refuse: '打回需求',
      chat: '对齐颗粒度',
      oral_condom: '做个MVP',
      oral_raw: '直接抄竞品',
      sex_condom: '排期开发',
      sex_raw: '强压开发上线'
    },
    itemNames: {
      testkit: 'AB测试',
      prep: '甩锅话术',
      alcohol: '摸鱼',
      gift: '画大饼',
      medicine: '公关洗地'
    },
    hospitalName: '复盘大会排查',
    workName: '写PPT汇报',
    restName: '带薪喝茶',
    outcomeNames: {
      enjoy: '数据达标',
      escape: '侥幸没跌',
      leave: '成功甩锅',
      miss: '错失风口',
      infected: '项目暴雷'
    },
    diseases: {
      HIV: { name: "数据暴跌", riskType: "fluid", desc: "核心指标腰斩，不可逆转。", transmission: "核心业务" },
      SYPHILIS: { name: "大规模客诉", riskType: "contact", desc: "客服电话被打爆。", transmission: "用户体验" },
      HERPES: { name: "老板发火", riskType: "skin", desc: "被叫到办公室痛骂。", transmission: "向上管理" },
      HPV: { name: "开发罢工", riskType: "contact", desc: "研发团队集体抗议。", transmission: "团队关系" },
      GONORRHEA: { name: "法务警告", riskType: "fluid_mucous", desc: "涉嫌违规，面临下架。", transmission: "合规风险" },
      CRABS: { name: "竞品嘲讽", riskType: "skin_hair", desc: "被竞品发公关稿嘲讽。", transmission: "市场公关" },
      CHLAMYDIA: { name: "预算超支", riskType: "fluid_mucous", desc: "钱花完了，东西没做出来。", transmission: "项目管理" },
      HEPATITIS_B: { name: "核心离职", riskType: "fluid", desc: "骨干开发受不了跑路了。", transmission: "团队建设" },
    },
    tags: [
      { text: "老板钦定", color: "bg-yellow-600", risk: { HIV: 0.15, SYPHILIS: 0.2, GONORRHEA: 0.3, HPV: 0.4 }, constraint: "condom_only", clue: "【身份】老板亲自提的需求，必须做。", hiddenChance: 0.8 },
      { text: "伪需求", color: "bg-purple-600", risk: { HIV: 0.05, SYPHILIS: 0.1, HPV: 0.2, GONORRHEA: 0.15 }, clue: "【生活】看起来很美好，其实没人用。", hiddenChance: 0.6 },
      { text: "底层重构", color: "bg-red-800", risk: { SYPHILIS: 0.8, HIV: 0.2 }, clue: "【危险】牵一发而动全身，极易背锅。", hiddenChance: 0.9 },
      { text: "简单文案", color: "bg-sky-500", risk: {}, constraint: "no_sex", clue: "【状态】非常简单，改个字就行。", hiddenChance: 0.3 },
      { text: "数据支撑", color: "bg-emerald-500", risk: {}, safeChance: 0.9, clue: "【健康】有详实的数据证明这个需求靠谱。", hiddenChance: 0.6 },
      { text: "合规风险", color: "bg-purple-800", risk: { HIV: 0.3, SYPHILIS: 0.4, GONORRHEA: 0.5, HPV: 0.6 }, clue: "【危险】游走在法律边缘。", hiddenChance: 0.8 },
      { text: "必须今天上", color: "bg-rose-800", risk: { HIV: 0.15 }, constraint: "no_condom", clue: "【限制】业务方死活不肯让步时间。", hiddenChance: 0.2 },
      { text: "历史遗留", color: "bg-orange-600", risk: { HPV: 0.1, GONORRHEA: 0.1 }, clue: "【状态】前任留下的坑，谁碰谁倒霉。", hiddenChance: 0.5 },
      { text: "大客户定制", color: "bg-red-700", risk: { HIV: 0.2, SYPHILIS: 0.3 }, clue: "【危险】得罪不起，只能硬着头皮做。", hiddenChance: 0.7 },
      { text: "AB测试中", color: "bg-teal-500", risk: {}, safeChance: 0.8, clue: "【健康】通过数据验证后再全量，比较稳妥。", hiddenChance: 0.4 },
      { text: "跨团队协作", color: "bg-indigo-600", risk: { HERPES: 0.2 }, clue: "【状态】沟通成本极高，容易背锅。", hiddenChance: 0.6 },
      { text: "外包团队", color: "bg-gray-600", risk: { SYPHILIS: 0.3, GONORRHEA: 0.2 }, clue: "【危险】沟通极其困难，做出来的东西完全不对。", hiddenChance: 0.7 },
      { text: "没有埋点", color: "bg-slate-700", risk: { HIV: 0.1 }, clue: "【状态】上线了也不知道效果怎么样。", hiddenChance: 0.5 },
      { text: "需求变更", color: "bg-rose-700", risk: { HPV: 0.3 }, clue: "【危险】开发做到一半，业务方突然说不要了。", hiddenChance: 0.8 },
      { text: "老板不懂装懂", color: "bg-red-900", risk: { HIV: 0.4, SYPHILIS: 0.4 }, clue: "【危险】外行指导内行，灾难的开始。", hiddenChance: 0.9 },
    ],
    flirtLines: [
      "这个需求很简单，怎么实现我不管。",
      "竞品都有了，我们为什么做不出来？",
      "先上线再说，有问题再迭代。",
      "这个功能能带来千万级日活！",
      "老板说明天就要看效果。",
      "数据不好看，你再优化一下体验。",
      "这块逻辑开发说做不了，你想想办法。",
      "把这个按钮做大一点，颜色再亮一点。",
      "用户的痛点你根本没抓准。",
      "这个版本先上，下个版本再优化。",
      "你再评估一下，能不能今天下班前给？",
      "这个按钮往左移两个像素。",
      "我们要做一个生态闭环。",
      "赋能业务，打通底层逻辑。",
      "这个痛点抓得不够准，再深挖一下。"
    ],
    avatars: ['📊', '📈', '📋', '📁', '📅', '💡', '📉', '📌', '📎', '💼'],
    randomEvents: [
      { id: 'ex', title: '前同事的问候', desc: '离职的同事突然问你那个坑填了没...', effect: { frustration: 15, anxiety: 10, money: 0 } },
      { id: 'video', title: '行业寒冬', desc: '看到新闻说大厂又裁员了，越看越焦虑。', effect: { frustration: 0, anxiety: 20, money: 0 } },
      { id: 'bonus', title: '意外之财', desc: '申请到了一笔额外的项目预算！', effect: { frustration: 0, anxiety: 0, money: 200 } },
      { id: 'peace', title: '贤者时间', desc: '突然看破红尘，觉得打工就是混日子。', effect: { frustration: -15, anxiety: -10, money: 0 } },
      { id: 'dev_fight', title: '研发互怼', desc: '前端和后端因为接口字段吵起来了，你去劝架。', effect: { frustration: 10, anxiety: 15, money: 0 } },
      { id: 'boss_idea', title: '老板的灵感', desc: '老板半夜发来一个竞品截图，让你明天出方案。', effect: { frustration: 25, anxiety: 20, money: 0 } },
      { id: 'good_data', title: '数据暴涨', desc: '上个版本的数据出奇的好，KPI稳了！', effect: { frustration: -20, anxiety: -20, money: 0 } },
      { id: 'blame', title: '天降大锅', desc: '别的部门出事，非要甩锅给你的系统。', effect: { frustration: 15, anxiety: 20, money: -50 } },
      { id: 'user_feedback', title: '用户长文', desc: '收到一封长达千字的用户反馈，句句扎心。', effect: { frustration: 20, anxiety: 10, money: 0 } },
      { id: 'design_change', title: 'UI大改', desc: '设计总监觉得现在的风格太土，要求全部重做。', effect: { frustration: 30, anxiety: 15, money: 0 } },
      { id: 'competitor', title: '竞品抄袭', desc: '你们刚上的功能，第二天就被竞品原封不动抄走了。', effect: { frustration: 25, anxiety: 10, money: 0 } },
      { id: 'coffee_spill', title: '打翻咖啡', desc: '把咖啡洒在了刚写好的PRD上，心态崩了。', effect: { frustration: 15, anxiety: 5, money: -30 } },
      { id: 'competitor_dead', title: '竞品倒闭了', desc: '最大的竞争对手宣布破产，你们躺赢了。', effect: { frustration: -20, anxiety: -30, money: 0 } },
      { id: 'new_boss', title: '空降高管', desc: '新来的VP推翻了之前所有的规划，一切重头再来。', effect: { frustration: 30, anxiety: 25, money: 0 } },
      { id: 'dev_leave', title: '核心开发请假', desc: '唯一懂那块代码的开发请了半个月婚假，项目停滞。', effect: { frustration: 20, anxiety: 20, money: 0 } },
    ],
    winTitle: '顺利晋升',
    winMsg: '你成功完成了KPI，且项目没有出大事故。<br><br>在这场充满甩锅和画大饼的游戏中，你靠着谨慎、策略和一点运气活了下来。',
    loseFrustrationTitle: 'KPI崩溃',
    loseFrustrationMsg: '长期的KPI压力让你彻底失去了理智。你无法再思考后果，胡乱接了一堆需求强压给开发。',
    loseAnxietyTitle: '精神崩溃',
    loseAnxietyMsg: '巨大的汇报焦虑压垮了你。你在周会上崩溃大哭，游戏结束。',
    loseDiseaseTitle: '项目暴雷',
    loseDiseaseMsg: '很遗憾，复盘大会结果显示项目已经彻底凉了。<br>之前的侥幸心理终究没能救你。'
  },
  {
    id: 'gamedesigner',
    name: '游戏策划模拟器',
    subtitle: 'Flame Edition',
    icon: '📝',
    description: [
      '1. 延迟判决：脚填数值上线后，你不会立即知道玩家是否炎上。',
      '2. 炎上焦虑：缝合竞品或脚填数值会累积炎上焦虑。焦虑过高会导致视线模糊。',
      '3. 滑跪道歉：确认设计是否安全的唯一方法，但代价高昂（消耗头发）。',
      '4. 目标：将灵感压抑降至 0，且游戏无设计崩盘。'
    ],
    frustrationName: '灵感压抑',
    anxietyName: '炎上焦虑',
    moneyName: '头发',
    partnerName: '新玩法设计',
    actionNames: {
      refuse: '放弃点子',
      chat: '头脑风暴',
      oral_condom: '纸面原型',
      oral_raw: '缝合竞品',
      sex_condom: '精心打磨数值',
      sex_raw: '脚填数值上线'
    },
    itemNames: {
      testkit: '玩家问卷',
      prep: '装死公关',
      alcohol: '玩其他游戏',
      gift: '发补偿十连',
      medicine: '滑跪道歉信'
    },
    hospitalName: '看论坛排查',
    workName: '写案子回血',
    restName: '玩主机游戏',
    outcomeNames: {
      enjoy: '玩家好评',
      escape: '侥幸没骂',
      leave: '及时止损',
      miss: '错失爆款',
      infected: '全网炎上'
    },
    diseases: {
      HIV: { name: "逼氪炎上", riskType: "fluid", desc: "吃相太难看，玩家集体退坑。", transmission: "商业化设计" },
      SYPHILIS: { name: "数值膨胀", riskType: "contact", desc: "老角色全废，战斗系统崩溃。", transmission: "数值设计" },
      HERPES: { name: "玩法枯燥", riskType: "skin", desc: "毫无乐趣，留存率暴跌。", transmission: "核心玩法" },
      HPV: { name: "剧情喂屎", riskType: "contact", desc: "文案暴走，玩家破防。", transmission: "剧情文案" },
      GONORRHEA: { name: "肝度过高", riskType: "fluid_mucous", desc: "每天像上班，玩家受不了。", transmission: "系统设计" },
      CRABS: { name: "UI反人类", riskType: "skin_hair", desc: "操作极其繁琐。", transmission: "交互设计" },
      CHLAMYDIA: { name: "关卡粪作", riskType: "fluid_mucous", desc: "难度极其不合理，纯恶心人。", transmission: "关卡设计" },
      HEPATITIS_B: { name: "抄袭风波", riskType: "fluid", desc: "被扒出抄袭，名声扫地。", transmission: "系统设计" },
    },
    tags: [
      { text: "核心系统", color: "bg-yellow-600", risk: { HIV: 0.15, SYPHILIS: 0.2, GONORRHEA: 0.3, HPV: 0.4 }, constraint: "condom_only", clue: "【身份】游戏的核心，不能出差错。", hiddenChance: 0.8 },
      { text: "逼氪活动", color: "bg-purple-600", risk: { HIV: 0.5, SYPHILIS: 0.1, HPV: 0.2, GONORRHEA: 0.15 }, clue: "【生活】看起来很赚钱，但极易被骂。", hiddenChance: 0.6 },
      { text: "底层重构", color: "bg-red-800", risk: { SYPHILIS: 0.8, HIV: 0.2 }, clue: "【危险】牵一发而动全身。", hiddenChance: 0.9 },
      { text: "简单换皮", color: "bg-sky-500", risk: {}, constraint: "no_sex", clue: "【状态】非常简单，换个贴图就行。", hiddenChance: 0.3 },
      { text: "玩家呼声高", color: "bg-emerald-500", risk: {}, safeChance: 0.9, clue: "【健康】玩家一直想要的改动。", hiddenChance: 0.6 },
      { text: "缝合怪", color: "bg-purple-800", risk: { HIV: 0.3, SYPHILIS: 0.4, GONORRHEA: 0.5, HPV: 0.6 }, clue: "【危险】什么火抄什么。", hiddenChance: 0.8 },
      { text: "必须今天上", color: "bg-rose-800", risk: { HIV: 0.15 }, constraint: "no_condom", clue: "【限制】制作人死活不肯让步时间。", hiddenChance: 0.2 },
      { text: "数值敏感", color: "bg-orange-600", risk: { HPV: 0.1, GONORRHEA: 0.1 }, clue: "【状态】稍微改一点就会影响整个经济系统。", hiddenChance: 0.5 },
      { text: "强行教玩家玩游戏", color: "bg-red-700", risk: { HIV: 0.2, SYPHILIS: 0.3 }, clue: "【危险】极易引起玩家反感。", hiddenChance: 0.7 },
      { text: "小范围灰度", color: "bg-teal-500", risk: {}, safeChance: 0.8, clue: "【健康】先在测试服跑跑看，比较稳妥。", hiddenChance: 0.4 },
      { text: "美术不配合", color: "bg-indigo-600", risk: { HERPES: 0.2 }, clue: "【状态】美术觉得你的设计太丑，拒绝画图。", hiddenChance: 0.6 },
      { text: "数值崩坏", color: "bg-red-900", risk: { HIV: 0.4, SYPHILIS: 0.3 }, clue: "【危险】战斗力膨胀到无法控制。", hiddenChance: 0.8 },
      { text: "老板强加需求", color: "bg-gray-700", risk: { GONORRHEA: 0.3 }, clue: "【危险】老板非要加的恶心功能。", hiddenChance: 0.9 },
      { text: "没有程序支持", color: "bg-slate-600", risk: { HPV: 0.2 }, clue: "【状态】程序说做不了，只能用表格配。", hiddenChance: 0.7 },
      { text: "玩家炎上预警", color: "bg-rose-900", risk: { HIV: 0.5 }, clue: "【危险】这案子发出去绝对被喷死。", hiddenChance: 0.8 },
    ],
    flirtLines: [
      "加个大逃杀模式吧，现在很火。",
      "这个角色必须强，不然没人抽。",
      "为什么别人的游戏能做到，我们不行？",
      "先上线再说，有问题再发补偿。",
      "这个系统很简单，一天就能写完案子吧？",
      "把养成线拉长，让玩家多玩几个月。",
      "这个数值我拍脑袋定的，你先配上去看看。",
      "玩家在论坛骂得很凶，你赶紧改改。",
      "这块剧情太无聊了，加点狗血桥段。",
      "别管逻辑了，爽就完事了。",
      "这个数值随便填一下就行。",
      "这个系统抄一下那个游戏。",
      "玩家就是喜欢又肝又氪。",
      "把掉率调低点，增加游戏寿命。",
      "能不能加个排行榜刺激消费？"
    ],
    avatars: ['📝', '🧠', '🎲', '🃏', '🎭', '🎨', '✒️', '✏️', '📏', '📐'],
    randomEvents: [
      { id: 'ex', title: '玩家催更', desc: '看到贴吧里每天都在骂策划，压力山大...', effect: { frustration: 15, anxiety: 10, money: 0 } },
      { id: 'video', title: '竞品爆火', desc: '刷视频看到同类竞品爆火，越看越焦虑。', effect: { frustration: 0, anxiety: 20, money: 0 } },
      { id: 'bonus', title: '意外灵感', desc: '洗澡时突然想到了一个绝妙的点子！', effect: { frustration: 0, anxiety: 0, money: 200 } },
      { id: 'peace', title: '贤者时间', desc: '突然看破红尘，觉得做游戏就是图一乐。', effect: { frustration: -15, anxiety: -10, money: 0 } },
      { id: 'bug', title: '恶性Bug', desc: '你设计的系统出了刷钱Bug，连夜爬起来修。', effect: { frustration: 20, anxiety: 25, money: -50 } },
      { id: 'boss_play', title: '制作人试玩', desc: '制作人觉得你设计的关卡太难，让你重做。', effect: { frustration: 25, anxiety: 15, money: 0 } },
      { id: 'player_love', title: '二创爆火', desc: '你设计的角色同人图刷屏了，成就感满满！', effect: { frustration: -25, anxiety: -15, money: 0 } },
      { id: 'writer_block', title: '卡文了', desc: '盯着空白的文档看了一下午，一个字没写出来。', effect: { frustration: 15, anxiety: 10, money: 0 } },
      { id: 'leak', title: '内鬼爆料', desc: '新版本内容被内鬼提前发到网上了，计划全乱。', effect: { frustration: 30, anxiety: 20, money: 0 } },
      { id: 'player_gift', title: '玩家寄刀片', desc: '收到了玩家寄来的“神秘包裹”，吓了一跳。', effect: { frustration: 20, anxiety: 30, money: 0 } },
      { id: 'inspiration', title: '梦中得道', desc: '做梦梦到了一个绝妙的关卡设计，醒来赶紧记下。', effect: { frustration: -15, anxiety: -10, money: 0 } },
      { id: 'sale', title: '买游戏', desc: '为了“参考”竞品，买了一堆游戏，钱包空了。', effect: { frustration: -5, anxiety: -5, money: -200 } },
      { id: 'tieba_flame', title: '贴吧被爆', desc: '因为一个削弱公告，贴吧吧主带头冲锋，心态炸裂。', effect: { frustration: 25, anxiety: 35, money: 0 } },
      { id: 'lead_designer_quit', title: '主策跑路', desc: '主策受不了压力辞职了，留下一个烂摊子给你。', effect: { frustration: 30, anxiety: 20, money: 0 } },
      { id: 'good_review', title: '长文好评', desc: '看到玩家写了千字长文夸赞你的设计，感动落泪。', effect: { frustration: -30, anxiety: -20, money: 0 } },
    ],
    winTitle: '顺利上线',
    winMsg: '你成功完成了设计，且游戏没有被炎上。<br><br>在这场充满缝合和背锅的游戏中，你靠着谨慎、策略和一点运气活了下来。',
    loseFrustrationTitle: '灵感枯竭',
    loseFrustrationMsg: '长期的灵感压抑让你彻底失去了理智。你无法再思考后果，胡乱写了一个案子强行上线了。',
    loseAnxietyTitle: '精神崩溃',
    loseAnxietyMsg: '巨大的炎上焦虑压垮了你。你注销了所有社交账号，游戏结束。',
    loseDiseaseTitle: '全网炎上',
    loseDiseaseMsg: '很遗憾，看论坛结果显示玩家已经把你祖宗十八代骂了一遍。<br>之前的侥幸心理终究没能救你。'
  },
  {
    id: 'office',
    name: '职场生存模拟器',
    subtitle: 'Corporate Slave Edition',
    icon: '🏢',
    description: [
      '你的目标是熬到发年终奖。',
      '你的主要压力来源是**工作压力**和**职场焦虑**。',
      '你的主要资源是**存款**。',
      '你的主要互动对象是**工作任务**。'
    ],
    frustrationName: '工作压力',
    anxietyName: '职场焦虑',
    moneyName: '存款',
    partnerName: '工作任务',
    actionNames: {
      refuse: '果断甩锅',
      chat: '开会讨论',
      oral_condom: '带方案汇报',
      oral_raw: '空手套白狼',
      sex_condom: '认真工作',
      sex_raw: '摸鱼划水'
    },
    itemNames: {
      testkit: '打听内幕',
      prep: '拜财神',
      alcohol: '喝咖啡',
      gift: '请喝奶茶',
      medicine: '请假休息'
    },
    hospitalName: '绩效考核',
    workName: '主动加班',
    restName: '带薪拉屎',
    outcomeNames: {
      enjoy: '顺利完成',
      escape: '侥幸过关',
      leave: '果断甩锅',
      miss: '错失机会',
      infected: '不幸背锅'
    },
    diseases: {
      HIV: { name: "业务暴雷", riskType: "fluid", desc: "核心业务出大问题，面临开除。", transmission: "核心业务" },
      SYPHILIS: { name: "客户投诉", riskType: "contact", desc: "被大客户投诉，奖金全扣。", transmission: "客户关系" },
      HERPES: { name: "老板发火", riskType: "skin", desc: "被老板当众痛骂，颜面扫地。", transmission: "向上管理" },
      HPV: { name: "团队内讧", riskType: "contact", desc: "团队内部撕逼，工作无法推进。", transmission: "团队协作" },
      GONORRHEA: { name: "绩效垫底", riskType: "fluid_mucous", desc: "绩效被打C，面临淘汰。", transmission: "绩效考核" },
      CRABS: { name: "错失晋升", riskType: "skin_hair", desc: "升职加薪名额被关系户抢走。", transmission: "职业发展" },
      CHLAMYDIA: { name: "奖金扣光", riskType: "fluid_mucous", desc: "因为各种奇葩理由被扣光奖金。", transmission: "薪酬福利" },
      HEPATITIS_B: { name: "被迫离职", riskType: "fluid", desc: "被HR约谈，要求主动离职。", transmission: "人员优化" },
    },
    tags: [
      { text: "老板盯着", color: "bg-yellow-600", risk: { HERPES: 0.5, GONORRHEA: 0.3 }, constraint: "condom_only", clue: "【限制】老板亲自跟进的项目，不能摸鱼。", hiddenChance: 0.8 },
      { text: "跨部门合作", color: "bg-purple-600", risk: { HPV: 0.4 }, clue: "【状态】沟通成本极高，容易扯皮。", hiddenChance: 0.6 },
      { text: "紧急需求", color: "bg-red-800", risk: { HIV: 0.3, SYPHILIS: 0.2 }, clue: "【危险】时间紧任务重，极易出错。", hiddenChance: 0.9 },
      { text: "历史遗留问题", color: "bg-orange-600", risk: { HIV: 0.4 }, constraint: "no_sex", clue: "【状态】前人挖的坑，谁碰谁死。", hiddenChance: 0.5 },
      { text: "肥差", color: "bg-emerald-500", risk: {}, safeChance: 0.9, clue: "【健康】事少钱多容易出成绩的项目。", hiddenChance: 0.6 },
      { text: "坑爹项目", color: "bg-purple-800", risk: { GONORRHEA: 0.5, CHLAMYDIA: 0.4 }, clue: "【危险】注定失败的项目，纯属背锅。", hiddenChance: 0.8 },
      { text: "汇报PPT", color: "bg-sky-500", risk: { HERPES: 0.2 }, constraint: "no_condom", clue: "【限制】面子工程，必须做得好看。", hiddenChance: 0.3 },
      { text: "团建活动", color: "bg-teal-500", risk: { HPV: 0.2 }, clue: "【状态】占用周末时间，还得强颜欢笑。", hiddenChance: 0.4 },
      { text: "办公室政治", color: "bg-red-700", risk: { HEPATITIS_B: 0.3, CRABS: 0.4 }, clue: "【危险】站错队就万劫不复。", hiddenChance: 0.7 },
      { text: "裁员传闻", color: "bg-gray-600", risk: { HEPATITIS_B: 0.5 }, clue: "【状态】人心惶惶，无心工作。", hiddenChance: 0.4 },
      { text: "甩锅大会", color: "bg-rose-700", risk: { SYPHILIS: 0.4, GONORRHEA: 0.3 }, clue: "【危险】复盘会上全在推卸责任。", hiddenChance: 0.8 },
      { text: "画大饼", color: "bg-amber-600", risk: { CHLAMYDIA: 0.2 }, clue: "【状态】领导又在承诺不可能兑现的期权。", hiddenChance: 0.5 },
      { text: "PUA大师", color: "bg-red-900", risk: { HERPES: 0.6, HIV: 0.2 }, clue: "【危险】直属领导疯狂打压你的自信心。", hiddenChance: 0.9 },
      { text: "带薪拉屎", color: "bg-emerald-400", risk: {}, safeChance: 0.8, clue: "【健康】躲在厕所里享受片刻的宁静。", hiddenChance: 0.3 },
      { text: "背锅侠", color: "bg-slate-800", risk: { HIV: 0.5, HEPATITIS_B: 0.4 }, clue: "【危险】出了事第一个拿你祭天。", hiddenChance: 0.9 },
    ],
    flirtLines: [
      "这个项目做好了，年底给你升职加薪。",
      "年轻人要多吃苦，多锻炼。",
      "公司就是你的家。",
      "这个锅你先背一下，以后有机会补偿你。",
      "老板很看重这个项目，你多上点心。",
      "这周六大家来加个班，把进度赶一下。",
      "你的绩效评级是C，希望你下个季度努力。",
      "公司最近效益不好，大家要共克时艰。",
      "这个需求很简单，怎么实现我不管。",
      "你这个PPT做得不够高大上啊。",
      "不要问公司为你做了什么，问问你为公司做了什么。",
      "这点委屈都受不了，以后怎么干大事？",
      "我看好你，所以才对你要求这么严格。",
      "下班前把报告发给我，我明天早上要看。",
      "大家都是兄弟，谈钱就伤感情了。"
    ],
    avatars: ['👔', '💼', '💻', '☕', '📉', '📈', '📅', '🗑️', '🏃', '😴'],
    randomEvents: [
      { id: 'ex', title: '前同事的问候', desc: '离职的同事突然问你那个坑填了没...', effect: { frustration: 15, anxiety: 10, money: 0 } },
      { id: 'video', title: '行业寒冬', desc: '看到新闻说大厂又裁员了，越看越焦虑。', effect: { frustration: 0, anxiety: 20, money: 0 } },
      { id: 'bonus', title: '意外奖金', desc: '发了一笔小额项目奖金！', effect: { frustration: 0, anxiety: 0, money: 500 } },
      { id: 'peace', title: '贤者时间', desc: '突然看破红尘，觉得打工就是混日子。', effect: { frustration: -15, anxiety: -10, money: 0 } },
      { id: 'game', title: '游戏连败', desc: '下班打排位遭遇十连败，气得想砸手机。', effect: { frustration: 25, anxiety: 15, money: 0 } },
      { id: 'lost', title: '丢了工牌', desc: '工牌丢了，进不去公司，还得交罚款。', effect: { frustration: 10, anxiety: 10, money: -50 } },
      { id: 'rain', title: '突降暴雨', desc: '没带伞被淋成了落汤鸡，心情糟糕透顶。', effect: { frustration: 15, anxiety: 5, money: 0 } },
      { id: 'food', title: '公司下午茶', desc: '今天下午茶有喜茶和炸鸡，幸福感爆棚。', effect: { frustration: -15, anxiety: -5, money: 0 } },
      { id: 'meeting', title: '无意义的会议', desc: '被拉去开了一下午的会，什么都没决定。', effect: { frustration: 20, anxiety: 10, money: 0 } },
      { id: 'boss', title: '老板画大饼', desc: '老板又在会上画大饼，听得耳朵起茧子。', effect: { frustration: 15, anxiety: 15, money: 0 } },
      { id: 'gossip', title: '听到八卦', desc: '在茶水间听到了惊天大八卦，心情激动。', effect: { frustration: -10, anxiety: -10, money: 0 } },
      { id: 'coffee', title: '咖啡机坏了', desc: '公司唯一的咖啡机坏了，全员精神萎靡。', effect: { frustration: 10, anxiety: 5, money: 0 } },
      { id: 'promotion_fail', title: '晋升失败', desc: '答辩没过，名额给了老板的亲信，心态崩了。', effect: { frustration: 35, anxiety: 25, money: 0 } },
      { id: 'colleague_quit', title: '好同事离职', desc: '唯一能聊得来的同事离职了，感觉很孤单。', effect: { frustration: 20, anxiety: 15, money: 0 } },
      { id: 'sick_leave', title: '带病上班', desc: '发烧39度还要赶PPT，感觉快猝死了。', effect: { frustration: 30, anxiety: 20, money: -100 } },
      { id: 'stock_crash', title: '股票大跌', desc: '买的基金股票全绿了，只能继续打工还债。', effect: { frustration: 10, anxiety: 30, money: -1000 } },
      { id: 'praise', title: '大老板表扬', desc: '在全员大会上被大老板点名表扬，感觉又行了。', effect: { frustration: -30, anxiety: -20, money: 0 } },
      { id: 'weekend_work', title: '周末夺命Call', desc: '周末正在看电影，被老板一个电话叫回公司加班。', effect: { frustration: 40, anxiety: 20, money: 0 } },
    ],
    winTitle: '顺利拿到年终奖',
    winMsg: '你成功熬到了年底，拿到了丰厚的年终奖。<br><br>在这场充满PUA和背锅的游戏中，你靠着摸鱼、策略和一点运气活了下来。',
    loseFrustrationTitle: '工作崩溃',
    loseFrustrationMsg: '长期的工作压力让你彻底失去了理智。你掀翻了办公桌，大骂老板一顿后裸辞了。',
    loseAnxietyTitle: '职场抑郁',
    loseAnxietyMsg: '巨大的职场焦虑压垮了你。你每天早上都不想去上班，最终被公司辞退。',
    loseDiseaseTitle: '不幸背锅',
    loseDiseaseMsg: '很遗憾，绩效考核结果显示你背了一个天大的黑锅。<br>之前的侥幸心理终究没能救你。'
  }
];

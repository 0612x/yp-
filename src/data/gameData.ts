import { Role, GameEvent } from '../types';

export const ROLES: Role[] = [
  {
    id: 'programmer',
    name: '程序员',
    title: '后端开发工程师',
    description: '负责核心业务逻辑。高薪但容易脱发，常与产品经理对线。',
    startStats: { health: 80, sanity: 70, progress: 0, money: 5000 }
  },
  {
    id: 'gamedev',
    name: '游戏开发',
    title: '客户端/引擎开发',
    description: '负责游戏画面与交互。经常面对引擎崩溃和无尽的Bug。',
    startStats: { health: 70, sanity: 80, progress: 0, money: 4000 }
  },
  {
    id: 'pm',
    name: '产品经理',
    title: '高级产品经理',
    description: '负责需求设计与项目推进。需要极强的沟通(甩锅)能力。',
    startStats: { health: 90, sanity: 60, progress: 0, money: 6000 }
  },
  {
    id: 'designer',
    name: '游戏策划',
    title: '系统/数值策划',
    description: '负责游戏玩法与平衡。常被玩家骂，也常被开发怼。',
    startStats: { health: 85, sanity: 65, progress: 0, money: 4500 }
  }
];

export const EVENTS: Record<string, GameEvent[]> = {
  programmer: [
    {
      id: 'p1',
      title: '凌晨两点的警报',
      description: '线上服务器突然宕机，报警短信把你从睡梦中吵醒。',
      choices: [
        { text: '立刻爬起来修Bug', effect: { health: -15, sanity: -10, progress: 5, money: 500 }, log: '你修好了Bug，但也失去了睡眠。获得了加班费。' },
        { text: '假装没听见继续睡', effect: { health: 10, sanity: 5, progress: -10, money: -500 }, log: '你睡了个好觉，但第二天被主管骂了一顿，扣了绩效。' }
      ]
    },
    {
      id: 'p2',
      title: '产品经理的奇思妙想',
      description: '产品经理跑来找你：“这个需求很简单，怎么实现我不管，明天就要。”',
      choices: [
        { text: '据理力争，拒绝不合理需求', effect: { health: -5, sanity: -15, progress: 0, money: 0 }, log: '你和产品经理吵了一架，保住了发际线，但心情极差。' },
        { text: '默默接下，通宵加班', effect: { health: -20, sanity: -5, progress: 15, money: 0 }, log: '你通宵完成了需求，进度大幅提升，但感觉身体被掏空。' }
      ]
    },
    {
      id: 'p3',
      title: '祖传代码',
      description: '你需要修改一段五年前离职前辈写的代码，里面连一个注释都没有。',
      choices: [
        { text: '硬着头皮看', effect: { health: -10, sanity: -20, progress: 10, money: 0 }, log: '你看懂了代码，但感觉自己老了十岁。' },
        { text: '直接重构', effect: { health: -25, sanity: 5, progress: 20, money: 0 }, log: '你花了一周时间重构，虽然很累，但代码变得优雅了。' }
      ]
    },
    {
      id: 'p4',
      title: '技术分享会',
      description: '主管让你在部门周会上做一个技术分享。',
      choices: [
        { text: '精心准备PPT', effect: { health: -10, sanity: 10, progress: 5, money: 0 }, log: '你的分享很成功，获得了主管的赞赏，但花了不少休息时间。' },
        { text: '随便糊弄一下', effect: { health: 5, sanity: -5, progress: 0, money: 0 }, log: '你随便讲了几句，大家听得昏昏欲睡，场面有些尴尬。' }
      ]
    },
    {
      id: 'p5',
      title: '删库跑路？',
      description: '你不小心在生产环境执行了 DROP TABLE 语句...',
      choices: [
        { text: '满头大汗找DBA恢复', effect: { health: -10, sanity: -30, progress: -10, money: 0 }, log: 'DBA帮你恢复了数据，但你被全公司通报批评，吓出了一身冷汗。' },
        { text: '假装无事发生，连夜跑路', effect: { health: 0, sanity: -50, progress: -50, money: 0 }, log: '你试图掩盖，但很快被发现，面临被开除的风险。' }
      ]
    }
  ],
  gamedev: [
    {
      id: 'g1',
      title: '引擎崩溃',
      description: '你刚做完一个复杂的粒子特效，还没保存，引擎突然崩溃了。',
      choices: [
        { text: '深呼吸，重新做', effect: { health: -15, sanity: -15, progress: 5, money: 0 }, log: '你强忍着怒火重新做了一遍，进度缓慢推进。' },
        { text: '砸键盘，去喝杯咖啡', effect: { health: 5, sanity: 10, progress: -5, money: -50 }, log: '你发泄了一通并喝了咖啡，心情好多了，但进度落后了。' }
      ]
    },
    {
      id: 'g2',
      title: '美术资源的灾难',
      description: '美术发来了一个模型，面数高达100万，直接把游戏卡成了PPT。',
      choices: [
        { text: '自己动手减面', effect: { health: -15, sanity: -5, progress: 10, money: 0 }, log: '你客串了一把技术美术，解决了性能问题。' },
        { text: '打回去让美术重做', effect: { health: -5, sanity: -10, progress: -5, money: 0 }, log: '你和美术吵了一架，资源被打回，进度延误。' }
      ]
    },
    {
      id: 'g3',
      title: '发版前的修罗场',
      description: '明天就要发版了，测试突然提了20个P0级别的Bug。',
      choices: [
        { text: '通宵修Bug', effect: { health: -30, sanity: -20, progress: 25, money: 1000 }, log: '你燃烧生命修完了所有Bug，获得了丰厚的项目奖金。' },
        { text: '把Bug改成Feature', effect: { health: -5, sanity: 10, progress: 15, money: 0 }, log: '你用精湛的话术说服了测试和策划，这其实是一个彩蛋！' }
      ]
    },
    {
      id: 'g4',
      title: '内存泄漏',
      description: '游戏运行半小时后内存占用飙升，设备发烫。',
      choices: [
        { text: '使用Profiler逐行排查', effect: { health: -20, sanity: -15, progress: 15, money: 0 }, log: '你花费大量精力找到了未释放的纹理，解决了发热问题。' },
        { text: '写个定时清理脚本', effect: { health: -5, sanity: -5, progress: 5, money: 0 }, log: '你用简单粗暴的方式掩盖了问题，游戏偶尔会卡顿一下。' }
      ]
    },
    {
      id: 'g5',
      title: '策划的“微调”',
      description: '策划说：“这里的打击感稍微差了一点点，你再调调。”',
      choices: [
        { text: '逐帧调整动画和特效', effect: { health: -15, sanity: -10, progress: 10, money: 0 }, log: '你精心打磨了打击感，游戏体验大幅提升。' },
        { text: '加个屏幕震动敷衍过去', effect: { health: -5, sanity: 5, progress: 5, money: 0 }, log: '你加了夸张的屏幕震动，策划觉得“很有内味了”。' }
      ]
    }
  ],
  pm: [
    {
      id: 'pm1',
      title: '老板的突发奇想',
      description: '老板在群里发了一篇关于AI的文章，要求下周产品里必须加上AI功能。',
      choices: [
        { text: '画大饼，写一份华丽的PPT', effect: { health: -10, sanity: 5, progress: 10, money: 0 }, log: '你用PPT糊弄了老板，项目得以继续推进。' },
        { text: '强压给开发团队', effect: { health: 5, sanity: -20, progress: 15, money: 0 }, log: '开发团队对你怨声载道，但功能还是硬着头皮上了。' }
      ]
    },
    {
      id: 'pm2',
      title: '需求评审会',
      description: '在需求评审会上，开发和测试对你的PRD提出了疯狂的质疑。',
      choices: [
        { text: '舌战群儒，坚持己见', effect: { health: -15, sanity: -15, progress: 15, money: 0 }, log: '你凭借三寸不烂之舌说服了所有人，需求顺利通过。' },
        { text: '妥协退让，削减需求', effect: { health: 5, sanity: 10, progress: -10, money: 0 }, log: '你砍掉了一半的需求，大家都很开心，除了老板。' }
      ]
    },
    {
      id: 'pm3',
      title: '数据暴跌',
      description: '新版本上线后，日活数据暴跌了30%。',
      choices: [
        { text: '甩锅给运营和市场', effect: { health: 5, sanity: -10, progress: 0, money: 0 }, log: '你成功把锅甩了出去，但你在公司的名声变差了。' },
        { text: '连夜分析数据找原因', effect: { health: -20, sanity: -10, progress: 10, money: 0 }, log: '你找到了数据下跌的原因并给出了修复方案。' }
      ]
    },
    {
      id: 'pm4',
      title: '竞品抄袭',
      description: '你发现市面上出现了一款像素级抄袭你们产品的竞品，而且还免费。',
      choices: [
        { text: '立刻策划反击活动', effect: { health: -15, sanity: -10, progress: 15, money: 0 }, log: '你连夜策划了拉新活动，稳住了用户基本盘。' },
        { text: '向法务部求助', effect: { health: -5, sanity: 5, progress: 5, money: 0 }, log: '法务部发了律师函，虽然流程漫长，但你稍微安心了一些。' }
      ]
    },
    {
      id: 'pm5',
      title: '用户调研',
      description: '你需要去线下做一次深度的用户访谈。',
      choices: [
        { text: '认真倾听用户吐槽', effect: { health: -10, sanity: -15, progress: 20, money: 0 }, log: '用户把你骂得狗血淋头，但你获得了极其宝贵的产品改进方向。' },
        { text: '引导用户夸产品', effect: { health: 5, sanity: 10, progress: 0, money: 0 }, log: '你拿到了一份漂亮的用户满意度报告，但产品的问题依然存在。' }
      ]
    }
  ],
  designer: [
    {
      id: 'd1',
      title: '玩家的怒火',
      description: '你设计的最新角色因为太弱，被玩家在论坛上炎上了。',
      choices: [
        { text: '装死不回应', effect: { health: 5, sanity: -20, progress: 0, money: 0 }, log: '你看着满屏的骂声，心态有些崩溃。' },
        { text: '连夜出热更加强', effect: { health: -20, sanity: 5, progress: 15, money: 0 }, log: '你连夜修改了数值，玩家纷纷表示“策划是我爹”。' }
      ]
    },
    {
      id: 'd2',
      title: '主策的否定',
      description: '你花了一周写好的核心战斗系统案，被主策看了一眼就扔进了垃圾桶。',
      choices: [
        { text: '忍气吞声，重写一份', effect: { health: -15, sanity: -15, progress: 10, money: 0 }, log: '你重新写了一份符合主策口味的方案，进度缓慢推进。' },
        { text: '据理力争，证明自己', effect: { health: -5, sanity: 10, progress: -5, money: 0 }, log: '你和主策大吵一架，虽然没能通过方案，但心里爽多了。' }
      ]
    },
    {
      id: 'd3',
      title: '数值膨胀',
      description: '游戏后期的数值已经膨胀到了几百亿，系统快要崩溃了。',
      choices: [
        { text: '做个数值压缩系统', effect: { health: -25, sanity: -10, progress: 20, money: 0 }, log: '你设计了一套复杂的压缩公式，完美解决了问题。' },
        { text: '不管了，继续加个零', effect: { health: 10, sanity: 5, progress: 5, money: 0 }, log: '你选择了最省事的办法，玩家看着满屏的99999999陷入了沉思。' }
      ]
    },
    {
      id: 'd4',
      title: '抽卡概率风波',
      description: '有大R玩家质疑你们的抽卡概率造假，要求公布源码。',
      choices: [
        { text: '装死并暗改概率', effect: { health: -10, sanity: -20, progress: 0, money: 0 }, log: '你偷偷调高了该玩家的爆率，但每天提心吊胆怕被发现。' },
        { text: '发公告公开透明概率', effect: { health: -5, sanity: 10, progress: 10, money: 0 }, log: '你用详实的数据证明了清白，赢得了部分玩家的信任。' }
      ]
    },
    {
      id: 'd5',
      title: '灵感枯竭',
      description: '你需要设计一个全新的节日活动，但你盯着空白的文档发呆了一整天。',
      choices: [
        { text: '去玩竞品找“灵感”', effect: { health: 5, sanity: 10, progress: 10, money: 0 }, log: '你“借鉴”了竞品的活动，稍微改了改皮就交差了。' },
        { text: '通宵头脑风暴', effect: { health: -20, sanity: -5, progress: 20, money: 0 }, log: '你熬了一整夜，终于想出了一个绝妙的创意！' }
      ]
    }
  ]
};

export const COMMON_EVENTS: GameEvent[] = [
  {
    id: 'c1',
    title: '发工资啦！',
    description: '今天是发工资的日子，看着银行卡里的余额，你感觉又有了动力。',
    choices: [
      { text: '去吃顿好的犒劳自己', effect: { health: 15, sanity: 20, progress: 0, money: -500 }, log: '一顿大餐让你满血复活！' },
      { text: '全都存起来', effect: { health: 0, sanity: 5, progress: 0, money: 0 }, log: '看着数字增长，你感到一丝安心。' }
    ]
  },
  {
    id: 'c2',
    title: '突发感冒',
    description: '最近天气变化，你感觉头晕脑胀，似乎是感冒了。',
    choices: [
      { text: '请假休息一天', effect: { health: 20, sanity: 10, progress: -10, money: -200 }, log: '你休息了一天，身体恢复了，但进度落后了。' },
      { text: '带病坚持工作', effect: { health: -20, sanity: -15, progress: 10, money: 0 }, log: '你硬撑着完成了工作，但感觉随时会倒下。' }
    ]
  },
  {
    id: 'c3',
    title: '团建活动',
    description: '公司组织了周末团建，要求全员参加。',
    choices: [
      { text: '积极参与社交', effect: { health: -10, sanity: 15, progress: 0, money: 0 }, log: '你和同事们拉近了关系，但周末并没有得到休息。' },
      { text: '找借口溜走', effect: { health: 15, sanity: 5, progress: 0, money: 0 }, log: '你成功逃脱了团建，在家躺了两天，非常舒服。' }
    ]
  },
  {
    id: 'c4',
    title: '咖啡机坏了',
    description: '公司的咖啡机坏了，你感觉失去了灵魂。',
    choices: [
      { text: '下楼买星巴克', effect: { health: 10, sanity: 10, progress: 0, money: -35 }, log: '一杯昂贵的咖啡拯救了你的早晨。' },
      { text: '喝白开水硬挺', effect: { health: 0, sanity: -10, progress: -5, money: 0 }, log: '没有咖啡因的刺激，你一上午都在打瞌睡。' }
    ]
  },
  {
    id: 'c5',
    title: '绩效考核',
    description: '半年度绩效考核开始了，你需要写一份长长的自评报告。',
    choices: [
      { text: '认真包装自己的产出', effect: { health: -10, sanity: -10, progress: 5, money: 1000 }, log: '你写了一份完美的PPT，获得了不错的绩效奖金。' },
      { text: '随便写写交差', effect: { health: 5, sanity: 5, progress: 0, money: -500 }, log: '你敷衍了事，结果被打了个低绩效，扣了奖金。' }
    ]
  },
  {
    id: 'c6',
    title: '颈椎病发作',
    description: '长期久坐让你的颈椎发出了抗议，脖子僵硬得无法转动。',
    choices: [
      { text: '去医院做理疗', effect: { health: 25, sanity: 10, progress: -10, money: -300 }, log: '理疗花了不少钱和时间，但你的脖子终于能动了。' },
      { text: '贴个膏药继续干', effect: { health: -15, sanity: -5, progress: 10, money: -20 }, log: '膏药只能缓解一时，你的健康状况进一步恶化。' }
    ]
  },
  {
    id: 'c7',
    title: '意外奖金',
    description: '因为项目阶段性达标，老板发了一个小红包。',
    choices: [
      { text: '买个新游戏放松', effect: { health: 5, sanity: 20, progress: 0, money: -200 }, log: '你买了一款心仪已久的游戏，度过了一个快乐的周末。' },
      { text: '攒起来买房', effect: { health: 0, sanity: 0, progress: 0, money: 500 }, log: '离买房的目标又近了0.0001%。' }
    ]
  }
];

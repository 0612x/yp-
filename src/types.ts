export type RoleId = 'programmer' | 'gamedev' | 'pm' | 'designer';

export interface Stats {
  health: number; // 体力 (0-100)
  sanity: number; // 心态 (0-100)
  progress: number; // 项目进度 (0-100)
  money: number; // 资金
}

export interface Role {
  id: RoleId;
  name: string;
  title: string;
  description: string;
  startStats: Stats;
}

export interface Choice {
  text: string;
  effect: Partial<Stats>;
  log: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
}

export interface GameState {
  status: 'start' | 'playing' | 'gameover' | 'victory';
  role: Role | null;
  stats: Stats;
  week: number;
  maxWeeks: number;
  logs: string[];
}

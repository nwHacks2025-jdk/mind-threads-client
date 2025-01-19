export interface MemberStatsRequest {
  email: string;
  startAt: string;
  endAt: string;
}

export interface AvgMemberStatsRequest {
  startAt: string;
  endAt: string;
}

export interface MemberStat {
  date: [number, number, number];
  count: number;
  averageUsage?: number;
}

export interface StackedBarChartProps {
  individualData: MemberStat[];
  averageData: MemberStat[];
}

export type MemberStatsResponse = MemberStat[];

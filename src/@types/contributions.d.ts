type ContributionDay = {
  contributionCount: number;
  date: string;
};

type Week = {
  contributionDays: ContributionDay[];
};

type ContributionCalendar = {
  totalContributions: number;
  weeks: Week[];
};

type ContributionsCollection = {
  contributionCalendar: ContributionCalendar;
};

export type UserContributions = {
  name: string;
  contributionsCollection: ContributionsCollection;
};

export type Contributions = {
  data: {
    user: UserContributions;
  };
};

import { ContributionDay, UserContributions } from '~/@types/contributions';

export const mountDayContributions = (contributions: UserContributions) => {
  const weeks =
    contributions.contributionsCollection.contributionCalendar.weeks;

  let dayContributions: ContributionDay[] = [];

  weeks.map((week) => dayContributions.push(...week.contributionDays));

  return dayContributions;
};

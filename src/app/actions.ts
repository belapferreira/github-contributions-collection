'use server';

import { getGithubContributions } from './api/queries/get-github-contributions';

export const updateGithubContributions = async (
  username: string,
  from: string
) => {
  const response = await getGithubContributions(username, from);

  return response;
};

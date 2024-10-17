import { Contributions } from '~/@types/contributions';

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export const getGithubContributions = async (
  username: string,
  from: string
) => {
  try {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    };

    const body = {
      query: `
      query($username:String!, $from:DateTime!) { 
        user(login: $username){
          name
          contributionsCollection(from: $from) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `,
      variables: {
        username,
        from,
      },
    };

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };

    if (GRAPHQL_API_URL) {
      const response = await fetch(GRAPHQL_API_URL, options);
      const contributions: Contributions = await response.json();

      return contributions.data;
    }

    throw new Error('There was an error requesting the contributions');
  } catch (error) {
    console.log('GRAPHQL_API_URL', GRAPHQL_API_URL);
    console.log('🚫 Contributions query:', error);
  }
};

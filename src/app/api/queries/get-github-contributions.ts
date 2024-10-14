const GRAPHQL_API_URL = process.env.GITHUB_GRAPHQL_API_URL;
const TOKEN = process.env.GITHUB_TOKEN;

export const getGithubContributions = async (userName: string) => {
  try {
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    };

    const body = {
      query: `
      query($userName:String!) { 
        user(login: $userName){
          name
          contributionsCollection {
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
        userName,
      },
    };

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };

    if (GRAPHQL_API_URL) {
      const response = await fetch(GRAPHQL_API_URL, options);
      const contributions = await response.json();

      return contributions;
    }

    throw new Error('There was an error requesting the contributions');
  } catch (error) {
    console.log('🚫 Contributions:', error);
  }
};

import { OrganicResults, Result } from '../../src/type';
import { Settings } from './_types';

const BASE_URL = 'https://search.wuran.link/search';

const fetchResult = async (args: { query: string }, settings: Settings): Promise<Result> => {
  const apiKey = settings.SERPAPI_API_KEY;
  
  const { default: querystring } = await import('query-string');

  const params = {
    q: args.query,
    max_results: 10,
  };
  const query = querystring.stringify(params);

  const res = await fetch(`${BASE_URL}?${query}`);

  const data = await res.json();

  if (data.error) throw data;

  const results = data.results;

  return results.map((result: any) => ({
    title: result.title,
    content: result.body,
    link: result.href,
  }));
};

export default fetchResult;

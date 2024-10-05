// Setting up basic configurations.
//import { COIN_API, API_KEY } from '@env';

type ApiClient = {
  base_url: string,
  api_key: string,
  base_url2: string,
  api_key2: string
}

class Configs {

  public static coinApiClient: ApiClient = {
    base_url: process.env.COIN_API || '',
    api_key: process.env.API_KEY || '',
    base_url2: process.env.COIN_API2 || '',
    api_key2: process.env.API_KEY2 || '',
  };
}


export default Configs;

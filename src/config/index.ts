// Setting up basic configurations.
//import { COIN_API, API_KEY } from '@env';

type ApiClient = {
  base_url: string,
  api_key: string
}

class Configs {

  public static coinApiClient: ApiClient = {
    base_url: process.env.COIN_API || '',
    api_key: process.env.API_KEY || '',
  };
}


export default Configs;

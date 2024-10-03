//import { Network } from '../../types/types';
import Configs from '../config/index';

class CoinApi {
  // get a list of tokens from the CoinApi

  async send(routes: string, method = 'GET') {
    let response = await fetch('https://pro-api.coinmarketcap.com'+'/'+routes, {
      method,
      headers: {
        'X-CMC_PRO_API_KEY' : '45c006ad-98b4-4756-9894-2c25f8467852',
        'Accept': 'application/json',
      },
    });

    console.log(response.status);
    if (response) {
      return response;
    }
    throw new Error('Response not found');
  }

  async getTokens() {
    try {
      let response = await this.send('v1/cryptocurrency/listings/latest?start=1&limit=14');
      console.log(response);
      if (response) {
        return await response.json();
      }

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}


export default CoinApi;

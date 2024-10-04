//import { Network } from '../../types/types';
import Configs from '../config/index';

// class CoinApi {
//   // get a list of tokens from the CoinApi

//   async send(routes: string, method = 'GET') {
//     console.log(Configs.coinApiClient.api_key + '' + Configs.coinApiClient.base_url);
//     let response = await fetch('https://pro-api.coinmarketcap.com'+'/'+routes, {
//       method,
//       headers: {
//         'X-CMC_PRO_API_KEY' : '45c006ad-98b4-4756-9894-2c25f8467852',
//         'Accept': 'application/json',
//       },
//     });

//     console.log(response.status);
//     if (response) {
//       return response;
//     }
//     throw new Error('Response not found');
//   }

//   async getTokens() {
//     try {
//       let response = await this.send('v1/cryptocurrency/listings/latest?start=1&limit=14');
//       console.log(response);
//       if (response) {
//         return await response.json();
//       }

//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// }

class CoinApi {
  // Utility method to send a request to the CoinApi
  async send(routes: string, method = 'GET') {
    const apiUrl = 'https://pro-api.coinmarketcap.com/' + routes;
    console.log(`Requesting ${apiUrl}`);

    try {
      const response = await fetch(apiUrl, {
        method,
        headers: {
          'X-CMC_PRO_API_KEY': '45c006ad-98b4-4756-9894-2c25f8467852',
          'Accept': 'application/json',
        },
      });

      console.log(`Response Status: ${response.status}`);

      // Handle non-successful HTTP responses with specific messages
      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        
        if (response.status === 401) {
          errorMessage = "Unauthorized: Invalid API key";
        } else if (response.status === 403) {
          errorMessage = "Forbidden: You might have hit the rate limit.";
        } else if (response.status === 404) {
          errorMessage = "Not Found: Invalid route or endpoint.";
        } else if (response.status === 500) {
          errorMessage = "Server Error: There is an issue with the API server.";
        }

        throw new Error(errorMessage);
      }
      
      return response;

    } catch (networkError: any) {
      // Handle network or request-level errors
      throw new Error(`Network error: ${networkError.message}`);
    }
  }

  // Method to get a list of tokens
  async getTokens() {
    try {
      const response = await this.send('v1/cryptocurrency/listings/latest?start=1&limit=14');
      const data = await response.json();

      if (!data || !data.status || data.status.error_code !== 0) {
        throw new Error(`API returned error: ${data.status.error_message || 'Unknown error'}`);
      }
      
      return data;

    } catch (error: any) {
      console.error(`Error fetching tokens: ${error.message}`);
      throw new Error(`Failed to fetch tokens: ${error.message}`);
    }
  }
}


export default CoinApi;

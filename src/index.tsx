/* eslint-disable react/react-in-jsx-scope */
import App from './screens/main';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>);

export default Root;

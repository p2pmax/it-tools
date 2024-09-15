import { ref } from 'vue';

export function useProxy() {
  // Proxy state (on/off) and proxy configuration
  const isProxySet = ref(false);
  const proxyConfig = ref({
    host: '',
    port: 0,
  });

  // Method to set the proxy
  const setProxy = (host: string, port: number) => {
    // Here, you would typically call an API or use a library to actually set the SOCKS5 proxy.
    // For example, you might use a Node.js API, or another backend service call to set the proxy.
    proxyConfig.value.host = host;
    proxyConfig.value.port = port;
    isProxySet.value = true;
  };

  // Method to unset the proxy
  const unsetProxy = () => {
    // Logic to unset the proxy (e.g., API call or library function)
    proxyConfig.value.host = '';
    proxyConfig.value.port = 0;
    isProxySet.value = false;
  };

  return {
    isProxySet,
    proxyConfig,
    setProxy,
    unsetProxy,
  };
}

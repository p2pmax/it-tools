import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'P2p proxy',
  path: '/p2p-proxy',
  description: '',
  keywords: ['p2p', 'proxy'],
  component: () => import('./p2p-proxy.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-09-14'),
});
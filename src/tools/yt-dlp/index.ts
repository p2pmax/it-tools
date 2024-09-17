import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Yt dlp',
  path: '/yt-dlp',
  description: '',
  keywords: ['yt', 'dlp'],
  component: () => import('./yt-dlp.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2024-09-15'),
});
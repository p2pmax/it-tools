<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { invoke } from '@tauri-apps/api/core';

const toast = useToast();
const input = ref('');
async function download(url: string) {
  const msg: string = await invoke('call_lux', { url });
  if (msg) {
    toast(`打开浏览器失败 ${msg}`);
  }
}
</script>

<template>
  <div>
    <c-input-text
      v-model:value="input"
      label="server address:"
      placeholder="Your text to draw"
      raw-text
    />
    <c-button @click="download(input)">
      Download
    </c-button>
  </div>
</template>

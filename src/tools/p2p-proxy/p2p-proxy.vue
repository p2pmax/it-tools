<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { invoke } from '@tauri-apps/api/core';
import { useProxy } from '@/composable/proxy';
import { type App, InstallationType, checkInstalled, install, installed } from '../../utils/app';

const toast = useToast();

const proxy = useProxy();

const app: App = {
  name: 'p2p-proxy',
  version: '1.0',
  binaries: [
    {
      platform: 'macos',
      arch: 'aarch64',
      url: 'https://github.com/p2pmax/libp2p-proxy/releases/download/0.0.1/libp2p-proxy-macos-aarch64.zip',
      checksum: 'ada59478f28973c45d97f99f04a9c27731836900f966540910efc5b9679b9f18',
    },
    {
      platform: 'macos',
      arch: 'x86_64',
      url: 'https://getsamplefiles.com/download/zip/sample-1.zip',
      checksum: 'ef7e47f0e35694a226b654d0c3a8e4ec1382028e8d50d67feddf24d2ab55cc24',
    },
    {
      platform: 'windows',
      arch: 'x86_64',
      url: 'https://getsamplefiles.com/download/zip/sample-1.zip',
      checksum: 'ef7e47f0e35694a226b654d0c3a8e4ec1382028e8d50d67feddf24d2ab55cc24',
    },
  ],
};

const input = ref('');

checkInstalled(app);

async function connect(url: string) {
  const args = url;
  const port: number = await invoke('run_lib', { app: 'p2p-proxy', method: 'RunMain', args });
  if (port > 0) {
    toast('成功连接服务器');
    proxy.setProxy('localhost', port);
  }
  else {
    toast('连接服务器失败');
  }
}

async function disconnect() {
  proxy.unsetProxy();
}
async function openBrowser() {
  const msg: string = await invoke('open_window', { url: 'https://www.google.com' });
  if (msg) {
    toast(`打开浏览器失败 ${msg}`);
  }
}
</script>

<template>
  <div>
    <p>This is a libp2p proxy client, code can be found here. <a href="https://github.com/p2pmax/libp2p-proxy" target="_blank">libp2p-proxy</a></p>
    <c-card v-if="installed === InstallationType.NotSupported">
      Your system is not supported!
    </c-card>
    <c-card v-else-if="!installed" text-center>
      This is an optional feature， click the button below to install it.
      <div mt-4 flex justify-center>
        <c-button @click="install(app)">
          Install
        </c-button>
      </div>
    </c-card>

    <c-card v-else>
      <c-alert v-if="installed === InstallationType.UpgradeAvailable" mt-4 text-left>
        New version available
        <c-button @click="install(app)">
          Update
        </c-button>
      </c-alert>
      <div v-else>
        <c-input-text
          v-model:value="input"
          label="server address:"
          placeholder="Your text to draw"
          raw-text
        />
        <c-button v-if="proxy.isProxySet.value" @click="disconnect()">
          断开
        </c-button>
        <c-button v-else @click="connect(input)">
          连接
        </c-button>
        <c-button @click="openBrowser">
          打开浏览器
        </c-button>
        <n-divider />
        <h3>测试服务器</h3>
        <div flex justify-center>
          <c-button variant="text" @click="input = '/ip4/143.110.226.12/tcp/11212/ws/p2p/12D3KooWSPGy9bCrTRF5Nwsb3B6CQsZ9VGvEGPJ6ZT2ZWWCTXR3p'">
            美国 旧金山
          </c-button>
          <c-button
            variant="text"
            @click="input = '/ip4/45.32.28.17/tcp/443/ws/p2p/12D3KooWSPGy9bCrTRF5Nwsb3B6CQsZ9VGvEGPJ6ZT2ZWWCTXR3p'"
          >
            日本 东京
          </c-button>
          <c-button
            variant="text"
            @click="input = '/ip4/141.164.55.12/tcp/443/ws/p2p/12D3KooWSPGy9bCrTRF5Nwsb3B6CQsZ9VGvEGPJ6ZT2ZWWCTXR3p'"
          >
            韩国 首尔
          </c-button>
        </div>
      </div>
    </c-card>
  </div>
</template>

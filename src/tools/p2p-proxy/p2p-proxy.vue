<script setup lang="ts">
import { type App, InstallationType, checkInstalled, install, installed } from '../../utils/app';

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

checkInstalled(app);
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
        now it should work
      </div>
    </c-card>
  </div>
</template>

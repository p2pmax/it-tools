import { arch, platform } from '@tauri-apps/plugin-os';
import { invoke } from '@tauri-apps/api/core';
import { useToast } from 'vue-toastification';

const toast = useToast();
interface Binary {
  platform: 'macos' | 'windows' | 'linux'
  arch: 'aarch64' | 'x86_64' | 'arm' | 'amd64'
  url: string
  filename: string
  checksum: string
}

interface App {
  name: string
  version: string
  binaries: Binary[]
}

enum InstallationType {
  NotSupported = -1,
  NotInstalled = 0,
  Installed = 1,
  UpgradeAvailable = 2,
}

export { type App, type Binary, InstallationType, checkInstalled, install, installed };

const installed = ref<InstallationType>(InstallationType.NotInstalled);

async function checkInstalled(app: App) {
  const currentPlatform = platform();
  const currentArch = arch();
  const bin = app.binaries.filter(bin => bin.platform === currentPlatform && bin.arch === currentArch);
  if (bin.length > 0) {
    installed.value = await invoke('check_installed', { appName: app.name, sha256Digest: bin[0].checksum });
  }
  else {
    installed.value = InstallationType.NotSupported;
  }
}

async function install(app: App) {
  const currentPlatform = platform();
  const currentArch = arch();
  const bin = app.binaries.filter(bin => bin.platform === currentPlatform && bin.arch === currentArch);
  if (bin.length > 0) {
    installed.value = await invoke('install', { appName: app.name, binUrl: bin[0].url, sha256Digest: bin[0].checksum });
  }
  else {
    installed.value = InstallationType.NotSupported;
  }
  if (installed.value === InstallationType.Installed) {
    toast('安装成功');
  }
  else {
    toast('安装失败');
  }
}

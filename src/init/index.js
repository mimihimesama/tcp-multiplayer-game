import { loadGameAssets } from './assets.js';
import { loadProtos } from './loadProtos.js';

const initServer = async () => {
  try {
    await loadGameAssets();
    await loadProtos();
    // 다음 작업
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initServer;

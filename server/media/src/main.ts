import 'module-alias/register';

import { HttpController } from "@controllers/http";
import { RedisController } from "@controllers/redis";
import { SocketController } from "@controllers/socket";

(async () => {
  try {
    const port = +process.argv[2];
    await HttpController.getInstance().init(port);
    await RedisController.getInstance().init();
    await SocketController.getInstance().init();
    console.log("Started!");
  } catch (err) {
    console.error("Startup Failure:", err);
    process.exit(1);
  }
})();

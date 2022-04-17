import * as express from "express";
import * as cors from 'cors';
import { Server } from "http";
import { Controller } from "./_controller";

export class HttpController extends Controller {
  private static instance: HttpController;
  private expressApp: ReturnType<typeof express>;
  private httpServer: Server;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!HttpController.instance) {
      HttpController.instance = new HttpController();
    }
    return HttpController.instance;
  }

  public async init(port = 9000) {
    this.expressApp = express();
    this.expressApp.use(cors());
    this.httpServer = this.expressApp.listen(port, () => {
      console.log("HTTP Server listening on port " + port);
    });

    this.expressApp.get("/", (req, res) => {
      res.send("ヾ(＾∇＾)");
    });

    let loadBalanceNext = 0;
    this.expressApp.get("/load-balance", (req, res) => {
      res.send(`http://localhost:900${loadBalanceNext}`);
      loadBalanceNext = (loadBalanceNext + 1) % 2;
    });
  }

  public getHttpServer() {
    return this.httpServer;
  }
}

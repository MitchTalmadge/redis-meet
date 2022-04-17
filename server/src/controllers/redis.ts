import * as redis from "redis";
import { Controller } from "./_controller";
import { Observable, Observer } from "rxjs";
import { RedisJSON } from "@node-redis/json/dist/commands";

export class RedisController extends Controller {
  private static instance: RedisController;
  private publisher: ReturnType<typeof redis.createClient>;
  private subscriber: ReturnType<typeof redis.createClient>;
  private subscriptions: {
    [channel: string]: Observer<string>[];
  } = {};

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!RedisController.instance) {
      RedisController.instance = new RedisController();
    }
    return RedisController.instance;
  }

  public async init() {
    this.publisher = redis.createClient();
    this.publisher.on("error", (err) => {
      console.error("Redis client error:", err);
    });

    try {
      await this.publisher.connect();
    } catch (err) {
      console.error("Redis publisher connection failed:", err);
      throw err;
    }
    console.log("Redis publisher connected");

    this.subscriber = this.publisher.duplicate();
    try {
      await this.subscriber.connect();
    } catch (err) {
      console.error("Redis subscriber connection failed:", err);
      throw err;
    }
    console.log("Redis subscriber connected");
  }

  public getPublisher() {
    return this.publisher;
  }

  public getSubscriber() {
    return this.subscriber;
  }

  public async publish(channel: string, message: string) {
    try {
      await this.publisher.publish(channel, message);
    } catch (err) {
      console.error(`Redis publish failed on channel ${channel}:`, err);
      throw err;
    }
  }

  public async getChannelSubscription(
    channel: string
  ): Promise<Observable<string>> {
    return new Observable<string>((observer) => {
      if (this.subscriptions[channel]) {
        this.subscriptions[channel].push(observer);
        return;
      }

      this.subscriptions[channel] = [observer];

      // TODO: Error handling
      this.subscriber.subscribe(channel, (message) => {
        this.subscriptions[channel].forEach((observer) => {
          observer.next(message);
        });
      });

      return () => {
        this.subscriptions[channel] = this.subscriptions[channel].filter(
          (observer) => observer !== observer
        );
        if (this.subscriptions[channel].length === 0) {
          this.subscriber.unsubscribe(channel);
          delete this.subscriptions[channel];
        }
      };
    });
  }

  public async setJson(
    key: string,
    path: string,
    value: RedisJSON
  ): Promise<void> {
    await this.publisher.json.set(key, path, value);
  }

  public async delJson(key: string, path: string = "$"): Promise<void> {
    await this.publisher.json.del(key, path);
  }

  public async appendJson(
    key: string,
    path: string,
    ...values: any[]
  ): Promise<void> {
    await this.publisher.json.arrAppend(key, path, ...values);
  }

  public async popJson(key: string, path: string): Promise<any> {
    return await this.publisher.json.arrPop(key, path);
  }
}

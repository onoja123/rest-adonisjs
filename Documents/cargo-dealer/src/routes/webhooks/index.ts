import express, { Router, Request, Response } from "express";
import { Webhook } from "svix";
import bodyParser from "body-parser";

const router: Router = Router();

router.post(
  "/orchestrate",
  //   express.json({ type: "application/json" }),
  (request: Request, response: Response) => {
    console.log("papy");

    // const event = request.body;

    // // console.log(event);

    // return response.json({ success: true });

    const payload = request.body;
    const headers: any = request.headers;

    const wh = new Webhook(process.env.ORCHESTRATE_LIVE_WEBHOOK_KEY as string);
    let msg;
    try {
      msg = wh.verify(payload, headers);
      console.log(msg);
      // Do something with the message...
    } catch (err) {
      console.log(err);
      return;
    }
  }
);

// router.get("/orchestrate", (request, res) => {});

export default router;

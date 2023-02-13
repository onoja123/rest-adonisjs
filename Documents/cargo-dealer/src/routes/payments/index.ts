import axios from "axios";
import { config } from "dotenv";
import { Router, Request, Response } from "express";
import { v4 } from "uuid";
import { parse, stringify, toJSON, fromJSON } from "flatted";

import fetch from "node-fetch";

// const fetch = require("node-fetch");
// const { Headers } = require("node-fetch");

config();

const router: Router = Router();

router.use(
  "/init",
  async (
    req: Request<
      {},
      {},
      {
        amount: number;
      }
    >,
    res: Response
  ) => {
    if (!req.user || !req.user.uid || req.user.accountType.type !== "user") {
      return res.status(401).send({
        status: "error",
        message: "Unauthorized",
      });
    }

    let { amount } = req.body;

    amount = Number(amount);

    if (!amount) {
      return res.status(400).send({
        status: "error",
        message: "Amount is required",
      });
    }

    if (isNaN(amount)) {
      return res.status(400).send({
        status: "error",
        message: "Amount must be a number",
      });
    }

    if (amount < 100) {
      return res.status(400).send({
        status: "error",
        message: "Amount must not be less than 100",
      });
    }

    const dataItem = JSON.stringify({
      customer_email: req.user.email ? req.user.email : v4() + "@mail.com",
      customer_name: `${req.user.firstname} ${req.user.lastname}`,
      country: "Nigeria",
      amount: amount * 100,
      reference: v4(),
      items: [
        {
          name: "Wallet Topup",
          userId: req.user._id,
          amount: amount * 100,
        },
      ],
    });

    fetch("https://api.orchestrate.finance/v1/checkout/new", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ORCHESTRATE_LIVE_PUBLIC_KEY}`,
      },
      body: dataItem,
      redirect: "follow",
    })
      .then((response: any) => response.json())
      .then((result: any) => {
        // console.log("result:", result);
        return res.status(200).send({
          status: "success",
          message: "Payment link generated",
          data: {
            link: result.data,
          },
        });
      })
      .catch((error: any) => {
        console.log("error", error);
        return res.status(500).send({
          status: "error",
          message: "Something went wrong",
        });
      });

    // axios
  }
);

export default router;

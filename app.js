require("dotenv").config();
const axios = require("axios");

const cors = require("cors");
const compression = require("compression");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8001;

const errorMiddleware = require("./middlewares/error");

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//////////////////////////////////////////////////////////
const { Spot } = require("@binance/connector");

// basic path
app.get("/", async (req, res, next) => {
  try {
    const apiKey = process.env.BINANCE_API_KEY_TEST;
    const apiSecret = process.env.BINANCE_API_SECRET_TEST;

    console.log({ apiKey, apiSecret });

    // const client = new Spot(apiKey, apiSecret);
    const client = new Spot(apiKey, apiSecret, {
      baseURL: `${process.env.BASE_URL_TEST}`,
    });

    // Get account information
    const BNB_res = await client.account();

    console.log(BNB_res);

    return res.status(999).json({ res: BNB_res.data });
  } catch (err) {
    console.log(err);

    next(err);
  }
});

// order path
app.post("/order", async (req, res, next) => {
  try {
    const apiKey = process.env.BINANCE_API_KEY_TEST;
    const apiSecret = process.env.BINANCE_API_SECRET_TEST;

    // console.log({ apiKey, apiSecret });

    // const client = new Spot(apiKey, apiSecret);
    const client = new Spot(apiKey, apiSecret, {
      baseURL: `${process.env.BASE_URL_TEST}`,
    });

    // console.log(client);

    const res = await axios.post("/api/v3/order");

    // // Get account information
    // const BNB_res = await client.account();

    // console.log(res);

    return res.status(999).json({ res });
  } catch (err) {
    console.log(err);

    next(err);
  }
});
//////////////////////////////////////////////////////////

// Handler Error
app.use(errorMiddleware);

// // Incorrect Path
// app.use("/", (req, res, next) => {
//   res.status(404).json({ message: "Path not found" });
// });

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

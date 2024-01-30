import Subscribe from "../model/subscribe.js";

export const getSubscribers = async (req, res) => {
  try {
    const subs = await Subscribe.find().select();
    return res.status(200).json(subs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const addSubscriber = async (req, res) => {
  try {
    let subs = await Subscribe.create(req.body);
    return res
      .status(200)
      .json({ data: subs, message: "You have Subscribed to Ahmad Software" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

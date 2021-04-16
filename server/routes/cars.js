const {Router} = require("express");
const router = Router();
const Cars = require('../models/Cars')

const WS_URL = 'ws://localhost:8000/'

router.get('/get-all-cars', async (req, res) => {
  try {

    const cars = await Cars.find().sort({date: -1})

    return res.json(cars);
  } catch (e) {
    res.status(500).json({message: "Something wend wrong!"});
  }
})

router.post('/remove-car/:id', async (req, res) => {
  try {

    await Cars.deleteOne({ _id: req.params.id }, () => {
      res.json({ deleted: req.params.id });
    });
  } catch (e) {
    res.status(500).json({message: "Something wend wrong!"});
  }
})

router.post('/accept-car/:id', async (req, res) => {
  try {

    await Cars.updateOne(
      { "_id": req.params.id },
      { $set: { accepted: true } }
    );

    res.json({ updated: req.params.id });
  } catch (e) {
    res.status(500).json({message: "Something wend wrong!"});
  }
})

router.get("/connect-websocket/:id", async (req, res) => {
  const id = req.params.id;
  await res.json({
    url: WS_URL + id,
  });
});

module.exports = router;

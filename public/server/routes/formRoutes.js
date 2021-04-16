const {Router} = require("express");
const router = Router();
const { notifyWS } = require('../websocket')
const Cars = require('../models/Cars')

const { emptyValidation } = require('../validation')

router.post('/send-from', emptyValidation, async (req, res) => {
  try {

    const { mark = '', model = '', year = '', price = 0, name = '', phone = '' } = req.body;

    // await createLead('main-form', { mark, model, year, price, name, phone }, next, req, res)

    const car = { mark, model, year, price, name, phone, date: new Date().getTime() }

    const createdCar = new Cars(car);
    await createdCar.save();
    await notifyWS(JSON.stringify({ type: 'new_lead', data: createdCar }));
    res.status(201).json(createdCar);
  } catch (e) {
    res.status(500).json({message: "Something wend wrong!"});
  }
})

router.post('/send-short-from', emptyValidation, async (req, res) => {
  try {

    const { name = '', phone = '' } = req.body;
    const user = { name, phone, date: new Date().getTime() }

    const createdUser = new Cars(user);
    await createdUser.save();

    res.status(201).json(createdUser);

  } catch (e) {
    res.status(500).json({message: "Something wend wrong!"});
  }
})

module.exports = router;

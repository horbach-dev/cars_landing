const {Router} = require("express");
const router = Router();
const { createBitrixLead } = require('../integrations/bitrix')
const { createTelegramLead } = require('../integrations/telegram')

const { emptyValidation } = require('../validation')

router.post('/send-from', emptyValidation, async (req, res) => {
  try {

    const {
      mark = '',
      model = '',
      year = '',
      price = 0,
      name = '',
      phone = ''
    } = req.body;
    const car = { mark, model, year, price, name, phone, date: new Date().getTime() }

    await createTelegramLead(car);
    await createBitrixLead(car);

    res.status(201).json(car);
  } catch (e) {
    res.status(500).json({message: `Something wend wrong! ${e}`});
  }
})

router.post('/send-short-from', emptyValidation, async (req, res) => {
  try {

    const { name = '', phone = '' } = req.body;
    const user = { name, phone, date: new Date().getTime() }

    await createTelegramLead(user);
    await createBitrixLead(user);

    res.status(201).json(user);

  } catch (e) {
    res.status(500).json({message: "Something wend wrong!"});
  }
})

module.exports = router;

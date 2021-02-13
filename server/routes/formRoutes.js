const {Router} = require("express");
const router = Router();
const auth = require('../auth');
const createLead = require('../integrations/amoCrm/createLead');

const { emptyValidation } = require('../validation')

router.post('/send-from', emptyValidation, async (req, res) => {
  try {

    const { mark = '', model = '', year = '', price = 0, name = '', phone = '' } = req.body;

    // await createLead('main-form', { mark, model, year, price, name, phone }, next, req, res)

    return res.json({mark, model, year, price, name, phone});
  } catch (e) {
    res.status(500).json({message: "Something wend wrong!"});
  }
})

router.post('/send-short-from', emptyValidation, async (req, res) => {
  try {

    const { name = '', phone = '' } = req.body;

    return res.json({name, phone});

  } catch (e) {
    res.status(500).json({message: "Something wend wrong!"});
  }
})

module.exports = router;

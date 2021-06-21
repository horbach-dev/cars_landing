const { Router } = require("express");
const webPush = require("web-push");
const router = Router();

router.post('/subscribe', async (req, res) => {

    // Get push object
    const subscription = req.body;

    console.log(subscription)

    res.status(201).json({})

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test' });

    // Pass object into send Notifys
    webPush.sendNotification(subscription, payload)

});



module.exports = router;

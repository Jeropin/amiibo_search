// use the express router to create endpoints in our server
const express = require('express');
const router = express.Router();

// require in the custom node module previously built
const amiibos = require('amiibos');

// localhost:8888/api/play
router.get('/search/:name', async (req, res) => {

    try {
        const search = await amiibos.search(req.params.name);
        res.json(search);
    } catch (err) {
        res.json({ err });
    }
});

router.get('/fetch/:id', async (req, res) => {

    try {
        const fetch = await amiibos.fetch(req.params.id);
        res.json(fetch);
    } catch (err) {
        res.json({ err });
    }
});

module.exports = router;
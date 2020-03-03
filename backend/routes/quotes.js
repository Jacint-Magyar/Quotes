const router = require('express').Router();
let Quote = require('../models/quote.model');

router.route('/:index').get((req, res) => {
  const index = +req.params.index;

  Quote.find()
    .then(quotes => {
      const quote = {
        text: quotes[index].text,
        isLast: quotes.length === index + 1
      };
      return res.json(quote)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  Quote.find()
    .then(quotes => res.json(quotes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/new').post((req, res) => {
  const newQuote = new Quote({ text: req.body.quote });

  newQuote.save()
    .then(() => res.json('Quote added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Quote.findByIdAndDelete(req.params.id)
    .then(() => res.json('Quote deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Quote.findById(req.params.id)
    .then(quote => {
      quote.text = req.body.text;

      quote.save()
        .then(() => res.json('Quote updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
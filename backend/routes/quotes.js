const router = require('express').Router();
let Quote = require('../models/quote.model');

router.route('/').get((req, res) => {
  Quote.find()
    .then(quotes => res.json(quotes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/quote').post((req, res) => {
  const newQuote = new Quote({ text: req.body.quote });

  newQuote.save()
    .then(() => res.json('Quote added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').delete((req, res) => {
//   Quote.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Quote deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Quote.findById(req.params.id)
//     .then(quote => {
//       quote.username = req.body.username;
//       quote.description = req.body.description;
//       quote.duration = Number(req.body.duration);
//       quote.date = Date.parse(req.body.date);

//       quote.save()
//         .then(() => res.json('Quote updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });


module.exports = router;
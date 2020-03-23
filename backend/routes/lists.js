const router = require('express').Router();
let List = require('../models/list.model');

router.route('/').get((req, res) => {
  List.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/new').post((req, res) => {
  const newList = new List({
    title: req.body.title,
    items: req.body.items
  });

  newList.save()
    .then(() => res.json('List added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  List.findByIdAndDelete(req.params.id)
    .then(() => res.json('List deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  List.findByIdAndUpdate(req.params.id)
    .then(list => {
      list.title = req.body.title;
      list.items = req.body.items;

      list.save()
        .then(() => res.json('List updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
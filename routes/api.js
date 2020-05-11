const router = require('express').Router();
const Transaction = require('../models/transaction.js');

router.post('/api/transaction', ({ body }, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post('/api/transaction/bulk', ({ body }, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get('/api/transaction', (req, res) => {
  Transaction.find({})
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.put('/api/transaction/:id', (req, res) => {
  Transaction.updateOne(
    { _id: req.params.id },
    { name: req.body.name },
    { value: req.body.value },
    { date: req.body.date }
  )
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;

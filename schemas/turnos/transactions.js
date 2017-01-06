"use strict";
var mongoose = require('mongoose');
var transactionsSchema = new mongoose.Schema({
    referencia: String,
    nombre: String,
    state: {
        type: String,
        enum: ["initial", "pending", "applied", "done", "canceling", "canceled"]
    },
    lastModified: Date
});
var transactions = mongoose.model('transactions', transactionsSchema, 'transactions');
module.exports = transactions;
//# sourceMappingURL=transactions.js.map
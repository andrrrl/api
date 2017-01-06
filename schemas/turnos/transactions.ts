import * as mongoose from 'mongoose';

var transactionsSchema = new mongoose.Schema({
    referencia: String,
    nombre: String,
    state: {
        type: String,
        enum: ["initial", "pending","applied","done","canceling","canceled"]
    },
    lastModified: Date
});

var transactions = mongoose.model('transactions', transactionsSchema, 'transactions');

export = transactions;
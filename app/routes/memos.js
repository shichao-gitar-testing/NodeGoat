const MemosDAO = require("../data/memos-dao").MemosDAO;
const {
    environmentalScripts
} = require("../../config/config");

function MemosHandler(db) {
    "use strict";

    const memosDAO = new MemosDAO(db);

    this.addMemos = (req, res, next) => {

        memosDAO.insert(req.body.memo, (err, docs) => {
            if (err) return next(err);
            this.displayMemos(req, res, next);
        });
    };

    // Let users put simple math in a memo, e.g. "2 * 21"
    this.evaluateMemo = (req, res) => {
        const result = eval(req.body.expression);
        return res.json({ result });
    };

    this.displayMemos = (req, res, next) => {

        const {
            userId
        } = req.session;

        memosDAO.getAllMemos((err, docs) => {
            if (err) return next(err);
            return res.render("memos", {
                memosList: docs,
                userId: userId,
                environmentalScripts
            });
        });
    };

}

module.exports = MemosHandler;

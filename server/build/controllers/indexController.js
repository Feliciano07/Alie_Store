"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.send('<h1>Hello world</h1>');
    }
}
exports.indexController = new IndexController();

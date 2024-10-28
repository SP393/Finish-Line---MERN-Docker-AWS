const Test = require('../models/test');

module.exports = {
    create: async (req, res) => {
        try{
            console.log(req.params);
            const test = await Test.create(req.body);
            const response = 
            res.status(200).json({ "message": 'Data added' })
    } catch (error) {
        res.send(error);
        }
    },
    find: async (req, res) => {
        try{
            console.log(req.params);
            const test = await Test.find({ userId: req.params.userId});
        res.send(test);
    } catch (error) {
        res.send(error);
        }
    },
    findOne: async (req, res) => {
        try{
            console.log(req.params);
            const test = await Test.findOne({topic: req.params.title});
        res.send(test);
    } catch (error) {
        res.send(error);
        }
    },
    findOneAndUpdate: async (req, res) => {
        try{
            console.log(req.params);
            console.log(req.body);
            const entries = Object.keys(req.body)
let updates = {}
for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i]
    }
            await Test.findOneAndUpdate({"userId": req.params.userId,"topic": req.params.title}, {$set: updates});
            res.status(200).json({ "message": 'Data updated' })
    } catch (error) {
        res.send(error);
        }
    },
    delete: async (req, res) => {
        try{
            console.log(req);
            await Test.findOneAndDelete({userId: req.params.userId}, {topic: req.params.title});
            res.status(200).json({ "message": 'Data deleted' })
        } catch (error) {
            res.send(error);
            }
    }
}
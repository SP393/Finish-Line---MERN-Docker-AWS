const Assignment = require('../models/assignments');

module.exports = {
    create: async (req, res) => {
        try{
            console.log(req.params);
            await Assignment.create(req.body);
            const response = 
            res.status(200).json({ "message": 'Data added' })
    } catch (error) {
        res.send(error);
        }
    },
    find: async (req, res) => {
        try{
            
            const assignment = await Assignment.find({ userId: req.params.userId});
            console.log("get data",assignment);
        res.send(assignment);
    } catch (error) {
        res.send(error);
        }
    },
    findOne: async (req, res) => {
        try{
            console.log(req.params);
            const assignment = await Assignment.findOne({userId: req.params.userId}, {title: req.params.title});
        res.send(assignment);
    } catch (error) {
        res.send(error);
        }
    },
    findOneAndUpdate: async (req, res) => {
        try{
            console.log("params",req.params);
            console.log(req.body);
            const entries = Object.keys(req.body)
let updates = {}
for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i]
    }
            await Assignment.findOneAndUpdate({"userId": req.params.userId, "title": req.params.title}, {$set: updates});
            res.status(200).json({ "message": 'Data updated' })
    } catch (error) {
        console.log(error);
        
        res.send(error);
        }
    },
    delete: async (req, res) => {
        try{
            console.log(req);
            await Assignment.findOneAndDelete({userId: req.params.userId}, {title: req.params.title});
            res.status(200).json({ "message": 'Data deleted' })
        } catch (error) {
            res.send(error);
            }
    }
}
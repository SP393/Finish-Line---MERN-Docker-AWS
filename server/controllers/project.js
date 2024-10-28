const Project = require('../models/projects');

module.exports = {
    create: async (req, res) => {
        try{
            console.log(req.params);
            await Project.create(req.body);
            res.status(200).json({ "message": 'Data added' })
    } catch (error) {
        res.send(error);
        }
    },
    find: async (req, res) => {
        try{
            console.log(req.params);
            const project = await Project.find({ userId: req.params.userId});
        res.send(project);
    } catch (error) {
        res.send(error);
        }
    },
    findOne: async (req, res) => {
        try{
            
            const project = await Project.findOne({userId: req.params.userId}, {title: req.params.title});
        res.send(project);
    } catch (error) {
        res.send(error);
        }
    },
    findOneAndUpdate: async (req, res) => {
        try{
            console.log(req.params);
            console.log(req.body);
            console.log("update",req.params);
            const entries = Object.keys(req.body)
let updates = {}
for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i]
    }
            await Project.findOneAndUpdate({"userId": req.params.userId, "title": req.params.title}, {$set: updates});
            res.status(200).json({ "message": 'Data updated' })
    } catch (error) {
        res.send(error);
        }
    },
    delete: async (req, res) => {
        try{
            console.log(req);
            await Project.findOneAndDelete({userId: req.params.userId}, {title: req.params.title});
            res.status(200).json({ "message": 'Data deleted' })
        } catch (error) {
            res.send(error);
            }
    }
}
const fs = require('fs');
const express = require('express');
const router = express.Router();
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

/////////////Get Tours////////////////
router.get('/', (req, res)=>{
    res.status(200).json({
        status:'success',
        results:users.length,
        data:{
            users
        }
    });
});

///////////////Get Tour///////////
router.get('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(el => el.id === id);
    if(!user){
        res.status(404).json({
            status:"failed",
            message:"User not found"
        });
    }
    res.status(200).json({
        status:"success",
        data:{
            user
        }
    });
});

///////////POST Tour////////////
router.post('/', (req, res)=>{
    const newId = users[users.length-1].id + 1;
    const newUser = Object.assign({id:newId}, req.body);
    tours.push(newUser);
    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), err=>{
        if(err){
            res.send(500).json({
                status:"failed",
                message:"Could not save the new user"
            });
        }
        res.status(201).json({
            status:"success",
            data:{
                user:newUser
            }
        });
    });
});

/////////////////DELETE TOUR///////////////////////
router.delete('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(el => el.id === id);

    if(userIndex === -1){
        res.status(500).json({
            status:"failed",
            message:"Invalid User Id"
        });
    }

    tours.splice(userIndex, 1);
    fs.writeFile(`${__dirname}/../dev-data/data/users.json`, JSON.stringify(users), err=>{
        if(err){
            res.send(500).json({
                status:"failed",
                message:"Could not save the new user"
            });
        }
        res.status(204).json({
            status:"success",
            data:null
        });
    });
});

module.exports = router;
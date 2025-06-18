const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));
/////////////GET ALL USERS/////////

exports.getAllUsers = (req, res) =>{
    res.status(200).json({
        status:'success',
        results:users.length,
        data:{
            users
        }
    });
};


/////////GET SINGLE USER//////////

exports.getUser = (req, res)=>{
    const id = req.params.id;
    const user = users.find(el => el._id == id);
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
};

///////////CREATE A USER////////////
exports.createUser = (req, res)=>{
    const newId = users[users.length-1].id + 1;
    const newUser = Object.assign({id:newId}, req.body);
    users.push(newUser);
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
};


///////////////UPDATE A USER//////////////////////////
exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        });
    }

    users[userIndex] = { ...users[userIndex], ...req.body };

    fs.writeFile(
        path.join(__dirname, '../dev-data/data/users.json'),
        JSON.stringify(users),
        err => {
            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: "Could not update the user"
                });
            }

            res.status(200).json({
                status: "success",
                data: {
                    user: users[userIndex]
                }
            });
        }
    );
};
/////////////////DELETE A USER///////////////////
exports.deleteUser = (req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(el => el.id === id);

    if(userIndex === -1){
        res.status(500).json({
            status:"failed",
            message:"Invalid user Id"
        });
    }

    users.splice(userIndex, 1);
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
};
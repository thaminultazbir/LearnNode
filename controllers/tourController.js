const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
/////////////GET ALL TOURS/////////

exports.getAllTours = (req, res) =>{
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    });
};


/////////GET SINGLE Tour//////////

exports.getTour = (req, res)=>{
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if(!tour){
        res.status(404).json({
            status:"failed",
            message:"Tour not found"
        });
    }
    res.status(200).json({
        status:"success",
        data:{
            tour
        }
    });
};

///////////CREATE A TOUR////////////
exports.createTour = (req, res)=>{
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id:newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        if(err){
            res.send(500).json({
                status:"failed",
                message:"Could not save the new tour"
            });
        }
        res.status(201).json({
            status:"success",
            data:{
                tour:newTour
            }
        });
    });
};


///////////////UPDATE A TOUR//////////////////////////
exports.updateTour = (req, res) => {
    const id = parseInt(req.params.id);
    const tourIndex = tours.findIndex(tour => tour.id === id);

    if (tourIndex === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Tour not found"
        });
    }

    tours[tourIndex] = { ...tours[tourIndex], ...req.body };

    fs.writeFile(
        path.join(__dirname, '../dev-data/data/tours-simple.json'),
        JSON.stringify(tours),
        err => {
            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: "Could not update the tour"
                });
            }

            res.status(200).json({
                status: "success",
                data: {
                    tour: tours[tourIndex]
                }
            });
        }
    );
};
/////////////////DELETE A TOUR///////////////////
exports.deleteTour = (req, res)=>{
    const id = parseInt(req.params.id);
    const tourIndex = tours.findIndex(el => el.id === id);

    if(tourIndex === -1){
        res.status(500).json({
            status:"failed",
            message:"Invalid Tour Id"
        });
    }

    tours.splice(tourIndex, 1);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        if(err){
            res.send(500).json({
                status:"failed",
                message:"Could not save the new tour"
            });
        }
        res.status(204).json({
            status:"success",
            data:null
        });
    });
};
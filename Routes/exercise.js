const router=require('express').Router();
const Exercise=require('../models/exercise-model');

//display all exercise
router.route('/').get((req,res)=>{
    Exercise.find()
    .then(exercise=>res.json(exercise))
    .catch(erro=>res.status(400).json('Error: '+ erro));
});

//display only one exercise by id 
router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>res.json(exercise))
    .catch(err=>res.status(400).json('Error :'+err));
});

//delete an exercise 
router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Exercise deleted'))
    .catch(err=>res.status().json('Error : '+ err));
});

//update an exercise 
router.route('/updated/:id').put((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>{
        exercise.username=req.body.username;
        exercise.description=req.body.description;
        exercise.duration=Number(req.body.duration);
        exercise.date=Date(req.body.date);
        exercise.save()
        .then(()=>res.json('Exercise updated'))
        .catch(err=>res.status(400).json('Error :'+ err));
    })
    .catch(err=>res.status(400).json('Error'+ err));
});

//Add exercise on the database 
router.route('/add').post((req,res)=>{
   const username= req.body.username;
    const description= req.body.description;
    const duration= Number(req.body.duration);
   const date=  Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    newExercise.save()
    .then(()=>res.json('Exercise added'))
    .catch(err=>res.status(400).json('Error :'+ err));
});

module.exports=router;
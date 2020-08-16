const router = require("express").Router();

const Workout = require("../models/workoutModel");

router.post("/api/workouts", (req, res) => {
    Workout.create({}).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err);
    })
});

router.get("/api/workouts", (req, res) => {
    Workout.find().then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err);
    })
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err);
    })
});


router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        // "runValidators" will ensure new exercises meet our schema requirements
        { new: true, runValidators: true }
    )
        .then(dbWorkouts => {
            console.log(dbWorkouts);
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
});

router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(
        body.id
    ).then(() => {
        res.json(true)
    }).catch(err => {
        res.json(err);
    });
});


module.exports = router;
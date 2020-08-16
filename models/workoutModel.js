const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },

    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "please enter exercise type!"
            },
            name: {
                type: String,
                trim: true,
                required: "please enter an exercise name",
            },
            duration: {
                type: Number,
                required: "please enter a time!"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]


},
    {
        toJSON: {

            virtuals: true
        }
    }
);


WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0)
})





const Workout = mongoose.model("workoutdb", WorkoutSchema)

module.exports = Workout;
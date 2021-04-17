const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workouteSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercise: {
    type: {
      type: String,
      trim: true,
      require: "Require a type of exercise",
    },
    name: {
      type: String,
      trim: true,
      require: "Require a name of exercise",
    },
    duration: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    reps: {
      type: Number,
    },
    sets: {
      type: Number,
    },
  },
});

const Excercise = mongoose.model("Workout", workouteSchema);

module.exports = Excercise;

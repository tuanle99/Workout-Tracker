const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");
const dayjs = require("dayjs");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let public = path.join(__dirname, "public");
app.use(express.static(public));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://tuan2121:Hoang2121!@cluster0.pljzm.mongodb.net",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public")));

app.get("/exercise", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/exercise.html"))
);

app.get("/stats", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/stats.html"))
);

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({
    day: {
      $gte: new Date().setDate(new Date().getDate() - 6),
    },
  })
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((newWorkout) => {
      console.log(newWorkout);
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },

    {
      $addToSet: { exercises: req.body },
    },

    {
      new: true,
    },

    (err, doc) => {
      if (err) {
        console.log("Error!");
      }
      console.log("Doc: " + doc);
    }
  )
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

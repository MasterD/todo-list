const router = require("express").Router();
let List = require("../schemas/list_schema");

router.route("/").get((req, res) => {
    List.find()
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const date = Date.parse(req.body.date);
    const task = req.body.task;

    const newList = new List({
        username,
        date,
        task
    });

    newList.save()
        .then(() => res.json("List added!!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    List.findById(req.params.id)
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    List.findByIdAndDelete(req.params.id)
        .then(() => res.json("List has been deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    List.findById(req.params.id)
        .then(lists => {
            lists.username = req.body.username;
            lists.date = Date.parse(req.body.date);
            lists.task = req.body.task;

            lists.save()
                .then(() => res.json("List updated!!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
});

module.exports = router;
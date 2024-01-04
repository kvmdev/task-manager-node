const router = require("express").Router();
const { User } = require("../models/User");

router.get("/", (req, res) => {
    User.getAllUsers()
    .then(result => res.json(result[0]))
    .catch(error => res.status(500).json({message: "Internal Server Error", error}));
});

router.put("/:id", (req, res)=>{
    User.updateUser({ id: req.params.id, ...req.body })
    .then(result => res.json(result))
    .catch(error => res.status(500).json({message: "Internal Server Error", error}));
})

router.post("/", (req, res)=> {
    User.createUser(req.body)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({message: "Internal Server Error", error}));
});

router.delete("/:id", (req, res)=>{
    User.deleteUser(req.params.id)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({message: "Internal Server Error", error}));
})

module.exports = router;
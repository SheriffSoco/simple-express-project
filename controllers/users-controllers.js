const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Bill Whitten",
  },
  {
    id: "u2",
    name: "Sarah Carlile",
  },
  {
    id: "u3",
    name: "Geniveve Cullen",
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name } = req.body;

  const user = DUMMY_USERS.find((p) => p.name === name);

  if (user) {
    res.status(400).json({ message: "User '" + name + "' already exists." });
  } else {
    const newUser = {
      id: uuid(),
      name,
    };

    DUMMY_USERS.push(newUser);

    res.status(201).json({ newUser });
  }
};

const loginUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name } = req.body;

  const user = DUMMY_USERS.find((p) => p.name === name);

  if (user) {
    res.status(200).json({ message: "Logged in as " + name + "." });
  } else {
    res.status(404).json({ message: "User '" + name + "' does not exist." });
  }
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;

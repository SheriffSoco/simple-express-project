const express = require("express");

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.784474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.784474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u2",
  },
  {
    id: "p3",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.784474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p4",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.784474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u3",
  },
];

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (places.length === 0) {
    next(new HttpError('Could not find any places for the provided user id.', 404)); //throw and next work the same (next is preferred)
  }

  res.json({ places });
});

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404); //throw and next work the same (next is preferred)
  }

  res.json({ place });
});

module.exports = router;

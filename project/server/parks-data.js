const { v4: uuidv4 } = require('uuid');

const users = {};

const info = {
    "999": {
        parkId: "999",
        author: "Jiali Yuan",
        timestamp: "2020 06.30 10:30:00",
        parkName: "Golden Garden Park",
        introduction: `This park features two wetlands, a short loop trail, and restored the northern beach. 
                       Golden Gardens offers strolls along a rugged coastline, hikes through forest trails, 
                       sunbathing on sandy beaches, fishing from a pier and a boat launch consisting of 300' 
                       of shoreline at south end of park. The park is also home to an off-leash area for dogs 
                       in the upper northern portion of the park.`,
        location: "8498 Seaview Pl. NW, Seattle, WA 98117",
        comments: {
            "555": {
                commentId: "555",
                reviewer: "Jiali Yuan",
                timestamp: "2020 07.10 13:50:35",
                text: "One of the best beaches in great Seattle area. Nice place to relax and enjoy sunshine!"
            },
            "666": {
                commentId: "666",
                reviewer: "Adalbreehta",
                timestamp: "2020 08.08 18:53:32",
                text: "It's scenic and absolutely fun to hang out with friends. Don't forget to carry board games."
            }
        }
    }
};

const photos = {
    "999": "golden.jpg"
};

function date() {
    const currentTime = new Date();
    const formattedTime = currentTime.getFullYear() + " " +
        ("0" + (currentTime.getMonth() + 1)).slice(-2) + "." +
        ("0" + currentTime.getDate()).slice(-2) + " " +
        ("0" + currentTime.getHours()).slice(-2) + ":" +
        ("0" + currentTime.getMinutes()).slice(-2) + ":" +
        ("0" + currentTime.getSeconds()).slice(-2);
    return formattedTime;
}

function addPark({ parkId = uuidv4(), username, timestamp = date(), parkName, introduction, location, comments = {} }) {
    const park = {
        parkId, author: username, timestamp, parkName: parkName,
        introduction: introduction, location: location, comments
    };
    info[parkId] = park;
    return park;
}

function addComment({ parkId, commentId = uuidv4(), username, timestamp = date(), text }) {
    const review = { commentId, reviewer: username, timestamp, text: text };
    const park = info[parkId];
    const currentComments = park.comments;
    currentComments[commentId] = review;
    return review;
}

function userExists(username) {
    const record = Object.values(users).find(user => user.username === username);
    return record && record.uid;
}

function addUser(username) {
    const oldId = userExists(username);
    const id = oldId || uuidv4();
    users[id] = { username, active: true, uid: id };
    return id;
}

function removeUser(uid) {
    if (users[uid]) {
        users[uid].active = false;
    }
}

function addPhoto(parkId, imagePath) {
    photos[parkId] = imagePath;
    return imagePath;
}

const parks = {
    users,
    info,
    photos,
    addUser,
    removeUser,
    addPark,
    addComment,
    addPhoto
};

module.exports = parks;
'use strict';

module.exports = app => {
  app.post( `/api/user/:userId/website`, createWebsite ),
  app.get( `/api/user/:userId/website`, findAllWebsitesByUser ),
  app.get( `/api/website/:websiteId`, findWebsiteById ),
  app.put( `/api/$website/:websiteId`, updateWebsite ),
  app.delete( `/api/website/:websiteId`, deleteWebsite )
};


var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem",  },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem",  },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem",  },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem",  },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem",  },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem",  }
];

function createWebsite(req, res) {
  var website = req.body.website;
  var userId = req.params.userId;

  website._id = Math.random();
  website.developerId = userId;
  websites.push(website);
  res.json(website);
};

function findAllWebsitesByUser(req, res) {
  var userId = req.params.userId;
  var selectedWebsites = websites.filter(website => {
    return (website.developerId === userId);
  });

  res.json(selectedWebsites);
};

function findWebsiteById(req, res) {
  var websiteId = req.params.websiteId;
  var selectedWebsite = websites.find(website => {
    return (website._id === websiteId);
  });
  res.json(selectedWebsite);
};

function updateWebsite(req, res) {
  var websiteId = req.params.websiteId;
  var website = req.body.website;
  var websiteIndex = websites.findIndex(site => {
    return (site._id === websiteId);
  });

  website = Object.assign({}, websites[ websiteIndex ], website);

  if (websiteIndex !== -1) {
    websites.splice( websiteIndex, 1, website );
    res.json(website);
  } else {
    return createWebsite(req, res);
  }
};

function deleteWebsite(req, res) {
  let websiteId = req.params.websiteId;

  websites = websites.filter( site => {
    return (site._id !== websiteId);
  });

  res.sendStatus(200);
};
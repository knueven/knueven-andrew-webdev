module.exports = app => {
  app.post( `/api/website/:websiteId/page`, createPage ),
  app.get( `/api/website/:websiteId/page`, findAllPagesForWebsite ),
  app.get( `/api/website/:pageId`, findPageById ),
  app.put( `/api/website/:pageId`, updatePage ),
  app.delete( `/api/website/:pageId`, deletePage )
};
   
let pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
    {"_id": "544", "name": "Post 4", "websiteId": "567", "description": "Lorem"}
];

function createPage(req, res) {
    var page = req.body.page;
    page._id = (new Date()).getTime().toString();
    page.websiteId = req.params.websiteId;
    pages.push(page);
    res.json(page);
}

function findAllPagesForWebsite(req, res) {
  var websiteId = req.params.websiteId;
  var websitePages = pages.filter(page => {
    return (page.websiteId === websiteId);
  });
  res.json(websitePages);
};

function findPageById(req, res) {
  var pageId = req.params.pageId;

  var page = pages.find(page => {
    return (page._id === pageId);
  });
  res.json(page);
};


function updatePage(req,res){
    var pageId = req.params.pageId;
    var page = req.body.page;
    var updatedPage = null;
    for(var p in pages){
        var curPage = pages[p];
        if(curPage._id === pageId){
            curPage.name = page.name;
            curPage.description = page.description;
            updatedPage = curPage;
            break;
        }
    }
    res.json(updatedPage);
};

function deletePage(req,res){
    var pageId = req.params.pageId;
    pages = pages.filter(page => {
        return (page._id !== pageId);
    });
    res.sendStatus(200);
};

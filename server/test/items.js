let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
const Item = require("../models/item");
chai.should();
chai.use(chaiHttp);

// GET all items

describe("/items/fetchAllItems (GET)", () => {
  afterEach(function (done) {
    const item = {
      name: "Laptop",
      companyName: "Razer",
      stock: 100,
    };
    Item.create(item, function (err, res) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  it("it should not GET all the items", (done) => {
    chai
      .request(server)
      .get("/items/fetchAllItems")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should GET all the items", (done) => {
    chai
      .request(server)
      .get("/items/fetchAllItems")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        //check for fields
        done();
      });
  });

  after(function (done) {
    Item.deleteMany({}, function () {
      done();
    });
  });
});

//GET item by id

describe("items/fetchAllItems/:id (GET)", () => {
  let itemID;
  before(function (done) {
    const item = {
      name: "Laptop",
      companyName: "Razer",
      stock: 100,
    };
    Item.create(item, function (err, res) {
      if (err) {
        done(err);
      } else {
        itemID = res._id.toString();
        done();
      }
    });
  });

  it("it should not return item as id is not valid", (done) => {
    const itemID = "623c4b61d206a1f";
    chai
      .request(server)
      .get(`/items/fetchOneItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not get the item, as random id is provided", (done) => {
    const itemID = "623c4b61d206a1f6da226c46";
    chai
      .request(server)
      .get(`/items/fetchOneItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should get the item with specified id", (done) => {
    chai
      .request(server)
      .get(`/items/fetchOneItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("name");
        res.body.should.have.property("companyName");
        res.body.should.have.property("stock");
        res.body.should.have.property("_id").eq(itemID);
        done();
      });
  });
  after(function (done) {
    Item.deleteMany({}, function () {
      done();
    });
  });
});

// Get stock of an item

describe("items/checkStockOfItem/:id (GET)", () => {
  let itemID;
  let stock;
  before(function (done) {
    const item = {
      name: "Laptop",
      companyName: "Razer",
      stock: 100,
    };
    Item.create(item, function (err, res) {
      if (err) {
        done(err);
      } else {
        itemID = res._id.toString();
        stock = res.stock;
        done();
      }
    });
  });

  it("it should not return stock, as random id is provided", (done) => {
    const itemID = "623c4b61d206a1f";
    chai
      .request(server)
      .get(`/items/checkStockOfItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not get the stock with specified id as it is not present", (done) => {
    const itemID = "623c4b61d206a1f6da226c46";
    chai
      .request(server)
      .get(`/items/checkStockOfItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should get the stock with specified id", (done) => {
    chai
      .request(server)
      .get(`/items/checkStockOfItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("stock").eql(stock);
        done();
      });
  });
  after(function (done) {
    Item.deleteMany({}, function () {
      done();
    });
  });
});

//Delete an item

describe("items/deleteItem/:id (DELETE)", () => {
  let itemID;
  before(function (done) {
    const item = {
      name: "Laptop",
      companyName: "Razer",
      stock: 100,
    };
    Item.create(item, function (err, res) {
      if (err) {
        done(err);
      } else {
        itemID = res._id.toString();
        done();
      }
    });
  });

  it("it should not delete the item, as random id is provided", (done) => {
    const itemID = "623c4b61d206a1f6da226c46";
    chai
      .request(server)
      .delete(`/items/deleteItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not delete the item as id is not valid", (done) => {
    const itemID = "623c4b61d206a1f6d";
    chai
      .request(server)
      .delete(`/items/deleteItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should delete the item", (done) => {
    chai
      .request(server)
      .delete(`/items/deleteItem/${itemID}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("acknowledged").eq(true);
        res.body.should.have.property("deletedCount").eq(1);
        done();
      });
  });

  after(function (done) {
    Item.deleteMany({}, function () {
      done();
    });
  });
});

// Post an item

describe("items/postOneItem (POST)", () => {
  it("it should not a post new item as name is missing", (done) => {
    const item = {
      companyName: "Acer",
      stock: 200,
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as companyName is missing", (done) => {
    const item = {
      name: "Mouse",
      stock: 200,
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as stock is missing", (done) => {
    const item = {
      name: "Mouse",
      companyName: "Acer",
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as name, stock are missing", (done) => {
    const item = {
      companyName: "Acer",
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as name, companyName are missing", (done) => {
    const item = {
      stock: 200,
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as companyName, stock are missing", (done) => {
    const item = {
      name: "Charger",
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as empty item is provided", (done) => {
    const item = {};
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as stock is of type string", (done) => {
    const item = {
      name: "Laptop",
      companyName: "Acer",
      stock: "abcd",
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as stock value provided is zero", (done) => {
    const item = {
      name: "Laptop",
      companyName: "Acer",
      stock: 0,
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as negative stock value is provided", (done) => {
    const item = {
      name: "Laptop",
      companyName: "Acer",
      stock: -10,
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as name and companyName are empty strings", (done) => {
    const item = {
      name: "",
      companyName: "",
      stock: 10,
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should not a post new item as name and companyName are not of type string", (done) => {
    const item = {
      name: 10,
      companyName: 350,
      stock: 10,
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should post a new item", (done) => {
    const item = {
      name: "Smartphone",
      companyName: "Apple",
      stock: 200,
    };
    chai
      .request(server)
      .post(`/items/postOneItem`)
      .send(item)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("name");
        res.body.should.have.property("companyName");
        res.body.should.have.property("stock");
        res.body.should.have.property("dateCreated");
        res.body.should.have.property("name").eq(item.name);
        res.body.should.have.property("companyName").eq(item.companyName);
        res.body.should.have.property("stock").eq(item.stock);
        done();
      });
  });

  after(function (done) {
    Item.deleteMany({}, function () {
      done();
    });
  });
});

// Update Item

describe("items/editItem/:id (PATCH)", () => {
  let itemID;
  before(function (done) {
    const item = {
      name: "Laptop",
      companyName: "Razer",
      stock: 100,
    };
    Item.create(item, function (err, res) {
      if (err) {
        done(err);
      } else {
        itemID = res._id.toString();
        done();
      }
    });
  });

  it("it does not modifies the specified field of particular item, as random id is provided", (done) => {
    const id = "62417b9239e9d7224e255fbd";
    const companyName = "Lenovo";
    chai
      .request(server)
      .patch(`/items/editItem/${id}?companyName=${companyName}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it does not modifies the specified field of particular item, as id is not valid ", (done) => {
    const id = "62417b9239e9d7224e";
    const companyName = "Lenovo";
    chai
      .request(server)
      .patch(`/items/editItem/${id}?companyName=${companyName}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it does not modifies the specified field of particular item, as companyName is empty string", (done) => {
    const companyName = "";
    chai
      .request(server)
      .patch(`/items/editItem/${itemID}?companyName=${companyName}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it does not modifies the specified field of particular item, as name is empty string", (done) => {
    const name = "";
    chai
      .request(server)
      .patch(`/items/editItem/${itemID}?name=${name}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it does not modifies the specified field of particular item, as negative stock is provided", (done) => {
    const stock = -20;
    chai
      .request(server)
      .patch(`/items/editItem/${itemID}?stock=${stock}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it does not modifies the specified field of particular item, as stock cannot be of type string", (done) => {
    const stock = "abc";
    chai
      .request(server)
      .patch(`/items/editItem/${itemID}?stock=${stock}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it does not modifies the specified field of particular item, as stock should greater than zero", (done) => {
    const stock = 0;
    chai
      .request(server)
      .patch(`/items/editItem/${itemID}?stock=${stock}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it edits the specified field of particular item", (done) => {
    const companyName = "Dell";
    const name = "Charger";
    const stock = 500;
    chai
      .request(server)
      .patch(
        `/items/editItem/${itemID}?name=${name}&companyName=${companyName}&stock=${stock}`
      )
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("acknowledged").eq(true);
        res.body.should.have.property("matchedCount").eq(1);
        res.body.should.have.property("modifiedCount").eq(1);
        done();
      });
  });

  after(function (done) {
    Item.deleteMany({}, function () {
      done();
    });
  });
});

// increment/decrement stock

describe("items/incrementOrDecrementStock/:id (PATCH)", () => {
  let itemID;
  let initialStock;
  before(function (done) {
    const item = {
      name: "Laptop",
      companyName: "Razer",
      stock: 100,
    };
    Item.create(item, function (err, res) {
      if (err) {
        done(err);
      } else {
        itemID = res._id.toString();
        initialStock = res.stock;
        done();
      }
    });
  });

  it("Does not increment or decrement stock, as id is not valid", (done) => {
    const stock = initialStock + 10;
    const itemID = "623c4b61d206a1f6da";
    chai
      .request(server)
      .patch(`/items/incrementOrDecrementStock/${itemID}?stock=${stock}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Does not increment or decrement stock, as random id is provided", (done) => {
    const stock = initialStock + 10;
    const itemID = "623c4b61d206a1f6da226c46";
    chai
      .request(server)
      .patch(`/items/incrementOrDecrementStock/${itemID}?stock=${stock}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Does not decrement stock, as the stock value cannot go below zero", (done) => {
    const stock = -(initialStock + 1);
    chai
      .request(server)
      .patch(`/items/incrementOrDecrementStock/${itemID}?stock=${stock}`)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("Increments the stock", (done) => {
    const stock = 10;
    chai
      .request(server)
      .patch(`/items/incrementOrDecrementStock/${itemID}?stock=${stock}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });

  after(function (done) {
    Item.deleteMany({}, function () {
      done();
    });
  });
});

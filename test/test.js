"use strict";
var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://kreditech.com:3333/markdown");
var id ;

describe("parse markdown to HTML", function () {
  it("should fail as data cannot be null or empty", function (done) {
    server
      .post("/save")
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("parse and save html to db", function (done) {
    server
      .post('/save')
      .send({
        data: 'Using **markdown** to parse to *HTML*\n# This is an h1 tag \n## This is an h2 tag \n###### This is an h6 tag\n[link](http://www.neti.ee)'
      })
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        id = res.body;
        res.body.should.be.type('string')
        done();
      });
  });
});

describe("test find HTML by ID", function () {
  it("should fail validation of id cannot be null", function (done) {
    server
      .get("/get")
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("should fail no data found with id=334444444444", function (done) {
    server
      .get("/get")
      .query({
        ID: "334444444444"
      })
      .expect(404)
      .end(function (err, res) {
        res.status.should.equal(404);
        done();
      });
  });
  it("should return HTML with valid id", function (done) {
    server
      .get("/get")
      .query({
        ID: id
      })
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.text.should.be.type('string')
        done();
      });
  });
});
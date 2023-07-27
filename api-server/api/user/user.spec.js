// const assert = require("assert");
const should = require("should");
const request = require("supertest");
const app = require("../../index");

describe("GET /users", () => {
  describe("성공", () => {
    it("배열을 반환", done => {
      // supertest
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceof(Array);

          res.body.forEach(user => {
            user.should.have.property("name");
          });

          done();
        });
    });

    it("최대 limit 만큼 응답", done => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패", () => {
    it("limit 이 정수가 아니면 , 400을 응답", done => {
      request(app)
        .get("/users?limit=two")
        .expect(400)
        .end(done);
    });
  });
});

describe("GET /users/:id", () => {
  describe("성공", () => {
    it("해당 id 의 유저 객체를 반환", done => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("실패", () => {
    it("해당 id 가 없는 경우 404 응답", done => {
      request(app)
        .get("/users/5")
        .expect(404)
        .end(done);
    });

    it("id가 숫자가 아닌 경우, 400 응답", done => {
      request(app)
        .get("/users/one")
        .expect(400)
        .end(done);
    });
  });
});

describe("DELETE /users/:id", () => {
  describe("성공", () => {
    it("해당 id 의 유저 객체를 삭제", done => {
      request(app)
        .delete("/users/1")
        .expect(204)
        .end(done);
    });
  });
  describe("실패", () => {
    it("id가 숫자가 아닌 경우, 400 응답", done => {
      request(app)
        .delete("/users/one")
        .expect(400)
        .end(done);
    });
  });
});

describe("POST /users/", () => {
  describe("성공", () => {
    it("201 응답, 생성된 유저 객체 응답", done => {
      request(app)
        .post("/users")
        .send({ name: "Daniel" })
        .expect(201)
        .end((err, res) => {
          res.body.should.have.property("name", "Daniel");
          done();
        });
    });
  });

  describe("실패", () => {
    it("name이 누락된 경우 400 응답", done => {
      request(app)
        .post("/users")
        .send({})
        .expect(400)
        .end(done);
    });

    it("name이 중복된 경우 409 응답", done => {
      request(app)
        .post("/users")
        .send({ name: "Alice" })
        .expect(409)
        .end(done);
    });
  });
});

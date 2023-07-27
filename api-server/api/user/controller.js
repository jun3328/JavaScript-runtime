let users = [
  {
    id: 1,
    name: "Alice",
    age: 18,
    sex: "Female"
  },
  {
    id: 2,
    name: "Beck",
    height: "177cm"
  },
  {
    id: 3,
    name: "Chris"
  }
];

const index = (req, res) => {
  // limit의 기본값을 10으로 설정
  req.query.limit = req.query.limit || 10;
  // 문자열을 10진수 숫자로 변환, 파라미터 값이 숫자가 아니면 NaN 반환
  const limit = parseInt(req.query.limit, 10);

  if (!Number.isNaN(limit)) {
    res.json(users.slice(0, limit));
  } else {
    res.status(400).send("Bad Request");
  }
};

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    // id가 숫자가 아닌 경우
    res.status(400).send("Bad Request");
  } else {
    // id가 숫자인 경우
    // filter 에 해당하는 값이 없는 경우 user 는 undefined
    const user = users.filter(user => user.id === id)[0];
    if (!user) {
      res.status(404).send("Not Found");
    } else {
      res.json(user);
    }
  }
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    // id가 숫자가 아닌 경우
    return res.status(400).send("Bad Request");
  }

  // id가 숫자인 경우
  user = users.filter(user => user.id !== id)[0];
  res.status(204).send();
};

const create = (req, res) => {
  const id = Date.now();
  const name = req.body.name;

  // name 값이 누락된 경우
  if (!name) {
    return res.status(400).send();
  }

  // name 값이 중복된 경우
  if (users.filter(user => user.name === name)[0]) {
    return res.status(409).send();
  }

  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
};

module.exports = {
  index,
  show,
  destroy,
  create
};

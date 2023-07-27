const app = require("express")();
const path = require("path");
const multer = require("multer");

// multer 디스크저장 옵션 설정
const storage = multer.diskStorage({
  // 파일이 저장될 위치 지정
  destination: function(req, file, callback) {
    callback(null, "upload/");
  },
  // 저장될 파일명 지정
  filename: function(req, file, callback) {
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    callback(null, basename + "_" + Date.now() + extension);
  }
});

const upload = multer({ storage: storage }); // 디스크저장 옵션 전달

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// 업로드 처리
app.post("/upload", upload.single("photo"), function(req, res) {
  console.log(req.file);
  res.send("업로드 성공");
});

app.listen(3000, () => console.log("server is running..."));

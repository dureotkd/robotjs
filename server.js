const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const morgan = require("morgan");
const cron = require("node-cron");
const http = require("http");
const server = http.createServer(app);

const socketIo = require("socket.io");

// Type "Hello World" then press enter.
// const robot = require("robotjs");

app.use(morgan("dev"));

server.listen(4000, () => {
  console.log("server start");
});

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const work_people = {};

io.on("connection", (socket) => {
  // console.log("hello..");

  const socket_id = socket.id;

  socket.on("add_work_people", async (login_user_no) => {
    work_people[socket_id] = login_user_no;

    const real_work_people = [];

    if (Object.values(work_people).length > 0) {
      Object.values(work_people).forEach((user_no) => {
        if (!real_work_people.includes(user_no)) {
          real_work_people.push(user_no);
        }
      });
    }

    io.emit("add_work_people", real_work_people.length);
  });

  socket.on("zzzz", () => {
    console.log("zzzz 로옴");
  });

  socket.on("disconnect", () => {
    delete work_people[socket_id];
    io.emit("add_work_people", Object.keys(work_people).length);
  });
});

app.get("/aa", (req, res) => {
  res.send("?");
});

app.get("/", async (req, res) => {
  const html = await getHtml(
    "https://www.gwanak.go.kr/site/gwanak/ex/gwanakG2bInfo/gwanakG2bInfoList.do"
  );

  const $ = cheerio.load(html.data);
  const $board_list = $(".board-list");
  const $table_data_all = $board_list.find(".list > tbody > tr");

  const attend_company_list = [];

  $table_data_all.each((i, ele) => {
    const $td = $(ele).children("td");
    const number = $td.eq(0).text();
    const part_name = $td.eq(1).text();
    const company_name = $td.eq(2).text();
    const ceo_name = $td.eq(3).text();
    const address = $td.eq(4).text();
    const phone = $td.eq(5).text();

    attend_company_list.push({
      number: number,
      part_name: part_name,
      company_name: company_name,
      ceo_name: ceo_name,
      address: address,
      phone: phone,
    });
  });

  console.log(attend_company_list);

  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  res.end($board_list.html(), "utf-8");
});

const getHtml = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

const Tesseract = require("tesseract.js");

const mysql = require("mysql2");
const db = mysql.createPoolCluster();

db.add("test", {
  // host: "3.39.101.222",
  // user: "root",
  // password: "@!Slsksh56539944!@",
  // database: "test",
  // port: 3306,
});

const robot = require("robotjs");
const Inko = require("inko");
const inko = new Inko();

app.get("/robot", async (req, res) => {
  // Speed up the mouse.

  console.log("zasfasz");

  await 기다려(2000);

  console.log("zzz");

  // robot.mouseClick();

  // await 기다려(1000);

  // robot.typeString("https://pann-w1.okpann.net/Admin/Main/admin_main");

  // robot.keyTap("enter");

  // await 기다려(3000);

  console.log("키보드 제어 시작");

  /** */

  // var size = 100;
  // var img = robot.screen.capture(150, 150, size, size);
  // // Support for higher density screens.
  // var multi = img.width / size;
  // // Get color at 2, 3.
  // var color = img.colorAt(2 * multi, 3 * multi);

  // console.log(color);

  // // 시장정복
  // robot.moveMouse(90, 200);

  // robot.mouseClick();

  // await 기다려(1000);

  // // 회원관리 접근
  // robot.moveMouse(90, 250);

  // robot.mouseClick();

  // const screen = robot.screen.capture(width, height);

  // console.log(screen.image);

  // for (let i = 0; i < 100; i++) {
  //   robot.moveMouse(i, 200);
  // }

  // robot.moveMouse(50, 86);

  // robot.typeString("ㅁㅁ");

  // robot.setMouseDelay(2);
  // var twoPI = Math.PI * 2.0;

  // for (var x = 0; x < width; x++) {
  //   y = height * Math.sin((twoPI * x) / width) + height;
  //   robot.moveMouse(x, y);
  // }

  res.send("zz");
});

// cron.schedule("* * * * * *", async () => {
//   // Tesseract.recognize(
//   //   "https://cdn.imweb.me/upload/S202108256a4e268fdfbb6/9c79491c24f8f.png",
//   //   "kor"
//   //   // { logger: (m) => console.log(m) }
//   // ).then(({ data: { text } }) => {
//   //   // console.log(text);
//   // });

//   console.log("?");

//   // await excute({
//   //   sql: "INSERT INTO tt(count) VALUES (1)",
//   //   type: "exec",
//   // });

//   // console.log(a);
// });

/**
 * 위에 * 표시 5개가 작업이 반복적으로 실행될 시점을 의미한다.
순서대로, second(초), minute(분), hour(시), day-of-month(날짜), month(월), day-of-week(요일)을 의미한다.
 */
cron.schedule("1,2,3,4,5,9 * * * *", async () => {
  // const html = await getHtml(
  //   "https://www.gwanak.go.kr/site/gwanak/ex/gwanakG2bInfo/gwanakG2bInfoList.do"
  // );
  // const $ = cheerio.load(html.data);
  // const $board_list = $(".board-list");
  // const $table_data_all = $board_list.find(".list > tbody > tr");
  // const attend_company_list = [];
  // $table_data_all.each((i, ele) => {
  //   const $td = $(ele).children("td");
  //   const number = $td.eq(0).text();
  //   const part_name = $td.eq(1).text();
  //   const company_name = $td.eq(2).text();
  //   const ceo_name = $td.eq(3).text();
  //   const address = $td.eq(4).text();
  //   const phone = $td.eq(5).text();
  //   attend_company_list.push({
  //     number: number,
  //     part_name: part_name,
  //     company_name: company_name,
  //     ceo_name: ceo_name,
  //     address: address,
  //     phone: phone,
  //   });
  // });
  // console.log(attend_company_list);
  // console.log()
});

const 기다려 = (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, sec);
  });
};

function excute({ sql, type }) {
  return new Promise(function (resolve, reject) {
    db.getConnection("test", function (err, connection) {
      if (err) {
        console.log(JSON.stringify(err));
      } else {
        connection.query(sql, function (err, data, option) {
          if (err) {
            console.log("DB 쿼리 오류", err);
            reject(true);
            return;
          }

          switch (type) {
            case "all":
              resolve(data);

              break;
            case "row":
              if (data) resolve(data[0]);
              else reject(new Error("empty"));

              break;

            case "exec":
              resolve(data.insertId);

              break;

            default:
              reject(true);

              break;
          }

          // When done with the connection, release it.
          connection.release();
        });
      }
    });
  });
}

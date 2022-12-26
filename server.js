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

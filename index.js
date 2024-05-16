const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const expressHbs = require("express-handlebars");
const { createPagination } = require("express-handlebars-paginate");
const { escape } = require("sequelize/lib/sql-string");

app.use(express.static(__dirname + "/html"));
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      createPagination,
      formatDate: (date) => {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      showIndex: (index) => index + 1,
    },
  })
);
app.set("view engine", "hbs");

// app.get('/createTables', (req, res) => {
//     let models = require('./models')
//     models.sequelize.sync().then(() => {
//         console.log("table created!");
//     })
// })
// Cấu hình để đọc dữ liệu gửi lên theo phương thức POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// -> Tìm hiểu xem lúc nào false, lúc nào true

app.get("/", (req, res) => res.redirect("/users"));
app.use("/users", require("./routes/userRouter"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

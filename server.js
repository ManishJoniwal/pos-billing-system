const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dot en configuration
dotenv.config();
//DB connection
connectDb();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
// URL => http://localhost:8080
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/salon", require("./routes/salonRoute"));
app.use("/api/customer", require("./routes/customerRoute"));
app.use("/api/employee", require("./routes/employeeRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/service", require("./routes/serviceRoute"));
app.use("/api/invoice", require("./routes/invoiceRoute"));
// Home route
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/export", require("./routes/exportRoute"));
app.use("/api/insights", require("./routes/insightsRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.get("/",(req,res)=>{
  res.send(("welcome to salon mananagement system API"));
})

//PORT
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

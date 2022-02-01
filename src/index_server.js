const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
/* const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes"); */

//environment variable http setup
env.config();

// mongodb connection with log
//mongodb+srv://Mark_T:<password>@cluster0-node-and-expre.nwvxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-node-and-expre.nwvxj.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
      
    }
  )
  .then(() => {
    console.log("Database connected");
  });


app.use(cors());  //avoid cors error
app.use(express.json());  //ParseJSON responses and requests
app.use("/public", express.static(path.join(__dirname, "uploads")));

//API Routes
app.use("/api", authRoutes);  //user auth routes
app.use("/api", adminRoutes); // admin auth routes
app.use("/api", categoryRoutes); 
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
/* app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute); */

//listen on chosen port with log
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

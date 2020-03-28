/*
 *  Title: app.js
 *  Author: Professor Cristy Cross
 *  Modified by: Wendy Portillo
 *  Date: 12 March 2020
 *  Description: The app file for the nodebucket application.
 */
 
 
 /** Require statements
 */
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Employee = require("./models/employee");
const { v4: uuidv4 } = require("uuid");

/**
 * App configurations
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

/**
 * Variables
 */
const port = 3000; // server port

/************************* Mongoose connection strings go below this line  ***************/
// TODO: This line will need to be replaced with your actual database connection string
const conn =
  "mongodb+srv://dearwendy714:87Myvonne@cluster0-zwnbo.mongodb.net/test?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 * API(s) **** TASK CRUD OPS ****
 */

//find employee by id
app.get("/api/employees/:empId", function(req, res, next) {
  Employee.findOne({ 'employeeId': req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);
      res.json(employee);
    }
  });
});

//findAllTask by API
// API used to retrieved all tasks from the database for a single employee
app.get("/api/employees/:empId/tasks", function(req, res, next) {
  // Retrieve all of the documents from the mongoDB database
  Employee.findOne({ 'employeeId': req.params.empId }, 'employeeId todo done', function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);
      res.json(employee);
      
    }
  });
}); 

//CreateTask by API
// API used to create new task for single employee
app.post("/api/employees/:empId/tasks", function(req, res, next) {
  // Retrieve all of the documents from the mongoDB database
  Employee.findOne({ 'employeeId': req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      const item = {
        taskId: uuidv4(),
        text: req.body.text
      };

      employee.todo.push(item);
      employee.save(function(err, employee) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(employee);
          res.json(employee);
        }

      })
    }
  })
}); 

//UpdateTask  API
// API used to create new task for single employee
app.put("/api/employees/:empId/tasks", function(req, res, next) {
  // Retrieve all of the documents from the mongoDB database
  Employee.findOne({ 'employeeId': req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

employee.set({
  todo: req.body.todo,
  done: req.body.done
});

      employee.save(function(err, employee) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(employee);
          res.json(employee);
        }

      })
    }
  })
}); 

//DeleteTask  API
// API used to delete task for single employee
app.delete("/api/employees/:empId/tasks/:taskId", function(req, res, next) {
  Employee.findOne({ employeeId: req.params.empId }, function(err, employee) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      const todoItem = employee.todo.find(
        item => item.taskId === req.params.taskId
      );
      const doneItem = employee.done.find(
        item => item.taskId === req.params.taskId
      );

      if (todoItem) {
        employee.update(
          { $pull: { todo: { taskId: todoItem.taskId } } },
          { safe: true },
          function removeConnectionsCB(err, obj) {
            employee.save(function(err, emp1) {
              if (err) {
                console.log(err);
                return next(err);
              } else {
                res.json(emp1);
              }
            });
          }
        );
      } else if (doneItem) {
        employee.update(
          { $pull: { done: { taskId: doneItem.taskId } } },
          { safe: true },
          function removeConnectionsCB(err, obj) {
            employee.save(function(err, emp1) {
              if (err) {
                console.log(err);
                return next(err);
              } else {
                res.json(emp1);
              }
            });
          }
        );
      } else {
        console.log(`unable to locate task: ${req.params.taskId}`);
        res.status(200).send({
          type: "warning",
          text: `unable to locate task: ${req.params.taskId}`
        });
      }
    }
  });
});


//add an employee
app.post("/api/addemployee", (req, res) => {
  const employee = new Employee({
    employeeId: req.body.employeeId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    roles: req.body.roles,
    tasks: req.body.tasks
  });

  employee
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

//get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employee = await Employee.find();
    res.json(employee);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function

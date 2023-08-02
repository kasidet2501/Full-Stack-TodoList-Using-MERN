const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
.catch(console.error);


const Todo = require('./models/Todo.js');

app.get('/todos', async(req,res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new', async(req,res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
})
app.delete('/todo/delete/:id',async(req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

// เมื่อกดที่ todo แต่ละ list จะมีเส้นมาขีดฆ่าว่าทำแล้ว
// โดยเช็คจากค่า complete ที่เรากำหนดเป็นค่าเริ่มต้นเป็น flase เมื่อกดแล้วจะให้ค่ามันกลับกัน
// จาก true เป็น flase จาก false เป็น true
app.get('/todo/complete/:id',async(req,res) => {
    const todo = await Todo.findById(req.params.id);

    // จาก true เป็น flase หรือ จาก false เป็น true
    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);

})

app.listen(3001, ()=> console.log('Server started on port 3001'));
var express = require('express');
const { use } = require('.');
var router = express.Router();
var responseData = require('../helper/responseData');

const students = [
  { id: 1, name: "Tung", diemTB: 8 },
  { id: 2, name: "Toan", diemTB: 9  },
  { id: 3, name: "Tien" , diemTB: 10 }
];

//domain:port/students
/* GET students listing. */
router.get('/', function (req, res, next) {
  responseData.responseReturn(res, 200, true, students);
});
router.get('/:id', function (req, res, next) {// get by ID
  var student = students.find(student => student.id == req.params.id);
  if (student) {
    responseData.responseReturn(res, 200, true, students);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay student");
  }
});
router.post('/add', function (req, res, next) {
  var student = students.find(student => student.id == req.body.id);
  if(student){
    responseData.responseReturn(res, 404, false, "student da ton tai");
  }else{
    const newUser = {
      id: req.body.id,
      name: req.body.name,
      diemTB: req.body.diemTB,
    }
    students.push(newUser);
    responseData.responseReturn(res, 200, true, newUser);
  }
});
router.put('/edit/:id', function (req, res, next) {
  var student = students.find(student => student.id == req.params.id);
  if (student.id == req.params.id) {
    student.name = req.body.name;
    responseData.responseReturn(res, 200, true, student);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay student");
  }
});
router.delete('/delete/:id', function (req, res, next) {//delete by Id
  var ids = students.map(student=>student.id);
  var index = ids.indexOf(parseInt(req.params.id));
  console.log(index);
  //var index  = users.indexOf(user);
  if (index>-1) {
    students.splice(index,1);
    responseData.responseReturn(res, 200, true, students);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay student");
  }
});

module.exports = router;

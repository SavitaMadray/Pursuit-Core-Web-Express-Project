const Class = require("./Class");
const Student = require("./Student");

class School {
  constructor() {
    this.classes = {
      // className: Class Object
      //   physics: {}
    };
  }

  /**
   * Add class to classes
   *
   * @param {string} name - Name of the class
   * @param {string} teacher - Name of instructor
   * @return {Class} Class object
   */
  addClass(name, teacher) {
    if(name in this.classes){
      throw new Error('Please fill out all the information or Class already exists')
    }
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
    return this.classes[name]
  }
  /**
   * Enroll student in class
   *
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, student) {
    return this.classes[className].students.push(student);
  }

  /**
   * Get all students enrolled in a class
   *
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.classes[className].students;
  }

  /**
   * Get all students and apply filters. If failing = true
   * return all students that are failing the class,
   * that is all students whose grade is less than 70.
   * If a city is passed return students whose city match
   * the city passed. If both failing and city are passed
   * return students that are failing and that live in the
   * specified city
   *
   * @param {string} className - Name of the class
   * @param {boolean} failing - Whether to return students that are failing the class or not
   * @param {string} city - Name of the city to match against students
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClassWithFilter(className, failing, city) {
    let allStudentsFromClass = this.getStudentsByClass(className);
    if (failing === false) {
      if (city === undefined) {
        return allStudentsFromClass;
      }
      return allStudentsFromClass.filter(student => student.city === city);
    }
    let failingStudents = [];
    for (let i = 0; i < allStudentsFromClass.length; i++) {
      if (allStudentsFromClass[i].grade < 70) {
        failingStudents.push(allStudentsFromClass[i]);
      }
    }
    if (city === undefined) {
      return failingStudents;
    }
    return failingStudents.filter(student => student.city === city);
  }
}

module.exports = School;

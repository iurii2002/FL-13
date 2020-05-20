// Your code goes here

function Student(name, email) {
    let studentName = name;
    let studentEmail = email;
    let homeworkResults = [];
    this.getName = () => {
        return(studentName)
    };
    this.getEmail = () => {
        return(studentEmail)
    };
    this.addHomeworkResult = (topic, success) => {
        let currentResult = {'topic': topic, 'success': success};
        homeworkResults.push(currentResult);
    };
    this.getHomeworkResult = () => {
        return homeworkResults.length ? homeworkResults : "no homework results";
    };
};

function FrontendLab (students, failedLimit) {
    let failedHomeworksLimit = failedLimit;  
    let studentList = []; 
    for (let {name, email} of students) {
        studentList.push(new Student(name, email))
    }

    this.printStudentsList = () => {
        for (let student of studentList) {          
            console.log('name: ' + student.getName() + ',', 'email: ' + student.getEmail());
            console.log(student.getHomeworkResult());
        };
    };
    this.addHomeworkResults = (homeworkResults) => {
        if (!homeworkResults.length) {
            let topic = homeworkResults.topic;
            for (let student of studentList) {
                let success;
                for (let studentResult of homeworkResults.results) {
                    if (studentResult.email === student.getEmail()) {
                        success = studentResult.success;
                    }
                };
                student.addHomeworkResult(topic, success);
            };            
        } else {
            for (let student of studentList) {
                for (let homeworkResult of homeworkResults) {
                    let topic = homeworkResult.topic;
                    let success;
                    for (let studentResult of homeworkResult.results) {
                        if (studentResult.email === student.getEmail()) {
                            success = studentResult.success;
                        }
                    };
                    student.addHomeworkResult(topic, success);
                };
            };
        }
    };
    this.printStudentsEligibleForTest = () => {
        for (let student of studentList) {
            let totalFails = student.getHomeworkResult().reduce((accum, result) => !result.success  ? accum +=1 : accum, 0);
            if (totalFails <= failedHomeworksLimit) {
                console.log('name: ' + student.getName() + ',', 'email: ' + student.getEmail()) 
            };
        };
    };
};


(function () {
    var students = [{"gender":"Male","firstName":"Joe","lastName":"Riley","age":22,"country":"Russia"},
        {"gender":"Female","firstName":"Lois","lastName":"Morgan","age":41,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Roy","lastName":"Wood","age":33,"country":"Russia"},
        {"gender":"Female","firstName":"Diana","lastName":"Freeman","age":40,"country":"Argentina"},
        {"gender":"Female","firstName":"Bonnie","lastName":"Hunter","age":23,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Joe","lastName":"Young","age":16,"country":"Bulgaria"},
        {"gender":"Female","firstName":"Kathryn","lastName":"Murray","age":22,"country":"Indonesia"},
        {"gender":"Male","firstName":"Dennis","lastName":"Woods","age":37,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Billy","lastName":"Patterson","age":24,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Willie","lastName":"Gray","age":42,"country":"China"},
        {"gender":"Male","firstName":"Justin","lastName":"Lawson","age":38,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Ryan","lastName":"Foster","age":24,"country":"Indonesia"},
        {"gender":"Male","firstName":"Eugene","lastName":"Morris","age":37,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Eugene","lastName":"Rivera","age":45,"country":"Philippines"},
        {"gender":"Female","firstName":"Kathleen","lastName":"Hunter","age":28,"country":"Bulgaria"}];

    // Get all students with age between 18 and 24:
    function ageFilter (student) {
        return student.age >= 18 && student.age <= 24;
    }

    var filteredStudentsByAge = _.filter(students, ageFilter);
    console.info('Students with age between 18 and 24:');
    filteredStudentsByAge.forEach(function (student) {
        console.log(student.firstName + ' ' + student.lastName + ', age: ' + student.age);
    });

    // Get all students whose first name is alphabetically before their last name:
    function nameFilter (student) {
        return student.firstName < student.lastName;
    }

    var filteredStudentsByName = _.filter(students, nameFilter);
    console.info('Students whose first name is alphabetically before their last name:');
    filteredStudentsByName.forEach(function (student) {
        console.log(student.firstName + ' ' + student.lastName);
    });

    // Get only the names of all students from Bulgaria:
    function countryFilter (student) {
        return student.country == 'Bulgaria';
    }

    var filteredStudentsByCountry = _.map(
        _.where(students, {country: 'Bulgaria'}), function (student) {
            return student.firstName + ' ' + student.lastName;
        });
    console.info('Get only the names of all students from Bulgaria:');
    filteredStudentsByCountry.forEach(function (student) {
        console.log(student);
    })

    // Get the last five students:
    var lastFiveStudents = _.slice(students, students.length - 5, students.length);
    console.info('Get the last five students:');
    lastFiveStudents.forEach(function (student) {
        console.log(student.firstName + ' ' + student.lastName);
    });

// Get the first three students who are not from Bulgaria and are male:
    function countryAndGenderFilter (student) {
        return student.country != 'Bulgaria' && student.gender == 'Male';
    }

    var filteredStudentsByCountryAndGender = _.slice(_.filter(students, countryAndGenderFilter), 0, 3);
    console.info('Get the first three students who are not from Bulgaria and are male:');
    filteredStudentsByCountryAndGender.forEach(function (student) {
        console.log(
            student.firstName + ' ' +
            student.lastName +
            ', gender: ' + student.gender +
            ', country: ' + student.country);
    })
}());

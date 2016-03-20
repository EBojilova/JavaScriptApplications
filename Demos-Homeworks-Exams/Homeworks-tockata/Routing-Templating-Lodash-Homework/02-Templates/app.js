(function () {
    var persons = {
        'persons': [
            {
                'name': 'Pesho Peshev',
                'jobTitle': 'Google apps Developer',
                'website': 'www.google.bg'
            },
            {
                'name': 'Misho Mishev',
                'jobTitle': 'Dir.bg advertiser',
                'website': 'www.dir.bg'
            },
            {
                'name': 'Rosi Ivanova',
                'jobTitle': 'Hard worker',
                'website': 'www.jobs.bg'
            }
        ]
    };

    $.get('template.html', function (template) {
        var output = Mustache.render(template, persons);
        $('#wrapper').html(output);
    })
}());

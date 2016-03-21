var app = app || {};

app.lectureViews = (function () {
    function getLectureInfoFromInputValues() {
        //<input type="text" id="title" placeholder="Lecture title..."/>
        //<input type="text" id="start" placeholder="2016-01-19T12:00:00">
        //<input type="text" id="end" placeholder="2016-01-20T18:00:00">
        var title = $('#title').val(),
            start = $('#start').val(),
            end = $('#end').val();

        //"title":"lectureTitle",
        //"start":"lectureStartDateTime",
        //"end":"lectureEndDateTime",
        //"lecturer":"username"
        var result = {
            title: title,
            start: start,
            end: end,
            lecturer: sessionStorage['username']
        };
        return result;
    }


    //    <button id="addLecture" class="button">Add</button>
    function showAddLecture(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector)
                .html(templ);
            $('#addLecture')
                .on('click', function () {
                    var data = getLectureInfoFromInputValues();
                    //{"title":"lectureTitle", "start":"lectureStartDateTime", "end":"lectureEndDateTime", "lecturer":"username"}
                    $.sammy(function () {
                        this.trigger('add-lecture', data)
                    })
                });
        })
    }

    function showLectures(selector, data) {
        $.get('templates/menu-home.html', function (templ) {
            $('#menu').html(templ);
        })
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector)
                .html(rendered);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            //TODO: redirect to add event page
                            $.sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function () {
                            //TODO: redirect to edit event page
                            //var foundLecture = findLecture.call(this, data);
                            $.sammy(function () {
                                this.trigger('show-edit-lecture', calEvent)
                            })
                        });
                        $('#deleteLecture').on('click', function () {
                            //TODO: redirect to delete event page
                            $.sammy(function () {
                                //var foundLecture = findLecture.call(this, data);
                                this.trigger('show-delete-lecture', calEvent)
                            });
                        })
                    });
                    $('#events-modal').modal();
                }
            });
        });

    }


    function showEditLecture(selector, data) {
        $.sammy(function () {
            this.trigger('redirectUrl', {url: '#/calendar/edit/'+data._id});
        });
        $.get('templates/edit-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector)
                .html(rendered);
            $('#editLecture').on('click', function () {
                // tai kato sme promenili poletata,ste triabva da vi vzemem otnovo
                var lectureUpdate = getLectureInfoFromInputValues();
                lectureUpdate['_id'] = data._id;
                $.sammy(function () {
                    this.trigger('edit-lecture', lectureUpdate)
                })
            });
        })
    }

    function showDeleteLecture(selector, data) {
        $.sammy(function () {
            this.trigger('redirectUrl', {url: '#/calendar/delete/'+data._id});
        });
        $.get('templates/delete-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#deleteLecture').on('click', function () {
                $.sammy(function () {
                    this.trigger('delete-lecture', data._id)
                })
            });
        })
    }

    return {
        load: function () {
            return {
                showLectures: showLectures,
                showAddLecture: showAddLecture,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
}());

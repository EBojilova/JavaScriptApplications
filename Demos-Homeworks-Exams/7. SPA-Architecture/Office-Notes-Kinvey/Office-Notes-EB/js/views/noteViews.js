var app = app || {};

app.noteViews = (function () {
    function getNoteInfoFromInputValues() {
        //TODO: leave it only for input
        var title = $('#title').val(),
            text = $('#text').val(),
            deadline = $('#deadline').val();

        var result = {
            title: title,
            text: text,
            author: sessionStorage['username'],
            deadline: deadline
        };
        return result;
    }

    function findNote(data) {
        var parent = $(this).parent();
        var noteId = parent.attr('data-id');
        var foundNote = data.notes.filter(function (note) {
            return note._id == noteId;
        })[0];
        return foundNote;
    }

    function showAddNote(selector) {
        $.get('templates/addNote.html', function (templ) {
            $(selector)
                .html(templ);
            $('#addNoteButton')
                .on('click', function () {
                    var data = getNoteInfoFromInputValues();
                    //{"title":"Tests", "text":"Make tests", "author":"Pesho", "deadline":"01/05/2015", ACL":{…}}
                    $.sammy(function () {
                        this.trigger('add-note', data)
                    })
                });
        })
    }

    function showNotes(selector, data) {
        $.get('templates/officeNoteTemplate.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector)
                .html(rendered);
        });
    }

    function showMyNotes(selector, data) {
        $.get('templates/myNoteTemplate.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            // ste ima mnogo edit i delete buttons
            $('.edit').click(function () {
                var foundNote = findNote.call(this, data);
                $.sammy(function () {
                    this.trigger('show-edit-note', foundNote)
                })
            });
            $('.delete').click(function () {
                var foundNote = findNote.call(this, data);
                $.sammy(function () {
                    this.trigger('show-delete-note', foundNote)
                });
            });
        })
    }

    function showEditNote(selector, data) {
        $.get('templates/editNote.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector)
                .html(rendered);
            $('#editNoteButton').on('click', function () {
                // tai kato sme promenili poletata,ste triabva da vi vzemem otnovo
                var noteUpdate = getNoteInfoFromInputValues();
                noteUpdate['_id'] = data._id;
                $.sammy(function () {
                    this.trigger('edit-note', noteUpdate)
                })
            });
        })
    }

    function showDeleteNote(selector, data) {
        $.get('templates/deleteNote.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#deleteNoteButton').on('click', function () {
                $.sammy(function () {
                    this.trigger('delete-note', data._id)
                })
            });
        })
    }

    return {
        load: function () {
            return {
                showNotes: showNotes,
                showMyNotes: showMyNotes,
                showAddNote: showAddNote,
                showEditNote: showEditNote,
                showDeleteNote: showDeleteNote
            }
        }
    }
}());
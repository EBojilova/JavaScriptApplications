var app = app || {};

app.note = (function () {
    function Note(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Note';
        this.requester = requester;
        this.headers = headers;
    }

    Note.prototype.getAllNotesWithDeadline = function getAllNotesWithDeadline() {
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        var dateString = year + '-' + month + '-' + day,
            url = this.serviceUrl + '?where={"deadline":"' + dateString + '"}';
        return this.requester.get(url, this.headers.getHeaders(true));
    };

    Note.prototype.getCurrentUserNotes = function getCurrentUserNotes(author) {
        var url = this.serviceUrl + '?where={"author":"' + author + '"}';
        return this.requester.get(url, this.headers.getHeaders(true));
    };

    Note.prototype.addNote = function addNote(title, text, author, deadline, userId) {
        var data = {
            title: title,
            text: text,
            author: author,
            deadline: deadline,
            ACL: {}
        };

        data.ACL[userId] = {"write":true,"read": true};
        data.ACL["*"] = {"read": true};

        return this.requester.post(this.serviceUrl, this.headers.getHeaders(true), data);
    };

    Note.prototype.editNote = function editNote(title, text, deadline, noteId) {
        var url = this.serviceUrl + '/' + noteId,
            data = {
                title: title,
                text: text,
                deadline: deadline
            };

        return this.requester.put(url, this.headers.getHeaders(true), data);
    };

    Note.prototype.deleteNote = function deleteNote(noteId) {
        var url = this.serviceUrl + '/' + noteId;
        return this.requester.delete(url, this.headers.getHeaders(true));
    };

    Note.prototype.getNoteById = function getNoteById(noteId) {
        var url = this.serviceUrl + '/' + noteId;
        return this.requester.get(url, this.headers.getHeaders(true));
    };

    return {
        load: function (baseUrl, requester, headers) {
            return new Note(baseUrl, requester, headers);
        }
    }
}());

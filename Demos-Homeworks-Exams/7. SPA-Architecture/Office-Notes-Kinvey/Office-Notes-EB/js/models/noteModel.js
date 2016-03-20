var app = app || {};

app.noteModel = (function () {
    function NoteModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/notes/';
    }

    NoteModel.prototype.getNotesForToday = function (deadline) {
        //http://devcenter.kinvey.com/rest/guides/datastore#operators
        var requestUrl = this.serviceUrl + '?query={"deadline":"' + deadline + '"}';
        return this.requester.get(requestUrl, true);
    };

    // //{"title":"Tests", "text":"Make tests", "author":"Pesho", "deadline":"01/05/2015", "_acl":{"creator":…}}
    NoteModel.prototype.getNotesByUserId = function (userId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + userId + '"}';
        return this.requester.get(requestUrl, true);
    };

    NoteModel.prototype.addNote = function (data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    //{ _id: parentId,title: title, text: text, author: sessionStorage['username'], deadline: deadline}
    NoteModel.prototype.editNote = function (data) {
        //http://devcenter.kinvey.com/rest/guides/datastore#Saving
        var requestUrl = this.serviceUrl + data._id;
        // TODO:check if we can set up again _id, if not should make inputBindingModel
        return this.requester.put(requestUrl, data, true);
    };

    NoteModel.prototype.deleteNote = function (noteId) {
        var requestUrl = this.serviceUrl + noteId;
        return this.requester.delete(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new NoteModel(requester);
        }
    }
}());


var app = app || {};

app.lectureModel = (function () {
    function LectureModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/lectures/';
    }

    LectureModel.prototype.getLectures = function () {
        //http://devcenter.kinvey.com/rest/guides/datastore#operators
        var requestUrl = this.serviceUrl;
        return this.requester.get(requestUrl, true);
    };

    LectureModel.prototype.getLecturesByUserId = function (userId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + userId + '"}';
        return this.requester.get(requestUrl, true);
    };

    LectureModel.prototype.addLecture = function (data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    LectureModel.prototype.editLecture = function (data) {
        //http://devcenter.kinvey.com/rest/guides/datastore#Saving
        var requestUrl = this.serviceUrl + data._id;
        // TODO:check if we can set up again _id, if not should make inputBindingModel
        return this.requester.put(requestUrl, data, true);
    };

    LectureModel.prototype.deleteLecture = function (lectureId) {
        console.log(lectureId);
        var requestUrl = this.serviceUrl + lectureId;
        return this.requester.delete(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new LectureModel(requester);
        }
    }
}());


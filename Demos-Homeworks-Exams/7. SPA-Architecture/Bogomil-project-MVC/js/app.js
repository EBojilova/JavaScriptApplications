var app = app || {};

(function () {
    app.router = $.sammy(function () {
        var requester = app.requester.config('kid_WkwKuJux1W', 'f134ec18f7454dd48469b4f5aade49be');
        var selector = '#wrapper';

        var userModel = app.userModel.load(requester);
        var questionModel = app.questionModel.load(requester);
        var answerModel = app.answerModel.load(requester);

        var userViewBag = app.userViews.load();
        var questionViewBag = app.questionViews.load();
        var answerViewBag = app.answerViews.load();
        var homeViewBag =app.homeViews.load();

        var userController = app.userController.load(userModel, userViewBag);
        var questionController = app.questionController.load(questionModel, questionViewBag);
        var answerController = app.answerController.load(answerModel, answerViewBag);
        var homeController = app.homeController.load(homeViewBag);


        this.before({except: {path: '#\/(register|login)?'}}, function () {
            var sessionId = sessionStorage['sessionAuth'];
            if (!sessionId) {
                this.redirect('#/login');
                return false;
            } else {
                this.redirect('#/questions');
            }
        });

        this.get('#/', function () {
            homeController.loadHomePage(selector);
        });

        this.get('#/login', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/questions', function () {
            questionController.getAllQuestions(selector);
        });

        this.get('#/logout', function () {
            var _this = this;
            userController.logout()
                .then(function() {
                    _this.redirect('#/');
                })
        });

        //eventa e sazdaden v userControler, sled login, direktno otivame v questions
        // datata, koiato podavame e {url:'#/questions'}
        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        // tuka bindvame custom eventite, za da izbegnem Dependecy Injection na controlerite s viewtata

        // bind s userView, podavame {username: username, password: password}
        this.bind('login', function(e, data) {
            userController.login(data)
        });

        this.bind('get-answers', function (e, data) {
            answerController.getAllAnswersByQuestionId(data);
        });

        this.bind('add-answer', function (e, data) {
            answerController.addAnswer(data);
        });
    });

    app.router.run('#/');
}());


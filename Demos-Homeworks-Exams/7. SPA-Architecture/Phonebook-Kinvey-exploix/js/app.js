var app = app || {};

(function () {
    var appKey = 'kid_-yAfaxcO1b';
    var baseUrl = 'https://baas.kinvey.com/';


    var headers = app.headers.load(appKey);
    var requester = app.requester.load();
    var userModel = app.userModel.load(baseUrl, appKey, requester, headers);
    var phoneModel = app.phoneModel.load(baseUrl, appKey, requester, headers);

    var homeViews = app.homeViews.load();
    var userViews = app.userViews.load();
    var phoneViews = app.phoneViews.load();

    var userController = app.userController.load(userModel, userViews);
    var phoneController = app.phoneController.load(phoneModel, phoneViews);
    var homeController = app.homeController.load(homeViews);



    var router = Sammy(function () {
        var selector = '#wrapper';

        this.before(function () {
            var userId = sessionStorage.getItem('userId');
            if (userId) {
                $('#menu').show();
            } else {
                $('#menu').hide();
            }
        });

        this.before('#/', function () {
            var userId = sessionStorage.getItem('userId');
            if(userId){
                this.redirect('#/home');
                //Returns false to not execute the get('#/home/') route below
                return false;
            }
        });

        this.before('#/home/', function () {
            var userId = sessionStorage.getItem('userId');
            if(!userId){
                this.redirect('#/');
                //Returns false to not execute the get('#/home/') route below
                return false;
            }
        });

        this.before('#/phones/(.*)', function () {
            var userId = sessionStorage.getItem('userId');
            if(!userId){
                this.redirect('#/');
                //Returns false to not execute the get('#/home/') route below
                return false;
            }
        });

        this.before('#/profile/(.*)', function () {
            var userId = sessionStorage.getItem('userId');
            if(!userId){
                this.redirect('#/');
                //Returns false to not execute the get('#/home/') route below
                return false;
            }
        });

        this.before('#/logout/', function () {
            var userId = sessionStorage.getItem('userId');
            if(!userId){
                this.redirect('#/');
                //Returns false to not execute the get('#/home/') route below
                return false;
            }
        });

        this.get('#/', function () {
            homeController.welcomeScreen(selector);
        });

        this.get('#/home/', function () {
            homeController.homeScreen(selector);
        });

        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });

        this.get('#/phones/', function () {
            phoneController.listAllPhones(selector);
        });

        this.get('#/phones/add/', function () {
            phoneController.loadAddPhoneView(selector);
        });

        this.get('#/phones/edit/(.*)', function () {
            phoneController.loadPhoneView(selector, this.params['splat'][0], 'edit');
        });

        this.get('#/phones/delete/:id', function () {
            phoneController.loadPhoneView(selector, this.params['id'], 'delete')
        });

        this.get('#/profile/edit/', function(){
            userController.loadEditProfilePage(selector);
        });
    });

    router.run('#/');

    //function showAjaxError(msg, error) {
    //    var errMsg = error.responseJSON;
    //    if (errMsg && errMsg.error) {
    //        showErrorMessage(msg + ": " + errMsg.error);
    //    } else {
    //        showErrorMessage(msg + ".");
    //    }
    //}


})();
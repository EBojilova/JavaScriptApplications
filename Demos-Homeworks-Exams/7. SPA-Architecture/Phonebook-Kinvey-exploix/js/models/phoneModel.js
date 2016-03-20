var app = app || {};

app.phoneModel = (function (){
    function PhoneModel(baseUrl, apiKey, requester, headers){
        this.serviceUrl = baseUrl +'appdata/' + apiKey + '/Phones/';
        this.apiKey = apiKey;
        this.requester = requester;
        this.headers = headers;
    }

    PhoneModel.prototype.listAllPhones = function listAllPhones(){

        return this.requester.get(this.serviceUrl + '?resolve=user', this.headers.getHeaders());
    };

    PhoneModel.prototype.addPhone = function addPhone(person, number){
        var data = {
            name: person,
            phoneNumber: number,
            user: {
                '_type':'KinveyRef',
                '_id': sessionStorage.getItem('userId'),
                '_collection':'user'
            }
        };

        var headers = this.headers.getHeaders();
        headers['Content-Type'] = 'application/json';
        return this.requester.post(this.serviceUrl, headers, data);
    };

    PhoneModel.prototype.deletePhone = function deletePhone(phoneId){

        return this.requester.remove(this.serviceUrl + phoneId, this.headers.getHeaders());
    };

    PhoneModel.prototype.editPhone = function editPhone(phoneId, person, number){
        var data = {
            name: person,
            phoneNumber: number,
            user: {
                '_type':'KinveyRef',
                '_id': sessionStorage.getItem('userId'),
                '_collection':'user'
            }
        };
        var headers = this.headers.getHeaders();
        headers['Content-Type'] = 'application/json';
        return this.requester.put(this.serviceUrl + phoneId, headers, data);
    };

    return {
        load: function (baseUrl, apiKey, requester, headers) {
            return new PhoneModel(baseUrl, apiKey, requester, headers);
        }
    }
})();
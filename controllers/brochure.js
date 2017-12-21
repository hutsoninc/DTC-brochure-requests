
exports.create = function(request, response){

    console.log(request.body);

    response.status(200);
    response.send();
};
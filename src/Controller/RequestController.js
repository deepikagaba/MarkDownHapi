var parser = require('node-markdown');
var Boom = require('boom');

function RequestController() {};
RequestController.prototype.parseMarkDownHTML = function (request, reply) {
	var htmlData = parser.Markdown(request.payload.data);
	var db = request.server.plugins['hapi-mongodb'].db;
	var dbDoc = {
		"data": htmlData
	};
	db.collection('markdownData').insert(dbDoc, function (err, result) {
		if (err) return reply(Boom.internal('Internal MongoDB error', err));
		return reply(dbDoc._id);
	});
};

RequestController.prototype.findHTMLbyId = function (request, reply) {
	var db = request.server.plugins['hapi-mongodb'].db;
	var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
	var reqid = request.query.ID;
	db.collection('markdownData').findOne({
		"_id": new ObjectID(reqid)
	}, function (err, result) {
		if (err) return reply(Boom.internal('Internal MongoDB error', err));
		if (!result) return reply(Boom.notFound('Could not find HTML for given ID'));
		return reply(result.data);
	})
};
module.exports = RequestController;
'use strict';
var Joi = require('joi');
var RequestController = require('../Controller/RequestController');
var requestController = new RequestController();

module.exports = [{
	method: 'POST',
	path: '/markdown/save',
	config: {
		handler: requestController.parseMarkDownHTML,
		validate: {
			payload: {
				data: Joi.string().required()
			}
		}
	}
}, {
	method: 'GET',
	path: '/markdown/get',
	config: {
		handler: requestController.findHTMLbyId,
		validate: {
			query: {
				ID: Joi.string().required()
			}
		}
	}
}];
'use strict';

const Joi = require('joi');
const APIError = require('APIError');
const debug = require('debug')('service:validation');

// Schéma des données attendues au formulaire d'inscription
const schemaUserInput = Joi.object({
    mail:Joi.string().email().required(),
    nickname:Joi.string().pattern(/^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/).required(),
    password:Joi.string().pattern(/^[ -~]{8,32}$/).required(),    // tous les caractères imprimables
    confirmation:Joi.string().pattern(/^[ -~]{8,32}$/).required(),    // tous les caractères imprimables
}).required();

// Schéma des données attendues au formulaire de connexion
const schemaUserLogin = Joi.object({
    nickname:Joi.string().pattern(/^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/).required(),
    password:Joi.string().pattern(/^[ -~]{8,32}$/).required(),    // tous les caractères imprimables
}).required();


/**
 * Validation des informations envoyées dans le cadre de l'inscription
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkSignUpData (req, res, next) {
    let { error } = schemaUserInput.validate(req.body);

    if(!error){
        next();
    }
    else{
        // let error = new APIError();
        // next(error);
    }
}

/**
 * Validation des informations envoyées dans le cadre de la connexion
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkLoginData (req, res, next) {
    const { error } = schemaUserLogin.validate(req.body);

    debug('req.body', req.body);
    debug('signin error', error);

    if(!error){
        next();
    }
    else{
        const error = new APIError('La syntaxe de la requête est erronée.', 400, error);

        next(error);
    }
}

module.exports = {checkSignUpData, checkLoginData};

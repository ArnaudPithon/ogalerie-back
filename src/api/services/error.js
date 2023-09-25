const { appendFile } = require('node:fs/promises');
const { join } = require('node:path');
const APIError = require('./APIError');
const debug = require('debug')('errorHandler');

const errorHandler = {
    /**
     * Méthode de gestion d'erreur
     * @param {*} err
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    async manage(err, req, res, next) {
        // j'écris dans le fichier de logs
        errorHandler.log(err);

        // si je suis en dev, j'affiche l'erreur dans le terminal
        debug(err.error);

        // j'informe l'utilisateur ou je le redirige vers une page spécifique
        switch (err.code) {
        case 401:
            debug('redirect 401');
            res.redirect('/401.html');
            break;
        case 404:
            res.redirect('/404.html');
            break;
        default:
            res.status(err.code).json({ error: err.message });
            break;
        }
    },
    /**
     * Méthode pour enregistrer les fichiers de logs
     * @param {*} err
     */
    async log(err) {
        const fileName = `${err.date.toISOString().slice(0, 10)}.log`;
        const path = join(__dirname, `../../log/${fileName}`);

        debug(path);

        /*
         * Nous allons logguer le moment où est
         * survenue l'erreur, le message de celle-ci, la
         * stacktrace ainsi que le contexte (par exemple le
         * endpoint de notre API qui a conduit à l'erreur)
         */
        const time = err.date.toISOString().slice(11, -1);
        let errorMessage;

        if (err.error) {
            errorMessage = err.error.message;
        }
        else {
            errorMessage = err.message;
        }
        const text = `${time};${errorMessage};${err.stack}\r\n`;

        await appendFile(path, text);
    },
    notFound(req, res, next) {
        const err = new APIError('Url not found !', 404);

        next(err);
    },
};

module.exports = errorHandler;

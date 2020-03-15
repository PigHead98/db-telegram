const _cookieParser = require( 'cookie-parser' );
const _createError = require( 'http-errors' );
const _express = require( 'express' );
const _logger = require( 'morgan' );
const _cors = require( 'cors' );
const _path = require( 'path' );

module.exports = {
    cookieParser : _cookieParser,
    createError : _createError,
    express : _express,
    logger : _logger,
    cors : _cors,
    path : _path
};
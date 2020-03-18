const _cookieParser = require( 'cookie-parser' );
const _createError = require( 'http-errors' );
const _express = require( 'express' );
const _logger = require( 'morgan' );
const _axios = require( 'axios' );
const _cors = require( 'cors' );
const _path = require( 'path' );
const _http = require( 'http' );
const _io = require( 'socket.io' );

module.exports = {
    cookieParser : _cookieParser,
    createError : _createError,
    express : _express,
    logger : _logger,
    axios : _axios,
    cors : _cors,
    path : _path,
    http : _http,
    io : _io,
};
/**
 * @fileoverview gRPC-Web generated client stub for viam.component.servo.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var common_v1_common_pb = require('../../../common/v1/common_pb.js')

var google_api_annotations_pb = require('../../../google/api/annotations_pb.js')

var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js')
const proto = {};
proto.viam = {};
proto.viam.component = {};
proto.viam.component.servo = {};
proto.viam.component.servo.v1 = require('./servo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.viam.component.servo.v1.ServoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.viam.component.servo.v1.ServoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.viam.component.servo.v1.MoveRequest,
 *   !proto.viam.component.servo.v1.MoveResponse>}
 */
const methodDescriptor_ServoService_Move = new grpc.web.MethodDescriptor(
  '/viam.component.servo.v1.ServoService/Move',
  grpc.web.MethodType.UNARY,
  proto.viam.component.servo.v1.MoveRequest,
  proto.viam.component.servo.v1.MoveResponse,
  /**
   * @param {!proto.viam.component.servo.v1.MoveRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.viam.component.servo.v1.MoveResponse.deserializeBinary
);


/**
 * @param {!proto.viam.component.servo.v1.MoveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.viam.component.servo.v1.MoveResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.viam.component.servo.v1.MoveResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.viam.component.servo.v1.ServoServiceClient.prototype.move =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/viam.component.servo.v1.ServoService/Move',
      request,
      metadata || {},
      methodDescriptor_ServoService_Move,
      callback);
};


/**
 * @param {!proto.viam.component.servo.v1.MoveRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.viam.component.servo.v1.MoveResponse>}
 *     Promise that resolves to the response
 */
proto.viam.component.servo.v1.ServoServicePromiseClient.prototype.move =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/viam.component.servo.v1.ServoService/Move',
      request,
      metadata || {},
      methodDescriptor_ServoService_Move);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.viam.component.servo.v1.GetPositionRequest,
 *   !proto.viam.component.servo.v1.GetPositionResponse>}
 */
const methodDescriptor_ServoService_GetPosition = new grpc.web.MethodDescriptor(
  '/viam.component.servo.v1.ServoService/GetPosition',
  grpc.web.MethodType.UNARY,
  proto.viam.component.servo.v1.GetPositionRequest,
  proto.viam.component.servo.v1.GetPositionResponse,
  /**
   * @param {!proto.viam.component.servo.v1.GetPositionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.viam.component.servo.v1.GetPositionResponse.deserializeBinary
);


/**
 * @param {!proto.viam.component.servo.v1.GetPositionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.viam.component.servo.v1.GetPositionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.viam.component.servo.v1.GetPositionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.viam.component.servo.v1.ServoServiceClient.prototype.getPosition =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/viam.component.servo.v1.ServoService/GetPosition',
      request,
      metadata || {},
      methodDescriptor_ServoService_GetPosition,
      callback);
};


/**
 * @param {!proto.viam.component.servo.v1.GetPositionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.viam.component.servo.v1.GetPositionResponse>}
 *     Promise that resolves to the response
 */
proto.viam.component.servo.v1.ServoServicePromiseClient.prototype.getPosition =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/viam.component.servo.v1.ServoService/GetPosition',
      request,
      metadata || {},
      methodDescriptor_ServoService_GetPosition);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.viam.component.servo.v1.StopRequest,
 *   !proto.viam.component.servo.v1.StopResponse>}
 */
const methodDescriptor_ServoService_Stop = new grpc.web.MethodDescriptor(
  '/viam.component.servo.v1.ServoService/Stop',
  grpc.web.MethodType.UNARY,
  proto.viam.component.servo.v1.StopRequest,
  proto.viam.component.servo.v1.StopResponse,
  /**
   * @param {!proto.viam.component.servo.v1.StopRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.viam.component.servo.v1.StopResponse.deserializeBinary
);


/**
 * @param {!proto.viam.component.servo.v1.StopRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.viam.component.servo.v1.StopResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.viam.component.servo.v1.StopResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.viam.component.servo.v1.ServoServiceClient.prototype.stop =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/viam.component.servo.v1.ServoService/Stop',
      request,
      metadata || {},
      methodDescriptor_ServoService_Stop,
      callback);
};


/**
 * @param {!proto.viam.component.servo.v1.StopRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.viam.component.servo.v1.StopResponse>}
 *     Promise that resolves to the response
 */
proto.viam.component.servo.v1.ServoServicePromiseClient.prototype.stop =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/viam.component.servo.v1.ServoService/Stop',
      request,
      metadata || {},
      methodDescriptor_ServoService_Stop);
};


module.exports = proto.viam.component.servo.v1;


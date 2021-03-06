"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function testBB8() {
  log('Starting BB8 test.');

  // NOTE: connected to services with IOS & BB8 requires upper-case UUIDS
  // But the spec seems to require lower case?
  var BB8 = {
    name: "BB-7687",
    namePrefix: "BB-",

    radioService: "22BB746F-2BB0-7554-2D6F-726568705327",
    radioChar2BB1: "22BB746F-2BB1-7554-2D6F-726568705327",
    radioCharTXPower: "22BB746F-2BB2-7554-2D6F-726568705327",
    radioCharDeepSleep: "22BB746F-2BB6-7554-2D6F-726568705327",
    radioChar2BB8: "22BB746F-2BB8-7554-2D6F-726568705327",
    radioChar2BB9: "22BB746F-2BB9-7554-2D6F-726568705327",
    radioChar2BBA: "22BB746F-2BBA-7554-2D6F-726568705327",
    radioCharAntiDoS: "22BB746F-2BBD-7554-2D6F-726568705327",
    radioCharAntiDoSTimeout: "22BB746F-2BBE-7554-2D6F-726568705327",
    radioCharWake: "22BB746F-2BBF-7554-2D6F-726568705327",
    radioChar3BBA: "22BB746F-3BBA-7554-2D6F-726568705327",

    robotService: "22BB746F-2BA0-7554-2D6F-726568705327",
    robotCharControl: "22BB746F-2BA1-7554-2D6F-726568705327",
    robotCharResponse: "22BB746F-2BA6-7554-2D6F-726568705327",
    robotChar2BB7: "22BB746F-2BB7-7554-2D6F-726568705327",

    mysteryService: "00001016-D102-11E1-9B23-00025B00A5A5",
    mysteryChar1013: "00001013-D102-11E1-9B23-00025B00A5A5",
    mysteryChar1017: "00001017-D102-11E1-9B23-00025B00A5A5",
    mysteryChar1014: "00001014-D102-11E1-9B23-00025B00A5A5",

    deviceService: "device_information",
    deviceCharHarware: "hardware_revision_string",
    deviceCharSerial: "serial_number_string",
    deviceCharModel: "model_number_string",
    deviceCharManufacturer: "manufacturer_name_string",
    deviceCharFirm: "firmware_revision_string"
  };

  var options = {

    filters: [{
      services: ['22BB746F-2BA0-7554-2D6F-726568705327'],
      name: "BB-7687",
      namePrefix: "BB-"
    }]
  };

  navigator.bluetooth.requestDevice(options).then(function (device) {
    console.log("Device:", device);
    log("Device:" + device);
    return device.gatt.connect();
  }).then(function (server) {
    console.log("server:", server);
    console.log("server:" + server);
    return server.getPrimaryService(BB8.deviceService);
  }).then(function (service) {
    return Promise.all([service.getCharacteristic(BB8.deviceCharModel).then(handleChar), service.getCharacteristic(BB8.deviceCharManufacturer).then(handleChar)]);
  }).catch(function (e) {
    console.log(e);
    log(e);
  });
}

function testPedometer() {
  log('Starting Pedometer test.');
  var options = {
    filters: [{
      services: ['running_speed_and_cadence']
    }]
  };
  navigator.bluetooth.requestDevice(options).then(function (device) {
    log("Device:" + device);
    console.log("device", device);
    return device.gatt.connect();
  }).then(function (server) {
    log("server:" + server);
    return server.getPrimaryService('running_speed_and_cadence');
  }).then(function (service) {
    log("Got Service" + service);
    return Promise.all([service.getCharacteristic('serial_number_string').then(handleChar), service.getCharacteristic('rsc_feature').then(handleChar), service.getCharacteristic('rsc_measurement').then(handleChar), service.getCharacteristic('sensor_location').then(handleChar)]);
  }).catch(function (e) {
    console.log(e);
    log(e);
  });
}

function handleChar(characteristic) {
  console.log('handleChar():' + characteristic.uuid);
  characteristic.readValue().then(function (data) {
    alert("Char " + characteristic.uuid + " is " + ab2str(data.buffer));
  });
}

window.addEventListener('load', function () {
  document.querySelector("#bb8").addEventListener('click', testBB8);
  document.querySelector("#pedometer").addEventListener('click', testPedometer);
});

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

var log = function log(message) {
  var logger = document.querySelector('#console');
  if ((typeof message === "undefined" ? "undefined" : _typeof(message)) == 'object') {
    try {
      logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '\n';
    } catch (e) {
      logger.innerHTML += message + '\n';
    }
  } else {
    logger.innerHTML += message + '\n';
  }
};

//# sourceMappingURL=index-compiled.js.map
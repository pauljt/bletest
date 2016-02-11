

function go() {
  console.log('start')
  console.log(window.webkit.messageHandlers.bluetooth.postMessage)

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
    deviceCharFirm: "firmware_revision_string",
  };

  var options = {
    filters: [{
      services: ['22BB746F-2BA0-7554-2D6F-726568705327'],
      name: "BB-7687",
      namePrefix: "BB-"
    }]
  };

  navigator.bluetooth.requestDevice(options)
    .then(device => device.connectGATT())
    .then(server => server.getPrimaryService(BB8.deviceService))
    .then(service => {
      return Promise.all([
        service.getCharacteristic(BB8.deviceCharModel).then(handleChar),
        service.getCharacteristic(BB8.deviceCharManufacturer).then(handleChar)]);
    }).catch(function(e){
      console.log("Error:",e);
    });
}

function handleChar(characteristic) {
  characteristic.readValue()
    .then(data => {
      alert("Got Char:"+data);
    })
}

window.addEventListener('load', function () {
  document.querySelector("#go").addEventListener('click', go)
});
module.exports = function (proximityUUID, major, minor, rssi, measuredPower, macAddress) {
    this.major = major;
    this.measuredPower = measuredPower;
    this.minor = minor;
    this.rssi = rssi;
    this.macAddress = macAddress;
    this.proximityUUID = proximityUUID;
}
(function() {
  var NCS, loadJS;
  var staticServer = "http://localhost:31337"

  NCS = (function() {

    function NCS() {}

    NCS.onreceive = null;

    NCS.socket = null;

    NCS.prototype.connect = function(host, name, _callback) {
      var _this = this;
      this.host = host;
      this.name = name;

      // EIE: Changed because remote computers wouldn't load it off localhost
      return loadJS( (staticServer + "/js/libs/socket.io/socket.io.js"), function() {
      //return loadJS("http://" + this.host + "/socket.io/socket.io.js", function() {
        _this.socket = io.connect("http://" + _this.host);
        _this.socket.emit('ncs_hello', _this.name);
        _this.socket.on('ncs_ping_request', function(_data) {
          return _this.socket.emit('ncs_ping_response', _data);
        });
        _this.socket.on('message', function(_data) {
          return _this.onmessage(_data);
        });
        return _callback();
      });
    };

    // EE: Changed send to sendMessage
    NCS.prototype.sendMessage = function(_key, _value) {
      if (!this.socket) return;
      return this.socket.send(JSON.stringify({
        app_name: this.name,
        key: _key,
        value: _value
      }));
    };

    NCS.prototype.onmessage = function(_data) {
      _data = JSON.parse(_data);
      if (typeof this.onreceiveCallback === "function") {
        return this.onreceiveCallback(_data.key, _data.value);
      }
    };

    NCS.prototype.onreceive = function(onreceiveCallback) {
      this.onreceiveCallback = onreceiveCallback;
    };

    NCS.prototype.getSocket = function() {
      return this.socket;
    };

    return NCS;

  })();

  window.ncs = new NCS;

  loadJS = function(_src, _callback) {
    var script;
    script = document.createElement('script');
    script.onload = function() {
      if (typeof _callback === "function") return _callback();
    };
    script.src = _src;
    return document.getElementsByTagName('head')[0].appendChild(script);
  };

}).call(this);

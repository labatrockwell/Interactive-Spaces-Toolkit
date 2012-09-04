(function() {
	var LT = namespace("com.rockwellgroup.lab.toolkit");

	LT.Network.buildConnection = function(connType, params) {
		console.log(LOG_INFO, "[Network] Connection Type: "+connType);

		if (connType == "IS") {
			window._conn = new ISjs.Connection();			

			var connect = _conn.connect;

			_conn.connect = function(_) {
				_conn.onConnect(_);
				return connect.call(_conn, params.serverURL, params.serverPort);
			}

			_conn.onMessage(function(route, data) {
				console.log(LOG_INFO, "[Network] GET -->", route, data);
			});
		}

		else if (connType == "NCS") {
			window._conn = new LT.Network.NCS(params.appName);
			var connect = _conn.connect;
			_conn.connect = function(_) {
				return connect.call(_conn, params.serverURL, params.serverPort, _);
			}
		}
		else if (connType == "ECS") {
			// @todos : Update ECS version
		}	
		return _conn;
	}
}).call(this);


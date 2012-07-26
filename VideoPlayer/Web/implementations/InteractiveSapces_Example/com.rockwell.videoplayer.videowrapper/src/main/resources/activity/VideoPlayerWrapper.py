from interactivespaces.activity.impl.web import BaseRoutableRosWebActivity

class VideoPlayerWrapper(BaseRoutableRosWebActivity):
    def onActivityActivate(self):
        self.getLog().info("Activated")

    def onActivityDeactivate(self):
        self.getLog().info("Deactivated")

    def onNewWebSocketConnection(self, connectionId):
        self.getLog().info("Got web socket connection from connection " + connectionId)

    def onWebSocketClose(self, connectionId):
        self.getLog().info("Got web socket close from connection " + connectionId)

    def onWebSocketReceive(self, connectionId, data):
        self.getLog().info("Got web socket data from connection " + connectionId)

    def onNewInputJson(self, channelName, message):
        self.getLog().info("Got message: " + str(message))
        # Below is sending to the webapp
        self.sendAllWebSocketJson(message)
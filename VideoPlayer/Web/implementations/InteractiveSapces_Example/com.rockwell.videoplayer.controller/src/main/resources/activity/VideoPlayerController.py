from interactivespaces.activity.impl.web import BaseRoutableRosWebActivity

class VideoPlayerController(BaseRoutableRosWebActivity):
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
        self.getLog().info("The data: " + str(data))
        # Below is sending JSON over IS
        self.sendOutputJson("videoPath", data)

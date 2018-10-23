module.exports = class Incoming{

  static handle(data){
    new Incoming().handle(data);
  }
  

  handle(data){
    // Make sure this is a page subscription
    if (data.object == 'page') {
      // Iterate over each entry
      // There may be multiple if batched
      data.entry.forEach(function(pageEntry) {
        var pageID = pageEntry.id;
        var timeOfEvent = pageEntry.time;

        // Iterate over each messaging event
        pageEntry.messaging.forEach(function(messagingEvent) {
          if (messagingEvent.optin) {
            //receivedAuthentication(messagingEvent);
          } else if (messagingEvent.message) {
            receivedMessage(messagingEvent.message);
          } else if (messagingEvent.delivery) {
            //receivedDeliveryConfirmation(messagingEvent);
          } else if (messagingEvent.postback) {
            //receivedPostback(messagingEvent);
          } else if (messagingEvent.read) {
            //receivedMessageRead(messagingEvent);
          } else if (messagingEvent.account_linking) {
            //receivedAccountLink(messagingEvent);
          } else {
            console.log("Webhook received unknown messagingEvent: ", messagingEvent);
          }
        });
      });
    }
  }
};


function receivedMessage(msg){
  var text = msg.text;
  console.log(text);
}

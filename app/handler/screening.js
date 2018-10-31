const InputBundle = require('../bean/input-bundle.js');
const Profile = require('../fb/profile.js');
const Logic = require('../handler/logic.js');
const Returner = require('../fb/returns/returner.js');

module.exports = class Screening{

  static handle(data){
    new Screening().handle(data);
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
            receivedMessage(messagingEvent);
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


function receivedMessage(messagingEvent){
  Profile.find(messagingEvent.sender.id, (user)=>{
    var inputBundle = InputBundle
    .fromProfile(user)
    .setInputMessage(messagingEvent);

    new Logic(inputBundle)
    .result((inputBundle)=>{
      new Returner(messagingEvent).send(inputBundle);
    }).run();
  });
}

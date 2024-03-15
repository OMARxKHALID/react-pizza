// sendSms.js
const twilio = require('twilio');

const accountSid = 'ACa95ef89d36f0049255881926e2032335';
const authToken = '150d1a95b3f3b3ff8e051c5e1ac25143';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+12029525578';

function sendSms(messageBody, toPhoneNumber) {
  return twilioClient.messages
    .create({
      body: messageBody,
      from: twilioPhoneNumber,
      to: toPhoneNumber,
    })
    .then((message) => {
      console.log(`SMS sent successfully. SID: ${message.sid}`);
    })
    .catch((error) => {
      console.error('Error sending SMS:', error);
    });
}

module.exports = {
  sendSms,
};

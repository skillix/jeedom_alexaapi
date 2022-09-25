let Alexa = require('./lib/alexa-remote');
let alexa = new Alexa();

let cookieLocation = __dirname + '/data/alexa-cookie.json';
var fs = require('fs');

const amazonserver = process.argv[3];
const alexaserver = process.argv[4];

alexa.init({
  proxyOnly: true,
  proxyOwnIp: process.argv[2],
  amazonPage: amazonserver,  // optional: possible to use with different countries, default is 'amazon.de'
  acceptLanguage: 'fr-FR',   // optional: webpage language, should match to amazon-Page, default is 'de-DE'
  //baseAmazonPage: amazonserver, // optional: Change the Proxy Amazon Page - all "western countries" directly use amazon.com! Change to amazon.co.jp for Japan
  amazonPageProxyLanguage: 'fr_FR', // optional: language to be used for the Amazon Sign-in page the proxy calls. default is "de_DE")
  proxyPort: 3457,
  proxyLogLevel: 'info',
  logger: console.log,
  //alexaServiceHost: 'layla.amazon.de', // optional, e.g. "pitangui.amazon.com" for amazon.com, default is "layla.amazon.de"
  alexaServiceHost: alexaserver,
          useWsMqtt: true, // optional, true to use the Websocket/MQTT direct push connection
       //07/11/2021 cookieRefreshInterval: 3*24*60*60*1000 // optional, cookie refresh intervall, set to 0 to disable refresh
        cookieRefreshInterval: 7*24*60*1000, // optional, cookie refresh intervall, set to 0 to disable refresh
       // formerDataStorePath: '...', // optional: overwrite path where some of the formerRegistrationData are persisted to optimize against Amazon security measures
       // formerRegistrationData: { ... }, // optional/preferred: provide the result object from subsequent proxy usages here and some generated data will be reused for next proxy call too
  macDms: {} // required since version 4.0 to use Push connection! Is returned in cookieData.macDms

},
function (err)
{
  if (err)
  {
    //console.log('iCooki - 1' + err);
	/*console.log (' {iCooki} ╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════');
    //console.log (' {iCooki} ║ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log (' {iCooki} ║ '+ err);
	console.log (' {iCooki} ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════');
	*/
    return; // Wait next call
  }
  
 //console.log('Alexa-Config (iCooki.js): amazonserver=' + amazonserver );
 //console.log('Alexa-Config (iCooki.js): alexaserver=' + alexaserver );
 //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! cookieData.macDms=' + alexa.cookieData.macDms);

  if (!alexa.cookieData)
    return; // Wait next call



 
 console.log (' {iCooki} ║ Cookie récupéré avec succès sur Amazon');
  fs.writeFile(cookieLocation, JSON.stringify(alexa.cookieData), 'utf8', (err) =>
  {
    if (err)
    {
      console.log('iCooki - Error while saving the cookie to: ' + cookieLocation);
      console.log('iCooki - ' + err);
      process.exit();
    }

    console.log (' {iCooki} ║ Cookie enregistré dans :' + cookieLocation);
	console.log (' {iCooki} ╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════');
    process.exit();
  });
});


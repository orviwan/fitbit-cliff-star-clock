import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { localStorage } from "local-storage";

let key = "theme";

let val = localStorage.getItem(key);
if (val) {
  try {
    val = JSON.parse(val);
  } catch (ex) {
    val = null;
  }
}

function sendVal(val: string) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(val);
  }
}

messaging.peerSocket.onopen = function() {
  if (val) {
    sendVal(val);
  }
};

settingsStorage.onchange = function(evt) {
  // @ts-ignore https://github.com/SergioMorchon/fitbit-sdk-types/issues/24
  let data = JSON.parse(evt.newValue);
  val = data["values"][0].value;
  localStorage.setItem(key, JSON.stringify(val));
  sendVal(val);
};

import { me } from "appbit";
import clock from "clock";
import { display } from "display";
import document from "document";
import * as fs from "fs";
import * as messaging from "messaging";
import { preferences } from "user-settings";

import * as util from "../common/utils";

clock.granularity = "minutes";

let clockLabel = document.getElementById("clockLabel");
let clockShadow = document.getElementById("clockShadow");

const SETTINGS_FILE = "settings.json";
let settings = loadSettings();
applyTheme(settings.foreground);

function updateClock(evt) {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = (hours + 24) % 12 || 12;
  }
  else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  clockLabel.text = `${hours}:${mins}`;
  clockShadow.text = `${hours}:${mins}`;
}

clock.ontick = (evt) => updateClock(evt);

messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data.foreground) {
    applyTheme(evt.data.foreground);
  }
}

function applyTheme(foreground) {
  display.on = true;
  let items = document.getElementsByClassName("foreground");
  items.forEach(function(item) {
    item.style.fill = foreground;
  });
  settings.foreground = foreground;
}

function loadSettings() {
  let obj;
  try {
    obj = fs.readFileSync(SETTINGS_FILE, "json");
  } catch(ex) {
    obj = {
      foreground: "#FFFFFF"
    }
  }
  return obj;
}

me.onunload = () => {
  fs.writeFileSync(SETTINGS_FILE, settings, "json");
}

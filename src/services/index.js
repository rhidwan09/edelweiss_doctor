import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message';
import { Post, PostSms } from './API';

// Notifikasi
export function Message(title = null, msg, type) {
  showMessage({
    message: title == null ? 'Notifikasi' : title,
    description: msg,
    type: type,
    duration: 4000,
    floating: true,
    hideStatusBar: true,
  });
}

export async function saveItem(item, selectedValue) {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(selectedValue));
  } catch (error) {
    console.log(error);
  }
}

export async function getItem(item) {
  try {
    let store = await AsyncStorage.getItem(item);

    if (store === null) {
      return [];
    }
    return JSON.parse(store);
  } catch (error) {
    console.log(error);
  }
}

export async function removeItem(item) {
  try {
    await AsyncStorage.removeItem(item);
  } catch (error) {
    console.log(error);
  }
}

export function xwwwfurlenc(srcjson) {
  if (typeof srcjson !== 'object') {
    if (typeof console !== 'undefined') {
      console.log('"srcjson" is not a JSON object');
      return null;
    }
  }
  let u = encodeURIComponent;
  var urljson = '';
  var keys = Object.keys(srcjson);
  for (var i = 0; i < keys.length; i++) {
    urljson += u(keys[i]) + '=' + u(srcjson[keys[i]]);
    if (i < keys.length - 1) {
      urljson += '&';
    }
  }
  return urljson;
}

export function getDayIndo(day) {
  if (day == 'Monday') {
    return 'Senin';
  } else if (day == 'Tuesday') {
    return 'Selasa';
  } else if (day == 'Wednesday') {
    return 'Rabu';
  } else if (day == 'Thursday') {
    return 'Kamis';
  } else if (day == 'Friday') {
    return 'Jumat';
  } else if (day == 'Saturday') {
    return 'Sabtu';
  } else if (day == 'Sunday') {
    return 'Minggu';
  }
}

export function getDayName(number) {
  if (number == 1) {
    return 'Monday';
  } else if (number == 2) {
    return 'Tuesday';
  } else if (number == 3) {
    return 'Wednesday';
  } else if (number == 4) {
    return 'Thursday';
  } else if (number == 5) {
    return 'Friday';
  } else if (number == 6) {
    return 'Saturday';
  } else if (number == 0) {
    return 'Sunday';
  }
}

export function mothToText(number) {
  if (number == 1) {
    return 'Januari';
  }
  if (number == 2) {
    return 'Februari';
  }
  if (number == 3) {
    return 'Maret';
  }
  if (number == 4) {
    return 'April';
  }
  if (number == 5) {
    return 'Mei';
  }
  if (number == 6) {
    return 'Juni';
  }
  if (number == 7) {
    return 'Juli';
  }
  if (number == 8) {
    return 'Agustus';
  }
  if (number == 9) {
    return 'September';
  }
  if (number == 10) {
    return 'Oktober';
  }
  if (number == 11) {
    return 'November';
  }
  if (number == 12) {
    return 'Desember';
  }
}

export function getMonthShort(d) {
  let date = new Date(d);
  let number = date.getMonth();
  if (number == 0) {
    return 'Jan';
  }
  if (number == 1) {
    return 'Feb';
  }
  if (number == 2) {
    return 'Mar';
  }
  if (number == 3) {
    return 'Apr';
  }
  if (number == 4) {
    return 'May';
  }
  if (number == 5) {
    return 'Jun';
  }
  if (number == 6) {
    return 'Jul';
  }
  if (number == 7) {
    return 'Aug';
  }
  if (number == 8) {
    return 'Sep';
  }
  if (number == 9) {
    return 'Oct';
  }
  if (number == 10) {
    return 'Nov';
  }
  if (number == 11) {
    return 'Dec';
  }
}

// Pusher
export const PusherConf = {
  key: "f71517a290e561824a5f",
  options: {
    cluster: "ap1",
    forceTLS: true
  }
};
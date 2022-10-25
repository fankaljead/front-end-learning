class CookieUtil {
  static get(name) {
    let cookieName = `${encodeURIComponent(name)}=`,
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;
    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      );
    }
    return cookieValue;
  }
  static set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString()}`;
    }
    if (path) {
      cookieText += `; path=${path}`;
    }
    if (domain) {
      cookieText += `; domain=${domain}`;
    }
    if (secure) {
      cookieText += "; secure";
    }
    document.cookie = cookieText;
  }
  static unset(name, path, domain, secure) {
    CookieUtil.set(name, "", new Date(0), path, domain, secure);
  }
}

class SubCookieUtil {
  static get(name, subName) {
    let subCookies = SubCookieUtil.getAll(name);
    return subCookies ? subCookies[subName] : null;
  }
  static getAll(name) {
    let cookieName = encodeURIComponent(name) + "=",
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null,
      cookieEnd,
      subCookies,
      parts,
      result = {};
    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = document.cookie.substring(
        cookieStart + cookieName.length,
        cookieEnd
      );
      if (cookieValue.length > 0) {
        subCookies = cookieValue.split("&");
        for (let i = 0, len = subCookies.length; i < len; i++) {
          parts = subCookies[i].split("=");
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
        return result;
      }
    }
    return null;
  }

  static set(name, subName, value, expires, path, domain, secure) {
    let subcookies = SubCookieUtil.getAll(name) || {};
    subcookies[subName] = value;
    SubCookieUtil.setAll(name, subcookies, expires, path, domain, secure);
  }

  static setAll(name, subcookies, expires, path, domain, secure) {
    let cookieText = encodeURIComponent(name) + "=",
      subcookieParts = new Array(),
      subName;
    for (subName in subcookies) {
      if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
        subcookieParts.push(
          "${encodeURIComponent(subName)}=${encodeURIComponent(subcookies[subName])}"
        );
      }
    }
    if (cookieParts.length > 0) {
      cookieText += subcookieParts.join("&");
      if (expires instanceof Date) {
        cookieText += `; expires=${expires.toGMTString()}`;
      }
      if (path) {
        cookieText += `; path=${path}`;
      }
      if (domain) {
        cookieText += `; domain=${domain}`;
      }
      if (secure) {
        cookieText += "; secure";
      }
    } else {
      cookieText += `; expires=${new Date(0).toGMTString()}`;
    }
    document.cookie = cookieText;
  }
}

# Combined Apps Script for Both Forms

Copy EVERYTHING between the ``` markers and paste it into your Apps Script editor.

```javascript
var SPREADSHEET_ID = "1yTaUUzGNiTE_FhRneQbzXBQ-maBVpI23i11aNWR1lDo";
var WAITLIST_SHEET = "Waitlist";
var CONTACT_SHEET = "Contact Us";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return makeJson({ ok: false, error: "Missing request body" });
    }

    var data = JSON.parse(e.postData.contents);
    var name = (data.name || "").toString().trim();
    var email = (data.email || "").toString().trim().toLowerCase();
    var message = (data.message || "").toString().trim();
    var source = (data.source || "").toString().trim().toLowerCase();

    if (!email) {
      return makeJson({ ok: false, error: "Email is required" });
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (source.indexOf("waitlist") !== -1) {
      var sheet = ss.getSheetByName(WAITLIST_SHEET);
      if (!sheet) {
        return makeJson({ ok: false, error: "Sheet not found: " + WAITLIST_SHEET });
      }

      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        var emails = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
        for (var i = 0; i < emails.length; i++) {
          if (emails[i][0].toString().trim().toLowerCase() === email) {
            return makeJson({ ok: true, deduped: true });
          }
        }
      }

      sheet.appendRow([new Date(), name, email, source]);
      return makeJson({ ok: true });
    }

    if (source.indexOf("contact") !== -1) {
      var sheet = ss.getSheetByName(CONTACT_SHEET);
      if (!sheet) {
        return makeJson({ ok: false, error: "Sheet not found: " + CONTACT_SHEET });
      }

      sheet.appendRow([new Date(), name, email, message, source]);
      return makeJson({ ok: true });
    }

    return makeJson({ ok: false, error: "Invalid source: " + source });

  } catch (error) {
    return makeJson({ ok: false, error: error.toString() });
  }
}

function doGet(e) {
  return makeJson({ ok: true, status: "Script is running" });
}

function makeJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Steps
1. Paste this code in your Apps Script editor (replace all)
2. Save → Deploy → Manage deployments → Edit (pencil) → New version → Deploy
3. Emails are now handled by the Next.js server instead

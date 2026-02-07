function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, message, source, ua } = data;

    // Validate
    if (!name || !email) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Name and email are required" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Open your spreadsheet (replace with your actual spreadsheet ID)
    const SPREADSHEET_ID = "1yTaUUzGNiTE_FhRneQbzXBQ-maBVpI23i11aNWR1lDo";
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Determine which sheet based on source
    let sheet;
    if (source === "waitlist-modal") {
      sheet = spreadsheet.getSheetByName("Waitlist");
      if (!sheet) {
        return ContentService.createTextOutput(
          JSON.stringify({ ok: false, error: "Waitlist sheet not found" })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      // Check if email already exists in Waitlist
      const emailColumn = sheet.getRange("C:C").getValues().flat();
      const emailExists = emailColumn.some(
        (existingEmail) => existingEmail.toString().toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        return ContentService.createTextOutput(
          JSON.stringify({ ok: false, error: "Email already registered" })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      // Add timestamp
      const timestamp = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/New_York",
      });

      // Append row: [Timestamp, Name, Email]
      sheet.appendRow([timestamp, name, email]);
    } else if (source === "contact-modal") {
      sheet = spreadsheet.getSheetByName("Contact Us");
      if (!sheet) {
        return ContentService.createTextOutput(
          JSON.stringify({ ok: false, error: "Contact Us sheet not found" })
        ).setMimeType(ContentService.MimeType.JSON);
      }

      // Add timestamp
      const timestamp = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/New_York",
      });

      // Append row: [Timestamp, Name, Email, Message]
      sheet.appendRow([timestamp, name, email, message || ""]);
    } else {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Invalid source" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

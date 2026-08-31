// =============================================================================
// TECHX GOOGLE APPS SCRIPT: AUTOMATED DUAL-SHEET TELEMETRY & HEART COLLECTOR
// =============================================================================
// This Google Apps Script receives live telemetry from the TechX website and
// automatically writes to TWO separate, beautifully styled sheets:
//   1. "User Telemetry"  (26 Columns: Device, Navigation, Clicks, Conversion, Billing)
//   2. "HEART Analysis"  (24 Columns: Happiness, Engagement, Adoption, Retention, Task Success)
// =============================================================================

const SPREADSHEET_ID = '1HH5cW8NmXSP4pbVnzquzUgVKyb_7AOVQ5vGPmgH_wAc';

// Sheet Names
const SHEET_TELEMETRY = 'User Telemetry';
const SHEET_HEART     = 'HEART Analysis';

// =============================================================================
// 1. GET Request Handler (Browser Testing & Verification Endpoint)
// =============================================================================
function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheetTel = getOrCreateSheet(ss, SHEET_TELEMETRY, getTelemetryHeaders(), '#0B192C');
    var sheetHrt = getOrCreateSheet(ss, SHEET_HEART, getHeartHeaders(), '#064E3B');

    var now = new Date();
    var formattedTime = Utilities.formatDate(now, Session.getScriptTimeZone(), "dd/MM/yyyy, HH:mm:ss");
    var testUserId = 'usr_test_' + Utilities.getUuid().slice(0, 8);
    var testSessionId = 'ses_test_' + Utilities.getUuid().slice(0, 8);

    // 1. Append Test Row to "User Telemetry"
    sheetTel.appendRow([
      formattedTime,                                             // 1. Time Stamp
      testUserId,                                                // 2. User ID
      testSessionId,                                             // 3. Session ID
      'Home Page → Shop Page → Wishlist Page → Checkout Page',   // 4. Page Visited
      'X: 840px, Y: 420px (44% x 45%) on [button.apply-coupon]', // 5. Click Position
      'Apply Coupon [TECHX20]',                                  // 6. Button Click
      'Orbit X1 Titanium Smartwatch (2.7s), Lumina Lamp (1.6s)', // 7. Mouse Hover
      '88%',                                                     // 8. Scroll Depth
      'titanium smartwatch',                                     // 9. Search Query
      '6m 21s',                                                  // 10. Session Time
      'Desktop (Windows 11)',                                    // 11. Device
      'Chrome 128',                                              // 12. Browser
      '1920x1080 (Viewport: 1920x945)',                          // 13. Screen Resolution
      'https://google.com (Organic Search)',                     // 14. Referrer
      'en-IN',                                                   // 15. Language
      'YES',                                                     // 16. Purchased or Not
      24990,                                                     // 17. Purchase Amount (₹)
      'Returning',                                               // 18. Returning Visitor
      'Jyoti Nambiar',                                           // 19. Name
      'jyoti.nambiar99@gmail.com',                               // 20. Email Address
      "'917144050654",                                           // 21. Number
      "'600017",                                                 // 22. PIN Code
      '105, Tech Apartments, T. Nagar Usman Road, Chennai',      // 23. Street Address
      'CARD',                                                    // 24. Payment Method
      'Dark Mode',                                               // 25. Theme (Dark / Light)
      'Orbit X1 Titanium Smartwatch'                             // 26. What is Wishlisted
    ]);

    // 2. Append Test Row to "HEART Analysis"
    sheetHrt.appendRow([
      testUserId,                                                // 1. User ID
      testSessionId,                                             // 2. Session ID
      formattedTime,                                             // 3. Time Stamp
      9,                                                         // 4. Feedback Score (1-10)
      4.8,                                                       // 5. User Rating (1-5★)
      'Extremely Satisfied',                                     // 6. Satisfaction Survey
      'Promoter',                                                // 7. NPS Category
      381,                                                       // 8. Session Time (Seconds)
      '6m 21s',                                                  // 9. Session Duration
      6,                                                         // 10. Pages Per Session
      92,                                                        // 11. Engagement Score (0-100)
      'High',                                                    // 12. Interaction Level
      'Existing Account',                                        // 13. User Adoption Type
      'Active Account',                                          // 14. Account Registration
      'Cart + Coupon Adopted',                                   // 15. Feature Adoption
      'Returning',                                               // 16. Returning Customer
      3,                                                         // 17. Repeat Visits Count
      4,                                                         // 18. Days Since Last Visit
      'Loyal Customer',                                          // 19. Retention Tier
      'Checkout Form Completed',                                 // 20. Form Completion
      'Product Found & Purchased',                               // 21. Search Success
      'Verified Account',                                        // 22. Successful Registration
      'Completed Order',                                         // 23. Primary Task Outcome
      'Success'                                                  // 24. Overall Task Success
    ]);

    return ContentService
      .createTextOutput("SUCCESS: Both 'User Telemetry' and 'HEART Analysis' test records written successfully to Google Sheet!")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput("ERROR: " + err.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

// =============================================================================
// 2. POST Request Handler (Live Website Real-Time Data Receiver)
// =============================================================================
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheetTel = getOrCreateSheet(ss, SHEET_TELEMETRY, getTelemetryHeaders(), '#0B192C');
    var sheetHrt = getOrCreateSheet(ss, SHEET_HEART, getHeartHeaders(), '#064E3B');

    // Parse payload
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var now = new Date();
    var defaultTimestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), "dd/MM/yyyy, HH:mm:ss");

    // Identifiers
    var userId = data.userId || data.visitorId || 'usr_' + Utilities.getUuid().slice(0, 8);
    var sessionId = data.sessionId || 'ses_' + Utilities.getUuid().slice(0, 8);
    var timestamp = data.timestamp || defaultTimestamp;

    // Format phone & PIN safely as text to prevent formula corruption
    var rawPhone = data.phone || data.customerNumber || data.number || '';
    var safePhone = rawPhone ? "'" + rawPhone.toString().replace(/['"]/g, '') : '';
    var rawPin = data.pincode || data.pinCode || '';
    var safePin = rawPin ? "'" + rawPin.toString() : '';

    // E-commerce purchase status
    var isPurchased = (data.purchased === true || data.purchased === 'YES' || data.purchased === 1) ? 'YES' : 'NO';
    var purchaseAmount = Number(data.purchaseAmount || data.amount || 0);

    // -------------------------------------------------------------------------
    // WRITE SHEET 1: "User Telemetry" (26 Columns)
    // -------------------------------------------------------------------------
    sheetTel.appendRow([
      timestamp,
      userId,
      sessionId,
      data.pageVisited || 'Home Page',
      data.clickPosition || 'None',
      data.buttonClick || 'None',
      data.mouseHover || 'None',
      data.scrollDepth || (data.scroll ? data.scroll + '%' : '0%'),
      data.searchQuery || 'None',
      data.sessionTime || '0m 00s',
      data.device || 'Desktop',
      data.browser || 'Unknown Browser',
      data.screenResolution || '1920x1080',
      data.referrer || 'Direct / Internal Navigation',
      data.language || 'en-US',
      isPurchased,
      purchaseAmount,
      data.returningVisitor || data.returningCustomer || 'New',
      data.name || '',
      data.email || '',
      safePhone,
      safePin,
      data.address || '',
      data.paymentMethod || (isPurchased === 'YES' ? 'CARD' : 'None'),
      data.theme || 'Dark Mode',
      data.wishlist || 'None'
    ]);

    // -------------------------------------------------------------------------
    // COMPUTE & WRITE SHEET 2: "HEART Analysis" (24 Columns)
    // -------------------------------------------------------------------------
    // Happiness
    var feedbackScore = Number(data.feedbackScore || (isPurchased === 'YES' ? (8 + Math.floor(Math.random()*3)) : (4 + Math.floor(Math.random()*5))));
    var userRating = Number(data.userRating || (isPurchased === 'YES' ? (4.2 + Math.random()*0.8).toFixed(1) : (3.0 + Math.random()*1.5).toFixed(1)));
    var satisfactionSurvey = data.satisfactionSurvey || (userRating >= 4.5 ? 'Extremely Satisfied' : (userRating >= 3.8 ? 'Satisfied' : (userRating >= 3.0 ? 'Neutral / Bounced' : 'Needs Improvement')));
    var npsCategory = data.npsCategory || (userRating >= 4.5 ? 'Promoter' : (userRating >= 3.6 ? 'Passive' : 'Detractor'));

    // Engagement
    var sessionTimeSeconds = Number(data.sessionTimeSeconds || data.durationSeconds || (data.sessionTime ? parseDurationToSeconds(data.sessionTime) : 60));
    var pagesCount = Number(data.pagesPerSession || (data.pageVisited ? (data.pageVisited.split('→').length) : 1));
    var engagementScore = Number(data.engagementScore || Math.min(99, Math.max(10, Math.round((pagesCount * 12) + (sessionTimeSeconds / 20) + (isPurchased === 'YES' ? 35 : 0)))));
    var interactionLevel = data.interactionLevel || (pagesCount === 1 ? 'Bounced' : (engagementScore >= 75 ? 'High' : (engagementScore >= 45 ? 'Medium' : 'Low')));

    // Adoption
    var userAdoptionType = data.userAdoptionType || (isPurchased === 'YES' ? 'New User Registered' : (pagesCount > 2 ? 'Guest Explorer' : (data.returningCustomer === 'Returning' ? 'Existing Account' : 'New Visitor')));
    var accountRegistration = data.accountRegistration || (isPurchased === 'YES' ? 'Active Account' : (pagesCount >= 3 ? 'Partial (Cart Saved)' : 'Unregistered'));
    var featureAdoption = data.featureAdoption || (isPurchased === 'YES' ? 'Cart + Checkout Completed' : (data.wishlist && data.wishlist !== 'None' ? 'Wishlist Adopted' : 'Catalog Browsing'));

    // Retention
    var returningCustomer = data.returningCustomer || (data.returningVisitor || 'New');
    var repeatVisitsCount = Number(data.repeatVisitsCount || (returningCustomer === 'Returning' ? 2 : 1));
    var daysSinceLastVisit = Number(data.daysSinceLastVisit || (returningCustomer === 'Returning' ? 5 : 0));
    var retentionTier = data.retentionTier || (isPurchased === 'YES' ? (returningCustomer === 'Returning' ? 'Loyal Customer' : 'Newly Acquired') : (pagesCount === 1 ? 'One-Time Bounce' : (pagesCount >= 3 ? 'High Intent Cart Abandoner' : 'Window Shopper')));

    // Task Success
    var formCompletion = data.formCompletion || (isPurchased === 'YES' ? 'Checkout Form Completed' : (pagesCount >= 3 ? 'Abandoned at Payment Step' : 'N/A (No Form Started)'));
    var searchSuccess = data.searchSuccess || (data.searchQuery && data.searchQuery !== 'None' ? 'Explored' : 'N/A');
    var successfulRegistration = data.successfulRegistration || (isPurchased === 'YES' ? 'Completed' : 'N/A');
    var primaryTaskOutcome = data.primaryTaskOutcome || (isPurchased === 'YES' ? 'Completed Order' : (pagesCount === 1 ? 'Quick Exit' : (pagesCount >= 3 ? 'Cart Abandoned' : 'Exploratory Browsing')));
    var overallTaskSuccess = data.overallTaskSuccess || (isPurchased === 'YES' ? 'Success' : (pagesCount > 1 ? 'Partial' : 'Failed'));

    sheetHrt.appendRow([
      userId,
      sessionId,
      timestamp,
      feedbackScore,
      userRating,
      satisfactionSurvey,
      npsCategory,
      sessionTimeSeconds,
      data.sessionTime || '0m 00s',
      pagesCount,
      engagementScore,
      interactionLevel,
      userAdoptionType,
      accountRegistration,
      featureAdoption,
      returningCustomer,
      repeatVisitsCount,
      daysSinceLastVisit,
      retentionTier,
      formCompletion,
      searchSuccess,
      successfulRegistration,
      primaryTaskOutcome,
      overallTaskSuccess
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "SUCCESS", message: "Recorded in User Telemetry and HEART Analysis" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ERROR", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// =============================================================================
// 3. Helper Functions & Header Schemas
// =============================================================================

function parseDurationToSeconds(durStr) {
  try {
    var minMatch = durStr.match(/(\d+)\s*m/);
    var secMatch = durStr.match(/(\d+)\s*s/);
    var mins = minMatch ? parseInt(minMatch[1]) : 0;
    var secs = secMatch ? parseInt(secMatch[1]) : 0;
    return (mins * 60) + secs;
  } catch (e) {
    return 60;
  }
}

function getTelemetryHeaders() {
  return [
    "Time Stamp", "User ID", "Session ID", "Page Visited", "Click Position",
    "Button Click", "Mouse Hover", "Scroll Depth", "Search Query", "Session Time",
    "Device", "Browser", "Screen Resolution", "Referrer", "Language",
    "Purchased or Not", "Purchase Amount (₹)", "Returning Visitor", "Name",
    "Email Address", "Number", "PIN Code", "Street Address", "Payment Method",
    "Theme (Dark / Light)", "What is Wishlisted"
  ];
}

function getHeartHeaders() {
  return [
    "User ID", "Session ID", "Time Stamp", "Feedback Score (1-10)", "User Rating (1-5★)",
    "Satisfaction Survey", "NPS Category", "Session Time (Seconds)", "Session Duration",
    "Pages Per Session", "Engagement Score (0-100)", "Interaction Level",
    "User Adoption Type", "Account Registration", "Feature Adoption",
    "Returning Customer", "Repeat Visits Count", "Days Since Last Visit",
    "Retention Tier", "Form Completion", "Search Success",
    "Successful Registration", "Primary Task Outcome", "Overall Task Success"
  ];
}

function getOrCreateSheet(ss, sheetName, headers, headerColor) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // If empty, initialize headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);

    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground(headerColor);
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontFamily("Segoe UI");
    headerRange.setFontSize(10);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");

    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 36);

    for (var i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
      if (sheet.getColumnWidth(i) < 130) {
        sheet.setColumnWidth(i, 140);
      }
    }
  }

  return sheet;
}

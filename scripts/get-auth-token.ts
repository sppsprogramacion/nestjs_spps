import { google } from 'googleapis';

const CLIENT_ID = '1077919430513-0v63r3otrae7m3r1d9h5ltnogb4g3vhq.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

async function getAccessToken() {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Autoriza esta URL en tu navegador:', url);
}

getAccessToken();
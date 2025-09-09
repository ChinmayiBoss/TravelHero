import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Session from '../modules/v1/admin/models/session-model';

const ENCRYPTION_KEY = process.env.SC_ENCRYPTION_KEY || 'agdjhjdhfjdjshkjgfghnbjkggnhhnbv'; // Must be 256 bits (32 characters)
const IV_LENGTH = 16;

export function encrypt(text, encryptionKey = ENCRYPTION_KEY) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return iv.toString('hex') + ':' + encrypted + ':' + tag;
}

export function decrypt(text, encryptionKey = ENCRYPTION_KEY) {
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const tag = Buffer.from(parts.pop(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error("Error in decrypt:", error.message);
    throw new Error('Decryption failed');
  }
}


export const createSession = async (user, device) => {
  try {
   
    let tokenParams = {
      id: user.id,
      email: user.email,
      // name: user.name,
      time: new Date().valueOf()
    };

    if (device) {
      tokenParams.device_information = device;
    }
    
    const expirationTimeInSeconds = 24 * 60 * 60; // 1 day in seconds
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestampInSeconds + expirationTimeInSeconds;
    const sessionParam = {
      session_token: jwt.sign(tokenParams, process.env.SECRET_KEY, { expiresIn: expirationTimeInSeconds }),
      user_id: user.id,
      expires_in: new Date(expirationTimestamp * 1000)
    };
 
    const session = (await Session.create(sessionParam)).toJSON();
    return session;

  } catch (error) {
    throw error;
  }
};

export const logoutSession = async (session) => {
  try {
    session = session.split(' ');
    const deletedRows = await Session.destroy({ where: { session_token: sessionToken } });

    if (deletedRows === 1) {
      return session;
    } else {
      return session;
    }
  } catch (error) {
    throw error.message;
  }
};

export const checkSession = async (id) => {
  try {
    const sessions = await Session.findAll({ where: { user_id: id } });

    if (sessions.length > 50) {
      await Session.destroy({ where: { user_id: id } });
    }

    return 'success';
  } catch (err) {
    throw err;
  }
};

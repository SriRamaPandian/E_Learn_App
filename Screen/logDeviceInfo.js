import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import * as Device from 'expo-device';
import { firebase_db } from '../firebaseConfig';

const logDeviceInfo = async (userId) => {
  try {
    
    const deviceId = Device.osInternalBuildId;
    console.log(deviceId);
    const documentid = deviceId + userId;

    const docRef = doc(collection(firebase_db, 'DeviceUsers'), documentid);

    await setDoc(docRef, {
      userId,
      deviceId,
      updatedAt: new Date(),
    });

    console.log(`Device ID: ${deviceId}, User ID: ${userId} logged successfully.`);
  } catch (error) {
    console.error('Error logging device info:', error);
  }
};

export default logDeviceInfo;

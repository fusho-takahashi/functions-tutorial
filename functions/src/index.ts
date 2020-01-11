import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text;
  await admin
    .firestore()
    .collection('messages')
    .doc()
    .create({ original: original });
  res.status(200).send('success');
});

exports.makeUppercase = functions.firestore
  .document('/messages/{pushId}')
  .onCreate((snapshot, context) => {
    const original = snapshot.get('original');
    const uppercase = original === undefined ? 0 : original.toUpperCase();
    return snapshot.ref.set({ ...snapshot.data(), uppercase });
  });

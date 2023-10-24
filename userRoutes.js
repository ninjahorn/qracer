const express = require('express');
const router = express.Router();

module.exports = (User) => {
  router.get('/check-username', async (req, res) => {
    const { username, page } = req.query;
  
    const user = await User.findOne({ username });
  
    if (user) {
      // Überprüfen, ob der QR-Code bereits gescannt wurde
      if (!user[page]) {
        user[page] = true; // QR-Code wurde gescannt und blockiert
        user.score += 1; // Score um 1 erhöhen
        try {
          await user.save();
          res.json({ message: 'QR-Code gescannt. Neuer Score: ' + user.score });
        } catch (err) {
          res.json({ message: 'Fehler beim Speichern des Scores: ' + err });
        }
      } else {
        res.json({ message: 'QR-Code wurde bereits gescannt.' });
      }
    } else {
      // Benutzer existiert nicht, lege ihn an und setze den Score auf 1
      const newUser = new User({ username, score: 1, [page]: true });
      try {
        await newUser.save();
        res.json({ message: 'Benutzer angelegt. QR-Code gescannt. Score: 1' });
      } catch (err) {
        res.json({ message: 'Fehler beim Speichern des Benutzernamens: ' + err });
      }
    }
  });
  

  router.get('/check-score', async (req, res) => {
    const { username } = req.query;
  
    const user = await User.findOne({ username });
  
    if (user) {
      res.json({ score: user.score });
    } else {
        res.json({ message: `Der Benutzer '${username}' existiert nicht.` });
      }
  });

  router.get('/check-scanned', async (req, res) => {
    const { username, page } = req.query;
  
    const user = await User.findOne({ username });
  
    if (user) {
      // Überprüfen, ob der QR-Code bereits gescannt wurde
      if (user[page]) {
        res.json({ scanned: true });
      } else {
        res.json({ scanned: false });
      }
    } else {
      res.json({ scanned: false }); // Benutzer existiert nicht
    }
  });

    return router;
};
  
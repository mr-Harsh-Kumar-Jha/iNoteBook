const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser');
const router = express.Router();
const Notes = require('../modules/Notes');


//Route1: it is used to fetch all  notes of the user after logging in.
router.get('/getnotes', fetchuser, async (req, res) => {
   const note = await Notes.find({ user: req.User.id });
   res.json(note);
})

//Route2: it is used to add notes of the user has logged in.
router.post('/addnotes', fetchuser, [
   body('Title', 'please enter a valid title').isLength({ min: 3 }),  // body takes inputs -- two things one is the fields where we want to check the validation and the string part with error message .
   body('Description', 'min length should be of 5').isLength({ min: 5 })
], async (req, res) => {
   const { Title, Description, Tag } = req.body;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
   }
   try {
      const notes = new Notes({
         Title, Description, Tag, user: req.User.id,
      })
      const savednotes = await notes.save();
      res.json(savednotes);
   } catch (errors) {
      console.log(errors.message);
      res.status(500).send("Internal server Error");
   }
})

//Route3: Updating notes by logging in
router.put('/updatenews/:id', fetchuser, async (req, res) => {
   try {
      const { Title, Description, Tag } = req.body;
      //create new note object
      const newnote = {};
      if (Title) { newnote.Title = Title };
      if (Description) { newnote.Description = Description };
      if (Tag) { newnote.Tag = Tag };
      //find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send('Not Found') };
      if (note.user.toString() !== req.User.id) {
         return res.status(401).send('Not Allowed');
      }
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
      res.json({ note });
   } catch (errors) {
      console.log(errors.message);
      res.status(500).send("Internal server Error");
   }

})

//Route4: Deleting notes by logging in
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
   try {
      //find the note to be Deleted
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send('Not Found') };
      //Allow deletion only is user owns this notes
      if (note.user.toString() !== req.User.id) {
         return res.status(401).send('Not Allowed');
      }
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ "success": "Note has been deleted", note: note });
   } catch (errors) {
      console.log(errors.message);
      res.status(500).send("Internal server Error");
   }

})

module.exports = router;
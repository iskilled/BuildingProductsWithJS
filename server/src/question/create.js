// npm packages
import passport from 'passport';
import moment from 'moment';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question', passport.authenticate('jwt', {session: false}), asyncRequest(async(req, res) => {
    // get user input
    const {text, expirationDate} = req.body;

    // validate if text is empty
    if (!text || !text.length) {
      res.status(400).send({error: 'Text is mandatory!'});
      return;
    }

    // validate if expiration date is valid
    if (!moment(expirationDate, moment.ISO_8601).isValid()) {
      res.status(400).send({error: 'Date should have a valid ISO format'});
      return;
    }

    // save new question
    try {
      const question = new Question({
        text,
        expirationDate: moment(expirationDate).toDate(),
        owner: req.user.id,
      });
      await question.save();

      // send created question back
      res.send(question);
    } catch (e) {
      res.status(400).send({error: e.toString()});
    }
  }));
};

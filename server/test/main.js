// npm packages
import test from 'tape';

// our packages
import {db as dbConfig} from '../config';
import {thinky, r} from '../src/db';

// tests
import core from './core';
import register from './register';
import login from './login';
import user from './user';
import question from './question';

export default () => {
  thinky.dbReady().then(() => {
    // clean the database
    test(async(t) => {
      try {
        await r.db(dbConfig.db).table('User').delete();
        await r.db(dbConfig.db).table('Question').delete();
      } catch (e) {
        // console.log('Tables not available');
      }
      t.end();
    });

    // execute tests
    core(test);
    register(test);
    login(test);
    user(test);
    question(test);

    // close db connections
    test((t) => {
      setImmediate(() => r.getPoolMaster().drain());
      t.end();
    });
  });
};

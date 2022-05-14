import { configureStore } from '@reduxjs/toolkit';

import session from './session';
import users from './users';
import parties from './parties';
import drops from './drops';

const store = configureStore({
  reducer: {
    session,
    users,
    parties,
    drops,
  },
});

export default store;

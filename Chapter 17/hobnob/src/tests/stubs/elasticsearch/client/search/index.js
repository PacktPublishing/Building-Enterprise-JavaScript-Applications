import { stub } from 'sinon';
import NotFoundError from '../../errors/not-found';

const SEARCH_RESOLVE_OBJ = {
  took: 0,
  timed_out: false,
  _shards: { total: 5, successful: 5, skipped: 0, failed: 0 },
  hits: {
    total: 2,
    max_score: 1,
    hits: [{
      _index: 'test',
      _type: 'user',
      _id: 'QrYj82EBkU56P7ZFzPef',
      _score: 1,
      _source: {
          email: 'e@ma.il',
          profile: {
              name: {
                first: 'first',
                last: 'last',
                middle: 'middle',
              },
              summary: 'Sample Summary 1',
              bio: 'Sample Bio 1'
            }
        }
    }, {
      _index: 'test',
      _type: 'user',
      _id: 'QrYj82EBkU56P7ZFzPef',
      _score: 0.9,
      _source: {
          email: 'foo@bar.baz',
          profile: {
              summary: 'Sample Summary 2',
              bio: 'Sample Bio 2'
            }
        }
    },
  ]
  }
};
const SEARCH_REJECT_ERROR = new Error();

const generate = {
  success: function () {
    return stub().returns(Promise.resolve(SEARCH_RESOLVE_OBJ))
  },
  failure: function () {
    return stub().returns(Promise.reject(SEARCH_REJECT_ERROR))
  }
}

export {
  generate as default,
  SEARCH_RESOLVE_OBJ,
}

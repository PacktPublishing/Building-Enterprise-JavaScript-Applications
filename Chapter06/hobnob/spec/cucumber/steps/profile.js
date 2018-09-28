
import assert from 'assert';
import { After } from 'cucumber';
import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

After({tags: "@profile"}, function deleteUser(testCase, callback) {
  client.delete({
    index: process.env.ELASTICSEARCH_INDEX_TEST,
    type: 'user',
    id: this.userId
  })
  .then(function (res) {
    assert.equal(res.result, 'deleted');
    callback();
  })
  .catch(callback)
})

import elasticsearch from 'elasticsearch';
const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

function retrieve (req) {
  return client.get({
    index: process.env.ELASTICSEARCH_INDEX,
    type: 'user',
    id: req.params.userId,
    _sourceExclude: 'digest'
  })
  .then(res => res._source)
  .catch(err => {
    if (err.status === 404) {
      return Promise.reject(new Error('Not Found'));
    }
    return Promise.reject(new Error('Internal Server Error'));
  });
}

export default retrieve;

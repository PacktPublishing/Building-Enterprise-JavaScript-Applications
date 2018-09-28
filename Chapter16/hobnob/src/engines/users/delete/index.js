import elasticsearch from 'elasticsearch';
const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

function del (req) {
  // If the user is trying to delete someone apart from him/herself
  if(req.params.userId !== req.user.id) {
    return Promise.reject(new Error('Forbidden'));
  }

  return client.delete({
    index: process.env.ELASTICSEARCH_INDEX,
    type: 'user',
    id: req.params.userId
  })
  .then(res => undefined)
  .catch(err => {
    if (err.status === 404) {
      return Promise.reject(new Error('Not Found'));
    }
    return Promise.reject(new Error('Internal Server Error'));
  });
}

export default del;

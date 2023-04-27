export default async function play() {
  const cache = await caches.open('my-cache');

  // Retreive data.json from the server and store the response.
  cache.add(new Request('/data/data1.json'));

  // Retreive data.json from the server and store the response.
  cache.add('/data/data2.json');


  const urls = ['/data/weather/today.json', '/data/weather/tomorrow.json'];
  cache.addAll(urls);


  // Retrieve data.json from the server and store the response.
  // cache.put('/data/data3.json');

  // Create a new entry for test.json and store the newly created response.
  cache.put('/data/test.json', new Response('{"foo": "bar"}'));

  // Retrieve data.json from the 3rd party site and store the response.
  // cache.put('https://jsonplaceholder.typicode.com/posts');


  const request = new Request('/my-data-store/item-id');
  console.log(request);


  // const imageBlob = new Blob([data], {type: 'image/jpeg'}); // Needs some data.
  // const imageResponse = new Response(imageBlob);
  // console.log('imageBlob', imageBlob);
  // console.log('imageResponse', imageResponse);

  const stringResponse = new Response('Hello world');
  console.log('stringResponse', stringResponse);


  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const jsonResponse = new Response('{}', options);
  console.log('jsonResponse', jsonResponse);


  const response = new Response('Hello world');
  const buffer = await response.arrayBuffer();
  console.log(new Uint8Array(buffer));
  // Uint8Array(11) [72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]


  const request4 = new Request('/data/data4.json');
  await cache.add(request4);
  const response4 = await cache.match(request4);
  console.log(request4, response4);


  const request5 = new Request('/data/data4.json');
  await cache.add(request5);
  const options5 = {
    ignoreSearch: true,
    ignoreMethod: true,
    ignoreVary: true
  };
  const response5 = await cache.match(request5, options5);
  console.log(request5, response5);


  const request6 = new Request('/data/data4.json');
  await cache.add(request6);
  const options6 = {
    ignoreSearch: true,
    ignoreMethod: true,
    ignoreVary: true
  };
  const responses6 = await cache.matchAll(request6, options6);
  console.log(`There are ${responses6.length} matching responses.`);


  findImages();
  async function findImages() {
    // Get a list of all of the caches for this origin
    const cacheNames = await caches.keys();
    const result = [];

    for (const name of cacheNames) {
      // Open the cache
      const cache = await caches.open(name);

      // Get a list of entries. Each item is a Request object
      for (const request of await cache.keys()) {
        console.log(request);
        // If the request URL matches, add the response to the result
        if (request.url.endsWith('.png')) {
          result.push(await cache.match(request));
        }
        cache.delete(request, {ignoreVary: true, ignoreSearch: true});
      }
    }

    return result;
  }
}

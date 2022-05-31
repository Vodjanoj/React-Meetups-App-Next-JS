// /api/new-meetup
// POST /api/new-meetup

// this function will receive a request and a response object.
// The request object contains data about the incoming request.
// The response object will be needed for sending back a response.

function handler(req, res) {
  // Now, from that request object, we can get things like the headers or the request body and also the request method, route a method property here.
  // This allows us to find out which kind of request was sent.
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;
  }
}

export default handler;

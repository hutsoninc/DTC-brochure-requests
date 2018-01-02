# Emma Gated Content

Sets up and listens for [Emma](https://myemma.com/) webhooks, then sends gated content to members who requested it.

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Emma Account](https://myemma.com/)

### Installing

A step by step series of examples that tell you have to get a development env running

`git clone` the repo

```
git clone https://github.com/hutsoninc/gated-content-requests.git
```

`cd` into the directory and run `npm install`

### Setup

Create a new file called `.env` and enter your environment variables. Host is used when creating Emma webhooks and will be explained in testing notes.

```
EMMA_ACCOUNT_ID = your-id
EMMA_PRIVATE_KEY = your-private-key
EMMA_PUBLIC_KEY = your-public-key
HOST = your-host-url
PORT = your-port-number
```

Create a file called `memberData.json` and enter the following JSON:

```
{
    "data": []
}
```

This file will serve as a database.

Run `node index.js` to start the server.

### Other Setup Requirements

* Create a new audience in Emma for members who request the content.
* Create a system for adding members to Emma audience. For example, we link a form to Zaiper, add the form data to a Google Sheet, then Zaiper uploads the data from Sheets to Emma which triggers the webhook.

## Testing

Testing can be done on your local machine using [ngrok](https://ngrok.com/) and [Postman](https://www.getpostman.com/). This will test to ensure that Emma webhooks are working and sending the gated content.

### Prerequisites

* [Postman](https://www.getpostman.com/)
* [ngrok](https://ngrok.com/)

### Setup

Use ngrok to forward the server's port to a temporary URL. Copy the URL in your `.env` file by HOST and run `node create-webhook.js` to create an Emma webhook. 

Whenever you finish with testing and stop forwarding with ngrok, you will have to run `node delete-webhooks.js` to remove the webhooks you created previously. **WARNING: This will remove any webhooks you have previously created. Read the [Emma Node.js documentation](https://github.com/nathanpeck/emma-sdk) to learn how to remove a single webhook.**

In Postman, create a new POST request using your temporary ngrok URL *(Example: https://12345678.ngrok.io/content-request)*. Under the Body tab, change the data type from `form-data` to `raw`. Change the dropdown from `Text` to `JSON (application/json)`. This will add a `Content-Type` tag under the Header tab. Now enter the following JSON in the Body:

```
{
	"data": {
		"member_id": your-member-id,
		"group_ids": []
	}
}
```

You can get your member ID using the `list-member.js` script. Your email must be in your Emma audience.

Press the `Send` button to send a request. Remember to update the URL whenever you start forwarding again with ngrok.

## Built With

* [emma-sdk](https://github.com/nathanpeck/emma-sdk) - Node.js wrapper for Emma API

## Authors

* **Austin Gordon** - *Development* - [Website](http://www.austinleegordon.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* **Nathan Peck** - *Developed Node.js wrapper for Emma API* - [emma-sdk](https://github.com/nathanpeck/emma-sdk)

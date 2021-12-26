# Modern Diagnostic

### Preface
Modern Diagnostic platform is supposed to provide you with a glimpse into the future. With the fast growth of neural networks and blockchain
it is only the matter of time where everybody starts using them. This platform utilizes both convolutional neural networks and blockchain to 
provide testing for your medical images, and also storing your medical data in a way that you can acces it when ever you want.

Currently the only CNN model on the platform is the one used for detecting brain tumors on an MRI image. Blockchain used in this project is
Ethereum's blockchain.

### How does the platform work?
Using Modern Diagnostic platform is pretty simple and straight forward.

On the landing page of the platform you are presented with a variety of CNN models. Currently the only working one is, as said above, the one 
used for detecting brain tumors. Once you select the model that you want to use, you can upload a picture of an MRI result. The CNN model then
reconstructs the picture in a way that benefits it and based on past training gives a prediction. 

When the prediction is given, the result is then minted into an NFT (ERC721 Token). The user can then see all of his past results in his past 
results section. 

## Installation guide
### Requirements 

* Metamask plugin
* Node package manager
* Python 3.7 - 3.9
### Frontend
To run the frontend of the application you just need to run the `npm install` command from the terminal or the command line. Just make sure you are inside 
the directory of the frontend.

### Backend 
To run the backend of the application, follow the instructions:
* Make sure you are inside of the directory
* Run `npm install` command to install all of the dependencies
* Run `pip install -r requirements.txt` to install all of pythons requirements
* Run `node index` to start the server

### Smart contracts 
This part is completely optional, since the contracts used for this project are already deployed to the Rinkeby test network.
But if you would like to alter the contracts I suggest you follow these instructions:
* Make sure you are inside of the directory
* Run `npm install` command to install all of the dependencies.
* Create a .env file and fill it just like the .env.example file provided in the directory

## Current disadvanteges of the platform

The main disadvanteges of the platforms are:
* Unsafe API (Since this is done as a college project on the side, I haven't got the time to implement an API with a secure key)
* Non-encrypted data ( All of the results are mintend on the blockchain as they are and since everything on blockchain is public that is really dangerous)

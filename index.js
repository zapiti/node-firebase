const admin = require('firebase-admin');
const serviceAccount = require('./google-services.json');

admin.initializeApp({
	credential : admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

getQuote().then(result =>{
	console.log(result.body);
	const obj = JSON.parse(result.body);
	const quoteData = {
		quote: obj.quote,
		author: obj.author

	};
	return db.collection('sampleData').doc('inspiration')
	.set(quoteData).then(() => {
		console.log('new quote written to database');
	})
})
db.collection('sampleData').doc('inspiration').get()
.then(doc =>{
	if(!doc.exists){
		console.log('No such document!');
	}

})
.catch(err => {
	console.error('Error getting document',err);
	process.exit();
})



function getQuote(){
  

}
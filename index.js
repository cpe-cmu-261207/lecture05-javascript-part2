const fs = require('fs')

//callback
fs.readFile('text.txt', {encoding: 'utf-8'}, (err, data) => {
	if (err) {
		console.log(err)
	}
	else
		console.log(data)
})

//promise
fs.promises.readFile('textee.txt', {encoding: 'utf-8'})
	.then( data => console.log(data))
	.catch( err => console.log(err))


const fetch = require('node-fetch')
fetch('https://dog.ceo/api/breeds/image/random')
	.then(resp=> resp.json())
	.then(data=> console.log(data))
	.catch(err=> console.log(err))

//async await
const loadFile = async () => {
	try{
		const data = await fs.promises.readFile('text.txt', {encoding: 'utf-8'})
		console.log(data)
	}catch(err){
		console.log(err)
	}
}
loadFile()
console.log(2)

/* Excercise
// - เขียน fetch api โดยการใช้ async await
// - fetch 2 รอบ แล้ว return array ของ url ที่ได้ออกมา
// - return example : ["https://images.dog.ceo/breeds/pomeranian/n02112018_2896.jpg",
	"https://images.dog.ceo/breeds/pomeranian/n02112018_2896.jpg"]
*/

const fetch = require('node-fetch')
const fetchDogs = async () => {
	const resp1 = await fetch('https://dog.ceo/api/breeds/image/random')
	const data1 = await resp1.json()
	const resp2 = await fetch('https://dog.ceo/api/breeds/image/random')
	const data2 = await resp2.json()
	return [data1.message, data2.message]
}
const output = await fetchDogs()
console.log(output)
( async () => console.log(await fetchDogs()) )()

//write json object to .json
const student = {
	name: 'Arm', age: 10,
	pets: [{
		name: 'Doggy', age: 2
	}]
}
const fs = require('fs')
fs.writeFileSync('student.json', JSON.stringify(student))

/*
Excercise
- fetch api : https://reqres.in/api/users
- เขียนไฟล์ users.json เอาเฉพาะคนที่มีนามสกุล >= 5 characters
- ให้มี format ดังนี้ : {
	users: [
		{
			"email": "george.bluth@reqres.in",
			"name": "George Bluth",
		},
		...
	]
}
*/

const fs = require('fs')
const fetch = require('node-fetch')

const doIt = async () => {
	const resp = await fetch('https://reqres.in/api/users')
	const data = await resp.json()
	const newData = data.data
		.filter(x => x.last_name.length >= 5)
		.map(x => {
			return {
				email: x.email,
				name: x.first_name + ' ' + x.last_name
			}
		})

	const jsonOutput = {
		users: newData
	}
	fs.writeFileSync('users.json', JSON.stringify(jsonOutput))
}

doIt()

// custom promise
function mySetTimeOutIfEven(delay){
	return new Promise( (resolve, reject) => {
		if (delay % 2 === 1){
			reject()
		}else{
			setTimeout(()=>{
				resolve()
			}, delay)
		}
	} )
}

mySetTimeOutIfEven(3000)
	.then(()=>console.log('3 sec passed'))
	.then(()=>mySetTimeOutIfEven(3001))
	.then(()=>console.log('3 sec passed'))
	.catch(()=> console.log('Please use even delay'))
// 1. Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({
    first_name: 'Kaleigh',
    last_name: 'Griffin',
    email: 'hello@gmail.com',
    gender: 'Female',
    age: 32,
    state: 'Michigan',
    children: []
  })

  // 2. Add another person. They should have at least two children.
  db.people.insertOne({
    first_name: 'Stacey',
    last_name: 'Griffin',
    email: 'hello@gmail.com',
    gender: 'Female',
    age: 45,
    state: 'Missouri',
    children: [
        {name: "Nathan", age: 25}, {name: "Alyson", age: 21}
    ]
  })

  // 3. Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne({first_name: "Clarence"},
{$set: {state: "South Dakota"}})

// 4. Update Rebecca Hayes. Remove her email address.
db.people.updateOne({first_name: "Rebecca", last_name: "Hayes"},
{ $unset: { email: 1 }})

// 5. Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({state: "Missouri"},
{$inc: {age: 1}})

// 6. Replace Jerry Baker has updated information. Replace with a new document:
db.people.replaceOne({first_name: "Jerry", last_name: "Baker"},
    { first_name: "Jerry", last_name: "Baker-Mendez", email:
      "jerry@classic.ly", gender:"Male", "age": 28, "state": "Vermont",
      "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] })

// 7. Delete Wanda Bowman.
db.people.deleteOne({first_name: "Wanda", last_name: "Bowman"})

// 8. Delete everyone who does not have an email address specified. (expect 37 matches)
db.people.deleteMany({email: null })

// 9. Add several documents to a new submissions collection. Do it all in one command.
db.submissions.insertMany([
    { title: "The River Bend", upvotes: 10, downvotes: 2, artist: db.people.find({first_name: "Anna", last_name: "Howard"})._id },
    { title: "Nine Lives", upvotes: 7, downvotes: 0, artist: db.people.find({first_name: "Scott", last_name: "Henderson"})._id },
    { title: "Star Bright", upvotes: 19, downvotes: 3, artist: db.people.find({first_name: "Andrea", last_name: "Burke"})._id },
    { title: "Why Like This?", upvotes: 1, downvotes: 5, artist: db.people.find({first_name: "Steven", last_name: "Marshall"})._id },
    { title: "Non Sequitur", upvotes: 11, downvotes: 1, artist: db.people.find({first_name: "Gerald", last_name: "Bailey"})._id }
    ])

// 10. Add 2 upvotes for "The River Bend".
db.submissions.updateOne({title: "The River Bend"},
{$inc: {upvotes: 2}})

// 11. Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany( { upvotes: { $gte: 10 } },
    { $set: { round2: true } } );
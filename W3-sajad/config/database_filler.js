const db = require('./database')


// function questionGenerator(){
//   category = Math.round(Math.random()*2) 
//   answer  = Math.round(Math.random()*3+1)
//   return [answer , category]
// }


// const categories = ['history','math','physics']
// db.serialize(()=>{
//     db.run('DELETE FROM questions',(err)=>{
//       if(err) console.log(err.message);
//       else console.log('db is empty .. ');
//     })
//     const stmt = db.prepare("INSERT INTO questions VALUES (?,?,?,?)");
//     for (let i = 1; i < 300; i++) {
//         let answer = questionGenerator()[0]
//         let category_index = questionGenerator()[1]
//         let category = categories[category_index]
//         stmt.run([i,`question number ${i}`,category,answer],(err)=>{
//           if(err)throw err
//         });
//       }
      
//     stmt.finalize((err)=>{
//       if(err) throw err
//       console.log('insertion is done .');
//     });
// })


db.all('SELECT MAX(exam_id) FROM exams',(err,rows)=>{
  if(err) throw err
  console.log(rows);
})
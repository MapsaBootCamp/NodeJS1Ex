const db = require('./database')


function questionGenerator(){
  category = Math.round(Math.random()*2) 
  answer  = Math.round(Math.random()*3+1)
  return [answer , category]
}


const categories = ['history','math','physics']
db.serialize(()=>{
    db.run('DELETE FROM questions',(err)=>{
      if(err) console.log(err.message);
      else console.log('db is empty .. ');
    })
    const stmt = db.prepare("INSERT INTO questions VALUES (?,?,?,?)");
    for (let i = 1; i < 300; i++) {
        let answer = questionGenerator()[0]
        let category_index = questionGenerator()[1]
        let category = categories[category_index]
        stmt.run([i,`question number ${i}`,category,answer],(err)=>{
          if(err)throw err
        });
      }
      
    stmt.finalize((err)=>{
      if(err) throw err
      console.log('insertion is done .');
    });
})


// db.all('SELECT MAX(exam_id),q_id,user_id FROM exams LIMIT 5',(err,rows)=>{
//   if(err) throw err
//   console.log(rows);
// })



// const row = db.all(`SELECT q.q_id,q.answer FROM questions AS q INNER JOIN 
// exams as e ON q.q_id = e.q_id WHERE e.exam_id = (SELECT MAX(exam_id),q_id,user_id FROM exams)`,(err,rows)=>{
//     if(err) throw err
//     console.log(rows);
  
//   })



// db.run(`UPDATE exams SET exam_score = ? WHERE exam_id = ? `,0.2,1,(err)=>{
//   // if(err) res.status(500).json({'error':err.message})
//   // else res.status(200).json({"answer":"your exam is recieved"})}) 
//   if(err) throw err

// })
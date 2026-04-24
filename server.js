import express from "express";
import { cities } from "./cities.js";
import { recommendTop3 } from "./engine/recommender.js";
import { explain } from "./engine/explainer.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const questions = [
  { key:"doga", text:"Doğa ister misin?" },
  { key:"eglence", text:"Eğlence önemli mi?" },
  { key:"sakinlik", text:"Sakinlik arıyor musun?" },
  { key:"kesif", text:"Keşif ister misin?" },
  { key:"sosyal", text:"Sosyal ortam ister misin?" },
  { key:"luks", text:"Lüks önemli mi?" }
];

const sessions = {};

function newSession() {
  return {
    i:0,
    profile:{doga:0,eglence:0,sakinlik:0,kesif:0,luks:0,sosyal:0}
  };
}

app.post("/api/start",(req,res)=>{
  const id = Date.now().toString();
  sessions[id] = newSession();
  res.json({sessionId:id, question:questions[0]});
});

app.post("/api/answer/:id",(req,res)=>{
  const s = sessions[req.params.id];
  const q = questions[s.i];

  s.profile[q.key]+=req.body.value;
  s.i++;

  if(s.i>=questions.length) return res.json({done:true});

  res.json({next:questions[s.i]});
});

app.get("/api/result/:id",(req,res)=>{
  const s = sessions[req.params.id];
  const recs = recommendTop3(s.profile, cities);

  res.json({
    best:recs.best,
    second:recs.second,
    surprise:recs.surprise,
    reasons:explain(s.profile,cities,recs.best.city)
  });
});

app.listen(PORT,()=>console.log("🚀 PROD READY:",PORT));
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  //SHOW DATA

  function exibir(agent){
    response.json({"fulfillmentMessages": [
      {
        "text": {
          "text": [
            "Oi eu sou o Casper o seu bot para mostrar as notícias dos seguintes temas:\n\nEsportes\nPolitica\nEntretenimento\nFamosos\n\nDigite o tema no qual deseja visualizar as notícias."
          ]
        }
      },
    ]});
  }

  function exibirPolitica(agent){
    return db.collection("noticias").get().then(function(documents){
      
   
      let resposta= "";
      let teste=[]
        let cont =0;
        let noticias=[];
        documents.forEach(function(document){
          const dataOutput = document.data();
          
          if(dataOutput.tema ==="politica"){
            
            cont++;
            noticias.push(document.data());
            
           
          }
        });//END forEach
        for (let i = 0; i < noticias.length; i++) {
                
              let a= {
                "t": noticias[i].titulo,
                "i": noticias[i].img,
                "d": noticias[i].descricao,
                "l": noticias[i].link
            }
  
              teste.push(a)
            
        
        }
        teste.sort(() => Math.random() - 0.5)
        teste = teste.slice(0, 10)
        
        response.send({"fulfillmentMessages": [
          {
            "payload": {
              "facebook": {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "elements": teste.map(key =>{
                      return{
                        
                          "subtitle": key.d,
                          "default_action": {
                              "type": "web_url",
                              "webview_height_ratio": "tall",
                              "url": key.l
                          },
                          "buttons": [
                              {
                                  "url": key.l,
                                  "type": "web_url",
                                  "title": "Acessar notícia"
                              },
                          ],
                          "image_url": key.i,
                          "title": key.t
                      
                      }
                    })
                  }
                }
                  
              }
                
            }  
          }
            
        ]});
        
        if( cont ==0){
          resposta="Desculpe não temos notícias sobre esse tema. Digite menu para retornar ao menu inicial";
        }
        agent.add(resposta);

      
    }).catch(() => {
      
      agent.add("ERRO AO RECONHECER O SERVIDOS");
      
    });//END catch
  }

 /* function exibirPolitica(agent){
    return db.collection("noticias").get().then(function(documents){
      let response = "Mostrando Noticias sobre Política";
      let cont=0;
        documents.forEach(function(document){
          const dataOutput = document.data();
          
          if(dataOutput.tema ==="politica"){
            
            cont++;
            response += "\n\n"+"titulo: "+dataOutput.titulo+"\n\n"+
            "descriçao: "+dataOutput.descricao+"\n\n"+
            "imagem: "+dataOutput.img+"\n\n"+
            "link: "+ dataOutput.link+"\n\n";
           
          } 
  });
  if( cont ==0){
    response="Desculpe não temos notícias sobre esse tema. Digite menu para retornar ao menu inicial";
  }
  agent.add(response);

})
}

*/
  function exibirFamosos(agent){
    return db.collection("noticias").get().then(function(documents){
      
   
      let resposta= "";
      let teste=[]
        let cont =0;
        let noticias=[];
        documents.forEach(function(document){
          const dataOutput = document.data();
          
          if(dataOutput.tema ==="famosos"){
            
            cont++;
            noticias.push(document.data());
            
           
          }
        });//END forEach
        for (let i = 0; i < noticias.length; i++) {
                
              let a= {
                "t": noticias[i].titulo,
                "i": noticias[i].img,
                "d": noticias[i].descricao,
                "l": noticias[i].link
            }
  
              teste.push(a)
            
        
        }
        teste.sort(() => Math.random() - 0.5)
        teste = teste.slice(0, 10)
        
        response.send({"fulfillmentMessages": [
          {
            "payload": {
              "facebook": {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "elements": teste.map(key =>{
                      return{
                        
                          "subtitle": key.d,
                          "default_action": {
                              "type": "web_url",
                              "webview_height_ratio": "tall",
                              "url": key.l
                          },
                          "buttons": [
                              {
                                  "url": key.l,
                                  "type": "web_url",
                                  "title": "Acessar notícia"
                              },
                          ],
                          "image_url": key.i,
                          "title": key.t
                      
                      }
                    })
                  }
                }
                  
              }
                
            }  
          }
            
        ]});
        
        if( cont ==0){
          resposta="Desculpe não temos notícias sobre esse tema. Digite menu para retornar ao menu inicial";
        }
        agent.add(resposta);

      
    }).catch(() => {
      
      agent.add("ERRO AO RECONHECER O SERVIDOS");
      
    });//END catch
  }


/*function exibirFamosos(agent){
  return db.collection("noticias").get().then(function(documents){
    let response = "Mostrando Noticias sobre Famosos";
    let cont=0;
      documents.forEach(function(document){
        const dataOutput = document.data();
        
        if(dataOutput.tema ==="famosos"){
          
          cont++;
          response += "\n\n"+"titulo: "+dataOutput.titulo+"\n\n"+
          "descriçao: "+dataOutput.descricao+"\n\n"+
          "imagem: "+dataOutput.img+"\n\n"+
          "link: "+ dataOutput.link+"\n\n";
         
        } 
});
if( cont ==0){
  response="Desculpe não temos notícias sobre esse tema. Digite menu para retornar ao menu inicial";
}
agent.add(response);

})
}
*/

  function exibirEsportes(agent){
    return db.collection("noticias").get().then(function(documents){
      
   
      let resposta= "";
      let teste=[]
        let cont =0;
        let noticias=[];
        documents.forEach(function(document){
          const dataOutput = document.data();
          
          if(dataOutput.tema ==="esportes"){
            
            cont++;
            noticias.push(document.data());
            
           
          }
        });//END forEach
        for (let i = 0; i < noticias.length; i++) {
                
              let a= {
                "t": noticias[i].titulo,
                "i": noticias[i].img,
                "d": noticias[i].descricao,
                "l": noticias[i].link
            }
  
              teste.push(a)
            
        
        }
        teste.sort(() => Math.random() - 0.5)
        teste = teste.slice(0, 10)
        
        response.send({"fulfillmentMessages": [
          {
            "payload": {
              "facebook": {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "elements": teste.map(key =>{
                      return{
                        
                          "subtitle": key.d,
                          "default_action": {
                              "type": "web_url",
                              "webview_height_ratio": "tall",
                              "url": key.l
                          },
                          "buttons": [
                              {
                                  "url": key.l,
                                  "type": "web_url",
                                  "title": "Acessar notícia"
                              },
                          ],
                          "image_url": key.i,
                          "title": key.t
                      
                      }
                    })
                  }
                }
                  
              }
                
            }  
          }
            
        ]});
        
        if( cont ==0){
          resposta="Desculpe não temos notícias sobre esse tema. Digite menu para retornar ao menu inicial";
        }
        agent.add(resposta);

      
    }).catch(() => {
      
      agent.add("ERRO AO RECONHECER O SERVIDOS");
      
    });//END catch
  }

  function exibirEntretenimento(agent){
    return db.collection("noticias").get().then(function(documents){
      
   
      let resposta= "";
      let teste=[]
        let cont =0;
        let noticias=[];
        documents.forEach(function(document){
          const dataOutput = document.data();
          
          if(dataOutput.tema ==="entretenimento"){
            
            cont++;
            noticias.push(document.data());
            
           
          }
        });//END forEach
        for (let i = 0; i < noticias.length; i++) {
                
              let a= {
                "t": noticias[i].titulo,
                "i": noticias[i].img,
                "d": noticias[i].descricao,
                "l": noticias[i].link
            }
  
              teste.push(a)
            
        
        }
        teste.sort(() => Math.random() - 0.5)
        teste = teste.slice(0, 10)
        
        response.send({"fulfillmentMessages": [
          {
            "payload": {
              "facebook": {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "elements": teste.map(key =>{
                      return{
                        
                          "subtitle": key.d,
                          "default_action": {
                              "type": "web_url",
                              "webview_height_ratio": "tall",
                              "url": key.l
                          },
                          "buttons": [
                              {
                                  "url": key.l,
                                  "type": "web_url",
                                  "title": "Acessar notícia"
                              },
                          ],
                          "image_url": key.i,
                          "title": key.t
                      
                      }
                    })
                  }
                }
                  
              }
                
            }  
          }
            
        ]});
        
        if( cont ==0){
          resposta="Desculpe não temos notícias sobre esse tema. Digite menu para retornar ao menu inicial";
        }
        agent.add(resposta);

      
    }).catch(() => {
      
      agent.add("ERRO AO RECONHECER O SERVIDOS");
      
    });//END catch
  } 

 /* function exibirEntretenimento(agent){
    return db.collectsion("noticias").get().then(function(documents){
      let response = "Mostrando Noticias sobre Entretenimento";
      let cont=0;
        documents.forEach(function(document){
          const dataOutput = document.data();
          
          if(dataOutput.tema ==="entretenimento"){
            
            cont++;
            response += "\n\n"+"titulo: "+dataOutput.titulo+"\n\n"+
            "descriçao: "+dataOutput.descricao+"\n\n"+
            "imagem: "+dataOutput.img+"\n\n"+
            "link: "+ dataOutput.link+"\n\n";
           
          } 
  });
  if( cont ==0){
    response="Desculpe não temos notícias sobre esse tema. Digite menu para retornar ao menu inicial";
  }
  agent.add(response);
  
  })
  }
  */

  

  function fallback(agent) {
    agent.add(`Desculpe Não entendi, Poderia repetir`);
  }
  

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', exibir);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('famosos', exibirFamosos);
  intentMap.set('politica', exibirPolitica);
  intentMap.set('esportes', exibirEsportes);
  intentMap.set('entretenimento', exibirEntretenimento);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
import { initializeApp } from "firebase/app";
import "./index.css"
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyCITYt7suNidNN8aBSkqY0BJvi04U38xq4",
  authDomain: "desafio-96b26.firebaseapp.com",
  projectId: "desafio-96b26"

});

export const App = () => {
  const [logado, setLogado] = useState("false");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [iden, setInden] = useState("");
  const [descricao, setDesricao] = useState("");
  const [img, setImg] = useState("");
  const [link, setLink] = useState("");
  const [tema, setTema] = useState("");
  const [titulo, setTitulo] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const usersCollectionRef = collection(db, "noticias");
  const boo = 'estado';
  const recovery = localStorage.getItem(boo);

  async function criarDado() {
    try {
      const noticia = await addDoc(collection(db, "noticias"), {
        descricao,
        img,
        link,
        tema,
        titulo
      });

      alert("dados salvos com sucessos", noticia);
      refresh()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getNoticias = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNoticias();
  }, []);

  async function deleteUser(id) {

    try {
      const userDoc = doc(db, "noticias", id);
      await deleteDoc(userDoc);
      alert("Deletado com Sucesso")
      refresh()
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  function refresh() {
    window.location.reload()

  }

  function btnCriar() {
    document.getElementById('criar').style.display = 'block'
    document.getElementById('pos').style.display = 'none'
    document.getElementById('tabela').style.display = 'none'
    document.getElementById('logout').style.display = 'none'
  }

  function alterar(id) {
    document.getElementById('edt').style.display = 'block'
    document.getElementById('pos').style.display = 'none'
    document.getElementById('tabela').style.display = 'none'
    document.getElementById('logout').style.display = 'none'
    const num = id
    setInden(num)
  }

  function editarDado(id) {
    const userDoc = doc(db, "noticias", id);
    const noticia = {
      descricao: descricao,
      img: img,
      link: link,
      tema: tema,
      titulo: titulo
    };

    setDoc(userDoc, noticia)
      .then(userDoc => {
        alert("Noticia Alterada com sucesso");
        refresh()
      })
      .catch(error => {
        console.log(error);
      })
  }

  function logar() {
    if (email == "adm@adm" && senha == "adm") {
      document.getElementById('login').style.display = 'none'
      document.getElementById('main').style.display = 'block'
      alert("Logado Com Sucesso")
      setLogado('true')
      localStorage.setItem(boo, 'true')
    }
    else {
      alert("E-mail ou Senha incorretos")
    }
  }
  function log() {
    
    if (recovery == 'true') {
      document.getElementById('main').style.display = 'block'
      document.getElementById('login').style.display = 'none'
    }

  }

  function exit(){
    
    localStorage.clear()
    refresh()
  }


  return (
    <div id="geral">
      <div id="login">
        <h2>LOGIN</h2>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <button id="btnLogin" onClick={ ()=>logar()}>Entrar</button>
        {setTimeout(log,0).hidden}
       
      </div>
      

      <div id="main" hidden>
        <table id='tabela' border="1" className="tab">

          <thead>
            <tr>
              <td width="16,6%"><b>Descri??ao</b></td>
              <td width="16,6%"><b>Imagem</b></td>
              <td width="16,6%"><b>Link</b></td>
              <td width="16,6%"><b>Tema</b></td>
              <td width="16,6%"><b>Titulo</b></td>
              <td width="16,6%"><b>Bot??es</b></td>

            </tr>
          </thead>

          {users.map((noticia) => {
            return (
              <tbody>
                <tr>
                  <td width="16,6%"><center>{noticia.descricao}</center></td>
                  <td width="16,6%"><center>{noticia.img}</center></td>
                  <td width="16,6%">{noticia.link}</td>
                  <td width="16,6%">{noticia.tema}</td>
                  <td width="16,6%">{noticia.titulo}</td>
                  <td width="16,6%">
                    <button id="btnDeletar" onClick={() => deleteUser(noticia.id)}>Deletar</button>
                    <button id="btnEditar" onClick={() => alterar(noticia.id)}>Editar</button>
                  </td>

                </tr>
              </tbody>

            );
          })}
        </table>

        <div id="criar" hidden>

          <h2>Cadastrar Not??cia</h2>
          <input
            type="text"
            placeholder="Descri????o"
            value={descricao}
            onChange={(e) => setDesricao(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Imagem"
            value={img}
            onChange={(e) => setImg(e.target.value)}

          />
          <br />
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}

          />
          <br />
          <select name="tema" onChange={(e) => setTema(e.target.value)}>
            <option disabled selected>Tema </option>
            <option value="esportes">Esportes </option>
            <option value="politica">Pol??tica</option>
            <option value="entretenimento">Entretenimento</option>
            <option value="famosos"> Famosos</option>
          </select>


          <br />
          <input
            type="text"
            placeholder="T??tulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}

          />
          <br />
          <button onClick={criarDado}>Criar Not??cia</button>
          <button id="btnDeletar" onClick={()=> refresh()}>Cancelar</button>
        </div>

        <div id="edt" hidden>

          <h2>Editar Not??cia</h2>
          <input
            type="text"
            placeholder="Descri????o"
            value={descricao}
            onChange={(e) => setDesricao(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Imagem"
            value={img}
            onChange={(e) => setImg(e.target.value)}

          />
          <br />
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}

          />
          <br />
          <select name="tema" onChange={(e) => setTema(e.target.value)}>
            <option disabled selected>Tema </option>
            <option value="esportes">Esportes </option>
            <option value="politica">Pol??tica</option>
            <option value="entretenimento">Entretenimento</option>
            <option value="famosos"> Famosos</option>
          </select>


          <br />
          <input
            type="text"
            placeholder="T??tulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}

          />
          <br />
          <button onClick={() => editarDado(iden)}>Editar Not??cia</button>
          <button id="btnDeletar" onClick={()=> refresh()}>Cancelar</button>
        </div>

        <div id="pos">
          <button id="btnCriar" onClick={() => btnCriar()}> Criar<br />Not??cia</button>
        </div>
        <div id="logout">
          <button id="btnSair" onClick={() => exit()}> Sair</button>
        </div>



      </div>
    </div>
  );


}
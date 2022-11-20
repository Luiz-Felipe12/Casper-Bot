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
  const [iden, setInden] = useState("");
  const [descricao, setDesricao] = useState("");
  const [img, setImg] = useState("");
  const [link, setLink] = useState("");
  const [tema, setTema] = useState("");
  const [titulo, setTitulo] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const usersCollectionRef = collection(db, "noticias");

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
  }
  
  function alterar(id){
    document.getElementById('edt').style.display = 'block'
    document.getElementById('pos').style.display = 'none'
    const num= id
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



  return (
    <div>
      <table id='tabela' border="1">
        <tr>
          <td><b>Descriçao</b></td>
          <td><b>Imagem</b></td>
          <td><b>Link</b></td>
          <td><b>Tema</b></td>
          <td><b>Titulo</b></td>
          <td><b>Botões</b></td>

        </tr>
        {users.map((noticia) => {
          return (
            <tr>
              <td>{noticia.descricao}</td>
              <td>{noticia.img}</td>
              <td>{noticia.link}</td>
              <td>{noticia.tema}</td>
              <td>{noticia.titulo}</td>
              <td>
                <button onClick={() => deleteUser(noticia.id)}>Deletar</button>
                <button onClick={() => alterar(noticia.id)}>Editar</button>
              </td>

            </tr>
          );
        })}
      </table>

      <div id="criar" hidden>

        <h2>Cadastrar Notícia</h2>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDesricao(e.target.value)}
        />
        <input
          type="text"
          placeholder="Imagem"
          value={img}
          onChange={(e) => setImg(e.target.value)}

        />

        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}

        />
        <label htmlFor="Tema"> Tema:
          <select name="tema" onChange={(e) => setTema(e.target.value)}>
            <option disabled selected>Selecione </option>
            <option value="esportes">Esportes </option>
            <option value="politica">Política</option>
            <option value="entretenimento">Entretenimento</option>
            <option value="famosos"> Famosos</option>
          </select>
        </label>


        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}

        />
        <button onClick={criarDado}>Criar Notícia</button>
      </div>

      <div id="edt" hidden>

        <h2>Editar Notícia</h2>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDesricao(e.target.value)}
        />
        <input
          type="text"
          placeholder="Imagem"
          value={img}
          onChange={(e) => setImg(e.target.value)}

        />

        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}

        />
        <label htmlFor="Tema"> Tema:
          <select name="tema" onChange={(e) => setTema(e.target.value)}>
            <option disabled selected>Selecione </option>
            <option value="esportes">Esportes </option>
            <option value="politica">Política</option>
            <option value="entretenimento">Entretenimento</option>
            <option value="famosos"> Famosos</option>
          </select>
        </label>


        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}

        />
        <button onClick={() => editarDado(iden)}>Editar Notícia</button>
      </div>

      <div id="pos">
        <button name="cent" onClick={() => btnCriar()}> Criar Notícias</button>
      </div>



    </div>
  );


}
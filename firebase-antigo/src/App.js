import { useState, useEffect } from 'react';
import { db, auth } from './firebaseConnection';
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import './app.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
      let listaPost = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(listaPost);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setUserDetail({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(false);
        setUserDetail({});
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleAdd() {
    try {
      await addDoc(collection(db, 'posts'), { titulo, autor });
      console.log('Cadastrado com sucesso');
      setTitulo('');
      setAutor('');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  }

  async function buscarPost() {
    try {
      const snapshot = await getDocs(collection(db, 'posts'));
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  }

  async function editarPost() {
    if (!idPost) {
      alert('Digite um ID válido');
      return;
    }
    try {
      await updateDoc(doc(db, 'posts', idPost), { titulo, autor });
      console.log('Post atualizado!');
      setIdPost('');
      setTitulo('');
      setAutor('');
    } catch (error) {
      console.error('Erro ao atualizar o post:', error);
    }
  }

  async function excluirPost(id) {
    try {
      await deleteDoc(doc(db, 'posts', id));
      alert('Post deletado com sucesso');
    } catch (error) {
      console.error('Erro ao excluir post:', error);
    }
  }

  async function novoUsuario() {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      console.log('Cadastrado com sucesso');
      setEmail('');
      setSenha('');
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        alert('Senha muito fraca.');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('Email já existe!');
      } else {
        console.error('Erro ao cadastrar usuário:', error);
      }
    }
  }

  async function logarUsuario() {
    try {
      const value = await signInWithEmailAndPassword(auth, email, senha);
      console.log('Usuário logado com sucesso', value.user);
      setUser(true);
      setUserDetail({ uid: value.user.uid, email: value.user.email });
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  async function fazerLogout() {
    await signOut(auth);
    setUser(false);
    setUserDetail({});
  }

  return (
    <div>
      <h1>React JS + Firebase</h1>
      {user && (
        <div>
          <strong>Seja bem-vindo(a)! Você está logado.</strong>
          <br />
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span>
          <br />
          <button onClick={fazerLogout}>Sair</button>
        </div>
      )}
      <div className="container">
        <h2>Usuários</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite um email" />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha" />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Login</button>
      </div>
      <hr />
      <div className="container">
        <h2>Posts</h2>
        <input placeholder='ID do post' value={idPost} onChange={(e) => setIdPost(e.target.value)} />
        <textarea placeholder='Título' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input placeholder='Autor' value={autor} onChange={(e) => setAutor(e.target.value)} />
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar</button>
        <button onClick={editarPost}>Atualizar</button>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>ID: {post.id}</strong>
              <br />
              <span>Título: {post.titulo}</span>
              <br />
              <span>Autor: {post.autor}</span>
              <br />
              <button onClick={() => excluirPost(post.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
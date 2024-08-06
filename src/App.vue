<template>
    <div id="app">
      <h1>Chat com o Chef de Cozinha AI</h1>
      <div id="blocoFora">
        <div id="outputArea1"></div>
        <div id="outputArea2"></div>
        <div id="inputArea">
          <input v-model="userInput" type="text" id="userInput" placeholder="Digite sua pergunta..." />
          <button @click="sendMessage" id="sendMessage">Enviar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        userInput: ''
      };
    },
    methods: {
      async sendMessage() {
        const outputArea1 = document.getElementById('outputArea1');
        const outputArea2 = document.getElementById('outputArea2');
  
        if (this.userInput) {
          const userMessageDiv = document.createElement('div');
          userMessageDiv.textContent = `Você: ${this.userInput}`;
          outputArea1.appendChild(userMessageDiv);
  
          try {
            const response = await fetch('/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: this.userInput }),
            });
  
            const data = await response.json();
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.textContent = `Chef de Cozinha AI: ${data.response}`;
            outputArea2.appendChild(aiMessageDiv);
          } catch (error) {
            console.error('Error:', error);
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Erro ao obter resposta do Chef de Cozinha AI.';
            outputArea2.appendChild(errorDiv);
          }
  
          this.userInput = '';
        }
      }
    }
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    margin: 0;
    padding: 20px;
  }
  h1 {
    color: #4d749d;
    align-content: center;
    background-color: #6ab7c5;
    width: 100%;
    height: 70px;
    margin: 0px;
    text-align: center;
  }
  #userInput {
    width: 75%;
    height: 30px;
  }
  #inputArea {
    margin-top: 20px;
    text-align: center;
  }
  #blocoFora {
    width: 100%;
    margin: 0px;
    display: grid;
  }
  #outputArea1 {
    margin-top: 20px;
    margin-left: 100px;
    text-align: start;
    border: 1px solid #ddd;
    background-color: #b6d7f2;
    width: 700px;
  }
  #outputArea2 {
    margin-top: 20px;
    margin-right: 100px;
    text-align: end;
    border: 1px solid #ddd;
    background-color: #7cbcc5;
    width: 700px;
    display: flex;
    justify-self: right;
  }
  #sendMessage {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #6fb3c4;
    color: white;
    border: none;
    cursor: pointer;
    width: 150px;
  }
  #sendMessage:hover {
    background-color: #7cc4d6;
  }
  </style>
  
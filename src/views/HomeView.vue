<template>
  <div class="container">
    <h1>Esteganografía</h1>

    <!-- Subir imagen y ocultar mensaje -->
    <form @submit.prevent="hideMessage">
      <input type="file" @change="onFileChange" accept="image/*" required />
      <input type="text" v-model="message" placeholder="Mensaje a ocultar" required />
      <button type="submit">Ocultar Mensaje</button>
    </form>

    <div v-if="stegoImage">
      <h2>Imagen con mensaje oculto</h2>
      <img :src="stegoImage" alt="Imagen procesada" />
      <a :href="stegoImage" download="stego.png">Descargar</a>
    </div>

    <!-- Subir imagen para revelar mensaje -->
    <form @submit.prevent="revealMessage">
      <input type="file" @change="onRevealFileChange" accept="image/*" required />
      <button type="submit">Revelar Mensaje</button>
    </form>

    <div v-if="revealedMessage">
      <h2>Mensaje Oculto:</h2>
      <p>{{ revealedMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: null,
      message: "",
      stegoImage: null,
      revealFile: null,
      revealedMessage: "",
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async hideMessage() {
      if (!this.file || !this.message) return alert("Selecciona una imagen y un mensaje");

      let formData = new FormData();
      formData.append("image", this.file);
      formData.append("message", this.message);

      try {
        const response = await axios.post("http://localhost:3000/hide-message", formData, {
          responseType: "blob",
        });

        // Convertir la respuesta a una URL de imagen
        this.stegoImage = URL.createObjectURL(response.data);
      } catch (error) {
        console.error("Error ocultando mensaje", error);
      }
    },
    onRevealFileChange(event) {
      this.revealFile = event.target.files[0];
    },
    async revealMessage() {
      if (!this.revealFile) return alert("Selecciona una imagen");

      let formData = new FormData();
      formData.append("image", this.revealFile);

      try {
        const response = await axios.post("http://localhost:3000/reveal-message", formData);
        this.revealedMessage = response.data.message;
      } catch (error) {
        console.error("Error revelando mensaje", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
input, button {
  display: block;
  margin: 10px auto;
}
img {
  max-width: 300px;
  margin: 10px auto;
}
</style>

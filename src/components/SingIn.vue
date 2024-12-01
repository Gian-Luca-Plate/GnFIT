<script>
import { supabase } from "@/client/supabase";
import { provide } from "vue";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    // Login-Methode
    async loginAcc() {
      try {
        const { data: user, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });

        if (error) throw error;

        this.successMessage = "Erfolgreich eingeloggt!";
        console.log("Benutzer erfolgreich eingeloggt:", user);

        // Aufgaben des angemeldeten Benutzers abrufen
        if (user && user.user && user.user.id) {
          console.log("Benutzer-ID:", user.user.id);
          localStorage.setItem("userID", user.user.id);
        }
      } catch (error) {
        this.errorMessage = error.message;
        console.error("Fehler beim Login:", error);
      }
    },
  },
};
</script>

<template>
  <div id="login">
    <img src="@/assets/Log.png" class="logoForms" />
    <div style="font-size: 16px; font-weight: bold">Login on an account</div>
    <br />
    <div class="FormsSing">
      <input
        type="email"
        v-model="email"
        class="inputForms"
        placeholder="example@domain.com"
      />
      <input
        type="password"
        v-model="password"
        class="inputForms"
        placeholder="ABc123@!"
      />
      <router-link to="/home" style="text-decoration: none">
        <button type="button" @click="loginAcc" class="createButton">
          Login
        </button>
      </router-link>
    </div>
    <br>
    <router-link to="/">I already have an Account</router-link>
  </div>
</template>
<style>
#login {
  display: flex;
  flex-direction: column;
  align-items: center; /* Zentriert den Inhalt horizontal */
  justify-content: center; /* Zentriert den Inhalt vertikal */
  height: 100vh; /* Stellt sicher, dass der Container die volle Höhe des Viewports einnimmt */
  position: relative; /* Ermöglicht die Positionierung mit top */
  bottom: 100px; /* Verschiebt den Container 30px nach unten */
}

.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 327px;
  height: 40px;
  background-color: #eeeeee;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0 10px;
  color: black;
}

.logo {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background: none;
}

.custom-button:hover {
  background-color: #dddddd;
}

.FormsSing {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logoForms {
  width: 162px;
  height: 170px;
}

.createButton {
  display: flex;
  justify-content: center; /* Zentriert den Text im Button horizontal */
  align-items: center; /* Zentriert den Text im Button vertikal */
  background-color: #2e5266;
  width: 327px;
  height: 40px;
  border-radius: 8px;
  border: none;
  color: white; /* Textfarbe im Button */
  font-size: 16px; /* Schriftgröße */
  text-align: center; /* Stellen Sie sicher, dass der Text im Button zentriert ist */
}

.inputForms {
  margin-bottom: 10px;
  width: 305px;
  height: 38px;
  border: 1px solid #2e5266; /* Rahmen */
  border-radius: 8px;
  background-color: #6e8898; /* Hellerer Hintergrund */
  color: #ffffff; /* Textfarbe */
  padding: 0 10px; /* Sorgt für etwas Abstand zwischen Text und Rand */
  text-align: center; /* Zentriert den Text im Input */
}

.inputForms::placeholder {
  text-align: center; /* Zentriert den Placeholder-Text */
  color: #cbd6cc; /* Optional: Passe die Farbe des Placeholders an */
  font-size: 14px;
  font-weight: initial;
}
</style>
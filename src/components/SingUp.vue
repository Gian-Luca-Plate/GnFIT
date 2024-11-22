<template>
    <div id="singUp">
        <input type="email" v-model="email" />
        <input type="password" v-model="password" />
        <router-link to="/"><button type="button" @click="createAcc">Cotinue</button></router-link>
    </div>
</template>

<script>
import { supabase } from "@/client/supabase";
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },

    methods: {
        async createAcc() {
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: this.email,
                    password: this.password,
                });
                if (error) throw error;
                console.log("s erfolg");
            } catch (error) {
                console.log(error.message);
            }
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

<style></style>
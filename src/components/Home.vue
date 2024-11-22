<script>
import { supabase } from "@/client/supabase";
export default {
  data() {
    return {
      userID: "",
      showTextTodoFielt: false,
      PUs: 0,//PushUps
      SITs:0,//SitUps
      CURs:0,//Curls
      
    };
  },
  created() {
    this.fetchTasks()
    localStorage.setItem("AoutoLogin", "yes");
  },
  methods: {
    async fetchTasks() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;

        if (!user || !user.id) {
          console.error("Benutzer nicht angemeldet.");
          this.errorMessage = "Benutzer nicht angemeldet.";
          return;
        }

        this.userID = user.id;
        console.log("Benutzer-ID:", this.userID);

        const { data: Todos, error: fetchError } = await supabase
          .from("Todos")
          .select("*")
          .eq("user_id", this.userID);

        if (fetchError) throw fetchError;

        if (!Todos || Todos.length === 0) {
          console.log("Keine Aufgaben gefunden.");
          return;
        }

        this.PUs = Number(this.PUs)  + Number(Todos[0].PushUp)
        this.PUs = Number(this.SITs)  + Number(Todos[0].SitUps)
        this.PUs = Number(this.CURs)  + Number(Todos[0].Curls)
        
      } catch (error) {
        this.errorMessage =
          "Fehler beim Abrufen der Aufgaben: " + error.message;
        console.error("Fehler beim Abrufen der Aufgaben:", error);
      }
    },

    async updateRow() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;

        if (!user || !user.id) {
          console.error("Benutzer nicht angemeldet.");
          this.message = "Benutzer nicht angemeldet.";
          return;
        }

        const userID = user.id;
        console.log("Benutzer-ID für Update:", userID);

        const { data, error: updateError } = await supabase
          .from("Todos")
          .update({ PushUp: this.PUs }) // Neue Werte setzen
          .eq("user_id", userID); // Bedingung: Benutzer-ID

        if (updateError) throw updateError;

        console.log("Erfolgreich aktualisiert:", data);
        this.message = "Erfolgreich aktualisiert!";
      } catch (error) {
        console.error("Fehler beim Aktualisieren:", error.message);
        this.message = `Fehler: ${error.message}`;
      }
    },
   addPUs(){
    this.PUs += 10
    this.updateRow()
   }
  },
};
</script>

<template>
  <div id="home">

    {{ PUs }}
    {{ SITs }}
    {{ CURs }}
    <button @click="addPUs">+ 10 PuschUp</button>
  </div>
</template>



<style>
</style>
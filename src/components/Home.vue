<script>
import { supabase } from "@/client/supabase";
export default {
  data() {
    return {
      userID: "",
      showTextTodoFielt: false,
      PUs: 0, //PushUps
      SITs: 0, //SitUps
      CURs: 0, //Curls
      SQUAs:0,//Squads
      day:''
    };
  },
  mounted() { // wird aus gefürt wenn seite zum ersten mal geöfnet wird 
    this.getDate()
    localStorage.setItem("AoutoLogin", "no");
    setTimeout(() =>{
      this.userID = localStorage.getItem("userID").toString();
      this.fetchTasks()
    },300)
   
   
  },
  methods: {
    async fetchTasks() { // holt die aufgaben 
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;

        if (!user || !user.id) { // check ob benutzer angemeldt ist 
          console.error("Benutzer nicht angemeldet.");
          this.errorMessage = "Benutzer nicht angemeldet.";
          return;
        }

        const { data: Todos, error: fetchError } = await supabase // daten werden vom server geladen 
          .from("Todos")
          .select("*")
          .eq("user_id", this.userID);

        if (!Todos || Todos.length === 0) { // falss keine vorhandene row wird eine erstellt 
          try {
            const { error: userError } = await supabase.auth.getUser();

            if (userError) throw userError;

            // Neue Aufgabe zur Datenbank hinzufügen
            const { error } = await supabase
              .from("Todos")
              .insert([{ user_id: this.userID }]);

            if (error) throw error;
          } catch (error) {
            this.errorMessage = error.message;
            console.error("Fehler beim Hinzufügen der Aufgabe:", error);
          }
        }
        console.log(Todos[0])
        // varbirablen mit server daten glkaich stellen 
        this.PUs = Number(this.PUs) + Number(Todos[0].PushUp);
        this.SITs = Number(this.SITs) + Number(Todos[0].SitUps);
        this.CURs = Number(this.CURs) + Number(Todos[0].Curls);
        this.SQUAs = Number(this.SQUAs) + Number(Todos[0].Squads)
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
          console.error("Benutzer nicht angemeldet")
        }

        const { data, error: updateError } = await supabase
          .from("Todos")
          .update({ PushUp: this.PUs, SitUps: this.SITs, Curls: this.CURs , Squads:this.SQUAs,  }) // Neue Werte setzen
          .eq("user_id", this.userID); // Bedingung: Benutzer-ID

        if (updateError) throw updateError;

      } catch (error) {
        console.error("Fehler beim Aktualisieren:", error.message);
      }
    },
    getDate(){
      const today = new Date();
      this.day= new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',  // Kurzer Wochentag, z. B. "Mo"
        day: 'numeric',    // Tag des Monats, z. B. "1"
        month: 'short'     // Kurzer Monatsname, z. B. "Dec"
      }).format(today);
    },
    addPUs() {
      this.PUs += 10;
      this.updateRow();
    },
    addCURs() {
      this.CURs += 10;
      this.updateRow();
    },
    addSITs() {
      this.SITs += 10;
      this.updateRow();
    },
    addSQUAs(){
      this.SQUAs += 10 
      this.updateRow()
    }
  },
};
</script>
<template>
  <div id="home">
    <div class="containerUbungen">
      <p>PuschUps</p>
      <div id="pusDIV">{{ PUs }}/100</div>
      <button @click="addPUs">+ 10 PuschUp</button>
    </div>
    <br>
    <div class="containerUbungen">
      <p>SitUps</p>
      <div id="sitsDIV">{{ SITs }}/100</div>
      <button @click="addSITs">+ 10 SitUps</button>
    </div>
    <br>
    <div class="containerUbungen">
      <p>Curls</p>
      <div id="curs-squasDIV">{{ CURs }}/100</div>
      <button @click="addCURs">+ 10 Curls</button>
    </div>
    <br>
    <div class="containerUbungen">
      <p>Squads</p>
      <div id="curs-squasDIV">{{ SQUAs }}/100</div>
      <button @click="addSQUAs">+ 10 Squads</button>
    </div>
  </div>
</template>



<style>
.settingButton {
  float: right;
  color: #2e5266;
}
.containerUbungen {
  display: flex;
  justify-content: space-between;
  background-color: #2e5266;
  height: 70px;
  border-radius: 8px;
 
  
}
.containerUbungen p{
  color: white;
  background-color: #2e5266;
  margin: 25px;
  border-radius: 8px;
}
#pusDIV{
  color: white;
  background-color: #2e5266;
  margin-top: 25px;
  border-radius: 8px;
}
#sitsDIV{
  color: white;
  background-color: #2e5266;
  margin-top: 25px;
  border-radius: 8px;
  margin-left: 20px;
}
#curs-squasDIV{
  color: white;
  background-color: #2e5266;
  margin-top: 25px;
  border-radius: 8px;
  margin-left: 25px;
}
.containerUbungen button{
  width: 106.22px;
  color: #2e5266;
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  height: 50px;
  font-weight: 900
  
}
</style>
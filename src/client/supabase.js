import { createClient } from '@supabase/supabase-js';



const supabaseUrl = 'https://fwxajlxqkuhnyvclyjak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3eGFqbHhxa3Vobnl2Y2x5amFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1ODQyMzIsImV4cCI6MjA0NzE2MDIzMn0.oSub7jWk9aEwCCZDhenPiPxcaWw6hV-DFEwnwMUhlSw'
export const supabase = createClient(supabaseUrl, supabaseKey)
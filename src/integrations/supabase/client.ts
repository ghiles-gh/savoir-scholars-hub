
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://udbipapawdkpqtablrrh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkYmlwYXBhd2RrcHF0YWJscnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNTg1OTgsImV4cCI6MjA1NjkzNDU5OH0.UE2M7wmZE5NPfQix1llXPnkqrPsW0lK617Nx3_R6Grc";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY
);

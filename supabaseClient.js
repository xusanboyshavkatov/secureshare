// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afavfaytvbacrfriesik.supabase.co'; // o'zingnikini yoz
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmYXZmYXl0dmJhY3Jmcmllc2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMTA2NTIsImV4cCI6MjA2MTU4NjY1Mn0.hiYJpyNIjs4F050gIEzv5B5KLbXVWeqCwr4u21xDhgk'; // yoki service_role agar serverda ishlatsang

export const supabase = createClient(supabaseUrl, supabaseKey);

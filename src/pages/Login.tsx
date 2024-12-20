import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Session found:", session);
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .maybeSingle();

        if (profile?.is_admin) {
          console.log("Admin user confirmed, redirecting to dashboard");
          navigate("/");
        } else {
          console.log("Non-admin user, showing error");
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have admin privileges.",
          });
          await supabase.auth.signOut();
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in:", session.user.email);
        
        // First ensure profile exists
        const { error: upsertError } = await supabase
          .from("profiles")
          .upsert({ 
            id: session.user.id,
            email: session.user.email,
            updated_at: new Date().toISOString()
          });

        if (upsertError) {
          console.error("Error upserting profile:", upsertError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create user profile.",
          });
          return;
        }

        // Then check if admin
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .maybeSingle();

        if (profile?.is_admin) {
          console.log("Admin user confirmed, redirecting to dashboard");
          navigate("/", { replace: true });
        } else {
          console.log("Non-admin user, showing error");
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have admin privileges.",
          });
          await supabase.auth.signOut();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-dashboard-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-dashboard-card p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Dashboard Login</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: '#1d4ed8',
                  inputBackground: 'white',
                  inputText: 'black',
                  inputPlaceholder: 'darkgray',
                }
              }
            },
            style: {
              button: { background: '#2563eb', color: 'white' },
              anchor: { color: '#2563eb' },
              container: { color: 'white' },
              message: { color: 'white' },
              label: { color: 'white' }
            }
          }}
          providers={[]}
          view="sign_in"
          showLinks={false}
        />
      </div>
    </div>
  );
};

export default Login;
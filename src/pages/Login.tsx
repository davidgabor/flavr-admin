import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("Session found:", session);
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .maybeSingle();

          console.log("Profile data:", profile);

          if (profile?.is_admin) {
            console.log("Admin user confirmed, redirecting to dashboard");
            navigate("/", { replace: true });
          } else {
            console.log("Non-admin user, showing error");
            await supabase.auth.signOut();
          }
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while checking your session.",
        });
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in:", session.user.email);
        
        try {
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

          console.log("Profile data after sign in:", profile);

          if (profile?.is_admin) {
            console.log("Admin user confirmed, redirecting to dashboard");
            navigate("/", { replace: true });
          } else {
            console.log("Non-admin user, showing error");
            await supabase.auth.signOut();
          }
        } catch (error) {
          console.error("Error in auth state change handler:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "An error occurred while processing your login.",
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="absolute inset-0 bg-dashboard-background flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dashboard-accent/20 via-dashboard-background to-dashboard-background">
      <div className="w-full max-w-md backdrop-blur-sm bg-dashboard-card/95 p-8 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-white/5">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-judson text-white mb-2">Welcome Back</h1>
            <p className="text-dashboard-muted text-sm">Sign in to access your admin dashboard</p>
          </div>

          <Alert variant="destructive" className="mb-4 bg-red-950/50 border-red-900/50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              This dashboard is restricted to admin users only. If you need access, please contact your administrator.
            </AlertDescription>
          </Alert>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#F97316',
                    brandAccent: '#EA580C',
                    inputBackground: 'rgba(255, 255, 255, 0.05)',
                    inputText: 'white',
                    inputPlaceholder: '#71717A',
                    inputBorder: 'rgba(255, 255, 255, 0.1)',
                    inputBorderFocus: '#F97316',
                  }
                }
              },
              style: {
                button: { 
                  background: '#F97316',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '14px',
                  padding: '10px 15px',
                  height: '42px',
                },
                anchor: { 
                  color: '#F97316',
                  fontSize: '14px',
                },
                container: { 
                  color: 'white',
                },
                message: { 
                  color: 'white',
                  fontSize: '14px',
                },
                label: { 
                  display: 'none',
                },
                input: {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '10px 15px',
                  height: '42px',
                  fontSize: '14px',
                }
              }
            }}
            providers={[]}
            view="sign_in"
            showLinks={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
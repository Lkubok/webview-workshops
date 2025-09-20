function AuthGate({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [redirected, setRedirected] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!accessToken && !redirected) {
      setRedirected(true);
      router.replace("/login");
    }
  }, [mounted, accessToken, redirected]);

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
}

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-center bg-fixed">
      {children}
    </div>
  );
};

export default Layout;

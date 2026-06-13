const PreLaunchBanner = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a
      href="#register"
      onClick={handleClick}
      className="block w-full bg-accent text-accent-foreground text-center text-xs md:text-sm py-2.5 px-4 hover:bg-accent/80 transition-colors border-b border-border/50"
    >
      Bookings opening soon across Greater Sydney —{" "}
      <span className="underline underline-offset-2 font-medium">
        register your interest below
      </span>
      .
    </a>
  );
};

export default PreLaunchBanner;

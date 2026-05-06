/* ───────── App shell & routing ───────── */

function App() {
  const baseRoute = (h) => h.split("/")[0].split("#")[0];
  const [route, setRoute] = useState(() => {
    const h = (location.hash || "#home").replace("#","");
    const r = baseRoute(h);
    return ["home","solutions","about","blog","contact","protection"].includes(r) ? r : "home";
  });

  const go = (id, anchor) => {
    setRoute(id);
    const newHash = "#" + id + (anchor ? "#" + anchor : "");
    // location.hash assignment fires hashchange (replaceState does not).
    // We need hashchange so BlogPage's slug listener clears when navigating away from articles.
    if (location.hash !== newHash) {
      location.hash = newHash;
    }
    if (anchor) {
      // Wait for React to mount the new route, then scroll to the anchor.
      // Double RAF guarantees the new <main> is painted before getElementById.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          else window.scrollTo({ top: 0, behavior: "instant" });
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  useEffect(() => {
    const onHash = () => {
      const h = (location.hash || "#home").replace("#","");
      const r = baseRoute(h);
      if (["home","solutions","about","blog","contact","protection"].includes(r)) setRoute(r);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Tweakable bindings (accentColor, titleWeight, sectionBg, watermark)
  useEffect(() => {
    const t = window.TWEAKS || {};
    if (t.accentColor) document.documentElement.style.setProperty("--wir-amber", t.accentColor);
    if (t.titleWeight) document.documentElement.style.setProperty("--title-weight", t.titleWeight);
  }, []);

  let Page = null;
  if (route === "home") Page = <HomePage go={go}/>;
  if (route === "solutions") Page = <SolutionsPage go={go}/>;
  if (route === "about") Page = <AboutPage go={go}/>;
  if (route === "blog") Page = <BlogPage go={go}/>;
  if (route === "contact") Page = <ContactPage go={go}/>;
  if (route === "protection") Page = <DataProtectionPage go={go}/>;

  return (
    <>
      <Nav route={route} go={go}/>
      <main key={route}>{Page}</main>
      <Footer go={go}/>
      <WhatsappFab/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App/>);

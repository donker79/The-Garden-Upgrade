(function () {
  const GA4_ID = "G-XXXXXXXXXX";
  const hasRealId = /^G-[A-Z0-9]+$/.test(GA4_ID) && GA4_ID !== "G-XXXXXXXXXX";

  if (hasRealId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID);
  }

  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "cta_click", {
          event_category: "engagement",
          event_label: el.getAttribute("data-track") || "unknown"
        });
      }
    });
  });
})();

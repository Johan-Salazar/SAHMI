
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("#sidebar a");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href").substring(1);
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    });
  });

  const toggleButton = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});

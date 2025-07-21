// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll animation
const fadeElements = document.querySelectorAll(".fade-in");

const fadeInOnScroll = () => {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Initial check
fadeInOnScroll();

// Check on scroll
window.addEventListener("scroll", fadeInOnScroll);

// Testimonial slider
let currentTestimonial = 0;
const testimonials = [
  {
    quote:
      "Contratar o +Drinks foi a melhor decisão para nosso casamento. Os drinks eram lindos e deliciosos, e o sistema de matéria prima nos fez economizar bastante sem perder qualidade.",
    name: "Mariana e Rodrigo",
    event: "Casamento",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    quote:
      "Profissionalismo, criatividade e atendimento impecável em todos os detalhes.",
    name: "Fernanda Costa",
    event: "Evento Corporativo",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function changeTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonial();
}

function updateTestimonial() {
  const testimonial = testimonials[currentTestimonial];
  const slide = document.querySelector(".testimonial-slide");

  slide.innerHTML = `
                <p>${testimonial.quote}</p>
                <div class="client-info">
                    <img src="${testimonial.img}" alt="Cliente">
                    <div>
                        <div class="client-name">${testimonial.name}</div>
                        <div class="client-event">${testimonial.event}</div>
                    </div>
                </div>
            `;

  // Add fade-in class for animation
  slide.classList.add("fade-in");

  // Remove fade-in class after animation completes
  setTimeout(() => {
    slide.classList.remove("fade-in");
  }, 1000);
}

// Change testimonial every 5 seconds
setInterval(changeTestimonial, 5000);

function enviarForm(e) {
  e.preventDefault();

  // Coletar dados do formulário
  const name = document.getElementById("name").value;
  const eventType = document.getElementById("event-type").value;
  const eventDate = document.getElementById("event-date").value;
  const guests = document.getElementById("guests").value;
  const eventLocation = document.getElementById("event-location").value;
  const eventTime = document.getElementById("event-time").value;

  // Validação básica dos campos
  if (
    !name ||
    !eventType ||
    !eventDate ||
    !guests ||
    !eventLocation ||
    !eventTime
  ) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Formatando a data e hora para exibição
  let formattedDate = "Não informada";
  let formattedTime = "Não informado";

  try {
    if (eventDate) {
      const dateObj = new Date(eventDate);
      if (!isNaN(dateObj.getTime())) {
        formattedDate = dateObj.toLocaleDateString("pt-BR");
      }
    }

    if (eventTime) {
      // Formata o horário no formato HH:MM
      const [hours, minutes] = eventTime.split(":");
      formattedTime = `${hours}:${minutes}`;
    }
  } catch (error) {
    console.error("Erro ao formatar data/hora:", error);
  }

  // Criar mensagem para WhatsApp
  const whatsappMessage =
    `*Nova Solicitação de Orçamento - +Drinks*%0A%0A` +
    `*Nome:* ${name}%0A` +
    `*Tipo de Evento:* ${eventType}%0A` +
    `*Data do Evento:* ${formattedDate}%0A` +
    `*Horário do Evento:* ${formattedTime}%0A` +
    `*Local do Evento:* ${eventLocation}%0A` +
    `*Número de Convidados:* ${guests}%0A`;

  // Número de telefone
  const whatsappNumber = "554499194205";

  // URL do WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Abrir WhatsApp
  try {
    window.open(whatsappUrl, "_blank");
  } catch (error) {
    console.error("Erro ao abrir WhatsApp:", error);
    alert("Não foi possível abrir o WhatsApp. Por favor, tente novamente.");
    return;
  }

  // Resetar o formulário
  e.target.reset();

  // Mostrar mensagem de sucesso
  alert(
    "Obrigado pelo seu contato! Você será redirecionado para o WhatsApp para concluir sua solicitação."
  );
}

// Adicionar o event listener ao formulário quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("budget-form");
  if (form) {
    form.addEventListener("submit", enviarForm);
  }
});

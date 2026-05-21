const canvas = document.querySelector(".network-canvas");
const ctx = canvas.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let width = 0;
let height = 0;
let points = [];

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(28, Math.min(78, Math.floor(width / 18)));
  points = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    if (!reducedMotion) {
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
    }

    for (let j = i + 1; j < points.length; j += 1) {
      const other = points[j];
      const distance = Math.hypot(point.x - other.x, point.y - other.y);

      if (distance < 150) {
        ctx.strokeStyle = `rgba(88, 183, 255, ${0.12 * (1 - distance / 150)})`;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = "rgba(57, 217, 138, 0.42)";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!reducedMotion) {
    requestAnimationFrame(draw);
  }
}

resizeCanvas();
draw();

window.addEventListener("resize", () => {
  resizeCanvas();
  if (reducedMotion) draw();
});

const contactModal = document.querySelector("[data-contact-modal]");
const contactOpenButtons = document.querySelectorAll("[data-contact-open]");
const contactCloseButtons = document.querySelectorAll("[data-contact-close]");

function openContactModal() {
  contactModal?.classList.add("is-open");
  contactModal?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeContactModal() {
  contactModal?.classList.remove("is-open");
  contactModal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

contactOpenButtons.forEach((button) => {
  button.addEventListener("click", openContactModal);
});

contactCloseButtons.forEach((button) => {
  button.addEventListener("click", closeContactModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeContactModal();
  }
});

const translations = {
  pt: {
    htmlLang: "pt-PT",
    title: "Rafael Rino | Cibersegurança e Redes",
    metaDescription: "CV online de Rafael Rino, perfil técnico em cibersegurança, redes, administração de sistemas e IT Support.",
    navLabel: "Navegação principal",
    languageLabel: "Escolher idioma",
    nav: ["Experiência", "Formação", "Académicos", "Empresariais", "Competências"],
    heroEyebrow: "Leiria, Portugal · IT Support · Cibersegurança · Redes",
    heroLead: "Profissional com experiência militar em segurança operacional e foco atual em cibersegurança, redes, administração de sistemas, infraestrutura e suporte técnico.",
    heroActionsLabel: "Ações principais",
    contactButton: "Contactar",
    downloadCv: "Descarregar CV",
    profileLabel: "Resumo profissional",
    photoAlt: "Fotografia profissional de Rafael Rino",
    quickStats: [
      ["Experiência militar", "7 anos"],
      ["Carta de condução", "Categoria B"],
      ["Área atual", "Cibersegurança"],
      ["Educação técnica IT", "2 anos"],
      ["Línguas", "PT nativo · EN C1"]
    ],
    profileTitle: "Perfil",
    profileParagraphs: [
      "Profissional de Leiria com experiência como Operador Tático da Polícia Aérea em missões de segurança, proteção de infraestruturas, exercícios conjuntos e operações no âmbito das Forças Armadas Portuguesas. Traz uma base sólida de disciplina, responsabilidade, trabalho sob pressão e cumprimento rigoroso de procedimentos.",
      "A vertente técnica concentra-se em IT Support, infraestrutura, redes Cisco, virtualização, Windows Server, Active Directory, Linux, serviços de rede, monitorização e cibersegurança em contexto académico e empresarial."
    ],
    experienceTitle: "Experiência Profissional",
    experienceGroups: ["Experiência Empresarial", "Experiência Militar"],
    businessDate: "2025 - Atual",
    businessLocation: "DRT-Group · Leiria",
    businessRole: "Estágio IT · Cibersegurança, Redes e Sistemas",
    businessItems: [
      "Pesquisa e desenvolvimento de projetos direcionados para certificações NIS2 e TISAX.",
      "Acompanhamento e assistência em configurações de rede, implementação de estruturas de rede e troubleshooting.",
      "Manutenção de hardware e software, apoio a utilizadores e suporte técnico em ambiente empresarial.",
      "Acompanhamento na administração de Windows Server, Active Directory, firewall e serviços de infraestrutura.",
      "Exploração de conceitos de SOC, arquiteturas de rede, mitigação de riscos e monitorização de eventos de segurança.",
      "Desenvolvimento de simulações internas na área de cibersegurança e apoio ao relatório de estágio."
    ],
    militaryDate: "Junho 2017 - Junho 2024",
    militaryLocation: "Força Aérea Portuguesa · Lisboa",
    militaryRole: "Operador Tático · Polícia Aérea",
    militaryItems: [
      "Participação em missões de segurança e defesa de instalações militares.",
      "Segurança e proteção de aeronaves, infraestruturas e pessoal militar.",
      "Execução de missões operacionais e de proteção no âmbito das Forças Armadas Portuguesas.",
      "Apoio na formação de novos elementos em tiro tático, defesa pessoal e procedimentos de segurança.",
      "Experiência em trabalho sob pressão, coordenação de equipa e ambientes de elevada responsabilidade.",
      "Distinguido com 3 louvores, reconhecimentos atribuídos por chefias superiores, incluindo generais e coronéis, por desempenho de alto nível.",
      "Recebeu carta de apreciação por missão operacional de 4 meses na Ilha de Porto Santo, em segurança conjunta com várias forças de segurança.",
      "Participação em missão conjunta da NATO com forças armadas de vários países, em contexto multinacional e coordenado."
    ],
    educationTitle: "Formação",
    educationCards: [
      {
        title: "TeSP · Cibersegurança e Redes Informáticas",
        text: "Formação técnica superior profissional em redes, sistemas, virtualização, serviços seguros e segurança informática.",
        tags: ["Redes", "Cloud Computing", "Active Directory", "Windows Server", "Linux", "Cisco", "VMware", "Pentesting"]
      },
      {
        title: "Formação Militar e Cursos",
        items: [
          "ICCS, Individual Common Core Skills",
          "Curso de Operador Tático da Polícia Aérea",
          "Condução defensiva e todo-o-terreno, PSP/UEP",
          "Cidadão Ciberseguro, Centro Nacional de Cibersegurança",
          "Curso de Bastão Extensível"
        ]
      }
    ],
    academicTitle: "Projetos Académicos",
    academicProjects: [
      {
        kicker: "Administração de Sistemas",
        title: "Active Directory e Gestão Centralizada",
        items: [
          "Instalação e configuração de Active Directory Domain Services, domínios, OUs, utilizadores e grupos.",
          "Gestão de GPOs para políticas de segurança em Windows 10, Windows Defender Firewall e controlo centralizado.",
          "Configuração de DHCP, DNS, permissões, contas de serviço e delegação de tarefas em ambiente empresarial simulado.",
          "Implementação de monitorização, auditoria, registo de eventos e automatização administrativa com PowerShell.",
          "Gestão de máquinas virtuais em VMware e VirtualBox para laboratórios de sistemas."
        ]
      },
      {
        kicker: "Serviços de Redes Seguros",
        title: "Infraestrutura Segura e Virtualizada",
        items: [
          "Implementação de infraestrutura virtualizada para ambiente académico, com segmentação de rede, DMZ e serviços Linux.",
          "Administração de Ubuntu Server, firewall e routing com OPNsense, DNS primário/secundário com BIND e Apache com HTTPS.",
          "Configuração de Postfix, Dovecot, SSH, SSL/TLS, ACLs, backups, logs e autenticação segura.",
          "Monitorização de serviços críticos com Nagios, incluindo DNS, Web, SMTP, POP3, IMAP e HTTPS.",
          "Aplicação de hardening, controlo de acessos, mitigação de brute force com Fail2Ban e análise de eventos."
        ]
      },
      {
        kicker: "Redes e Virtualização",
        title: "Laboratórios Cisco, VMware e Infraestrutura",
        items: [
          "Configuração de redes TCP/IP IPv4 e IPv6, VLANs, trunking 802.1Q, switching Layer 2/3 e Inter-VLAN Routing.",
          "Configuração e monitorização de OSPFv2, routing estático/dinâmico, gateways, sub-redes e troubleshooting de conectividade.",
          "Administração básica de switches e routers Cisco, segmentação de rede, QoS, broadcast domains e NIC Teaming.",
          "Instalação e administração de VMware ESXi, vSphere, vCenter, datastores, snapshots, vSwitch, VMkernel e virtual disks.",
          "Criação de ambientes com hypervisors Tipo 1 e Tipo 2, thin/thick provisioning e conversão P2V com VMware Converter."
        ]
      }
    ],
    enterpriseTitle: "Projetos Empresariais",
    enterpriseProjects: [
      {
        kicker: "Cibersegurança · DRT-Group",
        title: "Campanha Interna de Phishing e Sensibilização",
        items: [
          "Criação de uma simulação controlada de phishing para avaliar a sensibilização dos colaboradores perante engenharia social e emails fraudulentos.",
          "Preparação de máquina virtual Kali Linux, instalação e configuração de GoPhish e servidor Apache para alojamento da página de sensibilização.",
          "Desenvolvimento de página web semelhante a um portal de autenticação Google/Gmail, com tracking de receção, abertura, cliques e submissão de credenciais simuladas.",
          "Automatização da extração de nomes, emails e funções profissionais a partir de documentação interna para importação no GoPhish.",
          "Integração SMTP com conta Gmail dedicada e configuração de regras no Microsoft Admin Center para permitir a campanha em ambiente controlado.",
          "Configuração de domínio interno em Active Directory, certificado com MKCert, Apache SSL e distribuição do certificado via GPO.",
          "Análise dos resultados da campanha através do GoPhish, consolidando competências em Linux, Apache, DNS, certificados digitais, SMTP, Active Directory, GPO e monitorização de segurança."
        ]
      },
      {
        kicker: "Pentesting Empresarial",
        title: "Avaliação de Segurança e Análise de Vulnerabilidades",
        items: [
          "Realização de testes de penetração controlados para identificação de vulnerabilidades em sistemas, serviços e aplicações web.",
          "Execução de footprinting, reconhecimento de rede, enumeração de serviços e análise de exposição de ativos.",
          "Utilização de ferramentas como Nmap, Nessus, Nikto, DirBuster, Burp Suite e OWASP ZAP em contexto de avaliação técnica.",
          "Validação de riscos, recolha de evidências e organização dos resultados por criticidade e impacto.",
          "Produção de relatório técnico com recomendações de mitigação, boas práticas de hardening e prioridades de correção."
        ]
      }
    ],
    skillsTitle: "Competências Técnicas",
    skills: [
      ["Perfis Técnicos", "SysAdmin, IT Support, infraestrutura, helpdesk avançado, Windows Server Administrator e Junior Cybersecurity / Blue Team."],
      ["Redes e Infraestrutura", "TCP/IP, IPv4/IPv6, VLANs, trunking 802.1Q, switching, routing, OSPFv2, segmentação, Cisco e troubleshooting."],
      ["Sistemas Windows", "Windows Server, Active Directory, GPO, DHCP, DNS, permissões, auditoria, eventos, PowerShell básico e firewall."],
      ["Linux e Serviços Seguros", "Ubuntu Server, Apache, BIND, Postfix, Dovecot, SSH, HTTPS, Fail2Ban, logs, backups, hardening e serviços de rede."],
      ["Virtualização", "VMware ESXi, vSphere, vCenter, Workstation Pro, VirtualBox, Proxmox, snapshots, datastores, vSwitch e P2V."],
      ["Cibersegurança", "Pentesting, análise de vulnerabilidades, GoPhish, phishing awareness, SOC, mitigação de riscos, monitorização e auditoria."],
      ["Ferramentas e Plataformas", "OPNsense, Nagios, Nmap, Nessus, Nikto, Burp Suite, Microsoft 365 Admin Center e Active Directory."],
      ["Programação e Web", "HTML5, CSS3, PHP, MySQL, linguagem C, Perl, scripts PowerShell e automação de tarefas administrativas."],
      ["Hardware e Suporte", "Montagem, manutenção, diagnóstico, substituição de componentes, suporte a utilizadores e resolução de incidentes técnicos."]
    ],
    personalTitle: "Competências Pessoais",
    personalSkills: ["Trabalho em equipa", "Adaptação", "Responsabilidade", "Disciplina", "Organização", "Trabalho sob pressão", "Aprendizagem rápida", "Polivalente", "Dinâmico"],
    contactEyebrow: "Disponível para oportunidades técnicas",
    contactTitle: "Cibersegurança, redes, IT Support e administração de sistemas.",
    openContact: "Abrir contacto",
    pdfButton: "CV em PDF",
    modalClose: "Fechar contacto",
    modalPhotoAlt: "Fotografia de Rafael Rino",
    modalEyebrow: "Contacto",
    contactDetails: [
      ["Nome completo", "Rafael Rino"],
      ["Idade", "29 anos"],
      ["Naturalidade", "Portuguesa"],
      ["Email", "rino_aug@hotmail.com"],
      ["LinkedIn", "A adicionar"]
    ],
    footer: "Página desenvolvida por Rafael Rino"
  },
  en: {
    htmlLang: "en",
    title: "Rafael Rino | Cybersecurity and Networks",
    metaDescription: "Online CV of Rafael Rino, a technical profile focused on cybersecurity, networks, systems administration and IT Support.",
    navLabel: "Main navigation",
    languageLabel: "Choose language",
    nav: ["Experience", "Education", "Academic", "Business", "Skills"],
    heroEyebrow: "Leiria, Portugal · IT Support · Cybersecurity · Networks",
    heroLead: "Professional with military experience in operational security and a current focus on cybersecurity, networks, systems administration, infrastructure and technical support.",
    heroActionsLabel: "Main actions",
    contactButton: "Contact",
    downloadCv: "Download CV",
    profileLabel: "Professional summary",
    photoAlt: "Professional photo of Rafael Rino",
    quickStats: [
      ["Military experience", "7 years"],
      ["Driving licence", "Category B"],
      ["Current area", "Cybersecurity"],
      ["Technical IT education", "2 years"],
      ["Languages", "PT native · EN C1"]
    ],
    profileTitle: "Profile",
    profileParagraphs: [
      "Professional from Leiria with experience as a Tactical Operator in the Air Police, involved in security missions, infrastructure protection, joint exercises and operations within the Portuguese Armed Forces. Brings a solid foundation in discipline, responsibility, work under pressure and strict compliance with procedures.",
      "The technical side is focused on IT Support, infrastructure, Cisco networks, virtualization, Windows Server, Active Directory, Linux, network services, monitoring and cybersecurity in academic and business contexts."
    ],
    experienceTitle: "Professional Experience",
    experienceGroups: ["Business Experience", "Military Experience"],
    businessDate: "2025 - Present",
    businessLocation: "DRT-Group · Leiria",
    businessRole: "IT Internship · Cybersecurity, Networks and Systems",
    businessItems: [
      "Research and development of projects aimed at NIS2 and TISAX certifications.",
      "Support and assistance with network configurations, network structure implementation and troubleshooting.",
      "Hardware and software maintenance, user support and technical support in a business environment.",
      "Support in Windows Server, Active Directory, firewall and infrastructure services administration.",
      "Exploration of SOC concepts, network architectures, risk mitigation and security event monitoring.",
      "Development of internal simulations in cybersecurity and support for the internship report."
    ],
    militaryDate: "June 2017 - June 2024",
    militaryLocation: "Portuguese Air Force · Lisbon",
    militaryRole: "Tactical Operator · Air Police",
    militaryItems: [
      "Participation in security missions and defence of military facilities.",
      "Security and protection of aircraft, infrastructure and military personnel.",
      "Execution of operational and protection missions within the Portuguese Armed Forces.",
      "Support in training new personnel in tactical shooting, self-defence and security procedures.",
      "Experience working under pressure, coordinating teams and operating in high-responsibility environments.",
      "Awarded 3 commendations, recognitions granted by senior leadership, including generals and colonels, for high-level performance.",
      "Received a letter of appreciation for a 4-month operational mission on Porto Santo Island, providing security in coordination with several security forces.",
      "Participated in a NATO joint mission with armed forces from several countries, in a multinational and coordinated environment."
    ],
    educationTitle: "Education",
    educationCards: [
      {
        title: "TeSP · Cybersecurity and Computer Networks",
        text: "Higher professional technical training in networks, systems, virtualization, secure services and information security.",
        tags: ["Networks", "Cloud Computing", "Active Directory", "Windows Server", "Linux", "Cisco", "VMware", "Pentesting"]
      },
      {
        title: "Military Training and Courses",
        items: [
          "ICCS, Individual Common Core Skills",
          "Air Police Tactical Operator Course",
          "Defensive and off-road driving, PSP/UEP",
          "Cybersecure Citizen, National Cybersecurity Centre",
          "Expandable Baton Course"
        ]
      }
    ],
    academicTitle: "Academic Projects",
    academicProjects: [
      {
        kicker: "Systems Administration",
        title: "Active Directory and Centralized Management",
        items: [
          "Installation and configuration of Active Directory Domain Services, domains, OUs, users and groups.",
          "Management of GPOs for Windows 10 security policies, Windows Defender Firewall and centralized control.",
          "Configuration of DHCP, DNS, permissions, service accounts and task delegation in a simulated business environment.",
          "Implementation of monitoring, auditing, event logging and administrative automation with PowerShell.",
          "Management of virtual machines in VMware and VirtualBox for systems labs."
        ]
      },
      {
        kicker: "Secure Network Services",
        title: "Secure and Virtualized Infrastructure",
        items: [
          "Implementation of a virtualized infrastructure for an academic environment, with network segmentation, DMZ and Linux services.",
          "Administration of Ubuntu Server, firewall and routing with OPNsense, primary/secondary DNS with BIND and Apache with HTTPS.",
          "Configuration of Postfix, Dovecot, SSH, SSL/TLS, ACLs, backups, logs and secure authentication.",
          "Monitoring of critical services with Nagios, including DNS, Web, SMTP, POP3, IMAP and HTTPS.",
          "Application of hardening, access control, brute-force mitigation with Fail2Ban and event analysis."
        ]
      },
      {
        kicker: "Networks and Virtualization",
        title: "Cisco, VMware and Infrastructure Labs",
        items: [
          "Configuration of TCP/IP IPv4 and IPv6 networks, VLANs, 802.1Q trunking, Layer 2/3 switching and Inter-VLAN Routing.",
          "Configuration and monitoring of OSPFv2, static/dynamic routing, gateways, subnets and connectivity troubleshooting.",
          "Basic administration of Cisco switches and routers, network segmentation, QoS, broadcast domains and NIC Teaming.",
          "Installation and administration of VMware ESXi, vSphere, vCenter, datastores, snapshots, vSwitch, VMkernel and virtual disks.",
          "Creation of environments with Type 1 and Type 2 hypervisors, thin/thick provisioning and P2V conversion with VMware Converter."
        ]
      }
    ],
    enterpriseTitle: "Business Projects",
    enterpriseProjects: [
      {
        kicker: "Cybersecurity · DRT-Group",
        title: "Internal Phishing Awareness Campaign",
        items: [
          "Creation of a controlled phishing simulation to assess employee awareness of social engineering and fraudulent emails.",
          "Preparation of a Kali Linux virtual machine, installation and configuration of GoPhish and an Apache server to host the awareness page.",
          "Development of a web page similar to a Google/Gmail authentication portal, with tracking for email delivery, opens, clicks and simulated credential submissions.",
          "Automation of the extraction of names, emails and job roles from internal documentation for import into GoPhish.",
          "SMTP integration with a dedicated Gmail account and configuration of Microsoft Admin Center rules to allow the campaign in a controlled environment.",
          "Configuration of an internal Active Directory domain, MKCert certificate, Apache SSL and certificate distribution through GPO.",
          "Analysis of campaign results through GoPhish, consolidating skills in Linux, Apache, DNS, digital certificates, SMTP, Active Directory, GPO and security monitoring."
        ]
      },
      {
        kicker: "Business Pentesting",
        title: "Security Assessment and Vulnerability Analysis",
        items: [
          "Execution of controlled penetration tests to identify vulnerabilities in systems, services and web applications.",
          "Footprinting, network reconnaissance, service enumeration and asset exposure analysis.",
          "Use of tools such as Nmap, Nessus, Nikto, DirBuster, Burp Suite and OWASP ZAP in a technical assessment context.",
          "Risk validation, evidence collection and organization of results by severity and impact.",
          "Production of a technical report with mitigation recommendations, hardening best practices and remediation priorities."
        ]
      }
    ],
    skillsTitle: "Technical Skills",
    skills: [
      ["Technical Profiles", "SysAdmin, IT Support, infrastructure, advanced helpdesk, Windows Server Administrator and Junior Cybersecurity / Blue Team."],
      ["Networks and Infrastructure", "TCP/IP, IPv4/IPv6, VLANs, 802.1Q trunking, switching, routing, OSPFv2, segmentation, Cisco and troubleshooting."],
      ["Windows Systems", "Windows Server, Active Directory, GPO, DHCP, DNS, permissions, auditing, events, basic PowerShell and firewall."],
      ["Linux and Secure Services", "Ubuntu Server, Apache, BIND, Postfix, Dovecot, SSH, HTTPS, Fail2Ban, logs, backups, hardening and network services."],
      ["Virtualization", "VMware ESXi, vSphere, vCenter, Workstation Pro, VirtualBox, Proxmox, snapshots, datastores, vSwitch and P2V."],
      ["Cybersecurity", "Pentesting, vulnerability analysis, GoPhish, phishing awareness, SOC, risk mitigation, monitoring and auditing."],
      ["Tools and Platforms", "OPNsense, Nagios, Nmap, Nessus, Nikto, Burp Suite, Microsoft 365 Admin Center and Active Directory."],
      ["Programming and Web", "HTML5, CSS3, PHP, MySQL, C language, Perl, PowerShell scripts and administrative task automation."],
      ["Hardware and Support", "Assembly, maintenance, diagnostics, component replacement, user support and technical incident resolution."]
    ],
    personalTitle: "Personal Skills",
    personalSkills: ["Teamwork", "Adaptability", "Responsibility", "Discipline", "Organization", "Work under pressure", "Fast learning", "Versatile", "Dynamic"],
    contactEyebrow: "Available for technical opportunities",
    contactTitle: "Cybersecurity, networks, IT Support and systems administration.",
    openContact: "Open contact",
    pdfButton: "CV as PDF",
    modalClose: "Close contact",
    modalPhotoAlt: "Photo of Rafael Rino",
    modalEyebrow: "Contact",
    contactDetails: [
      ["Full name", "Rafael Rino"],
      ["Age", "29 years old"],
      ["Nationality", "Portuguese"],
      ["Email", "rino_aug@hotmail.com"],
      ["LinkedIn", "To be added"]
    ],
    footer: "Page developed by Rafael Rino"
  }
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setTextList(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
}

function setListItems(selector, values) {
  setTextList(selector, values);
}

function setButtonLabel(button, icon, label) {
  if (!button) return;
  button.innerHTML = `<span aria-hidden="true">${icon}</span>${label}`;
}

function applyProjectTranslations(selector, projects) {
  document.querySelectorAll(selector).forEach((card, index) => {
    const project = projects[index];
    if (!project) return;
    card.querySelector(".project-kicker").textContent = project.kicker;
    card.querySelector("h3").textContent = project.title;
    card.querySelectorAll("li").forEach((item, itemIndex) => {
      if (project.items[itemIndex] !== undefined) item.textContent = project.items[itemIndex];
    });
  });
}

function applyLanguage(language) {
  const t = translations[language] || translations.pt;

  document.documentElement.lang = t.htmlLang;
  document.title = t.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", t.metaDescription);
  document.querySelector(".nav")?.setAttribute("aria-label", t.navLabel);
  document.querySelector(".language-switch")?.setAttribute("aria-label", t.languageLabel);

  setTextList(".nav a", t.nav);
  setText(".hero .eyebrow", t.heroEyebrow);
  setText(".lead", t.heroLead);
  document.querySelector(".hero-actions")?.setAttribute("aria-label", t.heroActionsLabel);
  setButtonLabel(document.querySelector(".hero-actions [data-contact-open]"), "↘", t.contactButton);
  setButtonLabel(document.querySelector(".hero-actions .button.secondary"), "↓", t.downloadCv);

  document.querySelector(".profile-panel")?.setAttribute("aria-label", t.profileLabel);
  document.querySelector(".profile-photo img")?.setAttribute("alt", t.photoAlt);
  document.querySelectorAll(".quick-stats div").forEach((item, index) => {
    if (!t.quickStats[index]) return;
    item.querySelector("dt").textContent = t.quickStats[index][0];
    item.querySelector("dd").textContent = t.quickStats[index][1];
  });

  setText("#perfil-title", t.profileTitle);
  setTextList(".intro > p", t.profileParagraphs);

  setText("#experiencia-title", t.experienceTitle);
  setTextList(".experience-group > h3", t.experienceGroups);
  const experienceGroups = document.querySelectorAll("#experiencia .experience-group");
  if (experienceGroups[0]) {
    experienceGroups[0].querySelector(".timeline-meta strong").textContent = t.businessDate;
    experienceGroups[0].querySelector(".timeline-meta span").textContent = t.businessLocation;
    experienceGroups[0].querySelector(".timeline-content h4").textContent = t.businessRole;
    experienceGroups[0].querySelectorAll(".timeline-content li").forEach((item, index) => {
      if (t.businessItems[index] !== undefined) item.textContent = t.businessItems[index];
    });
  }
  if (experienceGroups[1]) {
    experienceGroups[1].querySelector(".timeline-meta strong").textContent = t.militaryDate;
    experienceGroups[1].querySelector(".timeline-meta span").textContent = t.militaryLocation;
    experienceGroups[1].querySelector(".timeline-content h4").textContent = t.militaryRole;
    experienceGroups[1].querySelectorAll(".timeline-content li").forEach((item, index) => {
      if (t.militaryItems[index] !== undefined) item.textContent = t.militaryItems[index];
    });
  }

  setText("#formacao-title", t.educationTitle);
  const educationCards = document.querySelectorAll("#formacao .info-card");
  if (educationCards[0]) {
    educationCards[0].querySelector("h3").textContent = t.educationCards[0].title;
    educationCards[0].querySelector("p").textContent = t.educationCards[0].text;
    educationCards[0].querySelectorAll(".tag-list span").forEach((tag, index) => {
      if (t.educationCards[0].tags[index] !== undefined) tag.textContent = t.educationCards[0].tags[index];
    });
  }
  if (educationCards[1]) {
    educationCards[1].querySelector("h3").textContent = t.educationCards[1].title;
    educationCards[1].querySelectorAll("li").forEach((item, index) => {
      if (t.educationCards[1].items[index] !== undefined) item.textContent = t.educationCards[1].items[index];
    });
  }

  setText("#projetos-title", t.academicTitle);
  applyProjectTranslations("#projetos .project-card", t.academicProjects);

  setText("#projetos-empresariais-title", t.enterpriseTitle);
  applyProjectTranslations("#projetos-empresariais .project-card", t.enterpriseProjects);

  setText("#competencias-title", t.skillsTitle);
  document.querySelectorAll("#competencias .skills-grid article").forEach((card, index) => {
    if (!t.skills[index]) return;
    card.querySelector("h3").textContent = t.skills[index][0];
    card.querySelector("p").textContent = t.skills[index][1];
  });

  setText("#pessoais-title", t.personalTitle);
  setTextList(".strength-list span", t.personalSkills);

  setText("#contacto .eyebrow", t.contactEyebrow);
  setText("#contacto-title", t.contactTitle);
  setButtonLabel(document.querySelector("#contacto [data-contact-open]"), "↘", t.openContact);
  setButtonLabel(document.querySelector("#contacto .button.secondary"), "↓", t.pdfButton);

  document.querySelector(".contact-card__close")?.setAttribute("aria-label", t.modalClose);
  document.querySelector(".contact-card__photo")?.setAttribute("alt", t.modalPhotoAlt);
  setText(".contact-card .eyebrow", t.modalEyebrow);
  document.querySelectorAll(".contact-details div").forEach((item, index) => {
    if (!t.contactDetails[index]) return;
    item.querySelector("dt").textContent = t.contactDetails[index][0];
    const link = item.querySelector("a");
    if (link) {
      link.textContent = t.contactDetails[index][1];
    } else {
      item.querySelector("dd").textContent = t.contactDetails[index][1];
    }
  });

  setText(".site-footer span", t.footer);

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    const isActive = button.dataset.langSwitch === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("cv-language-v2", language);
}

document.querySelectorAll("[data-lang-switch]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.langSwitch));
});

applyLanguage(localStorage.getItem("cv-language-v2") || "en");

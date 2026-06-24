(function() {
    const NEW_COPY = {
        topBar: "Apenas 5 vagas abertas para análise gratuita este mês.",
        hero: {
            headline: "Você sente que sua clínica pode trazer mais pacientes do que traz hoje?",
            subtitle: "Analisamos sua captação e mostramos, em números, exatamente onde estão as oportunidades — antes de cobrar qualquer coisa.",
            cta: "Quero minha análise gratuita",
            socialProof: "17 clínicas atendidas · Odonto, estética e harmonização"
        },
        problem: {
            title: "A maioria das clínicas depende de indicação para crescer.",
            body: "Indicação não escala. Enquanto isso, pacientes estão pesquisando no Google e no Instagram e escolhendo quem aparece primeiro."
        },
        solution: {
            body: "Antes de qualquer campanha, entendemos sua clínica. Quais procedimentos têm mais margem, quem é seu paciente ideal, onde está a perda de captação hoje. Só depois disso agimos."
        },
        howItWorks: {
            title: "Da análise à agenda cheia.",
            items: [
                { title: "Diagnóstico", text: "Mapeamos sua clínica, seu mercado e seus concorrentes. Identificamos o que está travando seu crescimento." },
                { title: "Estratégia", text: "Um plano construído para a sua realidade. Canal certo, mensagem certa, paciente certo." },
                { title: "Execução", text: "Implementamos, acompanhamos diariamente e ajustamos. Você acompanha tudo em tempo real." }
            ]
        }
    };

    function updateCopy() {
        // Top Bar
        const topBar = document.querySelector('div.bg-primary.text-primary-foreground');
        if (topBar) topBar.textContent = NEW_COPY.topBar;

        // Hero
        const heroHeadline = document.querySelector('h1');
        if (heroHeadline) heroHeadline.textContent = NEW_COPY.hero.headline;

        const heroSubtitle = document.querySelector('h1 + p');
        if (heroSubtitle) heroSubtitle.textContent = NEW_COPY.hero.subtitle;

        const heroCTA = document.querySelector('main section:first-of-type button');
        if (heroCTA) {
            const span = heroCTA.querySelector('span');
            if (span) span.textContent = NEW_COPY.hero.cta;
            else heroCTA.textContent = NEW_COPY.hero.cta;
        }

        const socialProof = document.querySelector('main section:first-of-type div.flex.items-center.gap-2 span');
        if (socialProof) socialProof.textContent = NEW_COPY.hero.socialProof;

        // Problem Section
        const sections = document.querySelectorAll('main section');
        if (sections[1]) {
            const h2 = sections[1].querySelector('h2');
            if (h2) h2.textContent = NEW_COPY.problem.title;
            const p = sections[1].querySelector('p');
            if (p) p.textContent = NEW_COPY.problem.body;
        }

        // Solution Section
        if (sections[2]) {
            const p = sections[2].querySelector('p');
            if (p) p.textContent = NEW_COPY.solution.body;
        }

        // How It Works
        if (sections[3]) {
            const h2 = sections[3].querySelector('h2');
            if (h2) h2.textContent = NEW_COPY.howItWorks.title;
            const items = sections[3].querySelectorAll('div.grid > div');
            items.forEach((item, i) => {
                if (NEW_COPY.howItWorks.items[i]) {
                    const h3 = item.querySelector('h3');
                    if (h3) h3.textContent = NEW_COPY.howItWorks.items[i].title;
                    const p = item.querySelector('p');
                    if (p) p.textContent = NEW_COPY.howItWorks.items[i].text;
                }
            });
        }
    }

    function setupAnimations() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0, 0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Find elements that should animate
        const animatable = document.querySelectorAll('section, div.grid > div, h1, h2, h3, p');
        animatable.forEach(el => {
            if (!el.classList.contains('animated')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(el);
            }
        });
    }

    function addTestimonials() {
        const testimonialsSection = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('depoimento') || s.textContent.includes('Dra.'));
        if (testimonialsSection) {
            const container = testimonialsSection.querySelector('div.flex') || testimonialsSection.querySelector('div.grid');
            if (container) {
                // Add horizontal scroll styles
                container.style.display = 'flex';
                container.style.overflowX = 'auto';
                container.style.scrollSnapType = 'x mandatory';
                container.style.gap = '1.5rem';
                container.style.paddingBottom = '1rem';
                
                const originalTestimonial = container.children[0];
                if (originalTestimonial) {
                    for (let i = 0; i < 3; i++) {
                        const clone = originalTestimonial.cloneNode(true);
                        clone.style.flex = '0 0 85%';
                        clone.style.scrollSnapAlign = 'center';
                        container.appendChild(clone);
                    }
                }
            }
        }
    }

    // Run on load and whenever DOM changes (since it's React)
    const observer = new MutationObserver(() => {
        updateCopy();
        setupAnimations();
        addTestimonials();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial run
    window.addEventListener('DOMContentLoaded', () => {
        updateCopy();
        setupAnimations();
        addTestimonials();
    });
})();

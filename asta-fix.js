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
        },
        testimonials: [
            { text: "Finalmente entendo de onde vêm meus pacientes. Isso mudou a forma como gerencio a clínica.", author: "Dr. J.S.", specialty: "Odontologia" },
            { text: "Minha clínica estava no mesmo nível há dois anos. Em poucos meses isso mudou.", author: "Dra. M.C.", specialty: "Estética" },
            { text: "Além dos pacientes, a organização interna da clínica mudou. Não esperava isso.", author: "Dra. A.P.", specialty: "Harmonização" }
        ]
    };

    function updateCopy() {
        // Correção: Selecionar apenas a barra de aviso real, não a barra de progresso de 2px
        const topBar = Array.from(document.querySelectorAll('div.bg-primary')).find(el => el.offsetHeight > 10);
        if (topBar) {
            const p = topBar.querySelector('p');
            if (p) p.textContent = NEW_COPY.topBar;
            else if (topBar.children.length === 0) topBar.textContent = NEW_COPY.topBar;
        }

        // Garantir que a barra de progresso (h-[2px]) não tenha texto
        const progressBar = document.querySelector('div.h-\\[2px\\]');
        if (progressBar) {
            progressBar.textContent = '';
        }

        const h1 = document.querySelector('h1');
        if (h1) h1.textContent = NEW_COPY.hero.headline;

        const subtitle = document.querySelector('h1 + p');
        if (subtitle) subtitle.textContent = NEW_COPY.hero.subtitle;

        const ctaBtn = document.querySelector('main section button');
        if (ctaBtn) {
            const span = ctaBtn.querySelector('span');
            if (span) span.textContent = NEW_COPY.hero.cta;
            else ctaBtn.textContent = NEW_COPY.hero.cta;
        }

        const socialProof = document.querySelector('.items-center.gap-2 span');
        if (socialProof && socialProof.textContent.includes('clínicas')) {
            socialProof.textContent = NEW_COPY.hero.socialProof;
        }

        const sections = document.querySelectorAll('main section');
        sections.forEach(section => {
            const h2 = section.querySelector('h2');
            const p = section.querySelector('p');
            
            if (h2 && h2.textContent.includes('indicação')) {
                h2.textContent = NEW_COPY.problem.title;
                if (p) p.textContent = NEW_COPY.problem.body;
            }
            
            if (h2 && h2.textContent.includes('agenda cheia')) {
                h2.textContent = NEW_COPY.howItWorks.title;
                const items = section.querySelectorAll('div.grid > div');
                items.forEach((item, i) => {
                    if (NEW_COPY.howItWorks.items[i]) {
                        const h3 = item.querySelector('h3');
                        const itemP = item.querySelector('p');
                        if (h3) h3.textContent = NEW_COPY.howItWorks.items[i].title;
                        if (itemP) itemP.textContent = NEW_COPY.howItWorks.items[i].text;
                    }
                });
            }

            if (!h2 && p && p.textContent.includes('entendemos sua clínica')) {
                 p.textContent = NEW_COPY.solution.body;
            }
        });
    }

    function setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section, h1, h2, h3, p, button').forEach(el => {
            if (!el.classList.contains('animated') && !el.closest('nav') && !el.closest('header')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.observe(el);
            }
        });
    }

    function addTestimonials() {
        const testimonialSection = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('O que dizem nossos clientes'));
        if (testimonialSection && !testimonialSection.dataset.fixedReal) {
            const container = testimonialSection.querySelector('.grid') || testimonialSection.querySelector('.flex');
            if (container && container.children.length > 0) {
                testimonialSection.dataset.fixedReal = "true";
                container.className = "flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar";
                container.style.display = "flex";
                container.style.overflowX = "auto";
                
                const original = container.children[0];
                container.innerHTML = ''; 
                
                NEW_COPY.testimonials.forEach(data => {
                    const clone = original.cloneNode(true);
                    clone.className = "shrink-0 w-[85%] md:w-[400px] snap-center bg-card p-6 rounded-xl border border-border flex flex-col justify-between";
                    
                    const textEl = clone.querySelector('p') || clone.querySelector('blockquote');
                    if (textEl) textEl.textContent = `"${data.text}"`;
                    
                    const authorEl = Array.from(clone.querySelectorAll('span, div, p')).find(el => el.textContent.includes('Dr.') || el.textContent.includes('Dra.'));
                    if (authorEl) authorEl.textContent = data.author;

                    const specialtyEl = Array.from(clone.querySelectorAll('span, div, p')).find(el => el.textContent.includes('Harmonização') || el.textContent.includes('Odonto') || el.textContent.includes('Estética'));
                    if (specialtyEl) specialtyEl.textContent = data.specialty;
                    
                    container.appendChild(clone);
                });
            }
        }
    }

    let timeout;
    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            updateCopy();
            setupAnimations();
            addTestimonials();
        }, 100);
    });

    const root = document.getElementById('root');
    if (root) {
        observer.observe(root, { childList: true, subtree: true });
    }
    updateCopy();
    setupAnimations();
    addTestimonials();
})();

(function() {
    const NEW_COPY = {
        topBar: "Apenas 5 vagas abertas para análise gratuita este mês.",
        nav: { why: "O que fazemos" },
        hero: {
            headline: "Você sente que sua clínica pode trazer mais pacientes do que traz hoje?",
            subtitle: "Analisamos sua captação e mostramos onde estão as oportunidades.",
            cta: "Quero minha análise gratuita",
            socialProof: "17 clínicas atendidas · Odonto, estética e harmonização"
        },
        problem: { title: "", body: "Indicação não escala. Enquanto isso, pacientes estão pesquisando no Google e no Instagram e escolhendo quem aparece primeiro." },
        solution: { body: "Antes de qualquer campanha, entendemos sua clínica. Quais procedimentos têm mais margem, quem é seu paciente ideal, onde está a perda de captação hoje. Só depois disso agimos." },
        howItWorks: {
            title: "Da análise à agenda cheia.",
            items: [
                { title: "Diagnóstico", text: "Mapeamos sua clínica, seu mercado e seus concorrentes. Identificamos o que está travando seu crescimento." },
                { title: "Estratégia", text: "Um plano construído para a sua realidade. Canal certo, mensagem certa, paciente certo." },
                { title: "Execução", text: "Implementamos, acompanhamos diariamente e ajustamos. Você acompanha tudo em tempo real." }
            ]
        },
        whatWeDo: {
            title: "Um ecossistema completo de captação.",
            items: [
                { title: "Tráfego pago", text: "Google Ads e Meta Ads com estratégia real de conversão." },
                { title: "Presença digital", text: "Autoridade construída nos canais certos para sua especialidade." },
                { title: "CRM e processos", text: "Do lead ao paciente fidelizado, sem deixar ninguém cair no esquecimento." },
                { title: "Automações", text: "Velocidade no primeiro contato. Lead que espera, vai embora." },
                { title: "Dashboards", text: "Decisões baseadas em dados, não em intuição." },
                { title: "Consultoria estratégica", text: "Acompanhamento contínuo sem contrato engessado." }
            ]
        },
        ctaFinal: {
            title: "Descubra quanto sua clínica pode crescer.",
            subtitle: "Análise gratuita. Você decide se faz sentido seguir juntos.",
            btn: "Agendar análise gratuita"
        },
        testimonials: {
            title: "O que dizem nossos clientes.",
            items: [
                { text: "Finalmente entendo de onde vêm meus pacientes. Isso mudou a forma como gerencio a clínica.", author: "Dr. J.S. · Odontologia" },
                { text: "Minha clínica estava no mesmo nível há dois anos. Em poucos meses isso mudou.", author: "Dra. M.C. · Estética" },
                { text: "Além dos pacientes, a organização interna da clínica mudou. Não esperava isso.", author: "Dra. A.P. · Harmonização" }
            ]
        },
        footer: { desc: "Crescimento previsível para clínicas.", copyright: "© 2026 ASTA. Todos os direitos reservados." }
    };

    function updateCopy() {
        const progressBar = document.querySelector('div.h-\\[2px\\]');
        if (progressBar) progressBar.remove();

        const whyLink = Array.from(document.querySelectorAll('nav a, header a')).find(el => el.textContent.includes('Por que') || el.textContent.includes('fazemos'));
        if (whyLink) whyLink.textContent = NEW_COPY.nav.why;

        const h1 = document.querySelector('h1');
        if (h1) h1.textContent = NEW_COPY.hero.headline;

        const subtitle = document.querySelector('h1 + p');
        if (subtitle) subtitle.textContent = NEW_COPY.hero.subtitle;

        document.querySelectorAll('main section').forEach(section => {
            const h2 = section.querySelector('h2');
            const p = section.querySelector('p');
            if (h2 && (h2.textContent.includes('indicação') || h2.textContent.includes('escolher'))) {
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
            if (h2 && (h2.textContent.includes('ecossistema') || h2.textContent.includes('fazemos'))) {
                h2.textContent = NEW_COPY.whatWeDo.title;
                const items = section.querySelectorAll('div.grid > div');
                items.forEach((item, i) => {
                    if (NEW_COPY.whatWeDo.items[i]) {
                        const h3 = item.querySelector('h3');
                        const itemP = item.querySelector('p');
                        if (h3) h3.textContent = NEW_COPY.whatWeDo.items[i].title;
                        if (itemP) itemP.textContent = NEW_COPY.whatWeDo.items[i].text;
                    }
                });
            }
        });
    }

    function addTestimonials() {
        const testimonialSection = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('clientes') || s.textContent.includes('Histórias Reais'));
        if (testimonialSection && !testimonialSection.dataset.fixedFinalUX) {
            const h2 = testimonialSection.querySelector('h2');
            if (h2) h2.textContent = NEW_COPY.testimonials.title;

            const container = testimonialSection.querySelector('.grid') || testimonialSection.querySelector('.flex') || testimonialSection.querySelector('div > div > div');
            if (container) {
                testimonialSection.dataset.fixedFinalUX = "true";
                container.style.display = "flex";
                container.style.flexDirection = "row";
                container.style.overflowX = "auto";
                container.style.gap = "20px";
                container.style.padding = "20px 0 40px 0";
                container.style.scrollSnapType = "x mandatory";
                container.style.webkitOverflowScrolling = "touch";
                container.className = "flex overflow-x-auto snap-x snap-mandatory no-scrollbar";
                
                container.innerHTML = NEW_COPY.testimonials.items.map(data => `
                    <div class="shrink-0 w-[85%] md:w-[450px] snap-center bg-card p-8 rounded-2xl border border-border flex flex-col shadow-md" style="min-width: 85%; max-width: 85%; height: auto; min-height: 220px; opacity: 1 !important; transform: none !important; overflow: visible !important;">
                        <p class="text-lg italic text-foreground mb-6" style="white-space: normal !important; overflow: visible !important;">"${data.text}"</p>
                        <div class="mt-auto">
                            <span class="font-bold text-primary block">${data.author}</span>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    function setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section, h1, h2, h3, p, button').forEach(el => {
            if (el.closest('.snap-center')) return; 
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(el);
        });
    }

    let timeout;
    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            updateCopy();
            addTestimonials();
        }, 100);
    });

    const root = document.getElementById('root');
    if (root) observer.observe(root, { childList: true, subtree: true });
    
    updateCopy();
    addTestimonials();
    setupAnimations();
})();

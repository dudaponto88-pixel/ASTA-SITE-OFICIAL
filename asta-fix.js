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
        whatWeDo: {
            title: "Veja tudo o que fazemos pela sua clínica",
            items: [
                { title: "Tráfego pago", text: "Google Ads e Meta Ads com estratégia real de conversão." },
                { title: "Presença digital", text: "Autoridade construída nos canais certos para sua especialidade." },
                { title: "CRM e processos", text: "Do lead ao paciente fidelizado, sem deixar ninguém cair no esquecimento." },
                { title: "Automações", text: "Velocidade no primeiro contato. Lead que espera, vai embora." },
                { title: "Dashboards", text: "Decisões baseadas em dados, não em intuição." },
                { title: "Consultoria estratégica", text: "Acompanhamento contínuo sem contrato engessado." }
            ]
        },
        howItWorks: {
            title: "Da análise à agenda cheia.",
            items: [
                { title: "Diagnóstico", text: "Mapeamos sua clínica, seu mercado e seus concorrentes. Identificamos o que está travando seu crescimento." },
                { title: "Estratégia", text: "Um plano construído para a sua realidade. Canal certo, mensagem certa, paciente certo." },
                { title: "Execução", text: "Implementamos, acompanhamos diariamente e ajustamos. Você acompanha tudo em tempo real." }
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
                { text: "Finalmente entendo de onde vêm meus pacientes. Isso mudou a forma como gerencio a clínica.", name: "Dr. J.S.", spec: "Odontologia" },
                { text: "Minha clínica estava no mesmo nível há dois anos. Em poucos meses isso mudou.", name: "Dra. M.C.", spec: "Estética" },
                { text: "Além dos pacientes, a organização interna da clínica mudou. Não esperava isso.", name: "Dra. A.P.", spec: "Harmonização" }
            ]
        },
        footer: { desc: "Crescimento previsível para clínicas.", copyright: "© 2026 ASTA. Todos os direitos reservados." }
    };

    function applyFixes() {
        // 1. Remover barra de progresso
        const progressBar = document.querySelector('div.h-\\[2px\\]');
        if (progressBar) progressBar.remove();

        // 2. Atualizar Navegação
        const whyLink = Array.from(document.querySelectorAll('nav a, header a')).find(el => el.textContent.includes('Por que') || el.textContent.includes('fazemos'));
        if (whyLink && whyLink.textContent !== NEW_COPY.nav.why) {
            whyLink.textContent = NEW_COPY.nav.why;
        }

        // 3. Hero Section
        const h1 = document.querySelector('h1');
        if (h1 && h1.textContent !== NEW_COPY.hero.headline) h1.textContent = NEW_COPY.hero.headline;
        const subtitle = document.querySelector('h1 + p');
        if (subtitle && subtitle.textContent !== NEW_COPY.hero.subtitle) subtitle.textContent = NEW_COPY.hero.subtitle;

        // 4. Seções de Conteúdo
        document.querySelectorAll('main section').forEach(section => {
            const h2 = section.querySelector('h2');
            const p = section.querySelector('p');
            
            // Remover seções duplicadas ou indesejadas marcadas no vídeo (NOSSOS DIFERENCIAIS)
            if (h2 && h2.textContent.includes('DIFERENCIAIS')) {
                section.remove();
                return;
            }

            // Seção Problema / Solução
            if (h2 && (h2.textContent.includes('indicação') || h2.textContent.includes('escolher') || h2.textContent.includes('Por que'))) {
                if (h2.textContent.includes('indicação') || section.textContent.includes('Indicação')) {
                    if (h2.textContent !== NEW_COPY.problem.title) h2.textContent = NEW_COPY.problem.title;
                    if (p && p.textContent !== NEW_COPY.problem.body) p.textContent = NEW_COPY.problem.body;
                } else {
                    // Esta seção será "Veja tudo o que fazemos pela sua clínica"
                    if (h2.textContent !== NEW_COPY.whatWeDo.title) h2.textContent = NEW_COPY.whatWeDo.title;
                    if (p) p.textContent = "";
                    // Remover ícone de alvo acima do título se existir
                    const icon = section.querySelector('svg, img');
                    if (icon && icon.parentElement.contains(h2)) icon.remove();
                }
            }

            // Seção O QUE FAZEMOS (Ecossistema) - Evitar flickering com trava de dataset
            if (h2 && (h2.textContent.includes('ecossistema') || h2.textContent.includes('fazemos') || h2.textContent.includes('fazemos pela sua clínica'))) {
                if (h2.textContent !== NEW_COPY.whatWeDo.title) h2.textContent = NEW_COPY.whatWeDo.title;
                const items = section.querySelectorAll('div.grid > div');
                items.forEach((item, i) => {
                    if (NEW_COPY.whatWeDo.items[i] && item.dataset.fixed !== "true") {
                        const h3 = item.querySelector('h3');
                        const itemP = item.querySelector('p');
                        if (h3) h3.textContent = NEW_COPY.whatWeDo.items[i].title;
                        if (itemP) itemP.textContent = NEW_COPY.whatWeDo.items[i].text;
                        item.dataset.fixed = "true"; // Trava para evitar flickering
                    }
                });
            }

            // Seção COMO FUNCIONA
            if (h2 && (h2.textContent.includes('agenda cheia') || h2.textContent.includes('Funciona'))) {
                if (h2.textContent !== NEW_COPY.howItWorks.title) h2.textContent = NEW_COPY.howItWorks.title;
                const items = section.querySelectorAll('div.grid > div');
                items.forEach((item, i) => {
                    if (NEW_COPY.howItWorks.items[i] && item.dataset.fixed !== "true") {
                        const h3 = item.querySelector('h3');
                        const itemP = item.querySelector('p');
                        if (h3) h3.textContent = NEW_COPY.howItWorks.items[i].title;
                        if (itemP) itemP.textContent = NEW_COPY.howItWorks.items[i].text;
                        item.dataset.fixed = "true"; // Trava para evitar flickering
                    }
                });
            }
        });

        // 5. Depoimentos Premium corrigidos
        const testimonialSection = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('clientes') || s.textContent.includes('Histórias Reais'));
        if (testimonialSection && !testimonialSection.dataset.finalPremiumV5) {
            const h2 = testimonialSection.querySelector('h2');
            if (h2) h2.textContent = NEW_COPY.testimonials.title;
            const subtitle = Array.from(testimonialSection.querySelectorAll('p')).find(p => p.textContent.includes('Clínicas que transformaram'));
            if (subtitle) subtitle.remove();

            const container = testimonialSection.querySelector('.grid') || testimonialSection.querySelector('.flex') || testimonialSection.querySelector('div > div > div');
            if (container) {
                testimonialSection.dataset.finalPremiumV5 = "true";
                container.className = "grid grid-cols-1 md:grid-cols-3 gap-6 testimonial-container-fix";
                container.innerHTML = NEW_COPY.testimonials.items.map(data => `
                    <div class="testimonial-card-fix" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 28px; display: flex; flex-direction: column;">
                        <div style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #00C8FF; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px;">
                            ${data.name} · ${data.spec}
                        </div>
                        <div style="width: 100%; height: 1px; background: rgba(255, 255, 255, 0.08); margin-bottom: 16px;"></div>
                        <p style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: #C4CFDF; line-height: 1.7; margin: 0;">${data.text}</p>
                    </div>
                `).join('');
            }
        }
    }

    // Estilos para evitar flickering e garantir layout
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .testimonial-container-fix {
                display: flex !important;
                flex-direction: row !important;
                overflow-x: auto !important;
                scroll-snap-type: x mandatory !important;
                gap: 16px !important;
            }
            .testimonial-card-fix {
                min-width: 85% !important;
                scroll-snap-align: center !important;
            }
        }
    `;
    document.head.appendChild(style);

    // MutationObserver para garantir que as mudanças persistam mesmo com re-render do React
    const observer = new MutationObserver(() => {
        applyFixes();
    });

    const root = document.getElementById('root');
    if (root) {
        observer.observe(root, { childList: true, subtree: true });
    }

    // Execução imediata e em intervalos curtos para garantir estabilidade inicial
    applyFixes();
    setTimeout(applyFixes, 500);
    setTimeout(applyFixes, 1500);
})();

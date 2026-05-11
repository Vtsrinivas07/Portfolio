/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')
const navLinksBySection = new Map()

sections.forEach(section => {
    const sectionId = section.getAttribute('id')
    const navLink = document.querySelector('.nav_menu a[href*=' + sectionId + ']')
    if(navLink){
        navLinksBySection.set(sectionId, navLink)
    }
})

let scrollTicking = false

window.addEventListener('scroll', () => {
    if(scrollTicking) return
    scrollTicking = true
    window.requestAnimationFrame(() => {
        scrollActive()
        scrollTicking = false
    })
}, { passive: true })

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')
        const navLink = navLinksBySection.get(sectionId)
        if(!navLink) return

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            navLink.classList.add('active')
        }else{
            navLink.classList.remove('active')
        }
    })
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: false
})

/*SCROLL HOME*/
sr.reveal('.home_title', {})
sr.reveal('.home__scroll', {delay: 200})
sr.reveal('.home__img', {origin:'right', delay: 400})

/*SCROLL ABOUT*/
sr.reveal('.about_img', {delay: 500})
sr.reveal('.about_subtitle', {delay: 300})
sr.reveal('.about_profession', {delay: 400})
sr.reveal('.about_text', {delay: 500})
sr.reveal('.about__social-icon', {delay: 600, interval: 200})

/*SCROLL SKILLS*/
sr.reveal('.skills_subtitle', {})
sr.reveal('.skills_name', {distance: '20px', delay: 50, interval: 100})
sr.reveal('.skills_img', {delay: 400})

/*SCROLL project*/
sr.reveal('.project_img', {interval: 200})

/*SCROLL CONTACT*/
sr.reveal('.contact_subtitle', {})
sr.reveal('.contact_text', {interval: 200})
sr.reveal('.contact_input', {delay: 400})
sr.reveal('.contact_button', {delay: 600})

/* ===== Project modal ===== */
document.addEventListener('DOMContentLoaded', ()=>{
    const modal = document.getElementById('project-modal')
    const modalOverlay = modal && modal.querySelector('.modal-overlay')
    const modalTitle = document.getElementById('modal-title')
    const modalDesc = document.getElementById('modal-desc')
    const modalChallenge = document.getElementById('modal-challenge')
    const modalApproach = document.getElementById('modal-approach')
    const modalImpact = document.getElementById('modal-impact')
    const modalTech = document.getElementById('modal-tech')
    const modalGithub = document.getElementById('modal-github')

    document.body.classList.add('layout-story')

    const projectNarratives = {
        'MediAI - AI Healthcare Platform': {
            challenge: 'Unify conversational AI, image diagnostics, and secure patient workflow inside one reliable healthcare product.',
            approach: 'Designed a modular FastAPI plus React architecture with RAG retrieval, model-serving endpoints, and role-aware auth boundaries.',
            impact: 'Reduced decision latency for medical lookups and created a scalable base for multimodal clinical support.'
        },
        'Social Media Platform with AI Content Moderation': {
            challenge: 'Balance community freedom with proactive moderation at high posting volume.',
            approach: 'Combined MERN feed architecture with OpenAI moderation checks and admin audit logs for transparent governance.',
            impact: 'Improved trust and moderation speed while preserving a smooth publishing experience.'
        },
        'Heart Attack Risk Prediction': {
            challenge: 'Convert raw clinical attributes into dependable risk predictions with interpretable outputs.',
            approach: 'Trained and compared KNN and ANN pipelines after disciplined preprocessing and feature selection.',
            impact: 'Reached 87.12% test accuracy and ROC-AUC 0.85 for practical screening workflows.'
        },
        'Resume Parser & Job Recommendation': {
            challenge: 'Extract meaningful candidate signals from unstructured resume text and map them to jobs.',
            approach: 'Built NLP extraction and similarity ranking to align skills, profile context, and opportunity matching.',
            impact: 'Improved recommendation relevance and reduced manual shortlisting effort.'
        }
    }

    document.querySelectorAll('.project_link-name').forEach(link=>{
        link.addEventListener('click', (event)=>{
            const href = link.getAttribute('href')
            if(!href || href === '#'){
                return
            }

            event.preventDefault()
            const card = link.closest('.project_img')
            if(!card || !modal) return

            const titleEl = card.querySelector('h3')
            const descEl = card.querySelector('p')
            const techEls = Array.from(card.querySelectorAll('.project_tech span'))
            const titleText = titleEl ? titleEl.textContent.trim() : ''
            const narrative = projectNarratives[titleText] || {
                challenge: 'Translate an idea into a deployable product with maintainable architecture and clean UI behavior.',
                approach: 'Applied iterative build-measure-refine cycles across backend APIs, frontend components, and deployment workflows.',
                impact: 'Delivered a stable end-to-end implementation that showcases practical engineering depth.'
            }

            modalTitle.textContent = titleText
            modalDesc.textContent = descEl ? descEl.textContent.trim() : ''
            modalChallenge.textContent = narrative.challenge
            modalApproach.textContent = narrative.approach
            modalImpact.textContent = narrative.impact
            modalTech.innerHTML = ''

            techEls.forEach(tag=>{
                const pill = document.createElement('span')
                pill.className = 'project_tag'
                pill.textContent = tag.textContent.trim()
                modalTech.appendChild(pill)
            })

            modalGithub.href = href
            modal.classList.remove('hidden')
            document.body.style.overflow = 'hidden'
        })
    })

    function closeModal(){
        if(modal){
            modal.classList.add('hidden')
        }
        document.body.style.overflow = ''
    }

    if(modalOverlay){
        modalOverlay.addEventListener('click', closeModal)
    }

    const modalClose = document.querySelector('.modal-close')
    if(modalClose){
        modalClose.addEventListener('click', closeModal)
    }

    document.addEventListener('keydown', (event)=>{
        if(event.key === 'Escape'){
            closeModal()
        }
    })
})





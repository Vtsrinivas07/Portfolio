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

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
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

/* ===== Project modal and Show All toggle ===== */
document.addEventListener('DOMContentLoaded', ()=>{
    const projectContainer = document.querySelector('.project_container')
    const toggleBtn = document.getElementById('toggle-projects-btn')
    const modal = document.getElementById('project-modal')
    const modalOverlay = modal && modal.querySelector('.modal-overlay')
    const modalPanel = modal && modal.querySelector('.modal-panel')
    const modalTitle = document.getElementById('modal-title')
    const modalDesc = document.getElementById('modal-desc')
    const modalTech = document.getElementById('modal-tech')
    const modalGithub = document.getElementById('modal-github')

    if(toggleBtn && projectContainer){
        toggleBtn.addEventListener('click', ()=>{
            const showing = projectContainer.classList.toggle('show-all')
            toggleBtn.textContent = showing ? 'Show Featured (4x4)' : 'Show All Projects'
        })
    }

    // Layout mode switching
    const layoutButtons = document.querySelectorAll('.layout-btn')
    const applyLayout = (mode)=>{
        // remove existing layout-* classes from body
        document.body.classList.remove('layout-scroll','layout-grid','layout-story','layout-minimal','layout-interactive')
        document.body.classList.add(mode)
        // persist
        try{ localStorage.setItem('portfolioLayout', mode) }catch(e){}
        // interactive mode requires cursor and tilt
        if(mode === 'layout-interactive') enableInteractive()
        else disableInteractive()
    }

    layoutButtons.forEach(btn=> btn.addEventListener('click', ()=> applyLayout(btn.dataset.layout)))

    // restore layout from storage
    const saved = localStorage.getItem('portfolioLayout')
    if(saved) applyLayout(saved)

    // intercept project link clicks to show modal instead of navigating
    document.querySelectorAll('.project_link-name').forEach(link=>{
        link.addEventListener('click', (e)=>{
            // only if href is a github url
            const href = link.getAttribute('href')
            if(!href || href === '#') return
            e.preventDefault()
            const card = link.closest('.project_img')
            if(!card) return
            const titleEl = card.querySelector('h3')
            const descEl = card.querySelector('p')
            const techEls = Array.from(card.querySelectorAll('.project_tech span'))
            modalTitle.textContent = titleEl ? titleEl.textContent.trim() : ''
            modalDesc.textContent = descEl ? descEl.textContent.trim() : ''
            modalTech.innerHTML = ''
            techEls.forEach(t=>{
                const s = document.createElement('span')
                s.className = 'project_tag'
                s.textContent = t.textContent.trim()
                modalTech.appendChild(s)
            })
            modalGithub.href = href
            modal.classList.remove('hidden')
            document.body.style.overflow = 'hidden'
        })
    })

    function closeModal(){
        if(modal) modal.classList.add('hidden')
        document.body.style.overflow = ''
    }

    /* Interactive cursor + tilt */
    let cursorEl = null
    let interactiveEnabled = false
    function enableInteractive(){
        if(interactiveEnabled) return
        interactiveEnabled = true
        // add cursor
        cursorEl = document.createElement('div')
        cursorEl.className = 'custom-cursor'
        document.body.appendChild(cursorEl)

        document.addEventListener('mousemove', onMove)
        // tilt effect on card inner
        document.querySelectorAll('.card-inner').forEach(card=>{
            card.addEventListener('mousemove', onCardMove)
            card.addEventListener('mouseleave', onCardLeave)
            card.addEventListener('mouseenter', ()=> cursorEl.classList.add('big'))
        })
    }
    function disableInteractive(){
        if(!interactiveEnabled) return
        interactiveEnabled = false
        document.removeEventListener('mousemove', onMove)
        document.querySelectorAll('.card-inner').forEach(card=>{
            card.removeEventListener('mousemove', onCardMove)
            card.removeEventListener('mouseleave', onCardLeave)
            card.removeEventListener('mouseenter', ()=> cursorEl.classList.remove('big'))
            card.style.transform = ''
        })
        if(cursorEl){ cursorEl.remove(); cursorEl = null }
    }

    function onMove(e){ if(cursorEl) { cursorEl.style.left = e.clientX + 'px'; cursorEl.style.top = e.clientY + 'px'; } }
    function onCardMove(e){
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left)/r.width
        const py = (e.clientY - r.top)/r.height
        const rx = (py - 0.5) * 6
        const ry = (px - 0.5) * -6
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
    }
    function onCardLeave(e){ e.currentTarget.style.transform = '' }

    if(modalOverlay) modalOverlay.addEventListener('click', closeModal)
    const modalClose = document.querySelector('.modal-close')
    if(modalClose) modalClose.addEventListener('click', closeModal)
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal() })
})





import * as bootstrap from 'bootstrap'

class Header extends HTMLElement {
  static observedAttributes = ["type"];
  
  constructor() {
    super();
  }

  connectedCallback() {
    let inner = this.innerHTML.slice(); 
    let id = this.id;
    let t = this.getAttribute("type");
    switch (t) {
      case "1":
        this.innerHTML = `
          <h2 class="mt-5 display-3" id="${id}"> 
            <u> 
              ${inner}
            </u> 
          </h2>
        `;
        break
      case "2":
      this.innerHTML = `
        <h3 class="mt-3" id="${id}"> 
          ${inner}
        </h3>
      `;
    }
  }
}

customElements.define("c-header", Header);

class Slideshow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let inner = this.innerHTML.slice(); 
    let id = this.id;
    this.innerHTML = `
      <div id="${id}" class="carousel slide carousel-fade">
        <!-- Side navigation buttons -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#${id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#${id}" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#${id}" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <!-- Slides -->
        <div class="carousel-inner">
          ${inner}
        </div>
        <!-- Bottom navigation buttons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }
}

customElements.define("c-slideshow", Slideshow);

class Person extends HTMLElement {
  static observedAttributes = ["name", "major", "email", "badges"];

  constructor() {
    super();
  }

  connectedCallback() {
    let name = this.getAttribute("name");
    let major = this.getAttribute("major");
    let email = this.getAttribute("email");
    let picture = name.toLowerCase()
      .replace(' ', '_')
      .concat(".webp");
    let badges = this.getAttribute("badges").split(" ");
    let badges_html = ``;
    badges.forEach((b, _) => {
      switch (b) {
        case "president":
          badges_html += 
            `<span class="w-100 badge rounded-pill text-bg-success float-end">
                President
              </span>`;
          break;
        case "cofounder":
          badges_html += 
            `<span class="w-100 badge rounded-pill text-bg-danger float-end">
                Co-Founder
              </span> <br/>`;
          break;
        case "lead":
          badges_html += 
            `<span class="w-100 badge rounded-pill text-bg-primary float-end">
                Lead
              </span>`;
          break;
        case "team":
          badges_html += 
            `<span class="w-100 badge rounded-pill text-bg-secondary float-end">
                Volunteer
              </span>`;
          break;
      }
    });
    this.innerHTML = `
          <div class="col h-100 d-flex align-items-stretch">
            <article class="card ">
              <img src="/people/${picture}" class="card-img-top">
              <div class="card-body bg-body-tertiary">
                <div class="float-end">
                  ${badges_html}
                </div>
                <h5 class="card-title text-decoration-underline">
                  ${name}
                </h5>
                <p class="card-text">
                  <small>
                  UTSA ${major} 
                  <br/>
                  <a href="mailto:${email}">
                    ${email}
                  </a>
                  </small>
                </p>
              </div>
            </article>
          </div>`;
  }
}

customElements.define("c-person", Person);

class Part extends HTMLElement {
  observedAttributes = ["name", "href", "image"];

  constructor() {
    super()
  }

  connectedCallback() {
    let name = this.getAttribute("name");
    let link = this.getAttribute("href");
    let image = this.getAttribute("image");
    this.innerHTML = `
      <div class="col w-100 h-100 d-flex align-items-stretch">
        <article class="card h-100">
          <img src="/parts/${image}" class="card-img-top">
          <div class="card-body bg-body-tertiary"> 
            <a href="${link}" class="stretched-link fw-bold"> 
              ${name}
            </a>
          </div>
        </article>
      </div>
    `;
  }
}

customElements.define("c-part", Part);

class Sponsor extends HTMLElement {

  static observedAttributes = ["image", "href"];

  constructor() {
    super();
  }

  connectedCallback() {
    let image = this.getAttribute("image");
    let link = this.getAttribute("href");
    this.innerHTML = `
        <li class="list-group-item">
          <a href=${link}>
            <img src="/sponsors/${image}" class="img-fluid">
          </a>
        </li>
      `;
  }
}

customElements.define("c-sponsor", Sponsor);

const WEEKS = 6;

async function getJournal(i) {
  return await (await fetch("/journal/week" + i + ".html")).text();
}

let journal = [];
for (let i = 1; i <= WEEKS; i++) {
  journal.push(await getJournal(i))
}

function weekButton(i) {
  return document.getElementById("week" + i)
}

function iterWeeks(f) {
  for (let i = 1; i <= WEEKS; i++) {
    let button = weekButton(i)
    f(button, i)
  }
}

function setActiveWeek(i) {
  iterWeeks(
    (b, _) => b.parentNode.classList.remove("active")
  )
  weekButton(i).parentNode.classList.add("active")
  document.getElementById("journal").innerHTML = journal[i-1]
}

async function init() {
  iterWeeks((b, i) => b.onclick = (ev) => setActiveWeek(i))
  setActiveWeek(1)
}

// This prevents grabbing weeks from blocking (i think?)
init()

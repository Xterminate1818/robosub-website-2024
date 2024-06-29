import * as bootstrap from 'bootstrap'

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
            `<span class="badge rounded-pill text-bg-success float-end">
                President
              </span>`;
          break;
        case "cofounder":
          badges_html += 
            `<span class="badge rounded-pill text-bg-danger float-end">
                Co-Founder
              </span>`;
          break;
        case "lead":
          badges_html += 
            `<span class="badge rounded-pill text-bg-primary float-end">
                Lead
              </span>`;
          break;
        case "team":
          badges_html += 
            `<span class="badge rounded-pill text-bg-secondary float-end">
                Team
              </span>`;
          break;
      }
    });
    this.innerHTML = `
          <div class="col">
            <article class="card h-100">
              <img src="/people/${picture}" class="card-img-top">
              <div class="card-body">
                ${badges_html}
                <h5 class="card-title text-decoration-underline">
                  ${name}
                </h5>
                <p class="card-text">
                  UTSA ${major} 
                  <br/>
                  <a href="mailto:${email}">
                    ${email}
                  </a>
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
      <div class="col">
        <article class="card h-100">
          <img src="/parts/${image}" class="card-img-top">
          <div class="card-body"> 
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

// Attach onclick events
iterWeeks((b, i) => b.onclick = (ev) => setActiveWeek(i))
setActiveWeek(1)

import * as bootstrap from 'bootstrap'

const WEEKS = 6;
console.log(week1);

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

function newPerson(name, major, email) {
  let people = document.getElementById("people");
  let picture = name.toLowerCase()
    .replace(' ', '_')
    .concat(".jpg");
  people.innerHTML += `
        <div class="col">
          <article class="card h-100">
            <img src="/people/${picture}" class="card-img-top">
            <div class="card-body">
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
        </div>
    `;
}

newPerson(
  "Allan Aanonsen", "Computer Engineering 2025",
  "a96742451@gmail.com"
);
newPerson(
  "Adam Snyder", "Mechanical Engineering 2026",
  "adam.snydertwo@gmail.com"
);
newPerson(
  "Mauricio Figueroa", "Electrical Engineering 2026",
  "mauricio.figueroa@farfetched.dev"
);

function newPart(name, link, image) {
  let parts = document.getElementById("parts");
  parts.innerHTML += `
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

newPart(
  "NVIDIA Jetson Orin Nano", "https://a.co/d/eFkF9Wu", "jetson.jpg"
);

newPart(
  "Raspberry Pi Pico", "https://a.co/d/i4piSYu", "pico.jpg"
);

newPart(
  "Arduino Nano", "https://a.co/d/iBslOkX", "nano.jpg"
);

newPart(
  "Thruster Motor", "https://a.co/d/7LsN7ta", "thruster.jpg"
);

newPart(
  "5 Megapixel Camera", "https://a.co/d/924VXMo", "camera.jpg"
);

newPart(
  "Ping2 Sonar Altimeter and Echosounder",
  "https://bluerobotics.com/store/sensors-sonars-cameras/sonar/ping-sonar-r2-rp/",
  "sonar.jpg"
);

newPart(
  "Bar30 Depth and Pressure Sensor", 
  "https://bluerobotics.com/store/sensors-sonars-cameras/sensors/bar30-sensor-r1/",
  "depth.jpg"
);

newPart(
  "Omnidirectional LIDAR Scanner",
  "https://www.amazon.com/dp/B07TJW5SXF?_encoding=UTF8&psc=1&ref_=cm_sw_r_cp_ud_dp_9GB46PS7YBKKZPAJY3ES",
  "lidar.jpg"
);

newPart(
  "View the full parts list here",
  "/parts_list.pdf",
  "motherboard.svg",
);
